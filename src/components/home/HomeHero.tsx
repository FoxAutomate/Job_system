import Image from "next/image";
import Link from "next/link";

import { SmoothScrollAnchor } from "@/components/SmoothScrollAnchor";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-neutral-100">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/cannery/full_machine_cannery_line.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.22]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/95 via-neutral-50/90 to-neutral-100" />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col gap-6 px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-600">
              Cannery Careers
            </p>
            <h1 className="font-heading text-balance text-3xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
              Tule tööle joogitööstuse masinaehituse juurde
            </h1>
            <p className="text-pretty text-base text-neutral-800 sm:text-lg">
              Cannery OÜ ehitab ja seadistab villimisliine. Siit leiad avatud
              ametikohad — kandideeri kiiresti, ka telefonist.
            </p>
          </div>
          <Link
            href="/"
            className="relative h-10 w-36 shrink-0 sm:h-12 sm:w-44"
            aria-label="Cannery"
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

        <div className="flex flex-wrap gap-3">
          <SmoothScrollAnchor
            href="#jobs"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "min-h-12 justify-center rounded-lg"
            )}
          >
            Vaata tööpakkumisi
          </SmoothScrollAnchor>
          <SmoothScrollAnchor
            href="#apply-general"
            className={cn(
              buttonVariants({ size: "lg" }),
              "min-h-12 justify-center rounded-lg border border-amber-500/30 bg-[var(--cannery-amber)] px-6 text-base font-semibold text-neutral-950 shadow-sm hover:bg-[var(--cannery-amber)]/90"
            )}
          >
            Üldine kandideerimine
          </SmoothScrollAnchor>
        </div>
      </div>
    </section>
  );
}
