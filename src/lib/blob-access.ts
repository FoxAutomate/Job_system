/**
 * Preferred `put()` access; should match the Blob **store** in Vercel.
 * If `BLOB_ACCESS` is wrong, {@link putCvBlobWithAccessFallback} retries with the other mode.
 * - Unset or `public`: try public first.
 * - `private`: try private first.
 */
export function getBlobPutAccess(): "public" | "private" {
  const v = process.env.BLOB_ACCESS?.trim().toLowerCase();
  if (v === "private") return "private";
  return "public";
}

/** URL we persist and send to the form — private blobs need `downloadUrl` for browser access. */
export function cvUrlFromPutResult(
  result: { url: string; downloadUrl: string },
  access: "public" | "private"
): string {
  if (access === "private") {
    return result.downloadUrl || result.url;
  }
  return result.url;
}
