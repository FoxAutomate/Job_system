"use client";

import { DEPLOYMENT_COMMIT_REF } from "@/lib/deployment-ref";
import { useLocale } from "@/lib/i18n/locale-context";
import { cn } from "@/lib/utils";

export function SiteFooterCredits({ className }: { className?: string }) {
  const { t } = useLocale();

  return (
    <div
      className={cn(
        "px-4 py-3 text-center text-xs text-neutral-500 sm:px-6",
        className
      )}
    >
      <p>
        {t.footerMadeByPrefix}{" "}
        <a
          href="https://www.foxautomate.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-neutral-600 underline underline-offset-2 hover:text-neutral-900"
        >
          www.foxautomate.com
        </a>
        <span className="text-neutral-400"> · </span>
        <span
          className="tabular-nums font-medium text-neutral-600"
          title={t.footerCommitRefTitle}
        >
          {DEPLOYMENT_COMMIT_REF}
        </span>
      </p>
    </div>
  );
}
