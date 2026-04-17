# Job System — moduł rekrutacyjny (portfolio FOX Automate)

Ten dokument jest **lokalnym podsumowaniem** dla zespołu pracującego nad **[foxautomate.com](https://foxautomate.com)** (główna strona firmy). **Job System** to osobna aplikacja Next.js — element portfolio / demonstracja procesu rekrutacji i obsługi ofert; docelowo linkowana z głównej witryny (np. sekcja „Kariera”, osobna poddomena lub strona docelowa).

### Ważne: jeden właściwy remote (Job System)

Do pracy nad modułem pod **FOX Automate** i do linkowania z **foxautomate.com** używaj **wyłącznie** repozytorium **Job System** (w Git zwykle remote `job_system` → [FoxAutomate/Job_system](https://github.com/FoxAutomate/Job_system)).

**Nie** traktuj jako źródła wdrożenia ani nie podpinaj pod stronę firmową projektów powiązanych z innymi remote’ami w lokalnym klonie, np. **`Hans_job_page`** ani **`Cannery_Job`** — to osobne ścieżki/repo; linkowanie tam grozi prowadzeniem użytkowników na **zły** build lub **przestarzały** kod. Przed `git push` sprawdź: `git remote -v` i upewnij się, że wypychasz na **`job_system`**, nie na `origin` / `hans_job_page`, jeśli te wskazują na Cannery_Job lub Hans_job_page.

**Cannery_Job (`origin` → produkcja klienta, np. job.canneryandco.com):** to repozytorium jest **poza zakresem** rozwoju Job System. **Nie wypychaj** na nie zmian z tego modułu (`git push origin …`), chyba że jest to **osobna, świadoma** decyzja klienta — nowszy kod Job System wymagałby wtedy **migracji bazy** na Neon; w przeciwnym razie produkcja może zwracać 500. Rozwój i push: **wyłącznie** `git push job_system main` (lub uzgodniona gałąź).

**Publiczny URL demo (Vercel):** [https://project-nk69r.vercel.app](https://project-nk69r.vercel.app)

---

## Co to robi (krótko)

- **Publicznie:** lista aktywnych ofert, szczegóły oferty, formularz aplikacyjny (CV, dane kontaktowe).
- **Admin:** logowanie (NextAuth), CRUD ofert, branding (logo, tła, OG), przegląd zgłoszeń.
- **Tryb demo (`DEMO_MODE` / `NEXT_PUBLIC_DEMO`):** aplikacja działa **bez bazy**; oferty i ustawienia pochodzą z **hardcodowanych fixture’ów** (`src/data/demo-fixtures.ts` + `src/data/seed-job.ts`). Zgłoszenia demo nie zapisują się w DB (logika w akcjach). Treść ofert w seedzie: **język podstawowy estoński** (`title`, `shortDescription`, `content.*`), **angielski (UK)** w `content.en` + `secondLanguageEnabled` — zgodnie z przełącznikiem ET / EN (UK) w UI.

---

## Repozytoria Git

**Kanoniczne repo modułu (jedyny cel push i integracji z foxautomate.com):**

| Remote (typowo) | URL |
|-----------------|-----|
| **`job_system`** | `https://github.com/FoxAutomate/Job_system.git` |

Inne remote’y mogą istnieć lokalnie wyłącznie ze względu na historię klonów — **nie** używaj ich do wdrożenia ani nie podawaj ich URL w materiałach pod link do „Job System”:

| Remote (unikać jako źródła modułu) | Przykład URL |
|-----------------------------------|--------------|
| `origin` (często) | `https://github.com/FoxAutomate/Cannery_Job.git` |
| `hans_job_page` | `https://github.com/FoxAutomate/Hans_job_page.git` |

**Nowy zespół:** `git clone https://github.com/FoxAutomate/Job_system.git` — potem Vercel podłączony do **tego** repozytorium i brancha uzgodnionego z zespołem.

---

## Vercel

- Projekt jest przygotowany pod **Next.js 15** i typowy deploy na **Vercel**.
- **Demo:** warto trzymać **osobny projekt Vercel** (np. branch `demo`), żeby nie mieszać z produkcyjnym deployem głównej strony foxautomate.com — patrz komentarze w `env.demo.example`.
- **Aktualny URL demo (linkuj z foxautomate.com tutaj):** [https://project-nk69r.vercel.app](https://project-nk69r.vercel.app) — [Canning Brothers Careers — tööpakkumised](https://project-nk69r.vercel.app).

- Zmienne środowiskowe: produkcja z bazą (Neon itd.) vs. demo bez `DATABASE_URL` — szczegóły w `env.demo.example` i w kodzie `src/lib/demo-mode.ts`, `src/lib/queries.ts`.

---

## Ważne ścieżki w repozytorium

| Obszar              | Ścieżki |
|---------------------|---------|
| Oferty — seed / demo | `src/data/seed-job.ts` (`SEED_JOBS`), `src/data/demo-fixtures.ts` |
| Zapytania o oferty   | `src/lib/queries.ts` |
| Tryb demo            | `src/lib/demo-mode.ts` |
| Schema DB            | `src/db/schema.ts` |
| Seed bazy (nie demo) | `scripts/seed.ts` |
| Admin ofert          | `src/app/admin/offers/` |
| Branding             | `src/app/admin/branding/`, `src/actions/branding.ts` |
| Publiczne strony     | `src/app/page.tsx`, `src/app/jobs/` |

---

## Jak podlinkować demo pod foxautomate.com

1. **Link prosty (zalecane na start):** przycisk lub baner „Kariera / Oferty” → otwiera **nową kartę** z **`https://project-nk69r.vercel.app`** (lub z custom domeną, np. `kariera.foxautomate.com` wskazującą na **ten sam** projekt Vercel co Job System — nie inny fork/repo).
2. **Subdomena:** w DNS ustaw CNAME subdomeny na Vercel; w projekcie Vercel dodaj domenę — użytkownik pozostaje w „strefie” FOX Automate, a hosting nadal na Vercel.
3. **Iframe:** technicznie możliwe, ale **niezalecane** (SEO, cookies, UX, responsywność). Jeśli kiedyś potrzebne — uzgodnij z zespołem frontu głównej strony i sprawdź `X-Frame-Options` / CSP.

**Komunikat dla zespołu foxautomate.com:** Job System to **osobny deployment**; główna strona tylko **kieruje ruch** (link / subdomena). Treści ofert w demo mogą być częściowo przykładowe (FOX Automate + istniejąca oferta ET w seed).

---

## Zamknięcie etapu

Na tym etapie zakłada się **zamknięcie prac** nad tym projektem jako samodzielnym modułem: kolejne kroki to integracja linków i ewentualnie wspólny branding na foxautomate.com, bez konieczności dalszej rozbudowy backendu w tym repozytorium — chyba że pojawią się nowe wymagania HR.

---

*Plik: `JobSystem.md` (root repozytorium). Po zmianie domeny Vercel zaktualizuj URL demo powyżej; remote kanoniczny pozostaje **Job_system**.*
