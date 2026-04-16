import { AdminOfferPageHeader } from "@/components/admin/AdminOfferPageHeader";
import { JobOfferForm } from "@/components/admin/JobOfferForm";
import { requireAdmin } from "@/lib/auth-guard";
import { isDemoMode } from "@/lib/demo-mode";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function NewOfferPage() {
  await requireAdmin();
  if (isDemoMode()) {
    redirect("/admin/offers");
  }

  return (
    <div className="space-y-6">
      <AdminOfferPageHeader variant="new" />
      <JobOfferForm />
    </div>
  );
}
