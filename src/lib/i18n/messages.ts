export type Locale = "et" | "en";

export type Messages = {
  languageSwitcherAria: string;
  langEtShort: string;
  langEnShort: string;
  homeHeroEyebrow: string;
  homeHeroTitle: string;
  homeHeroBody: string;
  homeHeroCtaJobs: string;
  homeHeroCtaGeneral: string;
  homeJobsHeading: string;
  homeJobsSub: string;
  jobListEmpty: string;
  jobListBadgeOpen: string;
  jobListSalaryPublished: string;
  jobListSalaryHidden: string;
  jobListDeadline: string;
  jobListCta: string;
  homeFooterContact: string;
  homeFooterAdmin: string;
  jobHeroApply: string;
  jobHeroSalaryPrefix: string;
  jobHeroSalaryNegotiable: string;
  jobBackToListings: string;
  jobBackPrevious: string;
  jobFooterDeadline: string;
  jobFooterCvLine: string;
  jobFooterBackHome: string;
  jobFooterCompany: string;
  applySectionTitleGeneral: string;
  applySectionTitleJob: string;
  applySectionDescGeneral: string;
  applySectionDescJob: string;
  applySectionEmailCta: string;
  formFullName: string;
  formFullNamePh: string;
  formEmail: string;
  formEmailPh: string;
  formPhone: string;
  formPhonePh: string;
  formCvLabel: string;
  formCvHint: string;
  formMessage: string;
  formMessagePh: string;
  formSubmit: string;
  formSubmitting: string;
  formCvTooLargeInline: string;
  toastCvTooLargeTitle: string;
  toastCvTooLargeDesc: string;
  toastSuccessTitle: string;
  toastSuccessDescReal: string;
  toastSuccessDescSim: string;
  toastErrorTitle: string;
  successTitle: string;
  successBody: string;
  successHint: string;
  successHome: string;
  successJobsJob: string;
  successJobsGeneral: string;
  stickyApply: string;
  stickyApplyJob: string;
  adminNavPublic: string;
  adminNavOverview: string;
  adminNavOffers: string;
  adminNavApplications: string;
  adminNavSignOut: string;
  adminLayoutHomeLink: string;
  adminLoginTitle: string;
  adminLoginDesc: string;
  adminLoginEmail: string;
  adminLoginPassword: string;
  adminLoginError: string;
  adminLoginSigningIn: string;
  adminLoginSubmit: string;
  adminLoginLoading: string;
  adminToastStatusOk: string;
  adminToastNotesOk: string;
  validationFullNameMin: string;
  validationFullNameMax: string;
  validationEmailRequired: string;
  validationEmailInvalid: string;
  validationEmailMax: string;
  validationPhoneMin: string;
  validationPhoneMax: string;
  validationMessageMax: string;
  serverCvTooLarge: string;
  serverCvType: string;
  serverJobInactive: string;
  serverFieldsHint: string;
};

