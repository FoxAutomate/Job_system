import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { ApplySection } from "@/components/ApplySection";
import { JobContentSections } from "@/components/jobs/JobContentSections";
import { JobHero } from "@/components/jobs/JobHero";
import { JobPageFooter } from "@/components/jobs/JobPageFooter";
import { resolveJobForLocale } from "@/lib/jobs/resolve-job-locale";
import type { Locale } from "@/lib/i18n/messages";
import { getJobBySlug, getSiteSettings } from "@/lib/queries";
import {
  absoluteOgImageUrl,
  resolveSiteBranding,
} from "@/lib/site-branding";
import { getMetadataBase } from "@/lib/site-url";
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
  const pageTitle = `${resolved.title} | Cannery Careers`;
  const settings = await getSiteSettings();
  const b = resolveSiteBranding(settings);
  const jobOgImage = absoluteOgImageUrl(b.jobOgSrc, getMetadataBase());
  return {
    title: pageTitle,
    description: resolved.shortDescription,
    alternates: { canonical: `/jobs/${slug}` },
    openGraph: {
      title: pageTitle,
      description: resolved.shortDescription,
      url: `/jobs/${slug}`,
      siteName: "Cannery Careers",
      locale: loc === "en" ? "en_GB" : "et_EE",
      type: "website",
      images: [
        {
          url: jobOgImage,
          width: 1200,
          height: 630,
          alt: "Cannery Careers",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: resolved.shortDescription,
      images: [jobOgImage],
    },
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

  const settings = await getSiteSettings();
  const branding = resolveSiteBranding(settings);

  return (
    <div className="min-h-dvh bg-neutral-50">
      <JobHero
        job={job}
        applyHref="#apply-job"
        logoSrc={branding.logoSrc}
        heroBgSrc={branding.jobHeroBgSrc}
        illustrationSrc={branding.jobIllustrationSrc}
      />
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
