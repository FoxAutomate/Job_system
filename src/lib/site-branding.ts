/** Built-in paths under /public when DB URL is null */
export const BRANDING_DEFAULTS = {
  logo: "/cannery/Cannery_logo_horizontal.png",
  homeHeroBg: "/cannery/full_machine_cannery_line.png",
  jobHeroBg: "/cannery/full_machine_cannery_line.png",
  homeOg: "/cannery/full_machine_cannery_line.png",
  jobOg: "/cannery/full_machine_cannery_line.png",
  jobIllustration: "/cannery/Canner-1.webp",
} as const;

export type SiteBrandingResolved = {
  logoSrc: string;
  homeHeroBgSrc: string;
  jobHeroBgSrc: string;
  homeOgSrc: string;
  jobOgSrc: string;
  jobIllustrationSrc: string;
};

type BrandingRow = {
  siteLogoUrl?: string | null;
  homeHeroBackgroundUrl?: string | null;
  jobHeroBackgroundUrl?: string | null;
  homeOpenGraphImageUrl?: string | null;
  jobOpenGraphImageUrl?: string | null;
  jobListingIllustrationUrl?: string | null;
};

export function resolveSiteBranding(row: BrandingRow | null): SiteBrandingResolved {
  return {
    logoSrc: row?.siteLogoUrl?.trim() || BRANDING_DEFAULTS.logo,
    homeHeroBgSrc:
      row?.homeHeroBackgroundUrl?.trim() || BRANDING_DEFAULTS.homeHeroBg,
    jobHeroBgSrc:
      row?.jobHeroBackgroundUrl?.trim() || BRANDING_DEFAULTS.jobHeroBg,
    homeOgSrc:
      row?.homeOpenGraphImageUrl?.trim() || BRANDING_DEFAULTS.homeOg,
    jobOgSrc: row?.jobOpenGraphImageUrl?.trim() || BRANDING_DEFAULTS.jobOg,
    jobIllustrationSrc:
      row?.jobListingIllustrationUrl?.trim() || BRANDING_DEFAULTS.jobIllustration,
  };
}

/** Absolute URL for metadata openGraph / twitter (metadataBase for relative paths). */
export function absoluteOgImageUrl(
  pathOrUrl: string,
  metadataBase: URL
): string {
  const t = pathOrUrl.trim();
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  return new URL(t.startsWith("/") ? t : `/${t}`, metadataBase).toString();
}
