import Link from "next/link";

import { JobOfferForm } from "@/components/admin/JobOfferForm";
import { requireAdmin } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

export default async function NewOfferPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/offers"
          className="text-sm text-neutral-600 hover:underline"
        >
          ← Kuulutused
        </Link>
        <h1 className="mt-2 font-heading text-2xl font-bold">Uus kuulutus</h1>
      </div>
      <JobOfferForm />
    </div>
  );
}
