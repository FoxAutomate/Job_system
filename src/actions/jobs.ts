"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getDb } from "@/db";
import { jobs, type JobContent, type JobOfferLocaleBlock } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-guard";
import { DEMO_ADMIN_READ_ONLY_MSG, isDemoMode } from "@/lib/demo-mode";

function linesToArray(s: string) {
  return s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

const jobFormSchema = z
  .object({
    id: z.string().uuid().optional(),
    slug: z
      .string()
      .min(2)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug: väiketähed, numbrid ja sidekriipsud (nt villimismasinate-koostaja-tehnik)."
      ),
    title: z.string().min(2),
    shortDescription: z.string().min(10),
    active: z.boolean(),
    showSalary: z.boolean(),
    salaryRange: z.string().optional(),
    emailTo: z.string().email(),
    tagline: z.string().min(1),
    heroIntro: z.string().min(10),
    location: z.string().min(1),
    deadlineDisplay: z.string().min(1),
    responsibilities: z.string(),
    requirements: z.string(),
    niceToHave: z.string(),
    weOffer: z.string(),
    salaryCardLine: z.string().optional(),
    footerEmail: z.string().optional(),
    secondLanguageEnabled: z.boolean(),
    enTitle: z.string().optional(),
    enShortDescription: z.string().optional(),
    enTagline: z.string().optional(),
    enHeroIntro: z.string().optional(),
    enLocation: z.string().optional(),
    enDeadlineDisplay: z.string().optional(),
    enDeadlineIso: z.string().optional(),
    enResponsibilities: z.string().optional(),
    enRequirements: z.string().optional(),
    enNiceToHave: z.string().optional(),
    enWeOffer: z.string().optional(),
    enSalaryCardLine: z.string().optional(),
    enFooterEmail: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.secondLanguageEnabled) return;

    const need = (
      cond: boolean,
      path: string,
      message: string
    ) => {
      if (!cond) ctx.addIssue({ code: "custom", message, path: [path] });
    };

    need(Boolean(data.enTitle && data.enTitle.trim().length >= 2), "enTitle", "EN title: at least 2 characters.");
    need(
      Boolean(data.enShortDescription && data.enShortDescription.trim().length >= 10),
      "enShortDescription",
      "EN short description: at least 10 characters."
    );
    need(Boolean(data.enTagline?.trim()), "enTagline", "EN tagline required.");
    need(
      Boolean(data.enHeroIntro && data.enHeroIntro.trim().length >= 10),
      "enHeroIntro",
      "EN introduction: at least 10 characters."
    );
    need(Boolean(data.enLocation?.trim()), "enLocation", "EN location required.");
    need(
      Boolean(data.enDeadlineDisplay?.trim()),
      "enDeadlineDisplay",
      "EN deadline text required."
    );
    need(
      linesToArray(data.enResponsibilities ?? "").length > 0,
      "enResponsibilities",
      "EN responsibilities: at least one line."
    );
    need(
      linesToArray(data.enRequirements ?? "").length > 0,
      "enRequirements",
      "EN requirements: at least one line."
    );
    need(
      linesToArray(data.enNiceToHave ?? "").length > 0,
      "enNiceToHave",
      'EN "nice to have": at least one line.'
    );
    need(
      linesToArray(data.enWeOffer ?? "").length > 0,
      "enWeOffer",
      "EN what we offer: at least one line."
    );

    const footer = data.enFooterEmail?.trim();
    if (footer && footer.length > 0 && !footer.includes("@")) {
      ctx.addIssue({
        code: "custom",
        message: "EN footer email: invalid.",
        path: ["enFooterEmail"],
      });
    }
  });

