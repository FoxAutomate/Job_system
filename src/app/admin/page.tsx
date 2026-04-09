import Link from "next/link";

import { SettingsEmailForm } from "@/components/admin/SettingsEmailForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">Haldus</h1>
        <p className="text-neutral-600">
          Cannery Careers — kuulutused ja kandidaadid
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Kuulutused</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{jobList.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Kandideerimised</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{apps.length}</CardContent>
        </Card>
      </div>

      <SettingsEmailForm
        initialEmail={settings?.defaultApplicationEmail ?? "Birgit@cannery.eu"}
      />

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/offers/new"
          className="inline-flex min-h-10 items-center rounded-lg bg-neutral-900 px-4 text-sm font-medium text-white hover:bg-neutral-800"
        >
          + Uus kuulutus
        </Link>
        <Link
          href="/admin/offers"
          className="inline-flex min-h-10 items-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-medium hover:bg-neutral-50"
        >
          Halda kuulutusi
        </Link>
        <Link
          href="/admin/applications"
          className="inline-flex min-h-10 items-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-medium hover:bg-neutral-50"
        >
          Kandidaadid
        </Link>
      </div>
    </div>
  );
}
