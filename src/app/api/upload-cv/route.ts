import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { getBlobPutAccess } from "@/lib/blob-access";
import { putCvBlobWithAccessFallback } from "@/lib/blob-put-cv";
import { getBlobReadWriteToken } from "@/lib/blob-token";
import {
  MAX_CV_BYTES,
  isCvBufferPlausible,
  resolveCvMimeType,
} from "@/lib/validation";
import {
  blobRwTokenShapeOk,
  formatErrorForLog,
} from "@/lib/upload-error-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Same-origin CV upload: browser → this route → Vercel Blob server SDK.
 * Avoids browser calls to vercel.com/api/blob (CORS / allowed origins on the Blob store).
 */
export async function POST(request: Request) {
  const requestId = randomUUID().slice(0, 8);
  try {
    const token = getBlobReadWriteToken();
    if (!token) {
      console.error("[upload-cv] missing token", {
        requestId,
        hint: "Set BLOB_READ_WRITE_TOKEN (e.g. connect Blob store to project)",
      });
      return NextResponse.json(
        { ok: false, error: "storage_unconfigured", requestId },
        { status: 503 }
      );
    }

    if (!blobRwTokenShapeOk(token)) {
      console.error("[upload-cv] token shape unexpected (expect vercel_blob_rw_…)", {
        requestId,
        length: token.length,
      });
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (parseErr) {
      console.error(
        "[upload-cv] formData parse failed",
        { requestId, ...formatErrorForLog(parseErr) }
      );
      return NextResponse.json(
        { ok: false, error: "invalid_form", requestId },
        { status: 400 }
      );
    }

    const file = formData.get("file");
    // Node/undici may not satisfy `instanceof File`; Blob covers upload parts.
    if (typeof file === "string" || !(file instanceof Blob) || file.size === 0) {
      console.warn("[upload-cv] no usable file", {
        requestId,
        fieldType: typeof file,
        isBlob: file instanceof Blob,
        size: file instanceof Blob ? file.size : undefined,
      });
      return NextResponse.json(
        { ok: false, error: "no_file", requestId },
        { status: 400 }
      );
    }

    if (file.size > MAX_CV_BYTES) {
      return NextResponse.json(
        { ok: false, error: "too_large", requestId },
        { status: 413 }
      );
    }

    const mime = resolveCvMimeType(file as File);
    if (!mime) {
      console.warn("[upload-cv] MIME not allowed", {
        requestId,
        reportedType: (file as File).type,
        size: file.size,
      });
      return NextResponse.json(
        { ok: false, error: "invalid_type", requestId },
        { status: 400 }
      );
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

    let buf: Buffer;
    try {
      buf = Buffer.from(await file.arrayBuffer());
      if (!isCvBufferPlausible(buf, mime)) {
        console.warn("[upload-cv] buffer failed magic-byte check", {
          requestId,
          mime,
          bytes: buf.length,
        });
        return NextResponse.json(
          { ok: false, error: "invalid_file_content", requestId },
          { status: 400 }
        );
      }
    } catch (err) {
      console.error(
        "[upload-cv] read file into buffer failed",
        JSON.stringify({ requestId, pathname, ...formatErrorForLog(err) })
      );
      return NextResponse.json(
        { ok: false, error: "read_failed", requestId },
        { status: 500 }
      );
    }

    try {
      const blobAccess = getBlobPutAccess();
      console.info("[upload-cv] blob put start", {
        requestId,
        pathname,
        bytes: buf.length,
        mime,
        multipart: true,
        blobAccess,
        vercelRegion: process.env.VERCEL_REGION,
      });
      const { storedUrl, accessUsed } = await putCvBlobWithAccessFallback({
        pathname,
        body: buf,
        token,
        contentType: mime,
      });
      if (accessUsed !== blobAccess) {
        console.warn("[upload-cv] used corrected blob access", {
          requestId,
          envWas: blobAccess,
          accessUsed,
        });
      }
      console.info("[upload-cv] blob put ok", {
        requestId,
        accessUsed,
        host: (() => {
          try {
            return new URL(storedUrl).hostname;
          } catch {
            return "invalid_url";
          }
        })(),
      });
      return NextResponse.json({
        ok: true,
        url: storedUrl,
        fileName: displayName,
      });
    } catch (err) {
      console.error(
        "[upload-cv] Blob put failed",
        JSON.stringify({
          requestId,
          pathname,
          bytes: buf.length,
          mime,
          multipart: true,
          blobAccess: getBlobPutAccess(),
          tokenShapeOk: blobRwTokenShapeOk(token),
          vercelRegion: process.env.VERCEL_REGION,
          ...formatErrorForLog(err),
        })
      );
      return NextResponse.json(
        {
          ok: false,
          error: "upload_failed",
          requestId,
          hint: "Search Vercel logs for this requestId",
        },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error(
      "[upload-cv] Unhandled error",
      JSON.stringify({ requestId, ...formatErrorForLog(err) })
    );
    return NextResponse.json(
      { ok: false, error: "internal_error", requestId },
      { status: 500 }
    );
  }
}
