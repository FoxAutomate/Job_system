import { put } from "@vercel/blob";

import { cvUrlFromPutResult, getBlobPutAccess } from "@/lib/blob-access";

type PutCvArgs = {
  pathname: string;
  body: Buffer;
  token: string;
  contentType: string;
};

function putOnce(
  pathname: string,
  body: Buffer,
  token: string,
  contentType: string,
  access: "public" | "private"
) {
  return put(pathname, body, {
    access,
    token,
    contentType,
    multipart: true,
  });
}

/**
 * `BLOB_ACCESS` can disagree with the actual store mode in Vercel. Retry once with the other access.
 */
export async function putCvBlobWithAccessFallback(
  args: PutCvArgs
): Promise<{ storedUrl: string; accessUsed: "public" | "private" }> {
  let access = getBlobPutAccess();

  try {
    const blob = await putOnce(
      args.pathname,
      args.body,
      args.token,
      args.contentType,
      access
    );
    return {
      storedUrl: cvUrlFromPutResult(blob, access),
      accessUsed: access,
    };
  } catch (firstErr) {
    const msg =
      firstErr instanceof Error ? firstErr.message : String(firstErr);

    const altAccess: "public" | "private" | null =
      access === "public" && msg.includes("private store")
        ? "private"
        : access === "private" && msg.includes("public store")
          ? "public"
          : null;

    if (!altAccess) {
      throw firstErr;
    }

    console.warn("[blob] put access/store mismatch; retrying", {
      tried: access,
      retry: altAccess,
    });

    access = altAccess;
    const blob = await putOnce(
      args.pathname,
      args.body,
      args.token,
      args.contentType,
      access
    );
    return {
      storedUrl: cvUrlFromPutResult(blob, access),
      accessUsed: access,
    };
  }
}
