/**
 * Must match the Vercel Blob **store** access mode (Storage → store settings).
 * New Vercel Blob stores are often **private**; using `public` in `put()` then fails.
 * - Default here: **private** (matches typical store).
 * - If your store is **public**, set env `BLOB_ACCESS=public`.
 */
export function getBlobPutAccess(): "public" | "private" {
  const v = process.env.BLOB_ACCESS?.trim().toLowerCase();
  if (v === "public") return "public";
  return "private";
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
