import Link from "next/link";

import { ApplySection } from "@/components/ApplySection";
import { HomeHero } from "@/components/home/HomeHero";
import { JobList } from "@/components/home/JobList";
import { getActiveJobs, getSiteSettings } from "@/lib/queries";
import type { ApplyFormValues } from "@/lib/validation";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; name?: string; phone?: string }>;
}) {
  const sp = await searchParams;
  const prefill: Partial<ApplyFormValues> = {
    email: sp.email,
    fullName: sp.name,
    phone: sp.phone,
  };

  const jobs = await getActiveJobs();
  const settings = await getSiteSettings();
  const defaultMail = settings?.defaultApplicationEmail ?? "Birgit@cannery.eu";

  return (
    <div className="min-h-dvh bg-neutral-50">
      <HomeHero />

      <section
        id="jobs"
        className="scroll-mt-20 border-t border-neutral-200 bg-white px-4 py-10 sm:scroll-mt-24 sm:px-6 sm:py-14"
      >
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="font-heading text-2xl font-bold text-neutral-950 sm:text-3xl">
              Avatud ametikohad
            </h2>
            <p className="text-neutral-600">
              Vali konkreetne kuulutus või kasuta allpool üldist
              kandideerimisvormi.
            </p>
          </div>
          <JobList jobs={jobs} />
        </div>
      </section>

      <ApplySection
        variant="general"
        sectionId="apply-general"
        mailtoEmail={defaultMail}
        mailtoSubject="Cannery Careers — üldine kandideerimine"
        prefill={prefill}
      />

      <footer className="border-t border-neutral-200 bg-neutral-100 px-4 py-8 text-center text-sm text-neutral-600 sm:px-6">
        <p className="mt-2">
          Kontakt:{" "}
          <a
            className="font-medium text-neutral-900 underline underline-offset-2"
            href={`mailto:${defaultMail}`}
          >
            {defaultMail}
          </a>
        </p>
        <p className="mt-4 text-xs text-neutral-500">
          Cannery Careers · Cannery OÜ
        </p>
        <p className="mt-2">
          <Link
            href="/admin/login"
            className="text-xs text-neutral-400 hover:text-neutral-600"
          >
            Admin
          </Link>
        </p>
      </footer>
    </div>
  );
}
