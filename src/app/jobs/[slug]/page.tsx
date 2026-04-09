import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ApplySection } from "@/components/ApplySection";
import { JobContentSections } from "@/components/jobs/JobContentSections";
import { JobHero } from "@/components/jobs/JobHero";
import { JobPageFooter } from "@/components/jobs/JobPageFooter";
import { getJobBySlug } from "@/lib/queries";
import type { ApplyFormValues } from "@/lib/validation";

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
  return {
    title: `${job.title} | Cannery Careers`,
    description: job.shortDescription,
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

  const mail = job.content.footerEmail ?? job.emailTo;

  return (
    <div className="min-h-dvh bg-neutral-50">
      <JobHero job={job} applyHref="#apply-job" />
      <JobContentSections job={job} content={job.content} />
      <ApplySection
        variant="job"
        jobId={job.id}
        sectionId="apply-job"
        mailtoEmail={mail}
        mailtoSubject={`Cannery — ${job.title}`}
        prefill={prefill}
      />
      <JobPageFooter
        deadlineDisplay={job.content.deadlineDisplay}
        deadlineIso={job.content.deadlineIso}
        mail={mail}
      />
    </div>
  );
}
