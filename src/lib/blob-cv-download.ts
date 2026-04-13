import { head } from "@vercel/blob";

import { getBlobReadWriteToken } from "@/lib/blob-token";

/** Pathname Vercel Blob (e.g. `applications/cv-….pdf`) from any stored blob URL. */
export function cvBlobPathnameFromUrl(storedUrl: string): string {
  return new URL(storedUrl).pathname.replace(/^\/+/, "");
}

/**
 * Private blobs: persisted `downloadUrl` expires. Use `head` + token for a fresh URL.
 * Returns null if token missing or lookup fails.
 */
export async function resolveFreshCvDownloadUrl(
  storedCvUrl: string
): Promise<string | null> {
  const token = getBlobReadWriteToken();
  if (!token) return null;
  let pathname: string;
  try {
    pathname = cvBlobPathnameFromUrl(storedCvUrl);
  } catch {
    return null;
  }
  try {
    const meta = await head(pathname, { token });
    return meta.downloadUrl || null;
  } catch {
    try {
      const meta = await head(storedCvUrl, { token });
      return meta.downloadUrl || null;
    } catch {
      return null;
    }
  }
}
