"use client";

import { useLocale } from "@/lib/i18n/locale-context";

export function AdminDemoBanner() {
  const { t } = useLocale();
  return (
    <div
      className="mb-6 rounded-lg border border-amber-300/80 bg-amber-50 px-4 py-3 text-sm text-amber-950"
      role="status"
    >
      {t.adminDemoBanner}
    </div>
  );
}