function buildEnBlock(
  parsed: z.infer<typeof jobFormSchema>
): JobOfferLocaleBlock | undefined {
  if (!parsed.secondLanguageEnabled) return undefined;
  const footer = parsed.enFooterEmail?.trim();
  return {
    title: parsed.enTitle!.trim(),
    shortDescription: parsed.enShortDescription!.trim(),
    tagline: parsed.enTagline!.trim(),
    heroIntro: parsed.enHeroIntro!.trim(),
    location: parsed.enLocation!.trim(),
    deadlineDisplay: parsed.enDeadlineDisplay!.trim(),
    deadlineIso: parsed.enDeadlineIso?.trim() || undefined,
    responsibilities: linesToArray(parsed.enResponsibilities!),
    requirements: linesToArray(parsed.enRequirements!),
    niceToHave: linesToArray(parsed.enNiceToHave!),
    weOffer: linesToArray(parsed.enWeOffer!),
    salaryCardLine: parsed.enSalaryCardLine?.trim() || undefined,
    footerEmail: footer && footer.includes("@") ? footer : undefined,
  };
}

function buildContent(parsed: z.infer<typeof jobFormSchema>): JobContent {
  const footer = parsed.footerEmail?.trim();
  const baseFields: JobContent = {
    tagline: parsed.tagline,
    heroIntro: parsed.heroIntro,
    location: parsed.location,
    deadlineDisplay: parsed.deadlineDisplay,
    responsibilities: linesToArray(parsed.responsibilities),
    requirements: linesToArray(parsed.requirements),
    niceToHave: linesToArray(parsed.niceToHave),
    weOffer: linesToArray(parsed.weOffer),
    salaryCardLine: parsed.salaryCardLine || undefined,
    footerEmail: footer && footer.includes("@") ? footer : undefined,
  };

  if (!parsed.secondLanguageEnabled) {
    return { ...baseFields, secondLanguageEnabled: false };
  }

  return {
    ...baseFields,
    secondLanguageEnabled: true,
    en: buildEnBlock(parsed)!,
  };
}

