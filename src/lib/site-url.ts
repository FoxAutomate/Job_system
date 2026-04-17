/** Canonical site origin for metadata, OG URLs, and links. */
export function getSiteUrlString(): string {
  const publicSite = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (publicSite && publicSite.length > 0) {
    return publicSite.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL != null) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export function getMetadataBase(): URL {
  return new URL(`${getSiteUrlString()}/`);
}
