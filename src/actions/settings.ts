"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getDb } from "@/db";
import { siteSettings } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-guard";
import {
  DEFAULT_APPLICANT_EMAIL_BODY_EN,
  DEFAULT_APPLICANT_EMAIL_BODY_ET,
  normalizeApplicantEmailBody,
} from "@/lib/applicant-email-defaults";

const MAX_APPLICANT_BODY_CHARS = 12000;

export async function updateSiteEmailSettings(
  _prev: unknown,
  formData: FormData
): Promise<{ ok: boolean; message?: string }> {
  await requireAdmin();
  const rawEmail = String(formData.get("defaultApplicationEmail") ?? "");
  const parsedEmail = z.string().email().safeParse(rawEmail);
  if (!parsedEmail.success) {
    return { ok: false, message: "Kehtiv e-posti aadress on vajalik." };
  }

  const bodyEtRaw = String(formData.get("applicantEmailBodyEt") ?? "");
  const bodyEnRaw = String(formData.get("applicantEmailBodyEn") ?? "");
  if (
    bodyEtRaw.length > MAX_APPLICANT_BODY_CHARS ||
    bodyEnRaw.length > MAX_APPLICANT_BODY_CHARS
  ) {
    return {
      ok: false,
      message:
        "Kinnituskiri: tekst on liiga pikk (max 12000 märki keele kohta).",
    };
  }

  const trimmedEt = normalizeApplicantEmailBody(bodyEtRaw);
  const trimmedEn = normalizeApplicantEmailBody(bodyEnRaw);
  const defaultEtNorm = normalizeApplicantEmailBody(
    DEFAULT_APPLICANT_EMAIL_BODY_ET
  );
  const defaultEnNorm = normalizeApplicantEmailBody(
    DEFAULT_APPLICANT_EMAIL_BODY_EN
  );

  const applicantEmailBodyEt =
    !trimmedEt
      ? null
      : trimmedEt === defaultEtNorm
        ? null
        : trimmedEt;
  const applicantEmailBodyEn =
    !trimmedEn
      ? null
      : trimmedEn === defaultEnNorm
        ? null
        : trimmedEn;

  const db = getDb();
  await db
    .insert(siteSettings)
    .values({
      id: "default",
      defaultApplicationEmail: parsedEmail.data,
      applicantEmailBodyEt,
      applicantEmailBodyEn,
    })
    .onConflictDoUpdate({
      target: siteSettings.id,
      set: {
        defaultApplicationEmail: parsedEmail.data,
        applicantEmailBodyEt,
        applicantEmailBodyEn,
        updatedAt: new Date(),
      },
    });
  revalidatePath("/admin");
  revalidatePath("/");
  return { ok: true };
}
