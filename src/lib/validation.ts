import { z } from "zod";

export const applyFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Palun sisesta vähemalt 2 tähemärki." })
    .max(120, { message: "Nimi on liiga pikk." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "E-post on kohustuslik." })
    .email({ message: "Palun sisesta kehtiv e-posti aadress." })
    .max(254),
  phone: z
    .string()
    .trim()
    .min(5, { message: "Palun sisesta telefoninumber." })
    .max(32, { message: "Telefoninumber on liiga pikk." }),
  message: z
    .string()
    .max(2000, { message: "Sõnum on liiga pikk (max 2000 tähemärki)." }),
});

export type ApplyFormValues = z.infer<typeof applyFormSchema>;

export const ALLOWED_CV_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export const MAX_CV_BYTES = 5 * 1024 * 1024;
