/**
 * Plain-text defaults for the applicant confirmation (shown in Admin, same placeholders as live mail).
 * When DB value is null and user saves unchanged text, we keep null so the built-in HTML path still runs.
 */
export const DEFAULT_APPLICANT_EMAIL_BODY_ET = [
  "Tere, {{name}}!",
  "",
  "Võtsime vastu Sinu kandideerimise seoses: {{jobLabel}}.",
  "",
  "{{cvHint}}",
  "",
  "Võtame peagi ühendust.",
  "",
  "Canning Brothers Careers · Canning Brothers",
].join("\n");

export const DEFAULT_APPLICANT_EMAIL_BODY_EN = [
  "Hello {{name}},",
  "",
  "We have received your application regarding: {{jobLabel}}.",
  "",
  "{{cvHint}}",
  "",
  "We will be in touch soon.",
  "",
  "Canning Brothers Careers · Canning Brothers",
].join("\n");

export function normalizeApplicantEmailBody(s: string): string {
  return s.replace(/\r\n/g, "\n").trim();
}
