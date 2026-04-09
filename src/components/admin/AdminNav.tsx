"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-context";
import { cn } from "@/lib/utils";

export function AdminNav() {
  const pathname = usePathname();
  const { t } = useLocale();

  const links = [
    { href: "/admin", label: t.adminNavOverview },
    { href: "/admin/offers", label: t.adminNavOffers },
    { href: "/admin/applications", label: t.adminNavApplications },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex flex-1 flex-wrap items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
          >
            {t.adminNavPublic}
          </Link>
          <nav className="flex flex-wrap gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === l.href
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-700 hover:bg-neutral-100"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <LanguageSwitcher />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            {t.adminNavSignOut}
          </Button>
        </div>
      </div>
    </header>
  );
}
