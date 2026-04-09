"use client";

import Link from "next/link";

import { useLocale } from "@/lib/i18n/locale-context";

type Props = {
  variant: "new" | "edit";
};

export function AdminOfferPageHeader({ variant }: Props) {
  const { t } = useLocale();

  return (
    <div>
      <Link
        href="/admin/offers"
        className="text-sm text-neutral-600 hover:underline"
      >
        {t.adminBackToOffers}
      </Link>
      <h1 className="mt-2 font-heading text-2xl font-bold">
        {variant === "new" ? t.adminOfferNewTitle : t.adminOfferEditTitle}
      </h1>
    </div>
  );
}
