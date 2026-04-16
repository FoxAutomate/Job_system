/**
 * Showcase / demo deploy (osobny projekt Vercel, zalecana gałąź `demo`):
 *
 * 1. W Vercel utwórz **nowy** projekt wskazujący na repo (np. branch `demo`) —
 *    nie podłączaj pod istniejący produkcyjny projekt Cannery Jobs, żeby nie
 *    nadpisać produkcji.
 * 2. W Settings → Environment Variables dodaj:
 *    - `DEMO_MODE` = `true`
 *    - `NEXT_PUBLIC_DEMO` = `true`
 *    - `AUTH_SECRET` (losowy), `ADMIN_EMAIL` (np. `admin@cannery-careers.demo` —
 *      pole logowania to `type="email"`, więc nie używaj samego `admin`),
 *    - `ADMIN_PASSWORD_HASH` (bcrypt dla hasła demo, np. `admin123`)
 * 3. **Nie** ustawiaj `DATABASE_URL` / `BLOB_*` produkcji — w demo dane są
 *    statyczne; zgłoszenia nie są zapisywane (patrz `submitApplication`).
 *
 * Na **produkcji** (Cannery Jobs) nie ustawiaj `DEMO_MODE` ani `NEXT_PUBLIC_DEMO`.
 */
export function isDemoMode(): boolean {
  return process.env.DEMO_MODE === "true";
}

/** Inlined w bundle klienta — ustaw tylko przy deployu demo. */
export function isPublicDemo(): boolean {
  return process.env.NEXT_PUBLIC_DEMO === "true";
}

/** Bilingual: CRM / settings mutations blocked in demo (server actions, no locale). */
export const DEMO_ADMIN_READ_ONLY_MSG =
  "Demo režiimis andmeid ei salvestata. / Demo mode: data is not saved.";
