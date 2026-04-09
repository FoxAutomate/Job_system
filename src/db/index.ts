import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "./schema";

export type Db = ReturnType<typeof drizzle<typeof schema>>;

declare global {
  var __cannery_db: Db | undefined;
}

function createDb(): Db {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local (Neon / Postgres connection string)."
    );
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}

export function getDb(): Db {
  if (process.env.NODE_ENV === "production") {
    return createDb();
  }
  return (globalThis.__cannery_db ??= createDb());
}
