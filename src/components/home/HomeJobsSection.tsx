"use client";

import { useLocale } from "@/lib/i18n/locale-context";

export function HomeJobsSection({ children }: { children: React.ReactNode }) {
  const { t } = useLocale();

  return (
    <section
      id="jobs"
      className="scroll-mt-20 border-t border-neutral-200 bg-white px-4 py-10 sm:scroll-mt-24 sm:px-6 sm:py-14"
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="font-heading text-2xl font-bold text-neutral-950 sm:text-3xl">
            {t.homeJobsHeading}
          </h2>
          <p className="text-neutral-600">{t.homeJobsSub}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
