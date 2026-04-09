"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { type Locale, type Messages, messages } from "@/lib/i18n/messages";

const COOKIE = "cannery_locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readCookieLocale(): Locale {
  if (typeof document === "undefined") return "et";
  const m = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE}=([^;]*)`)
  );
  return m?.[1] === "en" ? "en" : "et";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("et");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLocaleState(readCookieLocale());
    setReady(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof document !== "undefined") {
      document.documentElement.lang = next === "en" ? "en-GB" : "et";
      document.cookie = `${COOKIE}=${next}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale === "en" ? "en-GB" : "et";
  }, [locale, ready]);

  const t = useMemo(() => messages[locale], [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

export function useOptionalLocale(): LocaleContextValue | null {
  return useContext(LocaleContext);
}
