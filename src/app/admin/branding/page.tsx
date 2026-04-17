import { BrandingSettingsForm } from "@/components/admin/BrandingSettingsForm";
import { getSiteSettings } from "@/lib/queries";
import { requireAdmin } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

export default async function AdminBrandingPage() {
  await requireAdmin();
  const settings = await getSiteSettings();

  const initial = {
    siteLogoUrl: settings?.siteLogoUrl ?? "",
    homeHeroBackgroundUrl: settings?.homeHeroBackgroundUrl ?? "",
    jobHeroBackgroundUrl: settings?.jobHeroBackgroundUrl ?? "",
    homeOpenGraphImageUrl: settings?.homeOpenGraphImageUrl ?? "",
    jobOpenGraphImageUrl: settings?.jobOpenGraphImageUrl ?? "",
    jobListingIllustrationUrl: settings?.jobListingIllustrationUrl ?? "",
  };

  return <BrandingSettingsForm initial={initial} />;
}
