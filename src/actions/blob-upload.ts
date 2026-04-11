"use server";

import { generateClientTokenFromReadWriteToken } from "@vercel/blob/client";

import { ALLOWED_CV_MIME, MAX_CV_BYTES } from "@/lib/validation";

const CV_TOKEN_CONTENT_TYPES = [
  ...ALLOWED_CV_MIME,
  "application/octet-stream",
] as const;

function isSafeCvPathname(pathname: string): boolean {
  return /^applications\/cv-(?:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.(pdf|doc|docx)$/i.test(
    pathname
  );
}

/**
 * Issues a short-lived client token so the browser can upload the CV directly to Blob
 * (avoids multipart limits / quirks with File in Server Actions).
 */
export async function createCvUploadClientToken(
  pathname: string,
  contentType: string
): Promise<
  { ok: true; clientToken: string } | { ok: false; message: string }
> {
  if (!isSafeCvPathname(pathname)) {
    return { ok: false, message: "Invalid upload path" };
  }

  if (!ALLOWED_CV_MIME.has(contentType)) {
    return { ok: false, message: "Invalid content type" };
  }

  const rw = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!rw) {
    return { ok: false, message: "Storage not configured" };
  }

  try {
    const clientToken = await generateClientTokenFromReadWriteToken({
      pathname,
      token: rw,
      maximumSizeInBytes: MAX_CV_BYTES,
      allowedContentTypes: [...CV_TOKEN_CONTENT_TYPES],
    });
    return { ok: true, clientToken };
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error("[blob-upload] generateClientTokenFromReadWriteToken:", err);
    return {
      ok: false,
      message: detail || "Could not create upload token",
    };
  }
}
