"use client";

import Link from "next/link";

import { useLocale } from "@/lib/i18n/locale-context";

type HomePageFooterProps = {
  defaultMail: string;
};

export function HomePageFooter({ defaultMail }: HomePageFooterProps) {
  const { t } = useLocale();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-100 px-4 py-8 text-center text-sm text-neutral-600 sm:px-6">
      <p className="mt-2">
        {t.homeFooterContact}{" "}
        <a
          className="font-medium text-neutral-900 underline underline-offset-2"
          href={`mailto:${defaultMail}`}
        >
          {defaultMail}
        </a>
      </p>
      <p className="mt-4 text-xs text-neutral-500">
        Cannery Careers · Cannery OÜ
      </p>
      <p className="mt-2">
        <Link
          href="/admin/login"
          className="text-xs text-neutral-400 hover:text-neutral-600"
        >
          {t.homeFooterAdmin}
        </Link>
      </p>
    </footer>
  );
}
