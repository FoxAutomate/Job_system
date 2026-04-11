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
  /** Caption above submitted date/time on success card */
  successSubmittedLabel: string;
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
  adminToastCvRatingOk: string;
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
  serverApplyUnexpected: string;
  serverCvUploadFailed: string;
  /** Admin dashboard & CRM */
  adminDashTitle: string;
  adminDashSubtitle: string;
  adminDashJobsCard: string;
  adminDashAppsCard: string;
  adminDashNewOffer: string;
  adminDashManageOffers: string;
  adminDashOpenApps: string;
  adminOffersTitle: string;
  adminOffersSub: string;
  adminOffersNewBtn: string;
  adminOffersHiddenBadge: string;
  adminOffersPublicLink: string;
  adminOffersEmpty: string;
  adminOffersEmptyLink: string;
  adminAppsTitle: string;
  adminAppsSub: string;
  adminBackToOffers: string;
  adminOfferNewTitle: string;
  adminOfferEditTitle: string;
  adminFormSlug: string;
  adminFormSlugPh: string;
  /** Warn: invalid slug does not delete data; fix and save again */
  adminFormSlugWarning: string;
  /** Banner: validation errors do not clear the form */
  adminFormValidationPreservesData: string;
  /** Label for preset dropdown above a field */
  adminFormPresetPickLabel: string;
  adminFormPresetPickPlaceholder: string;
  adminFormTitleLabel: string;
  adminFormShortDesc: string;
  adminFormActive: string;
  adminFormShowSalary: string;
  adminFormSalaryRange: string;
  adminFormSalaryPh: string;
  adminFormEmailTo: string;
  adminFormSectionPage: string;
  adminFormTagline: string;
  adminFormTaglinePh: string;
  adminFormHeroIntro: string;
  adminFormLocation: string;
  adminFormDeadlineText: string;
  /** Optional ISO date (EN block); used for semantic deadline */
  adminFormDeadlineIsoOptional: string;
  adminFormResp: string;
  adminFormReq: string;
  adminFormNice: string;
  adminFormWeOffer: string;
  adminFormListLineHint: string;
  adminFormSalaryCardLine: string;
  adminFormFooterEmail: string;
  /** Optional manual EN (UK) copy for this job listing */
  adminFormSecondLanguage: string;
  adminFormSecondLanguageHelp: string;
  adminFormSectionEnglish: string;
  /** Appended to field labels in the English block */
  adminFormEnSuffix: string;
  adminFormSaved: string;
  adminFormSubmitOffer: string;
  adminSettingsEmailLabel: string;
  adminSettingsPresetHint: string;
  adminSettingsSave: string;
  adminSettingsSaved: string;
  adminJobRowActive: string;
  adminJobRowSalary: string;
  adminJobDeleteConfirm: string;
  adminJobDelete: string;
  adminAppTblDate: string;
  adminAppTblName: string;
  adminAppTblOffer: string;
  adminAppTblStatus: string;
  adminAppTblNotes: string;
  adminAppTblCv: string;
  adminAppTblCvRating: string;
  adminAppGeneral: string;
  adminAppCvDownload: string;
  adminAppSaveNotes: string;
  adminCrmNew: string;
  adminCrmNext: string;
  adminCrmInteresting: string;
  adminCrmRejected: string;
  adminCrmHired: string;
  jobDetailEyebrow: string;
  jobDetailOnePager: string;
  jobDetailLocLabel: string;
  jobDetailDeadLabel: string;
  jobDetailTasks: string;
  jobDetailExpectations: string;
  jobDetailNice: string;
  jobDetailWeOffer: string;
  jobDetailBadge1: string;
  jobDetailBadge2: string;
  jobDetailBadge3: string;
  adminAppFilterLabel: string;
  adminAppFilterAll: string;
  adminAppStatusFilterLabel: string;
  adminAppStatusFilterAll: string;
  adminAppCvRatingFilterLabel: string;
  adminAppCvRatingFilterAll: string;
  adminAppCvRatingFilterNone: string;
  adminCvRatingClear: string;
  footerMadeByPrefix: string;
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
    "Teavitus simuleeritud (seadista SMTP_PASS). / Application submitted — we will contact you soon.",
  toastErrorTitle: "Saatmine ebaõnnestus",
  successTitle: "Aitäh — saime sinu andmed kätte",
  successBody:
    "Võtame peagi ühendust. Kui sa ei lisanud veel CV-d, võid selle hiljem saata aadressile",
  successHint: "Lisa võimalik tööle asumise aeg kirja sisusse.",
  successHome: "Tagasi avalehele",
  successJobsJob: "Vaata teisi pakkumisi",
  successJobsGeneral: "Kõik ametikohad",
  successSubmittedLabel: "Esitatud",
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
  adminToastCvRatingOk: "CV hinne salvestatud",
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
  serverApplyUnexpected:
    "Salvestamine ebaõnnestus. Proovi uuesti või kirjuta otse e-postiga. Kui probleem püsib, kontrolli andmebaasi migratsiooni (cv_rating). / Save failed. Please try again or email us directly.",
  serverCvUploadFailed:
    "CV üleslaadimine salvestusserverisse ebaõnnestus (see ei ole tavaliselt faili suurus). Proovi uuesti, saada kandideerimine ilma manuseta või saada CV e-postiga. / CV storage upload failed (usually not file size). Retry, apply without attachment, or email your CV.",
  adminDashTitle: "Haldus",
  adminDashSubtitle: "Cannery Careers — kuulutused ja kandidaadid",
  adminDashJobsCard: "Kuulutused",
  adminDashAppsCard: "Kandideerimised",
  adminDashNewOffer: "+ Uus kuulutus",
  adminDashManageOffers: "Halda kuulutusi",
  adminDashOpenApps: "Kandidaadid",
  adminOffersTitle: "Kuulutused",
  adminOffersSub: "Muuda aktiivsust, palka või ava muutmiseks",
  adminOffersNewBtn: "+ Uus",
  adminOffersHiddenBadge: "Peidetud",
  adminOffersPublicLink: "Ava avalik leht",
  adminOffersEmpty: "Kuulutusi pole.",
  adminOffersEmptyLink: "Loo esimene",
  adminAppsTitle: "Kandidaadid",
  adminAppsSub: "CRM: staatus ja märkmed",
  adminBackToOffers: "← Kuulutused",
  adminOfferNewTitle: "Uus kuulutus",
  adminOfferEditTitle: "Muuda kuulutust",
  adminFormSlug: "Slug (URL) *",
  adminFormSlugPh: "villimismasinate-koostaja-tehnik",
  adminFormSlugWarning:
    "Vale slug ei kustuta kuulutust ega salvestatud sisu — salvestamine lihtsalt ei õnnestu, kuni slug on kehtiv (väiketähed, numbrid, sidekriipsud). Paranda slug ja salvesta uuesti; vormi tekst jääb alles.",
  adminFormValidationPreservesData:
    "Vorm kontrollib välju enne salvestamist. Ükski viga ei kustuta juba kirjutatud teksti — paranda märgitud koht ja salvesta uuesti.",
  adminFormPresetPickLabel: "Vali valmis väärtus (täidab alloleva välja)",
  adminFormPresetPickPlaceholder: "— vali —",
  adminFormTitleLabel: "Pealkiri *",
  adminFormShortDesc: "Lühikirjeldus (nimekiri) *",
  adminFormActive: "Aktiivne",
  adminFormShowSalary: "Näita palka",
  adminFormSalaryRange: "Palga vahemik",
  adminFormSalaryPh: "1400–1700 € / kuu",
  adminFormEmailTo: "E-post vastuvõtt *",
  adminFormSectionPage: "Lehe sisu",
  adminFormTagline: "Ribatekst (hero)",
  adminFormTaglinePh: "Cannery OÜ · Harjumaa",
  adminFormHeroIntro: "Sissejuhatus *",
  adminFormLocation: "Asukoht *",
  adminFormDeadlineText: "Tähtaeg (tekst) *",
  adminFormDeadlineIsoOptional: "Tähtaeg ISO (valikuline, nt 2026-06-30)",
  adminFormResp: "Tööülesanded (üks rida = üks punkt) *",
  adminFormReq: "Ootused (üks rida = üks punkt) *",
  adminFormNice: "Kasuks tuleb *",
  adminFormWeOffer: "Pakume *",
  adminFormListLineHint: "Üks rida = üks loendipunkt",
  adminFormSalaryCardLine: "Palga rida (kaardi all)",
  adminFormFooterEmail: "Jalus / kontakt e-post (valikuline)",
  adminFormSecondLanguage: "Lisa teine keel (inglise, käsitsi tõlkega)",
  adminFormSecondLanguageHelp:
    "Kui lubatud, kuvatakse kuulutust inglise keeles, kui külastaja valib EN (UK). Täida kõik inglise väljad.",
  adminFormSectionEnglish: "Inglise (Ühendkuningriik)",
  adminFormEnSuffix: " — EN",
  adminFormSaved: "Salvestatud.",
  adminFormSubmitOffer: "Salvesta kuulutus",
  adminSettingsEmailLabel: "Vaikimisi e-post üldiste kandideerimiste jaoks",
  adminSettingsPresetHint: "Vali sageli kasutatav aadress või kirjuta käsitsi.",
  adminSettingsSave: "Salvesta",
  adminSettingsSaved: "Salvestatud.",
  adminJobRowActive: "Aktiivne",
  adminJobRowSalary: "Palk",
  adminJobDeleteConfirm:
    "Kustuta kuulutus? Kandideerimised jäävad alles (seos eemaldatakse).",
  adminJobDelete: "Kustuta",
  adminAppTblDate: "Kuupäev",
  adminAppTblName: "Nimi",
  adminAppTblOffer: "Kuulutus",
  adminAppTblStatus: "Staatus",
  adminAppTblNotes: "Märkmed",
  adminAppTblCv: "CV",
  adminAppTblCvRating: "CV hinne",
  adminAppGeneral: "Üldine",
  adminAppCvDownload: "Laadi alla",
  adminAppSaveNotes: "Salvesta märkmed",
  adminCrmNew: "Uus",
  adminCrmNext: "Järgmine etapp",
  adminCrmInteresting: "Huvitav",
  adminCrmRejected: "Tagasi lükatud",
  adminCrmHired: "Tööle võetud",
  jobDetailEyebrow: "Ametikoht",
  jobDetailOnePager: "Üks leht — kõik oluline",
  jobDetailLocLabel: "Töökoht:",
  jobDetailDeadLabel: "Kandideerimise tähtaeg:",
  jobDetailTasks: "Tööülesanded",
  jobDetailExpectations: "Ootused",
  jobDetailNice: "Kasuks tuleb",
  jobDetailWeOffer: "Omalt poolt pakume",
  jobDetailBadge1: "Masinaehitus & testimine",
  jobDetailBadge2: "CAD & automaatika keskkond",
  jobDetailBadge3: "Reisivalmidus",
  adminAppFilterLabel: "Filtreeri kuulutuse järgi",
  adminAppFilterAll: "Kõik kuulutused",
  adminAppStatusFilterLabel: "Filtreeri oleku järgi",
  adminAppStatusFilterAll: "Kõik olekud",
  adminAppCvRatingFilterLabel: "Filtreeri CV hinde järgi",
  adminAppCvRatingFilterAll: "Kõik hinded",
  adminAppCvRatingFilterNone: "Hindamata",
  adminCvRatingClear: "Tühista hinne",
  footerMadeByPrefix: "Teostas",
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
    "Email simulation — set SMTP_PASS. / Teavitus simuleeritud.",
  toastErrorTitle: "Submission failed",
  successTitle: "Thank you — we have received your details",
  successBody:
    "We will be in touch soon. If you have not attached a CV yet, you can send it later to",
  successHint: "Include your possible start date in the email.",
  successHome: "Back to home",
  successJobsJob: "Browse other roles",
  successJobsGeneral: "All open positions",
  successSubmittedLabel: "Submitted",
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
  adminToastCvRatingOk: "CV score saved",
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
  serverApplyUnexpected:
    "Save failed. Please try again or email us. If this persists, ensure the database migration was applied (e.g. cv_rating column). / Salvestamine ebaõnnestus.",
  serverCvUploadFailed:
    "CV storage upload failed (usually not file size). Retry, apply without attachment, or email your CV. / CV üleslaadimine salvestusserverisse ebaõnnestus.",
  adminDashTitle: "Admin",
  adminDashSubtitle: "Cannery Careers — job posts and candidates",
  adminDashJobsCard: "Job posts",
  adminDashAppsCard: "Applications",
  adminDashNewOffer: "+ New job post",
  adminDashManageOffers: "Manage job posts",
  adminDashOpenApps: "Candidates",
  adminOffersTitle: "Job posts",
  adminOffersSub: "Toggle visibility, salary, or open to edit",
  adminOffersNewBtn: "+ New",
  adminOffersHiddenBadge: "Hidden",
  adminOffersPublicLink: "Open public page",
  adminOffersEmpty: "No job posts yet.",
  adminOffersEmptyLink: "Create the first one",
  adminAppsTitle: "Candidates",
  adminAppsSub: "CRM: status and notes",
  adminBackToOffers: "← Job posts",
  adminOfferNewTitle: "New job post",
  adminOfferEditTitle: "Edit job post",
  adminFormSlug: "Slug (URL) *",
  adminFormSlugPh: "filling-line-technician",
  adminFormSlugWarning:
    "An invalid slug does not delete the job or clear your draft — save fails until the slug is valid (lowercase letters, numbers, hyphens). Fix the slug and save again; your text stays in the form.",
  adminFormValidationPreservesData:
    "Fields are validated before saving. No error clears what you typed — fix the issue and submit again.",
  adminFormPresetPickLabel: "Insert a preset (fills the field below)",
  adminFormPresetPickPlaceholder: "— pick —",
  adminFormTitleLabel: "Title *",
  adminFormShortDesc: "Short description (for listings) *",
  adminFormActive: "Active",
  adminFormShowSalary: "Show salary",
  adminFormSalaryRange: "Salary range",
  adminFormSalaryPh: "€1,400–1,700 / month",
  adminFormEmailTo: "Applications inbox email *",
  adminFormSectionPage: "Page content",
  adminFormTagline: "Tagline (hero)",
  adminFormTaglinePh: "Cannery OÜ · Harju County",
  adminFormHeroIntro: "Introduction *",
  adminFormLocation: "Location *",
  adminFormDeadlineText: "Deadline (display text) *",
  adminFormDeadlineIsoOptional: "Deadline ISO (optional, e.g. 2026-06-30)",
  adminFormResp: "Responsibilities (one line = one bullet) *",
  adminFormReq: "Requirements (one line = one bullet) *",
  adminFormNice: "Nice to have *",
  adminFormWeOffer: "We offer *",
  adminFormListLineHint: "One line = one bullet",
  adminFormSalaryCardLine: "Salary line (under card)",
  adminFormFooterEmail: "Footer / contact email (optional)",
  adminFormSecondLanguage: "Add second language (English — manual translation)",
  adminFormSecondLanguageHelp:
    "When enabled, visitors who choose EN (UK) see this English copy. Fill in every English field below.",
  adminFormSectionEnglish: "English (United Kingdom)",
  adminFormEnSuffix: " — EN",
  adminFormSaved: "Saved.",
  adminFormSubmitOffer: "Save job post",
  adminSettingsEmailLabel: "Default email for general applications",
  adminSettingsPresetHint: "Pick a common inbox or type your own.",
  adminSettingsSave: "Save",
  adminSettingsSaved: "Saved.",
  adminJobRowActive: "Active",
  adminJobRowSalary: "Salary",
  adminJobDeleteConfirm:
    "Delete this job post? Applications are kept (link removed).",
  adminJobDelete: "Delete",
  adminAppTblDate: "Date",
  adminAppTblName: "Name",
  adminAppTblOffer: "Listing",
  adminAppTblStatus: "Status",
  adminAppTblNotes: "Notes",
  adminAppTblCv: "CV",
  adminAppTblCvRating: "CV score",
  adminAppGeneral: "General",
  adminAppCvDownload: "Download",
  adminAppSaveNotes: "Save notes",
  adminCrmNew: "New",
  adminCrmNext: "Next stage",
  adminCrmInteresting: "Interesting",
  adminCrmRejected: "Rejected",
  adminCrmHired: "Hired",
  jobDetailEyebrow: "Role",
  jobDetailOnePager: "One page — everything that matters",
  jobDetailLocLabel: "Location:",
  jobDetailDeadLabel: "Application deadline:",
  jobDetailTasks: "Responsibilities",
  jobDetailExpectations: "Requirements",
  jobDetailNice: "Nice to have",
  jobDetailWeOffer: "What we offer",
  jobDetailBadge1: "Machine build & testing",
  jobDetailBadge2: "CAD & automation environment",
  jobDetailBadge3: "Willingness to travel",
  adminAppFilterLabel: "Filter by job post",
  adminAppFilterAll: "All job posts",
  adminAppStatusFilterLabel: "Filter by status",
  adminAppStatusFilterAll: "All statuses",
  adminAppCvRatingFilterLabel: "Filter by CV score",
  adminAppCvRatingFilterAll: "All scores",
  adminAppCvRatingFilterNone: "Not rated",
  adminCvRatingClear: "Clear score",
  footerMadeByPrefix: "Made by",
};

export const messages: Record<Locale, Messages> = { et, en };
