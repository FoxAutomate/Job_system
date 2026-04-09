import { desc, eq } from "drizzle-orm";

import { getDb } from "@/db";
import { applications, jobs, siteSettings, type Job } from "@/db/schema";

export async function getSiteSettings() {
  const db = getDb();
  const rows = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.id, "default"))
    .limit(1);
  return rows[0] ?? null;
}

export async function getActiveJobs(): Promise<Job[]> {
  const db = getDb();
  return db
    .select()
    .from(jobs)
    .where(eq(jobs.active, true))
    .orderBy(desc(jobs.updatedAt));
}

export async function getAllJobs(): Promise<Job[]> {
  const db = getDb();
  return db.select().from(jobs).orderBy(desc(jobs.updatedAt));
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  const db = getDb();
  const rows = await db.select().from(jobs).where(eq(jobs.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getAllApplications() {
  const db = getDb();
  return db
    .select()
    .from(applications)
    .orderBy(desc(applications.createdAt));
}
