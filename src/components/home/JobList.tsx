"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Calendar, MapPin } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/lib/i18n/locale-context";
import { resolveJobForLocale } from "@/lib/jobs/resolve-job-locale";
import { cn } from "@/lib/utils";
import type { Job } from "@/db/schema";

type Props = {
  jobs: Job[];
};

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function JobList({ jobs }: Props) {
  const { locale, t } = useLocale();

  if (jobs.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50/80 px-4 py-10 text-center text-neutral-600">
        {t.jobListEmpty}
      </p>
    );
  }

  return (
    <motion.ul
      variants={listVariants}
      initial="hidden"
      animate="show"
      className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 md:gap-5"
    >
      {jobs.map((job) => {
        const salaryVisible = Boolean(job.showSalary && job.salaryRange);
        const { title, shortDescription, content } = resolveJobForLocale(
          job,
          locale
        );
        return (
          <motion.li key={job.id} variants={cardVariants} className="h-full">
            <Link
              href={`/jobs/${job.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400/40 hover:shadow-md"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-[var(--cannery-amber)] via-amber-400 to-amber-200" />
              <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="border border-emerald-200/80 bg-emerald-50 text-emerald-900"
                    >
                      {t.jobListBadgeOpen}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={cn(
                        "border text-xs font-normal",
                        salaryVisible
                          ? "border-amber-300/80 bg-[var(--cannery-amber)]/15 text-neutral-900"
                          : "border-neutral-200 bg-neutral-50 text-neutral-600"
                      )}
                    >
                      {salaryVisible
                        ? t.jobListSalaryPublished
                        : t.jobListSalaryHidden}
                    </Badge>
                  </div>
                  {salaryVisible ? (
                    <span className="rounded-lg bg-[var(--cannery-amber)]/25 px-2.5 py-1 text-sm font-semibold tabular-nums text-neutral-900">
                      {job.salaryRange}
                    </span>
                  ) : null}
                </div>

                <div>
                  <h3 className="font-heading text-lg font-bold leading-snug text-neutral-950 group-hover:text-neutral-800 sm:text-xl">
                    {title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
                    {shortDescription}
                  </p>
                </div>

                <div className="mt-auto space-y-1.5 border-t border-neutral-100 pt-3 text-sm text-neutral-500">
                  <p className="flex items-start gap-2">
                    <MapPin
                      className="mt-0.5 size-4 shrink-0 text-neutral-400"
                      aria-hidden
                    />
                    <span className="leading-snug">{content.location}</span>
                  </p>
                  {content.deadlineDisplay ? (
                    <p className="flex items-center gap-2">
                      <Calendar
                        className="size-4 shrink-0 text-neutral-400"
                        aria-hidden
                      />
                      <span>
                        {t.jobListDeadline} {content.deadlineDisplay}
                      </span>
                    </p>
                  ) : null}
                </div>

                <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-950/90">
                  <Briefcase className="size-4" aria-hidden />
                  {t.jobListCta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
