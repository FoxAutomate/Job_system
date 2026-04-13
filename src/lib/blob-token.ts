/**
 * Vercel / dashboard env values sometimes include trailing newline or accidental quotes.
 */
export function getBlobReadWriteToken(): string | undefined {
  const raw = process.env.BLOB_READ_WRITE_TOKEN;
  if (typeof raw !== "string") return undefined;
  let t = raw.trim();
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    t = t.slice(1, -1).trim();
  }
  return t.length > 0 ? t : undefined;
}
