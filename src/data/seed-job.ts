import type { JobContent } from "@/db/schema";

export const defaultJobSlug = "villimismasinate-koostaja-tehnik";

export const seedJob = {
  slug: defaultJobSlug,
  title: "Villimismasinate koostaja-tehnik",
  shortDescription:
    "Mehaaniline montaaž, seadistamine ja testimine — Laagri, Harjumaa. Brutopalk 1400–1700 €.",
  active: true,
  showSalary: true,
  salaryRange: "1400–1700 € / kuu",
  emailTo: "Birgit@cannery.eu",
  content: {
    tagline: "Cannery OÜ · Harjumaa",
    heroIntro:
      "Cannery OÜ arendab ja ehitab joogitööstusele mõeldud purkidesse villimise liine ning tegeleb jookide tootmisega. Liitu meeskonnaga, kes paneb kokku ja seadistab päris villimisliine üle Eesti ja välismaal.",
    location: "Hoiu 16, Laagri, Harjumaa",
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
    footerEmail: "Birgit@cannery.eu",
  } satisfies JobContent,
};
