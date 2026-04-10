"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import {
  updateApplicationCvRating,
  updateApplicationNotes,
  updateApplicationStatus,
} from "@/actions/applications";
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
import { useLocale } from "@/lib/i18n/locale-context";
import { applicationStatusLabel } from "@/lib/i18n/crm-status";
import { cn } from "@/lib/utils";
import type { Application, ApplicationStatus } from "@/db/schema";

type Row = Application & { jobTitle: string | null };

const statuses: ApplicationStatus[] = [
  "new",
  "next",
  "interesting",
  "rejected",
  "hired",
];

function applicationRowClass(
  status: ApplicationStatus,
  isDeepLinked: boolean
): string {
  return cn(
    "border-b border-neutral-100",
    isDeepLinked && "relative z-[1] ring-2 ring-inset ring-amber-400",
    status === "new" && "bg-orange-50/85",
    status === "rejected" &&
      cn(
        "border-b border-neutral-500/30 bg-neutral-500/45",
        "text-neutral-400",
        "[&_td]:!text-neutral-400",
        "[&_.font-medium]:!text-neutral-500",
        "[&_.text-xs]:!text-neutral-400/90",
        "[&_a]:!text-neutral-500",
        "[&_textarea]:!border-neutral-500/30 [&_textarea]:!bg-white/15 [&_textarea]:!text-neutral-400",
        "[&_[data-slot=select-trigger]]:!border-neutral-500/50 [&_[data-slot=select-trigger]]:!bg-white/25 [&_[data-slot=select-trigger]]:!text-neutral-500",
        "[&_button[type=button]]:!border-neutral-500/30 [&_button[type=button]]:!bg-white/10",
        "[&_.tabular-nums_span]:!text-neutral-400/90"
      ),
    status === "hired" && "bg-emerald-50/85"
  );
}

/** 1 = sad red … 5 = happy green */
const CV_FACES: {
  score: number;
  emoji: string;
  activeClass: string;
}[] = [
  { score: 1, emoji: "😢", activeClass: "ring-red-500 bg-red-50" },
  { score: 2, emoji: "😕", activeClass: "ring-orange-400 bg-orange-50" },
  { score: 3, emoji: "😐", activeClass: "ring-amber-400 bg-amber-50" },
  { score: 4, emoji: "🙂", activeClass: "ring-lime-500 bg-lime-50" },
  { score: 5, emoji: "🤩", activeClass: "ring-green-500 bg-green-50" },
];

export function ApplicationsTable({
  rows,
  highlightId,
}: {
  rows: Row[];
  highlightId?: string;
}) {
  const { t, locale } = useLocale();
  const [pending, startTransition] = useTransition();
  const highlighted = useRef(false);

  const dateLocale = locale === "en" ? "en-GB" : "et-EE";

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
            <TableHead className="w-[1%] min-w-0 max-w-[5.75rem] whitespace-normal">
              {t.adminAppTblDate}
            </TableHead>
            <TableHead>{t.adminAppTblName}</TableHead>
            <TableHead>{t.adminAppTblOffer}</TableHead>
            <TableHead>{t.adminAppTblStatus}</TableHead>
            <TableHead className="min-w-[220px]">
              {t.adminAppTblCvRating}
            </TableHead>
            <TableHead>{t.adminAppTblCv}</TableHead>
            <TableHead className="min-w-[200px]">{t.adminAppTblNotes}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((a) => (
            <TableRow
              key={a.id}
              data-application-id={a.id}
              className={applicationRowClass(
                a.status,
                highlightId === a.id
              )}
            >
              <TableCell className="max-w-[6rem] align-top text-xs leading-snug text-neutral-600">
                {(() => {
                  const d = new Date(a.createdAt ?? "");
                  if (Number.isNaN(d.getTime())) {
                    return <span className="text-neutral-400">—</span>;
                  }
                  return (
                    <div className="flex flex-col gap-0.5 tabular-nums">
                      <span>
                        {d.toLocaleDateString(dateLocale, {
                          dateStyle: "short",
                        })}
                      </span>
                      <span className="text-[11px] text-neutral-500 sm:text-xs">
                        {d.toLocaleTimeString(dateLocale, {
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                  );
                })()}
              </TableCell>
              <TableCell>
                <div className="font-medium">{a.name}</div>
                <div className="text-xs text-neutral-500">{a.email}</div>
                <div className="text-xs text-neutral-500">{a.phone}</div>
              </TableCell>
              <TableCell className="max-w-[140px] text-sm">
                {a.jobTitle ?? (
                  <span className="text-neutral-400">{t.adminAppGeneral}</span>
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
                        toast.success(t.adminToastStatusOk);
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
                        {applicationStatusLabel(locale, s)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <CvRatingCell
                  applicationId={a.id}
                  initialRating={a.cvRating ?? null}
                />
              </TableCell>
              <TableCell>
                {a.cvUrl ? (
                  <a
                    href={a.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-amber-900 underline"
                  >
                    {a.cvFileName ?? t.adminAppCvDownload}
                  </a>
                ) : (
                  <span className="text-neutral-400">—</span>
                )}
              </TableCell>
              <TableCell>
                <NotesCell id={a.id} initialNotes={a.notes} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function CvRatingCell({
  applicationId,
  initialRating,
}: {
  applicationId: string;
  initialRating: number | null;
}) {
  const { t } = useLocale();
  const [value, setValue] = useState<number | null>(initialRating);
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap items-center gap-1">
      {CV_FACES.map(({ score, emoji, activeClass }) => (
        <button
          key={score}
          type="button"
          disabled={pending}
          title={`${score}/5`}
          onClick={() => {
            startTransition(async () => {
              const r = await updateApplicationCvRating(applicationId, score);
              if (r.ok) {
                setValue(score);
                toast.success(t.adminToastCvRatingOk);
              } else {
                toast.error(r.message);
              }
            });
          }}
          className={cn(
            "flex size-9 items-center justify-center rounded-lg border border-transparent text-xl leading-none transition hover:opacity-90",
            value === score
              ? cn("ring-2", activeClass)
              : "bg-neutral-50 opacity-70 hover:bg-neutral-100 hover:opacity-100"
          )}
        >
          <span aria-hidden>{emoji}</span>
          <span className="sr-only">
            {score}/5
          </span>
        </button>
      ))}
      <button
        type="button"
        disabled={pending || value === null}
        onClick={() => {
          startTransition(async () => {
            const r = await updateApplicationCvRating(applicationId, null);
            if (r.ok) {
              setValue(null);
              toast.success(t.adminToastCvRatingOk);
            } else {
              toast.error(r.message);
            }
          });
        }}
        className="ml-1 rounded px-1.5 py-0.5 text-xs text-neutral-500 underline decoration-neutral-300 hover:text-neutral-800 disabled:opacity-30"
      >
        {t.adminCvRatingClear}
      </button>
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
  const { t } = useLocale();
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
              toast.success(t.adminToastNotesOk);
            } else {
              toast.error(r.message);
            }
          });
        }}
      >
        {t.adminAppSaveNotes}
      </Button>
    </div>
  );
}
