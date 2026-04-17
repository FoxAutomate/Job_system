import { desc, eq } from "drizzle-orm";

import { DEMO_JOBS } from "@/data/demo-fixtures";
import { getDb } from "@/db";
import { applications, jobs, siteSettings, type Job } from "@/db/schema";
import { isDemoMode } from "@/lib/demo-mode";

const DEMO_SITE_SETTINGS_ROW = {
  id: "default",
  defaultApplicationEmail: "demo@cannery-careers.demo",
  applicantEmailBodyEt: null as string | null,
  applicantEmailBodyEn: null as string | null,
  siteLogoUrl: null as string | null,
  homeHeroBackgroundUrl: null as string | null,
  jobHeroBackgroundUrl: null as string | null,
  homeOpenGraphImageUrl: null as string | null,
  jobOpenGraphImageUrl: null as string | null,
  jobListingIllustrationUrl: null as string | null,
  updatedAt: new Date("2026-01-15T10:00:00.000Z"),
};

export async function getSiteSettings() {
  if (isDemoMode()) {
    return DEMO_SITE_SETTINGS_ROW;
  }
  const db = getDb();
  const rows = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.id, "default"))
    .limit(1);
  return rows[0] ?? null;
}

export async function getActiveJobs(): Promise<Job[]> {
  if (isDemoMode()) {
    return DEMO_JOBS.filter((j) => j.active);
  }
  const db = getDb();
  return db
    .select()
    .from(jobs)
    .where(eq(jobs.active, true))
    .orderBy(desc(jobs.updatedAt));
}

export async function getAllJobs(): Promise<Job[]> {
  if (isDemoMode()) {
    return [...DEMO_JOBS].sort((a, b) => {
      const tb = b.updatedAt?.getTime() ?? 0;
      const ta = a.updatedAt?.getTime() ?? 0;
      return tb - ta;
    });
  }
  const db = getDb();
  return db.select().from(jobs).orderBy(desc(jobs.updatedAt));
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  if (isDemoMode()) {
    return DEMO_JOBS.find((j) => j.slug === slug) ?? null;
  }
  const db = getDb();
  const rows = await db.select().from(jobs).where(eq(jobs.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getAllApplications() {
  if (isDemoMode()) {
    return [];
  }
  const db = getDb();
  return db
    .select()
    .from(applications)
    .orderBy(desc(applications.createdAt));
}
