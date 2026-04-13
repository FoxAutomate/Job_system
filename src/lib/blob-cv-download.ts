import { get, head } from "@vercel/blob";

import { getBlobReadWriteToken } from "@/lib/blob-token";

/** Pathname Vercel Blob (e.g. `applications/cv-….pdf`) from any stored blob URL. */
export function cvBlobPathnameFromUrl(storedUrl: string): string {
  return new URL(storedUrl).pathname.replace(/^\/+/, "");
}

type GetOk = Awaited<ReturnType<typeof get>>;

/**
 * Stream blob bytes through our server (avoids broken302 → CDN downloads on Vercel).
 * Tries private store first, then public.
 */
export async function fetchCvBlobForDownload(
  storedCvUrl: string
): Promise<Extract<GetOk, { statusCode: 200 }> | null> {
  const token = getBlobReadWriteToken();
  if (!token) return null;
  let pathname: string;
  try {
    pathname = cvBlobPathnameFromUrl(storedCvUrl);
  } catch {
    return null;
  }

  const privateResult = await get(pathname, {
    access: "private",
    token,
    useCache: false,
  });
  if (
    privateResult &&
    privateResult.statusCode === 200 &&
    privateResult.stream
  ) {
    return privateResult;
  }

  const publicResult = await get(pathname, {
    access: "public",
    token,
  });
  if (
    publicResult &&
    publicResult.statusCode === 200 &&
    publicResult.stream
  ) {
    return publicResult;
  }

  return null;
}

/**
 * For e-mail links only: short-lived signed `downloadUrl` (no session).
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
