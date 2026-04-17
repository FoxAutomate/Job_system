"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLogoLinkProps = {
  logoSrc: string;
  href?: string;
  /** Shown on link for a11y */
  ariaLabel: string;
  className?: string;
  /** Prefer true on LCP (e.g. home hero). */
  priority?: boolean;
};

/**
 * Logo in a pill container aligned with {@link LanguageSwitcher} (height, border, blur).
 */
export function BrandLogoLink({
  logoSrc,
  href = "/",
  ariaLabel,
  className,
  priority = false,
}: BrandLogoLinkProps) {
  const remote = logoSrc.startsWith("http");

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex h-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white/90 px-2.5 shadow-sm backdrop-blur-sm sm:h-10 sm:px-3",
        className
      )}
    >
      <span className="relative block h-6 w-[9.5rem] sm:h-7 sm:w-[11.25rem]">
        <Image
          src={logoSrc}
          alt=""
          fill
          className="object-contain object-center"
          sizes="(max-width: 640px) 152px, 180px"
          priority={priority}
          unoptimized={remote}
        />
      </span>
    </Link>
  );
}
