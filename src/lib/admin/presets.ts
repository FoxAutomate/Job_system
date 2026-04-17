/** Editable lists for admin dropdowns — company picks a preset to fill the field (can still edit). */

export type AdminPreset = { value: string; label: string };

export const PRESET_INBOX_EMAILS: AdminPreset[] = [
  {
    value: "boss@canningbrothers.com",
    label: "boss@canningbrothers.com (HR / site contact)",
  },
  {
    value: "noreply@canningbrothers.com",
    label: "noreply@canningbrothers.com (SMTP From — not for site mailto)",
  },
  { value: "careers@canningbrothers.com", label: "careers@canningbrothers.com" },
];

export const PRESET_TAGLINES: AdminPreset[] = [
  { value: "Canning Brothers · Tallinn", label: "Canning Brothers · Tallinn" },
  {
    value: "Canning Brothers · beverage lines",
    label: "Canning Brothers · beverage lines",
  },
];

export const PRESET_LOCATIONS: AdminPreset[] = [
  {
    value: "Canning tn 12, Tallinn",
    label: "Canning tn 12, Tallinn",
  },
  {
    value: "Tallinn (vastavalt kokkuleppele)",
    label: "Tallinn (by agreement)",
  },
];
