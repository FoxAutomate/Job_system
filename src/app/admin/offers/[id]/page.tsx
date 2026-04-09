import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

import { JobOfferForm } from "@/components/admin/JobOfferForm";
import { getDb } from "@/db";
import { jobs } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditOfferPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const db = getDb();
  const rows = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
  const job = rows[0];
  if (!job) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/offers"
          className="text-sm text-neutral-600 hover:underline"
        >
          ← Kuulutused
        </Link>
        <h1 className="mt-2 font-heading text-2xl font-bold">Muuda kuulutust</h1>
      </div>
      <JobOfferForm job={job} />
    </div>
  );
}
