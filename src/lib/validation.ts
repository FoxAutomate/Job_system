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
