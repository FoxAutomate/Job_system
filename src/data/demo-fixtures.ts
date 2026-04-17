import type { Job } from "@/db/schema";
import { SEED_JOBS } from "@/data/seed-job";

const DEMO_JOB_IDS = [
  "b0000000-0000-4000-8000-000000000001",
  "b0000000-0000-4000-8000-000000000002",
  "b0000000-0000-4000-8000-000000000003",
  "b0000000-0000-4000-8000-000000000004",
] as const;

const base = new Date("2026-01-15T10:00:00.000Z").getTime();
const dayMs = 86400000;

/** Tryb demo: stałe ID (zgłoszenia / admin) i te same treści co seed wielu ofert. */
export const DEMO_JOBS: Job[] = SEED_JOBS.map((seed, i) => {
  const t = new Date(base + i * dayMs);
  return {
    id: DEMO_JOB_IDS[i],
    slug: seed.slug,
    title: seed.title,
    shortDescription: seed.shortDescription,
    active: seed.active,
    showSalary: seed.showSalary,
    salaryRange: seed.salaryRange ?? null,
    emailTo: seed.emailTo,
    content: seed.content,
    createdAt: t,
    updatedAt: t,
  };
});

export function getDemoJobById(id: string): Job | null {
  return DEMO_JOBS.find((j) => j.id === id) ?? null;
}

export function getDemoJobBySlug(slug: string): Job | null {
  return DEMO_JOBS.find((j) => j.slug === slug) ?? null;
}