const et: Messages = {
  languageSwitcherAria: "Keele valik",
  langEtShort: "ET",
  langEnShort: "EN (UK)",
  homeHeroEyebrow: "Cannery Careers",
  homeHeroTitle: "Tule tööle joogitööstuse masinaehituse juurde",
  homeHeroBody:
    "Cannery OÜ ehitab ja seadistab villimisliine. Siit leiad avatud ametikohad — kandideeri kiiresti, ka telefonist.",
  homeHeroCtaJobs: "Vaata tööpakkumisi",
  homeHeroCtaGeneral: "Üldine kandideerimine",
  homeJobsHeading: "Avatud ametikohad",
  homeJobsSub:
    "Vali konkreetne kuulutus või kasuta allpool üldist kandideerimisvormi.",
  jobListEmpty:
    "Hetkel pole avatud ametikohti. Jälgi lehte või saada üldine kandideerimine allpool.",
  jobListBadgeOpen: "Avatud",
  jobListSalaryPublished: "Palk avaldatud",
  jobListSalaryHidden: "Palk ei ole avaldatud",
  jobListDeadline: "Tähtaeg:",
  jobListCta: "Vaata kuulutust",
  homeFooterContact: "Kontakt:",
  homeFooterAdmin: "Admin",
  jobHeroApply: "Kandideeri kohe",
  jobHeroSalaryPrefix: "Brutopalk:",
  jobHeroSalaryNegotiable: "Palk: kokkuleppel",
  jobBackToListings: "← Tagasi kõikide pakkumiste juurde",
  jobBackPrevious: "Eelmine leht",
  jobFooterDeadline: "Kandideerimise tähtaeg:",
  jobFooterCvLine: "CV ja tööleasumine:",
  jobFooterBackHome: "← Tagasi avalehele",
  jobFooterCompany: "Cannery Careers · Cannery OÜ",
  applySectionTitleGeneral: "Tahad liituda Cannery meeskonnaga?",
  applySectionTitleJob: "Kandideeri sellele ametikohale",
  applySectionDescGeneral:
    "Täida vähemalt nimi, e-post ja telefon. CV võid jätta praegu lisamata — saad selle hiljem e-postiga saata.",
  applySectionDescJob:
    "Täida vähemalt nimi, e-post ja telefon. CV pole kohustuslik — eriti telefonist kandideerides.",
  applySectionEmailCta: "Eelistad otse e-posti? Kirjuta",
  formFullName: "Ees- ja perekonnanimi *",
  formFullNamePh: "nt. Mari Mets",
  formEmail: "E-post *",
  formEmailPh: "sinu@näide.ee",
  formPhone: "Telefon *",
  formPhonePh: "+372 …",
  formCvLabel: "CV (valikuline)",
  formCvHint:
    "Maksimaalne suurus: 4 MB (PDF, DOC, DOCX). Telefonist võid CV hiljem saata.",
  formMessage: "Lühike sissejuhatus (valikuline)",
  formMessagePh: "Miks see töö sind huvitab? (2–3 lauset piisab)",
  formSubmit: "Saada kandideerimine",
  formSubmitting: "Saadan…",
  formCvTooLargeInline:
    "Fail on liiga suur (max 4 MB). / File is too large (max 4 MB).",
  toastCvTooLargeTitle: "CV on liiga suur",
  toastCvTooLargeDesc:
    "Maksimaalne fail on 4 MB. Palun vali väiksem PDF või DOC(X). / Max file size is 4 MB. Please choose a smaller PDF or DOC(X).",
  toastSuccessTitle: "Kandideerimine salvestatud",
  toastSuccessDescReal:
    "Võtame peagi ühendust. / Application submitted successfully. We will contact you soon.",
  toastSuccessDescSim:
    "Teavitus simuleeritud (seadista RESEND_API_KEY). / Application submitted — we will contact you soon.",
  toastErrorTitle: "Saatmine ebaõnnestus",
  successTitle: "Aitäh — saime sinu andmed kätte",
  successBody:
    "Võtame peagi ühendust. Kui sa ei lisanud veel CV-d, võid selle hiljem saata aadressile",
  successHint: "Lisa võimalik tööle asumise aeg kirja sisusse.",
  successHome: "Tagasi avalehele",
  successJobsJob: "Vaata teisi pakkumisi",
  successJobsGeneral: "Kõik ametikohad",
  stickyApply: "Kandideeri",
  stickyApplyJob: "Kandideeri kohe",
  adminNavPublic: "Avalik leht",
  adminNavOverview: "Ülevaade",
  adminNavOffers: "Kuulutused",
  adminNavApplications: "Kandidaadid",
  adminNavSignOut: "Logi välja",
  adminLayoutHomeLink: "← Avaleht",
  adminLoginTitle: "Admin login",
  adminLoginDesc: "Cannery Careers — sisemine haldus",
  adminLoginEmail: "E-post",
  adminLoginPassword: "Parool",
  adminLoginError: "Vale e-post või parool.",
  adminLoginSigningIn: "Sisselogimine…",
  adminLoginSubmit: "Logi sisse",
  adminLoginLoading: "Laadin…",
  adminToastStatusOk: "Olek uuendatud",
  adminToastNotesOk: "Märkmed salvestatud",
  validationFullNameMin: "Palun sisesta vähemalt 2 tähemärki.",
  validationFullNameMax: "Nimi on liiga pikk.",
  validationEmailRequired: "E-post on kohustuslik.",
  validationEmailInvalid: "Palun sisesta kehtiv e-posti aadress.",
  validationEmailMax: "E-post on liiga pikk.",
  validationPhoneMin: "Palun sisesta telefoninumber.",
  validationPhoneMax: "Telefoninumber on liiga pikk.",
  validationMessageMax: "Sõnum on liiga pikk (max 2000 tähemärki).",
  serverCvTooLarge:
    "CV fail on liiga suur (max 4 MB). / CV file is too large (max 4 MB). Try a smaller PDF or skip the attachment for now.",
  serverCvType:
    "Lubatud on ainult PDF, DOC või DOCX failid. / Only PDF, DOC, or DOCX files are allowed.",
  serverJobInactive: "See tööpakkumine ei ole enam aktiivne.",
  serverFieldsHint: "Palun kontrolli väljasid. / Please check the fields.",
};

