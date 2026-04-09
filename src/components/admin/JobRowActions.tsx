"use client";

import { useTransition } from "react";

import { deleteJob, setJobActive, setJobShowSalary } from "@/actions/jobs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useLocale } from "@/lib/i18n/locale-context";
import type { Job } from "@/db/schema";

export function JobRowActions({ job }: { job: Job }) {
  const [pending, startTransition] = useTransition();
  const { t } = useLocale();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <label className="flex items-center gap-2 text-sm">
        <span className="text-neutral-600">{t.adminJobRowActive}</span>
        <Switch
          checked={job.active}
          disabled={pending}
          onCheckedChange={(v) => {
            startTransition(() => setJobActive(job.id, v));
          }}
        />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <span className="text-neutral-600">{t.adminJobRowSalary}</span>
        <Switch
          checked={job.showSalary}
          disabled={pending}
          onCheckedChange={(v) => {
            startTransition(() => setJobShowSalary(job.id, v));
          }}
        />
      </label>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        disabled={pending}
        onClick={() => {
          if (confirm(t.adminJobDeleteConfirm)) {
            startTransition(() => deleteJob(job.id));
          }
        }}
      >
        {t.adminJobDelete}
      </Button>
    </div>
  );
}
