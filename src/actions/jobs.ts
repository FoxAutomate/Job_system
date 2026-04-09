"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getDb } from "@/db";
import { jobs, type JobContent } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-guard";

const jobFormSchema = z.object({
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
});

function linesToArray(s: string) {
  return s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function buildContent(parsed: z.infer<typeof jobFormSchema>): JobContent {
  const footer = parsed.footerEmail?.trim();
  return {
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
}

export async function upsertJob(
  _prev: { ok: boolean; message?: string } | null,
  formData: FormData
): Promise<{ ok: boolean; message?: string }> {
  await requireAdmin();
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
  const db = getDb();
  await db.update(jobs).set({ active, updatedAt: new Date() }).where(eq(jobs.id, jobId));
  revalidatePath("/");
  revalidatePath("/admin/offers");
}

export async function setJobShowSalary(jobId: string, showSalary: boolean) {
  await requireAdmin();
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
  const db = getDb();
  await db.delete(jobs).where(eq(jobs.id, jobId));
  revalidatePath("/");
  revalidatePath("/admin/offers");
}
