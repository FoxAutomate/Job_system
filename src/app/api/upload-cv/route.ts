import { randomUUID } from "node:crypto";

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

import { getBlobReadWriteToken } from "@/lib/blob-token";
import { MAX_CV_BYTES, resolveCvMimeType } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Same-origin CV upload: browser → this route → Vercel Blob server SDK.
 * Avoids browser calls to vercel.com/api/blob (CORS / allowed origins on the Blob store).
 */
export async function POST(request: Request) {
  try {
    const token = getBlobReadWriteToken();
    if (!token) {
      return NextResponse.json(
        { ok: false, error: "storage_unconfigured" },
        { status: 503 }
      );
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (parseErr) {
      console.error("[upload-cv] formData parse failed:", parseErr);
      return NextResponse.json(
        { ok: false, error: "invalid_form" },
        { status: 400 }
      );
    }

    const file = formData.get("file");
    // Node/undici may not satisfy `instanceof File`; Blob covers upload parts.
    if (typeof file === "string" || !(file instanceof Blob) || file.size === 0) {
      return NextResponse.json({ ok: false, error: "no_file" }, { status: 400 });
    }

    if (file.size > MAX_CV_BYTES) {
      return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
    }

    const mime = resolveCvMimeType(file as File);
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
    const displayName =
      file instanceof File && file.name
        ? file.name
        : `cv${ext}`;

    try {
      const buf = Buffer.from(await file.arrayBuffer());
      const blob = await put(pathname, buf, {
        access: "public",
        token,
        contentType: mime,
        multipart: true,
      });
      return NextResponse.json({
        ok: true,
        url: blob.url,
        fileName: displayName,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[upload-cv] Blob put failed:", message, err);
      return NextResponse.json(
        { ok: false, error: "upload_failed" },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[upload-cv] Unhandled error:", err);
    return NextResponse.json(
      { ok: false, error: "internal_error" },
      { status: 500 }
    );
  }
}
