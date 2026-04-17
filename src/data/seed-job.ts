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
    secondLanguageEnabled: true,
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
    en: {
      title: "Bottling line assembly technician",
      shortDescription:
        "Mechanical assembly, commissioning and testing — Tallinn. Gross salary 1400–1700 €.",
      tagline: "Canning Brothers · Tallinn",
      heroIntro:
        "Canning Brothers designs and builds canning lines for the beverage industry and produces drinks. Join the team that assembles and commissions lines in Estonia and abroad.",
      location: "Canning tn 12, Tallinn",
      deadlineDisplay: "30.06.2026",
      deadlineIso: "2026-06-30",
      responsibilities: [
        "Mechanical assembly and equipment build",
        "Commissioning and testing",
        "Fault finding and resolution",
        "Liaising with suppliers",
        "Parts inventory",
        "Workshop and equipment upkeep",
        "Minor CAD updates when required",
      ],
      requirements: [
        "Technical education (completed or in progress) or hands-on assembly experience",
        "Good dexterity and technical mindset",
        "Quick learner",
        "Accuracy, care and accountability",
        "Good physical fitness",
        "Willingness to travel for work",
      ],
      niceToHave: [
        "Experience with production lines or automation",
        "Basic electrical and pneumatic knowledge",
        "Interest in machinery and beverage production",
        "Category B driving licence",
      ],
      weOffer: [
        "Varied, engaging projects",
        "On-the-job training",
        "Health insurance or sports allowance",
        "Career development opportunities",
      ],
      salaryCardLine: "Gross salary 1400–1700 € per month",
      footerEmail: DEFAULT_PUBLIC_CONTACT_EMAIL,
    },
  } satisfies JobContent,
};

const seedJobPlc = {
  slug: "plc-susteemide-projektija",
  title: "PLC-süsteemide projekteerija ja programmeerija",
  shortDescription:
    "PLC juhtimise projekteerimine, programmeerimine ja käivitamine tootmisliinidel ja tööstusmasinatel — Eesti ja rahvusvahelised projektid.",
  active: true,
  showSalary: true,
  salaryRange: "Palgavahemik kokkuleppel",
  emailTo: DEFAULT_PUBLIC_CONTACT_EMAIL,
  content: {
    secondLanguageEnabled: true,
    tagline: "FOX Automate · tööstusautomaatika",
    heroIntro:
      "Otsime inimest, kes viiks automatikaprojektid alates elektriskeemist kuni PLC tarkvara ja FAT/SAT testideni edukalt käiku klientide juures Eestis ja välismaal.",
    location: "Kontor + väljasõidud klientide juurde",
    deadlineDisplay: "31.08.2026",
    deadlineIso: "2026-08-31",
    responsibilities: [
      "PLC juhtloogika projekteerimine ja arendamine (ladder, ST, FBD — vastavalt projektile)",
      "Integreerimine ajamite, robotite, nägemise ja MES/SCADA süsteemidega",
      "Funktsionaalse ja as-built dokumentatsiooni koostamine",
      "Käivituste toetus ja probleemide lahendamine objektil",
      "Koostöö elektriliste ja mehaaniliste projekteerijatega",
    ],
    requirements: [
      "Elektri- või automaatikaharidus või tõendatud kogemus",
      "Praktiline kogemus vähemalt ühe PLC platvormiga (Siemens, Allen-Bradley, Beckhoff jne)",
      "Masinaohutuse ja ohutusringide põhimõtted",
      "Valmidus lühikesteks väljasõitudeks",
      "Inglise keel tehnilise dokumentatsiooni lugemise tasemel",
    ],
    niceToHave: [
      "Tootja sertifikaadid (PLC / ajamid)",
      "Kogemus EtherNet/IP, Profinet, OPC UA-ga",
      "HMI ja virtualiseerimise alused (TwinCAT, TIA Portal jne)",
    ],
    weOffer: [
      "Mitmekesised integratsiooniprojektid",
      "Areng ja koolitused (sh sertifitseerimised)",
      "Meeskond kogemusega tööstuslikes käivitustes",
    ],
    salaryCardLine: "Palk kokkuleppel",
    footerEmail: DEFAULT_PUBLIC_CONTACT_EMAIL,
    en: {
      title: "PLC systems designer and programmer",
      shortDescription:
        "Design, programming and commissioning of PLC controls on production lines and industrial machinery — Estonia and international projects.",
      tagline: "FOX Automate · industrial automation",
      heroIntro:
        "We need someone who takes automation projects from electrical design through PLC software to FAT/SAT testing, delivering reliable operation at customer sites in Estonia and abroad.",
      location: "Office + customer site visits",
      deadlineDisplay: "31.08.2026",
      deadlineIso: "2026-08-31",
      responsibilities: [
        "Design and develop PLC control logic (ladder, ST, FBD — per project standard)",
        "Integrate drives, robots, vision and MES/SCADA systems",
        "Prepare functional and as-built documentation",
        "Support commissioning and on-site troubleshooting",
        "Collaborate with electrical and mechanical designers",
      ],
      requirements: [
        "Electrical / automation education or proven equivalent experience",
        "Hands-on experience with at least one PLC platform (Siemens, Allen-Bradley, Beckhoff, etc.)",
        "Understanding of machinery safety and safety circuits",
        "Willingness to travel for short site assignments",
        "English sufficient to read technical documentation",
      ],
      niceToHave: [
        "Vendor certifications (PLC / drives)",
        "Experience with EtherNet/IP, Profinet, OPC UA",
        "Basics of HMI and virtualisation (TwinCAT, TIA Portal, etc.)",
      ],
      weOffer: [
        "Diverse integration projects",
        "Training and certification opportunities",
        "A team experienced in industrial commissioning",
      ],
      salaryCardLine: "Salary by agreement",
      footerEmail: DEFAULT_PUBLIC_CONTACT_EMAIL,
    },
  } satisfies JobContent,
};

