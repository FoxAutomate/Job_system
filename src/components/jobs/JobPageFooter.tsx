"use client";

import Link from "next/link";
import { useMemo } from "react";

import { SiteFooterCredits } from "@/components/SiteFooterCredits";
import type { Job } from "@/db/schema";
import { useLocale } from "@/lib/i18n/locale-context";
import { resolveJobForLocale } from "@/lib/jobs/resolve-job-locale";

type JobPageFooterProps = {
  job: Job;
};

export function JobPageFooter({ job }: JobPageFooterProps) {
  const { locale, t } = useLocale();
  const { content } = useMemo(
    () => resolveJobForLocale(job, locale),
    [job, locale]
  );
  const mail = content.footerEmail ?? job.emailTo;
  const deadlineDisplay = content.deadlineDisplay;
  const deadlineIso = content.deadlineIso;

  return (
    <footer className="border-t border-neutral-200 bg-neutral-100 px-4 py-8 text-center text-sm text-neutral-600 sm:px-6">
      <p className="font-medium text-neutral-800">
        {t.jobFooterDeadline}{" "}
        <time dateTime={deadlineIso ?? undefined}>{deadlineDisplay}</time>
      </p>
      <p className="mt-2">
        {t.jobFooterCvLine}{" "}
        <a
          className="font-medium text-neutral-900 underline underline-offset-2"
          href={`mailto:${mail}`}
        >
          {mail}
        </a>
      </p>
      <p className="mt-6">
        <Link href="/" className="font-medium text-neutral-800 hover:underline">
          {t.jobFooterBackHome}
        </Link>
      </p>
      <p className="mt-4 text-xs text-neutral-500">{t.jobFooterCompany}</p>
      <SiteFooterCredits className="mt-6 border-t border-neutral-200/80 bg-transparent pt-4" />
    </footer>
  );
}
