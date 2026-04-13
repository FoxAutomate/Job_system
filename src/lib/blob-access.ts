/**
 * Must match the Vercel Blob **store** access mode (Storage → store settings).
 * - **Public** store (typical after switching store to Public): default `public` here.
 * - **Private** store: set env `BLOB_ACCESS=private` or `put()` fails with
 *   "Cannot use public access on a private store".
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
