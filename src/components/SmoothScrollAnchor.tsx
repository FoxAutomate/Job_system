"use client";

import { useCallback } from "react";

import { cn } from "@/lib/utils";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
};

/**
 * Same-page #anchor navigation with smooth scroll (pairs with `scroll-behavior: smooth` on html).
 */
export function SmoothScrollAnchor({
  href,
  className,
  children,
  "aria-label": ariaLabel,
}: Props) {
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!href.startsWith("#")) return;
      const id = href.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
      try {
        history.replaceState(null, "", href);
      } catch {
        /* ignore */
      }
    },
    [href]
  );

  return (
    <a href={href} className={cn(className)} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