export async function upsertJob(
  _prev: { ok: boolean; message?: string } | null,
  formData: FormData
): Promise<{ ok: boolean; message?: string }> {
  await requireAdmin();
  if (isDemoMode()) {
    return { ok: false, message: DEMO_ADMIN_READ_ONLY_MSG };
  }
  const db = getDb();

  const idRaw = formData.get("id");
  const raw = {
    id:
      typeof idRaw === "string" && idRaw.length > 0 ? idRaw : undefined,
    slug: formData.get("slug"),
    title: formData.get("title"),
    shortDescription: formData.get("shortDescription"),
    active: formData.get("active") === "on" || formData.get("active") === "true",
    showSalary:
      formData.get("showSalary") === "on" || formData.get("showSalary") === "true",
    salaryRange: formData.get("salaryRange") || "",
    emailTo: formData.get("emailTo"),
    tagline: formData.get("tagline"),
    heroIntro: formData.get("heroIntro"),
    location: formData.get("location"),
    deadlineDisplay: formData.get("deadlineDisplay"),
    responsibilities: formData.get("responsibilities"),
    requirements: formData.get("requirements"),
    niceToHave: formData.get("niceToHave"),
    weOffer: formData.get("weOffer"),
    salaryCardLine: formData.get("salaryCardLine") || "",
    footerEmail: formData.get("footerEmail") || "",
    secondLanguageEnabled:
      formData.get("secondLanguageEnabled") === "true",
    enTitle: formData.get("enTitle"),
    enShortDescription: formData.get("enShortDescription"),
    enTagline: formData.get("enTagline"),
    enHeroIntro: formData.get("enHeroIntro"),
    enLocation: formData.get("enLocation"),
    enDeadlineDisplay: formData.get("enDeadlineDisplay"),
    enDeadlineIso: formData.get("enDeadlineIso"),
    enResponsibilities: formData.get("enResponsibilities"),
    enRequirements: formData.get("enRequirements"),
    enNiceToHave: formData.get("enNiceToHave"),
    enWeOffer: formData.get("enWeOffer"),
    enSalaryCardLine: formData.get("enSalaryCardLine"),
    enFooterEmail: formData.get("enFooterEmail"),
  };

  const parsed = jobFormSchema.safeParse({
    id: raw.id,
    slug: String(raw.slug ?? ""),
    title: String(raw.title ?? ""),
    shortDescription: String(raw.shortDescription ?? ""),
    active: raw.active,
    showSalary: raw.showSalary,
    salaryRange: String(raw.salaryRange ?? "") || undefined,
    emailTo: String(raw.emailTo ?? ""),
    tagline: String(raw.tagline ?? ""),
    heroIntro: String(raw.heroIntro ?? ""),
    location: String(raw.location ?? ""),
    deadlineDisplay: String(raw.deadlineDisplay ?? ""),
    responsibilities: String(raw.responsibilities ?? ""),
    requirements: String(raw.requirements ?? ""),
    niceToHave: String(raw.niceToHave ?? ""),
    weOffer: String(raw.weOffer ?? ""),
    salaryCardLine: String(raw.salaryCardLine ?? "") || undefined,
    footerEmail: String(raw.footerEmail ?? ""),
    secondLanguageEnabled: raw.secondLanguageEnabled,
    enTitle: String(raw.enTitle ?? ""),
    enShortDescription: String(raw.enShortDescription ?? ""),
    enTagline: String(raw.enTagline ?? ""),
    enHeroIntro: String(raw.enHeroIntro ?? ""),
    enLocation: String(raw.enLocation ?? ""),
    enDeadlineDisplay: String(raw.enDeadlineDisplay ?? ""),
    enDeadlineIso: String(raw.enDeadlineIso ?? "") || undefined,
    enResponsibilities: String(raw.enResponsibilities ?? ""),
    enRequirements: String(raw.enRequirements ?? ""),
    enNiceToHave: String(raw.enNiceToHave ?? ""),
    enWeOffer: String(raw.enWeOffer ?? ""),
    enSalaryCardLine: String(raw.enSalaryCardLine ?? "") || undefined,
    enFooterEmail: String(raw.enFooterEmail ?? ""),
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return {
      ok: false,
      message: first ?? "Viga vormis",
    };
  }

  const content = buildContent(parsed.data);

  if (parsed.data.id) {
    await db
      .update(jobs)
      .set({
        slug: parsed.data.slug,
        title: parsed.data.title,
        shortDescription: parsed.data.shortDescription,
        active: parsed.data.active,
        showSalary: parsed.data.showSalary,
        salaryRange: parsed.data.salaryRange || null,
        emailTo: parsed.data.emailTo,
        content,
        updatedAt: new Date(),
      })
      .where(eq(jobs.id, parsed.data.id));
  } else {
    await db.insert(jobs).values({
      slug: parsed.data.slug,
      title: parsed.data.title,
      shortDescription: parsed.data.shortDescription,
      active: parsed.data.active,
      showSalary: parsed.data.showSalary,
      salaryRange: parsed.data.salaryRange || null,
      emailTo: parsed.data.emailTo,
      content,
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/offers");
  revalidatePath(`/jobs/${parsed.data.slug}`);
  return { ok: true };
}

export async function setJobActive(jobId: string, active: boolean) {
  await requireAdmin();
  if (isDemoMode()) return;
  const db = getDb();
  await db.update(jobs).set({ active, updatedAt: new Date() }).where(eq(jobs.id, jobId));
  revalidatePath("/");
  revalidatePath("/admin/offers");
}

export async function setJobShowSalary(jobId: string, showSalary: boolean) {
  await requireAdmin();
  if (isDemoMode()) return;
  const db = getDb();
  await db
    .update(jobs)
    .set({ showSalary, updatedAt: new Date() })
    .where(eq(jobs.id, jobId));
  revalidatePath("/");
  revalidatePath("/admin/offers");
}

export async function deleteJob(jobId: string) {
  await requireAdmin();
  if (isDemoMode()) return;
  const db = getDb();
  await db.delete(jobs).where(eq(jobs.id, jobId));
  revalidatePath("/");
  revalidatePath("/admin/offers");
}
