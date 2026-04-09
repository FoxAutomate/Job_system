"use client";

import Link from "next/link";

import { useLocale } from "@/lib/i18n/locale-context";

type JobPageFooterProps = {
  deadlineDisplay: string;
  deadlineIso?: string;
  mail: string;
};

export function JobPageFooter({
  deadlineDisplay,
  deadlineIso,
  mail,
}: JobPageFooterProps) {
  const { t } = useLocale();

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
    </footer>
  );
}
