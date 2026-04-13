/** Safe server-side error shape for logs (no secrets). */
export function formatErrorForLog(err: unknown): {
  name?: string;
  message: string;
  stackHead?: string;
  cause?: string;
} {
  if (err instanceof Error) {
    let cause: string | undefined;
    if (err.cause instanceof Error) cause = err.cause.message;
    else if (err.cause != null) cause = String(err.cause);
    return {
      name: err.name,
      message: err.message,
      stackHead: err.stack?.split("\n").slice(0, 8).join(" ← "),
      cause,
    };
  }
  return { message: String(err) };
}

/** True if token looks like a Vercel Blob read-write token (never log the full value). */
export function blobRwTokenShapeOk(token: string | undefined): boolean {
  if (!token) return false;
  return token.startsWith("vercel_blob_rw_");
}
