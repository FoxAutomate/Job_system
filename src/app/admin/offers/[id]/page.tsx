import { AdminOfferPageHeader } from "@/components/admin/AdminOfferPageHeader";
import { JobOfferForm } from "@/components/admin/JobOfferForm";
import { getDemoJobById } from "@/data/demo-fixtures";
import { getDb } from "@/db";
import { jobs } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-guard";
import { isDemoMode } from "@/lib/demo-mode";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditOfferPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  let job;
  if (isDemoMode()) {
    job = getDemoJobById(id) ?? undefined;
  } else {
    const db = getDb();
    const rows = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
    job = rows[0];
  }
  if (!job) notFound();

  return (
    <div className="space-y-6">
      <AdminOfferPageHeader variant="edit" />
      <JobOfferForm job={job} />
    </div>
  );
}
