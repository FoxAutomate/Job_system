"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

import { BrandLogoLink } from "@/components/BrandLogoLink";
import { JobBackNav } from "@/components/jobs/JobBackNav";
import { SmoothScrollAnchor } from "@/components/SmoothScrollAnchor";
import { buttonVariants } from "@/components/ui/button";
import type { Job } from "@/db/schema";
import { useLocale } from "@/lib/i18n/locale-context";
import { resolveJobForLocale } from "@/lib/jobs/resolve-job-locale";
import { cn } from "@/lib/utils";

type JobHeroProps = {
  job: Job;
  applyHref?: string;
  logoSrc: string;
  heroBgSrc: string;
  illustrationSrc: string;
};

export function JobHero({
  job,
  applyHref = "#apply-job",
  logoSrc,
  heroBgSrc,
  illustrationSrc,
}: JobHeroProps) {
  const showSalary = job.showSalary && job.salaryRange;
  const { locale, t } = useLocale();
  const { title, content } = useMemo(
    () => resolveJobForLocale(job, locale),
    [job, locale]
  );
  const bgRemote = heroBgSrc.startsWith("http");
  const illRemote = illustrationSrc.startsWith("http");

  return (
    <section className="relative isolate overflow-hidden bg-neutral-100">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={heroBgSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-55"
          unoptimized={bgRemote}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/70 via-neutral-50/55 to-neutral-100/85" />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col gap-6 px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8">
        <JobBackNav />

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-600">
              {content.tagline}
            </p>
          </div>
          <BrandLogoLink
            logoSrc={logoSrc}
            ariaLabel="Canning Brothers Careers"
          />
        </div>

        <div className="space-y-4">
          <h1 className="font-heading text-balance text-3xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
            {title}
          </h1>
          <p className="text-pretty text-base leading-relaxed text-neutral-800 sm:text-lg">
            {content.heroIntro}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {applyHref.startsWith("#") ? (
            <SmoothScrollAnchor
              href={applyHref}
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-h-12 min-w-[11rem] justify-center rounded-lg border border-amber-500/30 bg-[var(--cannery-amber)] px-6 text-base font-semibold text-neutral-950 shadow-sm hover:bg-[var(--cannery-amber)]/90"
              )}
            >
              {t.jobHeroApply}
            </SmoothScrollAnchor>
          ) : (
            <Link
              href={applyHref}
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-h-12 min-w-[11rem] justify-center rounded-lg border border-amber-500/30 bg-[var(--cannery-amber)] px-6 text-base font-semibold text-neutral-950 shadow-sm hover:bg-[var(--cannery-amber)]/90"
              )}
            >
              {t.jobHeroApply}
            </Link>
          )}
          {showSalary ? (
            <p className="text-sm text-neutral-700">
              {t.jobHeroSalaryPrefix}{" "}
              <span className="font-semibold text-neutral-900">
                {job.salaryRange}
              </span>
            </p>
          ) : (
            <p className="text-sm text-neutral-500">{t.jobHeroSalaryNegotiable}</p>
          )}
        </div>

        <div className="relative mx-auto mt-2 w-full max-w-xs sm:max-w-sm">
          <Image
            src={illustrationSrc}
            alt="Tootepurk"
            width={400}
            height={400}
            loading="lazy"
            className="h-auto w-full object-contain drop-shadow-md"
            unoptimized={illRemote}
          />
        </div>
      </div>
    </section>
  );
}