const seedJobMobileService = {
  slug: "mobiilne-masinate-hooldus",
  title: "Mobiilne masinate hooldus-tehnik",
  shortDescription:
    "Diagnoos, remont ja hooldus klientide juures — välitöö, sõiduhüvitis ja selged väljasõidu tingimused.",
  active: true,
  showSalary: true,
  salaryRange: "Põhipalk + väljasõidu lisad",
  emailTo: DEFAULT_PUBLIC_CONTACT_EMAIL,
  content: {
    secondLanguageEnabled: true,
    tagline: "FOX Automate · väliteenus",
    heroIntro:
      "Liitu meeskonnaga, mis hoiab klientide tootmise töös: kiire reageerimine, põhjalik diagnoos ja selged aruanded sekkumiste kohta.",
    location: "Eesti — väljasõidud klientide tehastesse",
    deadlineDisplay: "15.09.2026",
    deadlineIso: "2026-09-15",
    responsibilities: [
      "Masinate ja tootmisliinide ülevaatused, remontid ja reguleerimised",
      "Mehaaniliste, elektriliste ja pneumaatiliste komponentide vahetus",
      "Rikete põhjuste tuvastamine ja parendusettepanekud",
      "Tehtud tööde ja soovituste dokumenteerimine",
      "Koostöö tehnilise bürooga keerukamatel juhtudel",
    ],
    requirements: [
      "Kogemus tööstusmasinate hoolduses või vastav haridus",
      "Elektriskeemide ja pneumaatikaskeemide lugemine",
      "B-kategooria juhiluba; valmidus regulaarseks väljasõiduks",
      "Iseseisvus, suhtlemisoskus ja professionaalne suhtumine kliendi juures",
    ],
    niceToHave: [
      "SEP / vastavad load vastavalt valdkonnale",
      "PLC ja automaatika alused hooldusperspektiivist",
      "Kogemus toidu- või pakenditööstuses",
    ],
    weOffer: [
      "Sõiduk või läbipaistev kilometraasihüvitis",
      "Tööriistad ja kaitseriietus",
      "Tehniline tugi projektimeeskonnalt",
    ],
    salaryCardLine: "Palk: põhi + lisad",
    footerEmail: DEFAULT_PUBLIC_CONTACT_EMAIL,
    en: {
      title: "Mobile field service technician",
      shortDescription:
        "Diagnosis, repair and maintenance at customer sites — field work, travel allowance and clear trip conditions.",
      tagline: "FOX Automate · field service",
      heroIntro:
        "Join the team that keeps customers’ production running: fast response, solid diagnostics and clear intervention reports.",
      location: "Estonia — travel to customer plants",
      deadlineDisplay: "15.09.2026",
      deadlineIso: "2026-09-15",
      responsibilities: [
        "Inspections, repairs and adjustments on machines and lines",
        "Replacement of mechanical, electrical and pneumatic components",
        "Root-cause analysis and improvement suggestions",
        "Documentation of work performed and customer recommendations",
        "Coordination with the technical office on complex cases",
      ],
      requirements: [
        "Experience in industrial machinery maintenance or relevant education",
        "Ability to read electrical and pneumatic diagrams",
        "Category B licence; willingness to travel regularly",
        "Self-starter, good communication and professional conduct on site",
      ],
      niceToHave: [
        "Electrical qualifications where applicable",
        "Basic PLC and automation from a maintenance perspective",
        "Experience in food or packaging environments",
      ],
      weOffer: [
        "Company car or transparent mileage policy",
        "Tools and PPE",
        "Technical backup from the engineering team",
      ],
      salaryCardLine: "Salary: base + allowances",
      footerEmail: DEFAULT_PUBLIC_CONTACT_EMAIL,
    },
  } satisfies JobContent,
};

