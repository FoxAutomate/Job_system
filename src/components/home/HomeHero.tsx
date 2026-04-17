"use client";

import Image from "next/image";

import { BrandLogoLink } from "@/components/BrandLogoLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SmoothScrollAnchor } from "@/components/SmoothScrollAnchor";
import { buttonVariants } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-context";
import { cn } from "@/lib/utils";

type HomeHeroProps = {
  logoSrc: string;
  heroBgSrc: string;
};

export function HomeHero({ logoSrc, heroBgSrc }: HomeHeroProps) {
  const { t } = useLocale();
  const bgRemote = heroBgSrc.startsWith("http");
  return (
    <section className="relative isolate overflow-hidden bg-neutral-100">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={heroBgSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.22]"
          unoptimized={bgRemote}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/95 via-neutral-50/90 to-neutral-100" />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col gap-6 px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-600">
              {t.homeHeroEyebrow}
            </p>
            <h1 className="font-heading text-balance text-3xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              {t.homeHeroTitle}
            </h1>
            <p className="text-pretty text-base text-neutral-800 sm:text-lg">
              {t.homeHeroBody}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-2.5">
            <LanguageSwitcher />
            <BrandLogoLink
              logoSrc={logoSrc}
              ariaLabel="Canning Brothers"
              priority
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <SmoothScrollAnchor
            href="#jobs"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "min-h-12 justify-center rounded-lg"
            )}
          >
            {t.homeHeroCtaJobs}
          </SmoothScrollAnchor>
          <SmoothScrollAnchor
            href="#apply-general"
            className={cn(
              buttonVariants({ size: "lg" }),
              "min-h-12 justify-center rounded-lg border border-amber-500/30 bg-[var(--cannery-amber)] px-6 text-base font-semibold text-neutral-950 shadow-sm hover:bg-[var(--cannery-amber)]/90"
            )}
          >
            {t.homeHeroCtaGeneral}
          </SmoothScrollAnchor>
        </div>
      </div>
    </section>
  );
}
