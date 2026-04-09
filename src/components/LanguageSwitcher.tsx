"use client";

import { useLocale } from "@/lib/i18n/locale-context";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white/90 p-0.5 shadow-sm backdrop-blur-sm",
        className
      )}
      role="group"
      aria-label={t.languageSwitcherAria}
    >
      <button
        type="button"
        onClick={() => setLocale("et")}
        className={cn(
          "flex min-h-9 min-w-[4.5rem] items-center justify-center gap-1.5 rounded-full px-2.5 text-xs font-semibold transition-colors",
          locale === "et"
            ? "bg-neutral-900 text-white"
            : "text-neutral-600 hover:bg-neutral-100"
        )}
        aria-pressed={locale === "et"}
      >
        <span aria-hidden>🇪🇪</span>
        <span>{t.langEtShort}</span>
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={cn(
          "flex min-h-9 min-w-[4.5rem] items-center justify-center gap-1.5 rounded-full px-2.5 text-xs font-semibold transition-colors",
          locale === "en"
            ? "bg-neutral-900 text-white"
            : "text-neutral-600 hover:bg-neutral-100"
        )}
        aria-pressed={locale === "en"}
      >
        <span aria-hidden>🇬🇧</span>
        <span>{t.langEnShort}</span>
      </button>
    </div>
  );
}