const en: Messages = {
  languageSwitcherAria: "Language",
  langEtShort: "ET",
  langEnShort: "EN (UK)",
  homeHeroEyebrow: "Cannery Careers",
  homeHeroTitle: "Join beverage machinery engineering at Cannery",
  homeHeroBody:
    "Cannery OÜ builds and commissions filling lines. Browse open roles — apply quickly, including from your phone.",
  homeHeroCtaJobs: "View open positions",
  homeHeroCtaGeneral: "General application",
  homeJobsHeading: "Open positions",
  homeJobsSub: "Pick a specific listing or use the general application form below.",
  jobListEmpty:
    "No open positions right now. Check back soon or use the general application below.",
  jobListBadgeOpen: "Open",
  jobListSalaryPublished: "Salary listed",
  jobListSalaryHidden: "Salary not listed",
  jobListDeadline: "Deadline:",
  jobListCta: "View listing",
  homeFooterContact: "Contact:",
  homeFooterAdmin: "Admin",
  jobHeroApply: "Apply now",
  jobHeroSalaryPrefix: "Gross salary:",
  jobHeroSalaryNegotiable: "Salary: by agreement",
  jobBackToListings: "← Back to all job listings",
  jobBackPrevious: "Previous page",
  jobFooterDeadline: "Application deadline:",
  jobFooterCvLine: "CV and start date:",
  jobFooterBackHome: "← Back to home",
  jobFooterCompany: "Cannery Careers · Cannery OÜ",
  applySectionTitleGeneral: "Want to join the Cannery team?",
  applySectionTitleJob: "Apply for this position",
  applySectionDescGeneral:
    "Fill in at least name, email, and phone. You can add your CV later by email.",
  applySectionDescJob:
    "Fill in at least name, email, and phone. CV is optional — especially when applying from a phone.",
  applySectionEmailCta: "Prefer email? Write to",
  formFullName: "Full name *",
  formFullNamePh: "e.g. Mari Mets",
  formEmail: "Email *",
  formEmailPh: "you@example.com",
  formPhone: "Phone *",
  formPhonePh: "+372 …",
  formCvLabel: "CV (optional)",
  formCvHint:
    "Maximum file size: 4 MB (PDF, DOC, DOCX). On your phone you can send your CV later.",
  formMessage: "Short introduction (optional)",
  formMessagePh: "Why does this role interest you? (2–3 sentences is enough)",
  formSubmit: "Submit application",
  formSubmitting: "Sending…",
  formCvTooLargeInline:
    "File is too large (max 4 MB). / Fail on liiga suur (max 4 MB).",
  toastCvTooLargeTitle: "CV file too large",
  toastCvTooLargeDesc:
    "Maximum file size is 4 MB. Please choose a smaller PDF or DOC(X). / Maksimaalne fail on 4 MB.",
  toastSuccessTitle: "Application saved",
  toastSuccessDescReal:
    "We will contact you soon. / Võtame peagi ühendust.",
  toastSuccessDescSim:
    "Email simulation — set RESEND_API_KEY. / Teavitus simuleeritud.",
  toastErrorTitle: "Submission failed",
  successTitle: "Thank you — we have received your details",
  successBody:
    "We will be in touch soon. If you have not attached a CV yet, you can send it later to",
  successHint: "Include your possible start date in the email.",
  successHome: "Back to home",
  successJobsJob: "Browse other roles",
  successJobsGeneral: "All open positions",
  stickyApply: "Apply",
  stickyApplyJob: "Apply now",
  adminNavPublic: "Public site",
  adminNavOverview: "Overview",
  adminNavOffers: "Job posts",
  adminNavApplications: "Candidates",
  adminNavSignOut: "Sign out",
  adminLayoutHomeLink: "← Home",
  adminLoginTitle: "Admin login",
  adminLoginDesc: "Cannery Careers — internal admin",
  adminLoginEmail: "Email",
  adminLoginPassword: "Password",
  adminLoginError: "Invalid email or password.",
  adminLoginSigningIn: "Signing in…",
  adminLoginSubmit: "Sign in",
  adminLoginLoading: "Loading…",
  adminToastStatusOk: "Status updated",
  adminToastNotesOk: "Notes saved",
  validationFullNameMin: "Please enter at least 2 characters.",
  validationFullNameMax: "Name is too long.",
  validationEmailRequired: "Email is required.",
  validationEmailInvalid: "Please enter a valid email address.",
  validationEmailMax: "Email is too long.",
  validationPhoneMin: "Please enter a phone number.",
  validationPhoneMax: "Phone number is too long.",
  validationMessageMax: "Message is too long (max 2000 characters).",
  serverCvTooLarge:
    "CV file is too large (max 4 MB). / CV fail on liiga suur (max 4 MB). Try a smaller PDF or skip the attachment for now.",
  serverCvType:
    "Only PDF, DOC, or DOCX files are allowed. / Lubatud on ainult PDF, DOC või DOCX.",
  serverJobInactive: "This job listing is no longer active.",
  serverFieldsHint: "Please check the fields. / Palun kontrolli väljasid.",
};

export const messages: Record<Locale, Messages> = { et, en };
