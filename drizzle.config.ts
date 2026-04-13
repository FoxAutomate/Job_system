import { resolve } from "node:path";

import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";

// drizzle-kit does not load .env by itself (Next.js does). Support .env.local too.
loadEnv({ path: resolve(process.cwd(), ".env") });
loadEnv({ path: resolve(process.cwd(), ".env.local"), override: true });

function firstNonEmptyUrl(
  ...keys: string[]
): { url: string; from: string } | undefined {
  for (const key of keys) {
    const v = process.env[key]?.trim();
    if (v) return { url: v, from: key };
  }
  return undefined;
}

const resolved = firstNonEmptyUrl(
  "DATABASE_URL",
  "POSTGRES_URL",
  "POSTGRES_PRISMA_URL"
);

if (!resolved) {
  const dbKeyPresentButEmpty =
    Object.prototype.hasOwnProperty.call(process.env, "DATABASE_URL") &&
    !(process.env.DATABASE_URL ?? "").trim();

  throw new Error(
    dbKeyPresentButEmpty
      ? "DATABASE_URL is empty. Put the full postgresql://… string on the same line as DATABASE_URL= (no line break right after =). Or set POSTGRES_URL / POSTGRES_PRISMA_URL (e.g. from Vercel → Neon)."
      : "No database URL found. Set DATABASE_URL in .env or .env.local (same as for Next.js), or POSTGRES_URL / POSTGRES_PRISMA_URL, then run db:push again."
  );
}

const databaseUrl = resolved.url;

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
