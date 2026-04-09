"use client";

import { useMemo, useState } from "react";

import { ApplicationsTable } from "@/components/admin/ApplicationsTable";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "@/lib/i18n/locale-context";
import type { Application } from "@/db/schema";

type Row = Application & { jobTitle: string | null };

export type JobFilterOption = { id: string; title: string };

type Props = {
  rows: Row[];
  jobOptions: JobFilterOption[];
  highlightId?: string;
};

export function AdminApplicationsView({
  rows,
  jobOptions,
  highlightId,
}: Props) {
  const { t } = useLocale();
  const [jobFilter, setJobFilter] = useState<string>("all");

  const filteredRows = useMemo(() => {
    if (jobFilter === "all") return rows;
    if (jobFilter === "general") {
      return rows.filter((r) => r.jobId == null);
    }
    return rows.filter((r) => r.jobId === jobFilter);
  }, [rows, jobFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">{t.adminAppsTitle}</h1>
        <p className="text-sm text-neutral-600">{t.adminAppsSub}</p>
      </div>

      <div className="flex flex-wrap items-end gap-4">
        <div className="space-y-2">
          <Label htmlFor="job-filter" className="text-neutral-700">
            {t.adminAppFilterLabel}
          </Label>
          <Select
            value={jobFilter}
            onValueChange={(v) => setJobFilter(v ?? "all")}
          >
            <SelectTrigger id="job-filter" className="w-[min(100%,320px)]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.adminAppFilterAll}</SelectItem>
              <SelectItem value="general">{t.adminAppGeneral}</SelectItem>
              {jobOptions.map((j) => (
                <SelectItem key={j.id} value={j.id}>
                  {j.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="pb-2 text-sm text-neutral-500">
          {filteredRows.length} / {rows.length}
        </p>
      </div>

      <ApplicationsTable rows={filteredRows} highlightId={highlightId} />
    </div>
  );
}
