import type { JobContent } from "@/db/schema";
import { DEFAULT_PUBLIC_CONTACT_EMAIL } from "@/lib/site-email-defaults";

export const defaultJobSlug = "villimismasinate-koostaja-tehnik";

const seedJobVillimine = {
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

const seedJobPlc = {
  slug: "projektant-ukladow-plc",
  title: "Projektant układów PLC",
  shortDescription:
    "Projektowanie, programowanie i uruchamianie sterowników PLC w liniach produkcyjnych i maszynach przemysłowych.",
  active: true,
  showSalary: true,
  salaryRange: "Widełki: uzgodnienie indywidualnie",
  emailTo: DEFAULT_PUBLIC_CONTACT_EMAIL,
  content: {
    tagline: "FOX Automate · automatyka przemysłowa",
    heroIntro:
      "Szukamy osoby, która od schematu elektrycznego, przez oprogramowanie PLC, po testy FAT/SAT doprowadzi projekty automatyki do sprawnego działania u klientów w Polsce i za granicą.",
    location: "Praca z biura + wyjazdy do klientów",
    deadlineDisplay: "31.08.2026",
    deadlineIso: "2026-08-31",
    responsibilities: [
      "Tworzenie i rozwój logiki sterowania PLC (ladder, ST, FBD — wg standardu projektu)",
      "Integracja z napędami, robotami, wizją i systemami MES/SCADA",
      "Przygotowanie dokumentacji funkcjonalnej i as-built",
      "Wsparcie przy uruchomieniach i rozwiązywaniu problemów w terenie",
      "Współpraca z projektantami elektrycznymi i mechanikami",
    ],
    requirements: [
      "Wykształenie elektryczne / automatyka / pokrewne lub udokumentowane doświadczenie",
      "Praktyczna znajomość co najmniej jednej platformy PLC (Siemens, Allen-Bradley, Beckhoff itp.)",
      "Znajomość zasad bezpieczeństwa maszyn i obwodów bezpieczeństwa",
      "Gotowość do krótkich wyjazdów serwisowych",
      "Znajomość języka angielskiego w zakresie dokumentacji technicznej",
    ],
    niceToHave: [
      "Certyfikaty producentów PLC / napędów",
      "Doświadczenie z EtherNet/IP, Profinet, OPC UA",
      "Podstawy HMI i wirtualizacji (TwinCAT, TIA Portal itd.)",
    ],
    weOffer: [
      "Udział w zróżnicowanych projektach integracji",
      "Możliwość rozwoju kompetencji (szkolenia, certyfikacje)",
      "Pracę w zespole z doświadczeniem w wdrożeniach przemysłowych",
    ],
    salaryCardLine: "Wynagrodzenie: do uzgodnienia",
    footerEmail: DEFAULT_PUBLIC_CONTACT_EMAIL,
  } satisfies JobContent,
};

const seedJobMobileService = {
  slug: "mobilny-serwisant-maszyn",
  title: "Mobilny serwisant maszyn",
  shortDescription:
    "Diagnoza, naprawa i konserwacja maszyn u klienta — praca terenowa, system premii za dyspozycyjność.",
  active: true,
  showSalary: true,
  salaryRange: "Stawka podstawowa + dodatki terenowe",
  emailTo: DEFAULT_PUBLIC_CONTACT_EMAIL,
  content: {
    tagline: "FOX Automate · serwis terenowy",
    heroIntro:
      "Dołącz do zespołu, który utrzymuje ciągłość produkcji u naszych klientów: szybka reakcja, solidna diagnostyka i rzetelne raporty z interwencji.",
    location: "Polska — wyjazdy do zakładów klientów",
    deadlineDisplay: "15.09.2026",
    deadlineIso: "2026-09-15",
    responsibilities: [
      "Przeglądy, naprawy i regulacje maszyn i linii produkcyjnych",
      "Wymiana podzespołów mechanicznych, elektrycznych i pneumatycznych",
      "Identyfikacja przyczyn awarii i propozycje usprawnień",
      "Dokumentacja wykonanych prac i zaleceń dla klienta",
      "Współpraca z biurem technicznym przy trudniejszych case’ach",
    ],
    requirements: [
      "Doświadczenie w serwisie maszyn przemysłowych lub pokrewne wykształcenie",
      "Czytanie schematów elektrycznych i pneumatycznych",
      "Prawo jazdy kat. B; gotowość do regularnych podróży służbowych",
      "Samodzielność, komunikatywność i kultura pracy u klienta",
    ],
    niceToHave: [
      "Uprawnienia SEP / UDT wg zakresu",
      "Znajomość podstaw automatyki i PLC z perspektywy serwisu",
      "Doświadczenie w branży spożywczej / packaging",
    ],
    weOffer: [
      "Pojazd służbowy lub jasne zasady rozliczenia kilometrówki",
      "Narzędzia i odzież robocza",
      "Wsparcie techniczne zespołu projektowego",
    ],
    salaryCardLine: "Wynagrodzenie: podstawa + dodatki",
    footerEmail: DEFAULT_PUBLIC_CONTACT_EMAIL,
  } satisfies JobContent,
};

const seedJobSalesOffice = {
  slug: "osoba-zarzadzajaca-biuro-sprzedazy",
  title: "Osoba zarządzająca do biura sprzedaży",
  shortDescription:
    "Koordynacja ofert, kontakt z klientami B2B i wsparcie zespołu handlowego — praca stacjonarna z elementem organizacji pracy biura.",
  active: true,
  showSalary: true,
  salaryRange: "Widełki: uzgodnienie indywidualnie",
  emailTo: DEFAULT_PUBLIC_CONTACT_EMAIL,
  content: {
    tagline: "FOX Automate · sprzedaż i obsługa klienta",
    heroIntro:
      "Poszukujemy osoby, która usprawni pracę biura sprzedaży: od pierwszego kontaktu, przez przygotowanie materiałów, po terminową obsługę zapytań i wsparcie account managerów.",
    location: "Biuro — hybrydowo możliwe po okresie wdrożenia",
    deadlineDisplay: "30.09.2026",
    deadlineIso: "2026-09-30",
    responsibilities: [
      "Prowadzenie kalendarza spotkań i priorytetów zespołu sprzedaży",
      "Przygotowywanie ofert, zestawień i prostych zestawów prezentacyjnych",
      "Kontakt z klientami: telefon, e-mail, rejestracja zapytań w CRM",
      "Współpraca z działem technicznym przy wycenach i terminach",
      "Dbanie o porządek w dokumentacji handlowej i szablonach",
    ],
    requirements: [
      "Minimum 2 lata doświadczenia w pracy biurowej lub sprzedaży B2B",
      "Bardzo dobra organizacja pracy i komunikacja pisemna (PL/EN mile widziane)",
      "Znajomość pakietu biurowego; chęć pracy w CRM",
      "Proaktywność i poufność w kontaktach handlowych",
    ],
    niceToHave: [
      "Doświadczenie w branży automatyki lub maszyn przemysłowych",
      "Znajomość podstaw Prawa zamówień publicznych lub procedur przetargowych",
    ],
    weOffer: [
      "Stabilne zatrudnienie w rosnącej firmie integratorskiej",
      "Szkolenia z produktów i procesów sprzedażowych",
      "Jasny zakres obowiązków i bezpośredni kontakt z zarządem",
    ],
    salaryCardLine: "Wynagrodzenie: do uzgodnienia",
    footerEmail: DEFAULT_PUBLIC_CONTACT_EMAIL,
  } satisfies JobContent,
};

/** Kolejność: pierwsza oferta = dotychczasowy seed (ET), kolejne trzy — demo PL / FOX Automate. */
export const SEED_JOBS = [
  seedJobVillimine,
  seedJobPlc,
  seedJobMobileService,
  seedJobSalesOffice,
] as const;

export const seedJob = SEED_JOBS[0];
