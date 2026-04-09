"use client";

import Link from "next/link";

import { useLocale } from "@/lib/i18n/locale-context";

export function AdminHomeLink() {
  const { t } = useLocale();
  return (
    <Link href="/" className="hover:underline">
      {t.adminLayoutHomeLink}
    </Link>
  );
}
