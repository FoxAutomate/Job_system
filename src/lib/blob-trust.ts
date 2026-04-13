/**
 * Accept HTTPS Blob URLs on Vercel's storage host.
 * Private blobs may use `downloadUrl` host patterns beyond `.public.` — still under
 * `*.blob.vercel-storage.com` (Vercel-controlled).
 */
export function isTrustedCvBlobUrl(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    const h = u.hostname.toLowerCase();
    return h === "blob.vercel-storage.com" || h.endsWith(".blob.vercel-storage.com");
  } catch {
    return false;
  }
}
