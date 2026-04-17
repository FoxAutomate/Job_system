import type { JobContent } from "@/db/schema";
import { DEFAULT_PUBLIC_CONTACT_EMAIL } from "@/lib/site-email-defaults";

export const defaultJobSlug = "villimismasinate-koostaja-tehnik";

export const seedJob = {
  slug: defaultJobSlug,
  title: "Villimismasinate koostaja-tehnik",
  shortDescription:
    "Mehaaniline montaaž, seadistamine ja testimine — Tallinn. Brutopalk 1400–1700 €.",
  active: true,
  showSalary: true,
  salaryRange: "1400–1700 € / kuu",
  emailTo: DEFAULT_PUBLIC_CONTACT_EMAIL,
  content: {
    tagline: "Canning Brothers · Tallinn",
    heroIntro:
      "Canning Brothers arendab ja ehitab joogitööstusele mõeldud purkidesse villimise liine ning tegeleb jookide tootmisega. Liitu meeskonnaga, kes paneb kokku ja seadistab villimisliine Eestis ja välismaal.",
    location: "Canning tn 12, Tallinn",
    deadlineDisplay: "30.06.2026",
    deadlineIso: "2026-06-30",
    responsibilities: [
      "Mehaaniline montaaž ja seadmete kokkupanek",
      "Seadistamine ja testimine",
      "Vigade tuvastamine ja lahendamine",
      "Suhtlemine tarnijatega",
      "Komponentide inventuur",
      "Töökeskkonna ja seadmete hooldus",
      "Vajadusel väiksed muudatused CAD-is",
    ],
    requirements: [
      "Tehniline haridus (omandatud või pooleli) või kogemus masinate kokkupanekus",
      "Hea käelisus ja tehniline mõtlemine",
      "Kiire õppimisvõime",
      "Täpsus, hoolikkus ja vastutus",
      "Hea füüsiline vorm",
      "Valmidus ärireisideks",
    ],
    niceToHave: [
      "Kogemus tootmisliinide või automatikaga",
      "Põhiteadmised elektrist ja pneumaatikast",
      "Huvi masinate ja joogitööstuse vastu",
      "B-kategooria juhiluba",
    ],
    weOffer: [
      "Huvitavaid ja mitmekülgseid projekte",
      "Õpetamist kohapeal",
      "Tervisekindlustust või spordikompensatsiooni",
      "Arenguvõimalusi",
    ],
    salaryCardLine: "Brutopalk 1400–1700 € kuus",
    footerEmail: DEFAULT_PUBLIC_CONTACT_EMAIL,
  } satisfies JobContent,
};
