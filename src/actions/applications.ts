"use server";

import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { getDb } from "@/db";
import {
  applications,
  jobs,
  siteSettings,
  type ApplicationStatus,
  type Job,
} from "@/db/schema";
import { sendApplicationNotification } from "@/lib/email";
import { requireAdmin } from "@/lib/auth-guard";
import {
  applyFormSchema,
  ALLOWED_CV_MIME,
  MAX_CV_BYTES,
} from "@/lib/validation";

export type SubmitState =
  | {
      ok: true;
      message: string;
      emailSimulated?: boolean;
    }
  | { ok: false; message: string };

const SUCCESS_BASE =
  "Aitäh! Kandideerimine on salvestatud. Võtame peagi ühendust. — Application submitted successfully. We will contact you soon.";

export async function submitApplication(
  _prev: SubmitState | null,
  formData: FormData
): Promise<SubmitState> {
  const db = getDb();
  const jobIdRaw = formData.get("jobId");
  const jobId =
    typeof jobIdRaw === "string" && jobIdRaw.length > 0 ? jobIdRaw : null;

  const parsed = applyFormSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message") ?? "",
  });

  if (!parsed.success) {
    const msg =
      Object.values(parsed.error.flatten().fieldErrors).flat()[0] ??
      "Palun kontrolli väljasid.";
    return { ok: false, message: msg };
  }

  const cv = formData.get("cv");
  let cvUrl: string | null = null;
  let cvFileName: string | null = null;

  if (cv instanceof File && cv.size > 0) {
    if (cv.size > MAX_CV_BYTES) {
      return {
        ok: false,
        message:
          "CV fail on liiga suur (max 5 MB). Proovi väiksemat PDF-i või jäta praegu lisamata.",
      };
    }
    const type = cv.type || "application/octet-stream";
    if (!ALLOWED_CV_MIME.has(type)) {
      return {
        ok: false,
        message: "Lubatud on ainult PDF, DOC või DOCX failid.",
      };
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      console.warn("[apply] BLOB_READ_WRITE_TOKEN missing — CV not stored");
    } else {
      const blob = await put(cv.name || "cv.pdf", cv, {
        access: "public",
        token,
      });
      cvUrl = blob.url;
      cvFileName = cv.name;
    }
  }

  let notifyTo: string;
  let jobRow: Job | null = null;

  if (jobId) {
    const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
    if (!job || !job.active) {
      return { ok: false, message: "See tööpakkumine ei ole enam aktiivne." };
    }
    notifyTo = job.emailTo;
    jobRow = job;
  } else {
    const [settings] = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.id, "default"))
      .limit(1);
    notifyTo = settings?.defaultApplicationEmail ?? "Birgit@cannery.eu";
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
    const result = await sendApplicationNotification(
      inserted,
      jobRow,
      notifyTo
    );
    if (result.via === "simulated") {
      emailSimulated = true;
      extra =
        " (Email simulation — set RESEND_API_KEY on the server for real delivery.)";
    }
  } catch (err) {
    console.error("[apply] sendApplicationNotification failed:", err);
    extra =
      " Teavituskirja saatmine ebaõnnestus; kandideerimine on salvestatud. / Email notification failed; your application was still saved.";
  }

  revalidatePath("/admin/applications");
  return {
    ok: true,
    message: SUCCESS_BASE + extra,
    emailSimulated,
  };
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
