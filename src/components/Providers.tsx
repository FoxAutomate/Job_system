"use client";

import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/sonner";
import { LocaleProvider } from "@/lib/i18n/locale-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <SessionProvider>
        {children}
        <Toaster position="top-center" richColors closeButton duration={5000} />
      </SessionProvider>
    </LocaleProvider>
  );
}
