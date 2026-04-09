"use client";

import { useTransition } from "react";

import { deleteJob, setJobActive, setJobShowSalary } from "@/actions/jobs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { Job } from "@/db/schema";

export function JobRowActions({ job }: { job: Job }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <label className="flex items-center gap-2 text-sm">
        <span className="text-neutral-600">Aktiivne</span>
        <Switch
          checked={job.active}
          disabled={pending}
          onCheckedChange={(v) => {
            startTransition(() => setJobActive(job.id, v));
          }}
        />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <span className="text-neutral-600">Palk</span>
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
          if (
            confirm(
              "Kustuta kuulutus? Kandideerimised jäävad alles (seos eemaldatakse)."
            )
          ) {
            startTransition(() => deleteJob(job.id));
          }
        }}
      >
        Kustuta
      </Button>
    </div>
  );
}
