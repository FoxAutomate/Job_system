"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Home, LayoutGrid, Mail } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { buttonVariants } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-context";
import { DEFAULT_PUBLIC_CONTACT_EMAIL } from "@/lib/site-email-defaults";
import { cn } from "@/lib/utils";

type SuccessScreenProps = {
  contactEmail?: string;
  variant?: "general" | "job";
  /** ISO timestamp from server (application createdAt) */
  submittedAtIso?: string;
  onDismiss?: () => void;
};

export function SuccessScreen({
  contactEmail = DEFAULT_PUBLIC_CONTACT_EMAIL,
  variant = "general",
  submittedAtIso,
  onDismiss,
}: SuccessScreenProps) {
  const { locale, t } = useLocale();

  const submittedParts = useMemo(() => {
    if (!submittedAtIso) return null;
    const d = new Date(submittedAtIso);
    if (Number.isNaN(d.getTime())) return null;
    const localeTag = locale === "en" ? "en-GB" : "et-EE";
    return {
      dateLine: d.toLocaleDateString(localeTag, { dateStyle: "long" }),
      timeLine: d.toLocaleTimeString(localeTag, { timeStyle: "short" }),
    };
  }, [submittedAtIso, locale]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-emerald-200/80 bg-emerald-50/90 px-4 py-8 text-center shadow-sm sm:px-8"
      role="status"
    >
      <div className="mx-auto flex max-w-md flex-col items-center gap-4">
        <span className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="size-8" aria-hidden />
        </span>
        <h2 className="font-heading text-xl font-bold text-neutral-900 sm:text-2xl">
          {t.successTitle}
        </h2>
        {submittedParts ? (
          <div className="w-full space-y-1 text-sm text-neutral-700">
            <p className="font-medium text-neutral-800">
              {t.successSubmittedLabel}
            </p>
            <p className="tabular-nums">{submittedParts.dateLine}</p>
            <p className="tabular-nums">{submittedParts.timeLine}</p>
          </div>
        ) : null}
        <p className="text-pretty text-neutral-700">
          {t.successBody}{" "}
          <a
            className="font-medium text-neutral-900 underline underline-offset-2"
            href={`mailto:${contactEmail}?subject=CV`}
          >
            {contactEmail}
          </a>
          .
        </p>
        <p className="flex items-center justify-center gap-2 text-sm text-neutral-600">
          <Mail className="size-4 shrink-0" aria-hidden />
          {t.successHint}
        </p>

        <div className="flex w-full flex-col gap-3 pt-2 sm:flex-row sm:justify-center">
          <Link
            href="/"
            onClick={() => onDismiss?.()}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "inline-flex min-h-12 w-full items-center justify-center gap-2 sm:w-auto"
            )}
          >
            <Home className="size-4" aria-hidden />
            {t.successHome}
          </Link>
          <Link
            href="/#jobs"
            onClick={() => onDismiss?.()}
            className={cn(
              buttonVariants({ size: "lg" }),
              "inline-flex min-h-12 w-full items-center justify-center gap-2 border border-amber-500/30 bg-[var(--cannery-amber)] text-neutral-950 hover:bg-[var(--cannery-amber)]/90 sm:w-auto"
            )}
          >
            <LayoutGrid className="size-4" aria-hidden />
            {variant === "job" ? t.successJobsJob : t.successJobsGeneral}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
