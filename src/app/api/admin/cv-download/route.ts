import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { getDb } from "@/db";
import { applications } from "@/db/schema";
import { resolveFreshCvDownloadUrl } from "@/lib/blob-cv-download";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Admin-only redirect to a short-lived Vercel Blob download URL (private store).
 * Direct links from the DB often expire; this refreshes them on each click.
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

  const db = getDb();
  const [row] = await db
    .select({ cvUrl: applications.cvUrl })
    .from(applications)
    .where(eq(applications.id, id))
    .limit(1);

  if (!row?.cvUrl?.trim()) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const fresh = await resolveFreshCvDownloadUrl(row.cvUrl);
  if (!fresh) {
    return NextResponse.json(
      { error: "Could not resolve file (check BLOB_READ_WRITE_TOKEN)" },
      { status: 502 }
    );
  }

  return NextResponse.redirect(fresh, 302);
}
