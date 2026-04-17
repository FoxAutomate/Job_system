"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { getDb } from "@/db";
import { siteSettings } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-guard";
import { isTrustedCvBlobUrl } from "@/lib/blob-trust";
import { DEMO_ADMIN_READ_ONLY_MSG, isDemoMode } from "@/lib/demo-mode";

function normalizeAssetUrl(raw: string): string | null {
  const s = raw.trim();
  if (!s) return null;
  if (s.startsWith("https://") && isTrustedCvBlobUrl(s)) return s;
  if (s.startsWith("/") && !s.includes("..") && !s.includes("//")) return s;
  return null;
}

function parseField(
  formData: FormData,
  name: string,
  label: string
): { ok: true; value: string | null } | { ok: false; message: string } {
  const raw = formData.get(name);
  if (raw == null || raw === "") {
    return { ok: true, value: null };
  }
  if (typeof raw !== "string") {
    return { ok: false, message: `${label}: invalid value.` };
  }
  const n = normalizeAssetUrl(raw);
  if (!n) {
    return {
      ok: false,
      message: `${label}: allowed are relative paths (/…) or Vercel Blob HTTPS URLs.`,
    };
  }
  return { ok: true, value: n };
}

export async function updateSiteBranding(
  _prev: { ok: boolean; message?: string } | null,
  formData: FormData
): Promise<{ ok: boolean; message?: string }> {
  await requireAdmin();
  if (isDemoMode()) {
    return { ok: false, message: DEMO_ADMIN_READ_ONLY_MSG };
  }

  const parsedLogo = parseField(formData, "siteLogoUrl", "Logo");
  if (!parsedLogo.ok) return parsedLogo;
  const parsedHomeBg = parseField(
    formData,
    "homeHeroBackgroundUrl",
    "Home hero background"
  );
  if (!parsedHomeBg.ok) return parsedHomeBg;
  const parsedJobBg = parseField(
    formData,
    "jobHeroBackgroundUrl",
    "Job hero background"
  );
  if (!parsedJobBg.ok) return parsedJobBg;
  const parsedHomeOg = parseField(
    formData,
    "homeOpenGraphImageUrl",
    "Home OG image"
  );
  if (!parsedHomeOg.ok) return parsedHomeOg;
  const parsedJobOg = parseField(
    formData,
    "jobOpenGraphImageUrl",
    "Job OG image"
  );
  if (!parsedJobOg.ok) return parsedJobOg;
  const parsedIll = parseField(
    formData,
    "jobListingIllustrationUrl",
    "Job listing illustration"
  );
  if (!parsedIll.ok) return parsedIll;

  const db = getDb();
  const [row] = await db
    .select({ id: siteSettings.id })
    .from(siteSettings)
    .where(eq(siteSettings.id, "default"))
    .limit(1);

  if (!row) {
    return {
      ok: false,
      message: "Save site email settings once before branding.",
    };
  }

  await db
    .update(siteSettings)
    .set({
      siteLogoUrl: parsedLogo.value,
      homeHeroBackgroundUrl: parsedHomeBg.value,
      jobHeroBackgroundUrl: parsedJobBg.value,
      homeOpenGraphImageUrl: parsedHomeOg.value,
      jobOpenGraphImageUrl: parsedJobOg.value,
      jobListingIllustrationUrl: parsedIll.value,
      updatedAt: new Date(),
    })
    .where(eq(siteSettings.id, "default"));

  revalidatePath("/", "layout");
  revalidatePath("/jobs", "layout");
  revalidatePath("/admin/branding");
  return { ok: true };
}
