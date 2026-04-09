import { AdminOfferPageHeader } from "@/components/admin/AdminOfferPageHeader";
import { JobOfferForm } from "@/components/admin/JobOfferForm";
import { requireAdmin } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

export default async function NewOfferPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <AdminOfferPageHeader variant="new" />
      <JobOfferForm />
    </div>
  );
}
