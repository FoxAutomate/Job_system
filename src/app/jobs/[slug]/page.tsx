import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ApplySection } from "@/components/ApplySection";
import { JobContentSections } from "@/components/jobs/JobContentSections";
import { JobHero } from "@/components/jobs/JobHero";
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
      <footer className="border-t border-neutral-200 bg-neutral-100 px-4 py-8 text-center text-sm text-neutral-600 sm:px-6">
        <p className="font-medium text-neutral-800">
          Kandideerimise tähtaeg:{" "}
          <time dateTime={job.content.deadlineIso ?? undefined}>
            {job.content.deadlineDisplay}
          </time>
        </p>
        <p className="mt-2">
          CV ja tööleasumine:{" "}
          <a
            className="font-medium text-neutral-900 underline underline-offset-2"
            href={`mailto:${mail}`}
          >
            {mail}
          </a>
        </p>
        <p className="mt-6">
          <Link href="/" className="font-medium text-neutral-800 hover:underline">
            ← Tagasi avalehele
          </Link>
        </p>
        <p className="mt-4 text-xs text-neutral-500">Cannery Careers · Cannery OÜ</p>
      </footer>
    </div>
  );
}
