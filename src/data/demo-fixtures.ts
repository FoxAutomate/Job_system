import type { Job } from "@/db/schema";
import { seedJob } from "@/data/seed-job";

const DEMO_JOB_ID = "b0000000-0000-4000-8000-000000000001";
const fixedDate = new Date("2026-01-15T10:00:00.000Z");

/** Jedna aktywna oferta — te same treści co seed, stałe ID dla zgłoszeń demo. */
export const DEMO_JOBS: Job[] = [
  {
    id: DEMO_JOB_ID,
    slug: seedJob.slug,
    title: seedJob.title,
    shortDescription: seedJob.shortDescription,
    active: seedJob.active,
    showSalary: seedJob.showSalary,
    salaryRange: seedJob.salaryRange ?? null,
    emailTo: seedJob.emailTo,
    content: seedJob.content,
    createdAt: fixedDate,
    updatedAt: fixedDate,
  },
];

export function getDemoJobById(id: string): Job | null {
  return DEMO_JOBS.find((j) => j.id === id) ?? null;
}

export function getDemoJobBySlug(slug: string): Job | null {
  return DEMO_JOBS.find((j) => j.slug === slug) ?? null;
}
