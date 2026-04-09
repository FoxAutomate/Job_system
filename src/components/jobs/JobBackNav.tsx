"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/lib/i18n/locale-context";
import { cn } from "@/lib/utils";

export function JobBackNav({ className }: { className?: string }) {
  const router = useRouter();
  const { t } = useLocale();

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/#jobs"
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white/80 px-3 py-2 text-sm font-medium text-neutral-800 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
        >
          <ArrowLeft className="size-4 shrink-0" aria-hidden />
          {t.jobBackToListings}
        </Link>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900"
        >
          {t.jobBackPrevious}
        </button>
      </div>
      <LanguageSwitcher className="self-start sm:self-center" />
    </div>
  );
}
