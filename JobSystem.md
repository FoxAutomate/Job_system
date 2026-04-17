# Job System — moduł rekrutacyjny (portfolio FOX Automate)

Ten dokument jest **lokalnym podsumowaniem** dla zespołu pracującego nad **[foxautomate.com](https://foxautomate.com)** (główna strona firmy). **Job System** to osobna aplikacja Next.js — element portfolio / demonstracja procesu rekrutacji i obsługi ofert; docelowo linkowana z głównej witryny (np. sekcja „Kariera”, osobna poddomena lub strona docelowa).

---

## Co to robi (krótko)

- **Publicznie:** lista aktywnych ofert, szczegóły oferty, formularz aplikacyjny (CV, dane kontaktowe).
- **Admin:** logowanie (NextAuth), CRUD ofert, branding (logo, tła, OG), przegląd zgłoszeń.
- **Tryb demo (`DEMO_MODE` / `NEXT_PUBLIC_DEMO`):** aplikacja działa **bez bazy**; oferty i ustawienia pochodzą z **hardcodowanych fixture’ów** (`src/data/demo-fixtures.ts` + `src/data/seed-job.ts`). Zgłoszenia demo nie zapisują się w DB (logika w akcjach).

---

## Repozytoria Git (stan w klonie roboczym)

W jednym katalogu mogą być skonfigurowane **kilka remote’ów** — przed linkowaniem w dokumentacji firmowej **potwierdź**, które repo jest „kanoniczne” dla tego wdrożenia:

| Remote        | Przykładowy URL (do weryfikacji w `git remote -v`)        |
|---------------|-------------------------------------------------------------|
| `origin`      | `https://github.com/FoxAutomate/Cannery_Job.git`           |
| `hans_job_page` | `https://github.com/FoxAutomate/Hans_job_page.git`      |
| `job_system`  | `https://github.com/FoxAutomate/Job_system.git`             |

**Źródło kodu w tym workspace:** ścieżka lokalna projektu to katalog z tym plikiem (np. `Hans_job_page`). Nowy zespół powinien sklonować właściwe repo i ustawić Vercel na ten sam branch co używacie do demo/produkcji modułu.

---

## Vercel

- Projekt jest przygotowany pod **Next.js 15** i typowy deploy na **Vercel**.
- **Demo:** warto trzymać **osobny projekt Vercel** (np. branch `demo`), żeby nie mieszać z produkcyjnym deployem głównej strony foxautomate.com — patrz komentarze w `env.demo.example`.
- **URL demo:** wpisz tutaj po deployu faktyczny adres (np. `https://<projekt>.vercel.app` lub domena custom), np.:

  `DEMO_URL=` _uzupełnij z dashboardu Vercel_

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

1. **Link prosty (zalecane na start):** przycisk lub baner „Kariera / Oferty” → otwiera **nową kartę** z URL demo na Vercel (lub z custom domeną, np. `kariera.foxautomate.com` wskazującą na ten projekt).
2. **Subdomena:** w DNS ustaw CNAME subdomeny na Vercel; w projekcie Vercel dodaj domenę — użytkownik pozostaje w „strefie” FOX Automate, a hosting nadal na Vercel.
3. **Iframe:** technicznie możliwe, ale **niezalecane** (SEO, cookies, UX, responsywność). Jeśli kiedyś potrzebne — uzgodnij z zespołem frontu głównej strony i sprawdź `X-Frame-Options` / CSP.

**Komunikat dla zespołu foxautomate.com:** Job System to **osobny deployment**; główna strona tylko **kieruje ruch** (link / subdomena). Treści ofert w demo mogą być częściowo przykładowe (FOX Automate + istniejąca oferta ET w seed).

---

## Zamknięcie etapu

Na tym etapie zakłada się **zamknięcie prac** nad tym projektem jako samodzielnym modułem: kolejne kroki to integracja linków i ewentualnie wspólny branding na foxautomate.com, bez konieczności dalszej rozbudowy backendu w tym repozytorium — chyba że pojawią się nowe wymagania HR.

---

*Plik: `JobSystem.md` (root repozytorium). Aktualizuj `DEMO_URL` i tabelę remote’ów po zmianach infrastruktury.*
