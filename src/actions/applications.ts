"use server";

import { randomUUID } from "node:crypto";

import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { getDb } from "@/db";
import {
  applications,
  jobs,
  type ApplicationStatus,
  type Job,
} from "@/db/schema";
import { isTrustedCvBlobUrl } from "@/lib/blob-trust";
import { getBlobReadWriteToken } from "@/lib/blob-token";
import { sendApplicationNotification } from "@/lib/email";
import { requireAdmin } from "@/lib/auth-guard";
import { type Locale, messages } from "@/lib/i18n/messages";
import {
  getApplyFormSchema,
  MAX_CV_BYTES,
  resolveCvMimeType,
} from "@/lib/validation";

export type SubmitState =
  | {
      ok: true;
      message: string;
      emailSimulated?: boolean;
      /** ISO timestamp from DB (for success UI) */
      submittedAt: string;
    }
  | { ok: false; message: string };

const SUCCESS_BASE =
  "Aitäh! Kandideerimine on salvestatud. Võtame peagi ühendust. — Application submitted successfully. We will contact you soon.";

function parseLocale(raw: unknown): Locale {
  return raw === "en" ? "en" : "et";
}

function parseTrustedCvFromForm(formData: FormData): {
  cvUrl: string;
  cvFileName: string;
} | null {
  const urlRaw = formData.get("cvUrl");
  const nameRaw = formData.get("cvFileName");
  if (typeof urlRaw !== "string" || typeof nameRaw !== "string") return null;
  const cvUrl = urlRaw.trim();
  const cvFileName = nameRaw.trim();
  if (
    !cvUrl ||
    !cvFileName ||
    cvFileName.length > 255 ||
    /[/\\]/.test(cvFileName)
  ) {
    return null;
  }
  if (!isTrustedCvBlobUrl(cvUrl)) return null;
  return { cvUrl, cvFileName };
}

export async function submitApplication(
  _prev: SubmitState | null,
  formData: FormData
): Promise<SubmitState> {
  const locale = parseLocale(formData.get("locale"));
  const msg = messages[locale];

  const jobIdRaw = formData.get("jobId");
  const jobId =
    typeof jobIdRaw === "string" && jobIdRaw.length > 0 ? jobIdRaw : null;

  const parsed = getApplyFormSchema(locale).safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message") ?? "",
  });

  if (!parsed.success) {
    const fieldMsg =
      Object.values(parsed.error.flatten().fieldErrors).flat()[0] ??
      msg.serverFieldsHint;
    return { ok: false, message: fieldMsg };
  }

  try {
    const db = getDb();
    const cv = formData.get("cv");
    let cvUrl: string | null = null;
    let cvFileName: string | null = null;

    const trusted = parseTrustedCvFromForm(formData);
    if (trusted) {
      cvUrl = trusted.cvUrl;
      cvFileName = trusted.cvFileName;
    } else if (cv instanceof File && cv.size > 0) {
      if (cv.size > MAX_CV_BYTES) {
        return {
          ok: false,
          message: msg.serverCvTooLarge,
        };
      }
      const mime = resolveCvMimeType(cv);
      if (!mime) {
        return {
          ok: false,
          message: msg.serverCvType,
        };
      }

      const token = getBlobReadWriteToken();
      if (!token) {
        console.warn("[apply] BLOB_READ_WRITE_TOKEN missing — CV not stored");
      } else {
        try {
          const ext =
            mime === "application/pdf"
              ? ".pdf"
              : mime.includes("wordprocessingml")
                ? ".docx"
                : ".doc";
          const pathname = `applications/cv-${randomUUID()}${ext}`;
          const buf = Buffer.from(await cv.arrayBuffer());
          const blob = await put(pathname, buf, {
            access: "public",
            token,
            contentType: mime,
            multipart: true,
          });
          cvUrl = blob.url;
          cvFileName = cv.name || `cv${ext}`;
        } catch (blobErr) {
          const detail =
            blobErr instanceof Error ? blobErr.message : String(blobErr);
          console.error("[apply] Vercel Blob upload failed:", detail, blobErr);
          return { ok: false, message: msg.serverCvUploadFailed };
        }
      }
    }

    let jobRow: Job | null = null;

    if (jobId) {
      const [job] = await db
        .select()
        .from(jobs)
        .where(eq(jobs.id, jobId))
        .limit(1);
      if (!job || !job.active) {
        return { ok: false, message: msg.serverJobInactive };
      }
      jobRow = job;
    }

    const [inserted] = await db
      .insert(applications)
      .values({
        jobId: jobId ?? null,
        name: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        message: parsed.data.message ?? "",
        cvUrl,
        cvFileName,
        status: "new",
        notes: "",
      })
      .returning();

    let emailSimulated = false;
    let extra = "";

    try {
      const result = await sendApplicationNotification(inserted, jobRow);
      if (result.via === "simulated") {
        emailSimulated = true;
        extra =
          " (Email simulation — set SMTP_PASS on the server for real delivery.)";
      }
    } catch (err) {
      console.error("[apply] sendApplicationNotification failed:", err);
      extra =
        " Teavituskirja saatmine ebaõnnestus; kandideerimine on salvestatud. / Email notification failed; your application was still saved.";
    }

    revalidatePath("/admin/applications");

    const created = inserted.createdAt;
    const submittedAt =
      created instanceof Date
        ? created.toISOString()
        : created
          ? new Date(created).toISOString()
          : new Date().toISOString();

    return {
      ok: true,
      message: SUCCESS_BASE + extra,
      emailSimulated,
      submittedAt,
    };
  } catch (err) {
    console.error("[apply] submitApplication failed:", err);
    return {
      ok: false,
      message: msg.serverApplyUnexpected,
    };
  }
}

export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    await requireAdmin();
    const db = getDb();
    await db
      .update(applications)
      .set({ status })
      .where(eq(applications.id, applicationId));
    revalidatePath("/admin/applications");
    return { ok: true };
  } catch {
    return { ok: false, message: "Could not update status." };
  }
}

export async function updateApplicationNotes(
  applicationId: string,
  notes: string
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    await requireAdmin();
    const db = getDb();
    await db
      .update(applications)
      .set({ notes })
      .where(eq(applications.id, applicationId));
    revalidatePath("/admin/applications");
    return { ok: true };
  } catch {
    return { ok: false, message: "Could not save notes." };
  }
}

export async function updateApplicationCvRating(
  applicationId: string,
  rating: number | null
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    await requireAdmin();
    if (
      rating !== null &&
      (!Number.isInteger(rating) || rating < 1 || rating > 5)
    ) {
      return { ok: false, message: "Rating must be 1–5 or cleared." };
    }
    const db = getDb();
    await db
      .update(applications)
      .set({ cvRating: rating })
      .where(eq(applications.id, applicationId));
    revalidatePath("/admin/applications");
    return { ok: true };
  } catch {
    return { ok: false, message: "Could not update CV score." };
  }
}
