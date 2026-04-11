/** Accept only HTTPS URLs from Vercel Blob public storage (client-upload flow). */
export function isTrustedCvBlobUrl(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    const h = u.hostname.toLowerCase();
    return h.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}
