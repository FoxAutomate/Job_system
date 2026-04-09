"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import {
  updateApplicationNotes,
  updateApplicationStatus,
} from "@/actions/applications";
import type { Application, ApplicationStatus } from "@/db/schema";
import { APPLICATION_STATUS_LABELS } from "@/lib/admin-labels";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

type Row = Application & { jobTitle: string | null };

const statuses: ApplicationStatus[] = [
  "new",
  "next",
  "interesting",
  "rejected",
  "hired",
];

export function ApplicationsTable({
  rows,
  highlightId,
}: {
  rows: Row[];
  highlightId?: string;
}) {
  const [pending, startTransition] = useTransition();
  const highlighted = useRef(false);

  useEffect(() => {
    if (!highlightId || highlighted.current) return;
    const el = document.querySelector(
      `[data-application-id="${CSS.escape(highlightId)}"]`
    );
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      highlighted.current = true;
    }
  }, [highlightId]);

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kuupäev</TableHead>
            <TableHead>Nimi</TableHead>
            <TableHead>Kuulutus</TableHead>
            <TableHead>Staatus</TableHead>
            <TableHead className="min-w-[200px]">Märkmed</TableHead>
            <TableHead>CV</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((a) => (
            <TableRow
              key={a.id}
              data-application-id={a.id}
              className={
                highlightId === a.id ? "bg-amber-50/80" : undefined
              }
            >
              <TableCell className="whitespace-nowrap text-sm text-neutral-600">
                {new Date(a.createdAt ?? "").toLocaleString("et-EE")}
              </TableCell>
              <TableCell>
                <div className="font-medium">{a.name}</div>
                <div className="text-xs text-neutral-500">{a.email}</div>
                <div className="text-xs text-neutral-500">{a.phone}</div>
              </TableCell>
              <TableCell className="max-w-[140px] text-sm">
                {a.jobTitle ?? (
                  <span className="text-neutral-400">Üldine</span>
                )}
              </TableCell>
              <TableCell>
                <Select
                  value={a.status}
                  onValueChange={(v) => {
                    startTransition(async () => {
                      const r = await updateApplicationStatus(
                        a.id,
                        v as ApplicationStatus
                      );
                      if (r.ok) {
                        toast.success("Status updated");
                      } else {
                        toast.error(r.message);
                      }
                    });
                  }}
                  disabled={pending}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>
                        {APPLICATION_STATUS_LABELS[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <NotesCell id={a.id} initialNotes={a.notes} />
              </TableCell>
              <TableCell>
                {a.cvUrl ? (
                  <a
                    href={a.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-amber-900 underline"
                  >
                    {a.cvFileName ?? "Laadi alla"}
                  </a>
                ) : (
                  <span className="text-neutral-400">—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function NotesCell({
  id,
  initialNotes,
}: {
  id: string;
  initialNotes: string;
}) {
  const [value, setValue] = useState(initialNotes);
  const [savedNotes, setSavedNotes] = useState(initialNotes);
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        className="text-sm"
      />
      <Button
        type="button"
        size="sm"
        variant="secondary"
        disabled={pending || value === savedNotes}
        onClick={() => {
          startTransition(async () => {
            const r = await updateApplicationNotes(id, value);
            if (r.ok) {
              setSavedNotes(value);
              toast.success("Notes saved");
            } else {
              toast.error(r.message);
            }
          });
        }}
      >
        Salvesta märkmed
      </Button>
    </div>
  );
}
