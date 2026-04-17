import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { putCvBlobWithAccessFallback } from "@/lib/blob-put-cv";
import { getBlobPutAccess } from "@/lib/blob-access";
import {
  BRANDING_KINDS,
  type BrandingUploadKind,
  validateBrandingUpload,
} from "@/lib/branding-upload";
import { isDemoMode } from "@/lib/demo-mode";
import { getBlobReadWriteToken } from "@/lib/blob-token";
import {
  blobRwTokenShapeOk,
  formatErrorForLog,
} from "@/lib/upload-error-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function parseKind(raw: string | null): BrandingUploadKind | null {
  if (!raw) return null;
  return BRANDING_KINDS.includes(raw as BrandingUploadKind)
    ? (raw as BrandingUploadKind)
    : null;
}

export async function POST(request: Request) {
  const requestId = randomUUID().slice(0, 8);

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: "unauthorized", requestId }, { status: 401 });
  }

  if (isDemoMode()) {
    return NextResponse.json(
      { ok: false, error: "demo_no_upload", requestId },
      { status: 403 }
    );
  }

  const token = getBlobReadWriteToken();
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "storage_unconfigured", requestId },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_form", requestId },
      { status: 400 }
    );
  }

  const kind = parseKind(
    typeof formData.get("kind") === "string"
      ? (formData.get("kind") as string)
      : null
  );
  if (!kind) {
    return NextResponse.json(
      { ok: false, error: "invalid_kind", requestId },
      { status: 400 }
    );
  }

  const file = formData.get("file");
  if (typeof file === "string" || !(file instanceof Blob) || file.size === 0) {
    return NextResponse.json(
      { ok: false, error: "no_file", requestId },
      { status: 400 }
    );
  }

  const asFile = file as File;
  const buf = Buffer.from(await asFile.arrayBuffer());
  const validated = await validateBrandingUpload(kind, asFile, buf);
  if (!validated.ok) {
    return NextResponse.json(
      { ok: false, error: validated.error, requestId },
      { status: 400 }
    );
  }

  try {
    const { storedUrl } = await putCvBlobWithAccessFallback({
      pathname: validated.pathname,
      body: buf,
      token,
      contentType: validated.mime,
    });
    return NextResponse.json({
      ok: true,
      url: storedUrl,
      fileName: asFile.name || validated.pathname.split("/").pop(),
      requestId,
    });
  } catch (blobErr) {
    console.error(
      "[upload-branding] blob failed",
      JSON.stringify({
        requestId,
        kind,
        blobAccess: getBlobPutAccess(),
        tokenShapeOk: blobRwTokenShapeOk(token),
        ...formatErrorForLog(blobErr),
      })
    );
    return NextResponse.json(
      { ok: false, error: "upload_failed", requestId },
      { status: 502 }
    );
  }
}
