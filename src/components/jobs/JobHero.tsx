import Image from "next/image";
import Link from "next/link";

import { SmoothScrollAnchor } from "@/components/SmoothScrollAnchor";
import { buttonVariants } from "@/components/ui/button";
import type { Job } from "@/db/schema";
import { cn } from "@/lib/utils";

type JobHeroProps = {
  job: Job;
  applyHref?: string;
};

export function JobHero({ job, applyHref = "#apply-job" }: JobHeroProps) {
  const { content } = job;
  const showSalary = job.showSalary && job.salaryRange;

  return (
    <section className="relative isolate overflow-hidden bg-neutral-100">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/cannery/full_machine_cannery_line.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/95 via-neutral-50/90 to-neutral-100" />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col gap-6 px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-600">
              {content.tagline}
            </p>
          </div>
          <Link
            href="/"
            className="relative h-10 w-36 shrink-0 sm:h-12 sm:w-44"
            aria-label="Cannery Careers avaleht"
          >
            <Image
              src="/cannery/Cannery_logo_horizontal.png"
              alt="Cannery"
              fill
              className="object-contain object-right"
              sizes="(max-width: 640px) 144px, 176px"
            />
          </Link>
        </div>

        <div className="space-y-4">
          <h1 className="font-heading text-balance text-3xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
            {job.title}
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
              Kandideeri kohe
            </SmoothScrollAnchor>
          ) : (
            <Link
              href={applyHref}
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-h-12 min-w-[11rem] justify-center rounded-lg border border-amber-500/30 bg-[var(--cannery-amber)] px-6 text-base font-semibold text-neutral-950 shadow-sm hover:bg-[var(--cannery-amber)]/90"
              )}
            >
              Kandideeri kohe
            </Link>
          )}
          {showSalary ? (
            <p className="text-sm text-neutral-700">
              Brutopalk:{" "}
              <span className="font-semibold text-neutral-900">
                {job.salaryRange}
              </span>
            </p>
          ) : (
            <p className="text-sm text-neutral-500">Palk: kokkuleppel</p>
          )}
        </div>

        <div className="relative mx-auto mt-2 w-full max-w-xs sm:max-w-sm">
          <Image
            src="/cannery/Canner-1.webp"
            alt="Cannery purk"
            width={400}
            height={400}
            loading="lazy"
            className="h-auto w-full object-contain drop-shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
