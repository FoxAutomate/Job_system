import type { Job, JobContent, JobOfferLocaleBlock } from "@/db/schema";
import type { Locale } from "@/lib/i18n/messages";

export type ResolvedJobView = {
  title: string;
  shortDescription: string;
  content: JobContent;
};

function mergeContent(base: JobContent, en: JobOfferLocaleBlock): JobContent {
  const pickLines = (primary: string[], fallback: string[]) =>
    primary.length ? primary : fallback;

  return {
    ...base,
    tagline: en.tagline || base.tagline,
    heroIntro: en.heroIntro || base.heroIntro,
    location: en.location || base.location,
    deadlineDisplay: en.deadlineDisplay || base.deadlineDisplay,
    deadlineIso: en.deadlineIso ?? base.deadlineIso,
    responsibilities: pickLines(en.responsibilities, base.responsibilities),
    requirements: pickLines(en.requirements, base.requirements),
    niceToHave: pickLines(en.niceToHave, base.niceToHave),
    weOffer: pickLines(en.weOffer, base.weOffer),
    salaryCardLine: en.salaryCardLine || base.salaryCardLine,
    footerEmail: en.footerEmail || base.footerEmail,
  };
}

/**
 * Primary DB language is Estonian (`job.title` / `content.*`).
 * When `secondLanguageEnabled` and `content.en` exist, locale `en` uses merged English copy.
 */
export function resolveJobForLocale(job: Job, locale: Locale): ResolvedJobView {
  const base = job.content;
  const useEn =
    locale === "en" && base.secondLanguageEnabled && base.en != null;

  if (!useEn) {
    return {
      title: job.title,
      shortDescription: job.shortDescription,
      content: base,
    };
  }

  const en = base.en!;
  return {
    title: en.title || job.title,
    shortDescription: en.shortDescription || job.shortDescription,
    content: mergeContent(base, en),
  };
}
