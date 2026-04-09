import { AdminDashboardView } from "@/components/admin/AdminDashboardView";
import { getAllApplications, getAllJobs, getSiteSettings } from "@/lib/queries";
import { requireAdmin } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireAdmin();
  const [jobList, apps, settings] = await Promise.all([
    getAllJobs(),
    getAllApplications(),
    getSiteSettings(),
  ]);

  return (
    <AdminDashboardView
      jobCount={jobList.length}
      appCount={apps.length}
      initialEmail={
        settings?.defaultApplicationEmail ?? "Birgit@cannery.eu"
      }
    />
  );
}
