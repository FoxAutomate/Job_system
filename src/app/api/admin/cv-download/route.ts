import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { getDb } from "@/db";
import { isDemoMode } from "@/lib/demo-mode";
import { applications } from "@/db/schema";
import { fetchCvBlobForDownload } from "@/lib/blob-cv-download";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function attachmentFileName(cvFileName: string | null, pathname: string): string {
  const fromPath = pathname.split("/").filter(Boolean).pop();
  const raw = (cvFileName?.trim() || fromPath || "cv.bin").replace(
    /[/\\"\u0000-\u001f]/g,
    "_"
  );
  return raw.slice(0, 200);
}

function isPdfContentType(ct: string | null | undefined): boolean {
  return (ct ?? "").toLowerCase().includes("pdf");
}

/**
 * Admin-only: stream CV from Vercel Blob via SDK (reliable;302 to downloadUrl
 * often saves a tiny body instead of the file on Vercel).
 */
export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = new URL(request.url).searchParams.get("id");
  if (!id?.trim()) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  if (isDemoMode()) {
    return NextResponse.json({ error: "Not available in demo" }, { status: 404 });
  }

  const db = getDb();
  const [row] = await db
    .select({
      cvUrl: applications.cvUrl,
      cvFileName: applications.cvFileName,
    })
    .from(applications)
    .where(eq(applications.id, id))
    .limit(1);

  if (!row?.cvUrl?.trim()) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const result = await fetchCvBlobForDownload(row.cvUrl);
  if (!result?.stream) {
    return NextResponse.json(
      { error: "Could not load file (check BLOB_READ_WRITE_TOKEN and store access)" },
      { status: 502 }
    );
  }

  const fileName = attachmentFileName(row.cvFileName, result.blob.pathname);
  const contentType = result.blob.contentType || "application/octet-stream";
  const inline = isPdfContentType(contentType);
  const headers = new Headers();
  headers.set("Content-Type", contentType);
  headers.set(
    "Content-Disposition",
    `${inline ? "inline" : "attachment"}; filename*=UTF-8''${encodeURIComponent(fileName)}`
  );
  if (typeof result.blob.size === "number") {
    headers.set("Content-Length", String(result.blob.size));
  }
  headers.set("Cache-Control", "private, no-store");

  return new NextResponse(result.stream, { status: 200, headers });
}
