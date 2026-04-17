import type { Metadata } from "next";

import { ApplySection } from "@/components/ApplySection";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeJobsSection } from "@/components/home/HomeJobsSection";
import { HomePageFooter } from "@/components/home/HomePageFooter";
import { JobList } from "@/components/home/JobList";
import { getActiveJobs, getSiteSettings } from "@/lib/queries";
import {
  absoluteOgImageUrl,
  resolveSiteBranding,
} from "@/lib/site-branding";
import { DEFAULT_PUBLIC_CONTACT_EMAIL } from "@/lib/site-email-defaults";
import { getMetadataBase } from "@/lib/site-url";
import type { ApplyFormValues } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const b = resolveSiteBranding(settings);
  const ogUrl = absoluteOgImageUrl(b.homeOgSrc, getMetadataBase());
  return {
    openGraph: {
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: "Canning Brothers Careers",
        },
      ],
    },
    twitter: { images: [ogUrl] },
  };
}

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
  const branding = resolveSiteBranding(settings);
  const defaultMail =
    settings?.defaultApplicationEmail ?? DEFAULT_PUBLIC_CONTACT_EMAIL;

  return (
    <div className="min-h-dvh bg-neutral-50">
      <HomeHero
        logoSrc={branding.logoSrc}
        logoSrcMobile={branding.logoSrcMobile}
        heroBgSrc={branding.homeHeroBgSrc}
      />

      <HomeJobsSection>
        <JobList jobs={jobs} />
      </HomeJobsSection>

      <ApplySection
        variant="general"
        sectionId="apply-general"
        mailtoEmail={defaultMail}
        mailtoSubject="Canning Brothers Careers — üldine kandideerimine"
        prefill={prefill}
      />

      <HomePageFooter defaultMail={defaultMail} />
    </div>
  );
}
