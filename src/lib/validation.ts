import { z } from "zod";

import { type Locale, messages } from "@/lib/i18n/messages";

export function getApplyFormSchema(locale: Locale) {
  const v = messages[locale];
  return z.object({
    fullName: z
      .string()
      .trim()
      .min(2, { message: v.validationFullNameMin })
      .max(120, { message: v.validationFullNameMax }),
    email: z
      .string()
      .trim()
      .min(1, { message: v.validationEmailRequired })
      .email({ message: v.validationEmailInvalid })
      .max(254, { message: v.validationEmailMax }),
    phone: z
      .string()
      .trim()
      .min(5, { message: v.validationPhoneMin })
      .max(32, { message: v.validationPhoneMax }),
    message: z
      .string()
      .max(2000, { message: v.validationMessageMax }),
  });
}

/** Default schema (Estonian) for backwards compatibility */
export const applyFormSchema = getApplyFormSchema("et");

export type ApplyFormValues = z.infer<typeof applyFormSchema>;

export const ALLOWED_CV_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

/** Vercel Blob server upload limit is 4.5 MB — keep client/server max at 4 MB */
export const MAX_CV_BYTES = 4 * 1024 * 1024;

/** Reject obvious garbage (e.g. broken Server-Action File fallback ~10 B) */
export const MIN_CV_BYTES = 64;

/**
 * True if buffer looks like the declared MIME (magic bytes).
 * Prevents storing empty/error payloads as "CV".
 */
export function isCvBufferPlausible(buf: Buffer, mime: string): boolean {
  if (buf.length < MIN_CV_BYTES) return false;
  if (mime === "application/pdf") {
    return buf.subarray(0, 4).toString("ascii") === "%PDF";
  }
  if (
    mime ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return buf[0] === 0x50 && buf[1] === 0x4b;
  }
  if (mime === "application/msword") {
    return (
      buf[0] === 0xd0 &&
      buf[1] === 0xcf &&
      buf[2] === 0x11 &&
      buf[3] === 0xe0
    );
  }
  return false;
}

const EXT_TO_MIME: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

/**
 * Resolves an allowed MIME type for CV upload.
 * Browsers often send PDF as `application/octet-stream` or an empty type — use file extension then.
 */
export function resolveCvMimeType(file: File): string | null {
  const reported = (file.type || "").trim().toLowerCase();
  if (reported && ALLOWED_CV_MIME.has(reported)) return reported;

  const name = file.name || "";
  const dot = name.lastIndexOf(".");
  const ext = dot >= 0 ? name.slice(dot).toLowerCase() : "";
  const fromExt = ext ? EXT_TO_MIME[ext] : undefined;
  if (!fromExt || !ALLOWED_CV_MIME.has(fromExt)) return null;

  const looseMime =
    !reported ||
    reported === "application/octet-stream" ||
    reported === "binary/octet-stream";
  if (looseMime) return fromExt;

  // Browser sent a non-standard type; trust extension for known CV suffixes
  if (!ALLOWED_CV_MIME.has(reported)) return fromExt;

  return null;
}
