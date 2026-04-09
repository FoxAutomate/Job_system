import Link from "next/link";

import { JobRowActions } from "@/components/admin/JobRowActions";
import { Badge } from "@/components/ui/badge";
import { getAllJobs } from "@/lib/queries";
import { requireAdmin } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

export default async function AdminOffersPage() {
  await requireAdmin();
  const jobList = await getAllJobs();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Kuulutused</h1>
          <p className="text-sm text-neutral-600">
            Muuda aktiivsust, palka või ava muutmiseks
          </p>
        </div>
        <Link
          href="/admin/offers/new"
          className="inline-flex min-h-10 items-center rounded-lg bg-neutral-900 px-4 text-sm font-medium text-white hover:bg-neutral-800"
        >
          + Uus
        </Link>
      </div>

      <ul className="space-y-4">
        {jobList.map((job) => (
          <li
            key={job.id}
            className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/admin/offers/${job.id}`}
                    className="text-lg font-semibold hover:underline"
                  >
                    {job.title}
                  </Link>
                  {!job.active ? (
                    <Badge variant="secondary">Peidetud</Badge>
                  ) : null}
                </div>
                <p className="text-sm text-neutral-500">/{job.slug}</p>
                <p className="text-sm text-neutral-700">{job.shortDescription}</p>
              </div>
              <JobRowActions job={job} />
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <Link
                href={`/jobs/${job.slug}`}
                className="text-amber-900 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ava avalik leht
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {jobList.length === 0 ? (
        <p className="text-neutral-600">
          Kuulutusi pole.{" "}
          <Link href="/admin/offers/new" className="font-medium underline">
            Loo esimene
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}