const seedJobSalesOffice = {
  slug: "muugiburoo-koordinaator",
  title: "Müügibüroo koordinaator",
  shortDescription:
    "Pakkumiste koordineerimine, B2B kliendisuhtlus ja müügimeeskonna tugi — peamiselt kontoritöö koos büroo korraldamisega.",
  active: true,
  showSalary: true,
  salaryRange: "Palgavahemik kokkuleppel",
  emailTo: DEFAULT_PUBLIC_CONTACT_EMAIL,
  content: {
    secondLanguageEnabled: true,
    tagline: "FOX Automate · müük ja klienditeenus",
    heroIntro:
      "Otsime inimest, kes muudab müügibüroo töö sujuvamaks: esimesest kontaktist materjalide ettevalmistamise ja CRM-i päringuteni ning account managerite toeni.",
    location: "Kontor — pärast sisseelamist võimalik hübriid",
    deadlineDisplay: "30.09.2026",
    deadlineIso: "2026-09-30",
    responsibilities: [
      "Müügimeeskonna kalendrite ja prioriteetide haldamine",
      "Pakkumiste, kokkuvõtete ja esitluste ettevalmistamine",
      "Kliendisuhtlus: telefon, e-post, päringute kandmine CRM-i",
      "Koostöö tehnilise meeskonnaga hindade ja tähtaegade osas",
      "Müügidokumentatsiooni ja mallide korrashoid",
    ],
    requirements: [
      "Vähemalt 2 aastat kogemust büroo- või B2B müügitöös",
      "Väga hea organiseeritus ja kirjalik suhtlemine (eesti / inglise keel)",
      "Kontoritarkvara; valmidus töötada CRM-is",
      "Algatusvõime ja konfidentsiaalsus müügikontaktides",
    ],
    niceToHave: [
      "Kogemus automaatika või tööstusmasinate valdkonnas",
      "Riigihangete või pakkumisprotsesside alused",
    ],
    weOffer: [
      "Stabiilne töökoht kasvavas integratsiooniettevõttes",
      "Toote- ja müügiprotsesside koolitused",
      "Selge roll ja otsene kontakt juhtkonnaga",
    ],
    salaryCardLine: "Palk kokkuleppel",
    footerEmail: DEFAULT_PUBLIC_CONTACT_EMAIL,
    en: {
      title: "Sales office coordinator",
      shortDescription:
        "Co-ordinating proposals, B2B client contact and supporting the sales team — mainly office-based with organising workflow.",
      tagline: "FOX Automate · sales and client service",
      heroIntro:
        "We are looking for someone who streamlines the sales office: from first contact and materials through timely enquiry handling in CRM to supporting account managers.",
      location: "Office — hybrid possible after onboarding",
      deadlineDisplay: "30.09.2026",
      deadlineIso: "2026-09-30",
      responsibilities: [
        "Managing the sales team’s calendars and priorities",
        "Preparing proposals, summaries and simple slide decks",
        "Client contact by phone and email; logging enquiries in CRM",
        "Working with technical staff on pricing and lead times",
        "Keeping sales documentation and templates in order",
      ],
      requirements: [
        "At least 2 years in office or B2B sales support",
        "Strong organisation and written communication (Estonian / English)",
        "Comfort with office software; willingness to use CRM",
        "Proactivity and discretion in commercial conversations",
      ],
      niceToHave: [
        "Experience in automation or industrial machinery",
        "Basics of public procurement or tender processes",
      ],
      weOffer: [
        "Stable role in a growing integration company",
        "Training on products and sales processes",
        "Clear scope and direct access to management",
      ],
      salaryCardLine: "Salary by agreement",
      footerEmail: DEFAULT_PUBLIC_CONTACT_EMAIL,
    },
  } satisfies JobContent,
};

/** Kõik ofertid: primaarkeel eesti, inglise (UK) `content.en` kui keelivalija EN. */
export const SEED_JOBS = [
  seedJobVillimine,
  seedJobPlc,
  seedJobMobileService,
  seedJobSalesOffice,
] as const;

export const seedJob = SEED_JOBS[0];
