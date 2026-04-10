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
import type { Application, ApplicationStatus } from "@/db/schema";
import { applicationStatusEnum } from "@/db/schema";
import { applicationStatusLabel } from "@/lib/i18n/crm-status";
import { useLocale } from "@/lib/i18n/locale-context";

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
  const { t, locale } = useLocale();
  const [jobFilter, setJobFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ApplicationStatus>(
    "all"
  );

  const filteredRows = useMemo(() => {
    let list = rows;
    if (jobFilter !== "all") {
      if (jobFilter === "general") {
        list = list.filter((r) => r.jobId == null);
      } else {
        list = list.filter((r) => r.jobId === jobFilter);
      }
    }
    if (statusFilter !== "all") {
      list = list.filter((r) => r.status === statusFilter);
    }
    return list;
  }, [rows, jobFilter, statusFilter]);

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
        <div className="space-y-2">
          <Label htmlFor="status-filter" className="text-neutral-700">
            {t.adminAppStatusFilterLabel}
          </Label>
          <Select
            value={statusFilter}
            onValueChange={(v) =>
              setStatusFilter((v ?? "all") as "all" | ApplicationStatus)
            }
          >
            <SelectTrigger id="status-filter" className="w-[min(100%,320px)]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.adminAppStatusFilterAll}</SelectItem>
              {applicationStatusEnum.map((s) => (
                <SelectItem key={s} value={s}>
                  {applicationStatusLabel(locale, s)}
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
