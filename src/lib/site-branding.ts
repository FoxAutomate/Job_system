/** Built-in paths under /public when DB URL is null */
export const BRANDING_DEFAULTS = {
  /** Horizontal / web header */
  logoWeb: "/canning-brothers/logo-web.png",
  /** Narrower or stacked variant for small viewports */
  logoMobile: "/canning-brothers/logo-mobile.png",
  homeHeroBg: "/cannery/full_machine_cannery_line.png",
  jobHeroBg: "/cannery/full_machine_cannery_line.png",
  homeOg: "/cannery/full_machine_cannery_line.png",
  jobOg: "/cannery/full_machine_cannery_line.png",
  jobIllustration: "/cannery/Canner-1.webp",
} as const;

export type SiteBrandingResolved = {
  /** Desktop / `sm+` hero logo */
  logoSrc: string;
  /** Below `sm` — falls back to {@link logoSrc} when admin set a single Blob URL */
  logoSrcMobile: string;
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
  const custom = row?.siteLogoUrl?.trim();
  return {
    logoSrc: custom || BRANDING_DEFAULTS.logoWeb,
    logoSrcMobile: custom || BRANDING_DEFAULTS.logoMobile,
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
