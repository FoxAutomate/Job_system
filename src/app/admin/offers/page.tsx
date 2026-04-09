import { AdminOffersView } from "@/components/admin/AdminOffersView";
import { getAllJobs } from "@/lib/queries";
import { requireAdmin } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

export default async function AdminOffersPage() {
  await requireAdmin();
  const jobList = await getAllJobs();

  return <AdminOffersView jobList={jobList} />;
}
