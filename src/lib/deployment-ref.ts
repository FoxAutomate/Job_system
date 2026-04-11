/**
 * Short Git commit injected at build time (see `next.config.ts`).
 * On Vercel: from `VERCEL_GIT_COMMIT_SHA`; locally: `git rev-parse --short HEAD`.
 */
export const DEPLOYMENT_COMMIT_REF =
  process.env.NEXT_PUBLIC_APP_COMMIT_REF?.trim() || "—";
