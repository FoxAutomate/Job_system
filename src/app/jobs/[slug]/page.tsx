import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { ApplySection } from "@/components/ApplySection";
import { JobContentSections } from "@/components/jobs/JobContentSections";
import { JobHero } from "@/components/jobs/JobHero";
import { JobPageFooter } from "@/components/jobs/JobPageFooter";
import { resolveJobForLocale } from "@/lib/jobs/resolve-job-locale";
import type { Locale } from "@/lib/i18n/messages";
import { getJobBySlug } from "@/lib/queries";
import type { ApplyFormValues } from "@/lib/validation";

function localeFromCookie(val: string | undefined): Locale {
  return val === "en" ? "en" : "et";
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job || !job.active) {
    return { title: "Kuulutus | Cannery Careers" };
  }
  const cookieStore = await cookies();
  const loc = localeFromCookie(cookieStore.get("cannery_locale")?.value);
  const resolved = resolveJobForLocale(job, loc);
  return {
    title: `${resolved.title} | Cannery Careers`,
    description: resolved.shortDescription,
  };
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ email?: string; name?: string; phone?: string }>;
};

export default async function JobDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;

  const job = await getJobBySlug(slug);
  if (!job || !job.active) notFound();

  const prefill: Partial<ApplyFormValues> = {
    email: sp.email,
    fullName: sp.name,
    phone: sp.phone,
  };

  return (
    <div className="min-h-dvh bg-neutral-50">
      <JobHero job={job} applyHref="#apply-job" />
      <JobContentSections job={job} />
      <ApplySection
        variant="job"
        jobId={job.id}
        job={job}
        sectionId="apply-job"
        prefill={prefill}
      />
      <JobPageFooter job={job} />
    </div>
  );
}
