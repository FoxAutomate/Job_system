import { randomUUID } from "node:crypto";

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

import { MAX_CV_BYTES, resolveCvMimeType } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * Same-origin CV upload: browser → this route → Vercel Blob server SDK.
 * Avoids browser calls to vercel.com/api/blob (CORS / allowed origins on the Blob store).
 */
export async function POST(request: Request) {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "storage_unconfigured" },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_form" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ ok: false, error: "no_file" }, { status: 400 });
  }

  if (file.size > MAX_CV_BYTES) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  const mime = resolveCvMimeType(file);
  if (!mime) {
    return NextResponse.json({ ok: false, error: "invalid_type" }, { status: 400 });
  }

  const ext =
    mime === "application/pdf"
      ? ".pdf"
      : mime.includes("wordprocessingml")
        ? ".docx"
        : ".doc";
  const pathname = `applications/cv-${randomUUID()}${ext}`;

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    const blob = await put(pathname, buf, {
      access: "public",
      token,
      contentType: mime,
    });
    return NextResponse.json({
      ok: true,
      url: blob.url,
      fileName: file.name || `cv${ext}`,
    });
  } catch (err) {
    console.error("[upload-cv] Blob put failed:", err);
    return NextResponse.json({ ok: false, error: "upload_failed" }, { status: 502 });
  }
}
