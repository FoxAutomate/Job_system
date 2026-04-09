import { ApplicationsTable } from "@/components/admin/ApplicationsTable";
import { getAllApplications, getAllJobs } from "@/lib/queries";
import { requireAdmin } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  await requireAdmin();
  const { id: highlightId } = await searchParams;
  const [applicationsList, jobList] = await Promise.all([
    getAllApplications(),
    getAllJobs(),
  ]);

  const titleById = Object.fromEntries(jobList.map((j) => [j.id, j.title]));

  const rows = applicationsList.map((a) => ({
    ...a,
    jobTitle: a.jobId ? titleById[a.jobId] ?? null : null,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Kandidaadid</h1>
        <p className="text-sm text-neutral-600">
          CRM: staatus (PL sildid) ja märkmed
        </p>
      </div>
      <ApplicationsTable rows={rows} highlightId={highlightId} />
    </div>
  );
}
