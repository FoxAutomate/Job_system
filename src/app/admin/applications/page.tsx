import { AdminApplicationsView } from "@/components/admin/AdminApplicationsView";
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

  const jobOptions = jobList.map((j) => ({ id: j.id, title: j.title }));

  return (
    <AdminApplicationsView
      rows={rows}
      jobOptions={jobOptions}
      highlightId={highlightId}
    />
  );
}
