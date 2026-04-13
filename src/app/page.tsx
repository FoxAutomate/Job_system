import { ApplySection } from "@/components/ApplySection";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeJobsSection } from "@/components/home/HomeJobsSection";
import { HomePageFooter } from "@/components/home/HomePageFooter";
import { JobList } from "@/components/home/JobList";
import { getActiveJobs, getSiteSettings } from "@/lib/queries";
import { DEFAULT_CANNERY_CAREERS_EMAIL } from "@/lib/site-email-defaults";
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
  const defaultMail =
    settings?.defaultApplicationEmail ?? DEFAULT_CANNERY_CAREERS_EMAIL;

  return (
    <div className="min-h-dvh bg-neutral-50">
      <HomeHero />

      <HomeJobsSection>
        <JobList jobs={jobs} />
      </HomeJobsSection>

      <ApplySection
        variant="general"
        sectionId="apply-general"
        mailtoEmail={defaultMail}
        mailtoSubject="Cannery Careers — üldine kandideerimine"
        prefill={prefill}
      />

      <HomePageFooter defaultMail={defaultMail} />
    </div>
  );
}
