/** Editable lists for admin dropdowns — company picks a preset to fill the field (can still edit). */

export type AdminPreset = { value: string; label: string };

export const PRESET_INBOX_EMAILS: AdminPreset[] = [
  { value: "birgit@cannery.eu", label: "birgit@cannery.eu (HR / site contact)" },
  {
    value: "noreply@canneryandco.com",
    label: "noreply@canneryandco.com (SMTP From only — not for site mailto)",
  },
  { value: "careers@cannery.eu", label: "careers@cannery.eu" },
];

export const PRESET_TAGLINES: AdminPreset[] = [
  { value: "Cannery OÜ · Harjumaa", label: "Cannery OÜ · Harjumaa" },
  { value: "Cannery OÜ · filling lines", label: "Cannery OÜ · filling lines" },
];

export const PRESET_LOCATIONS: AdminPreset[] = [
  {
    value: "Hoiu 16, Laagri, Harjumaa",
    label: "Hoiu 16, Laagri, Harjumaa",
  },
  {
    value: "Harjumaa (vastavalt kokkuleppele)",
    label: "Harjumaa (by agreement)",
  },
];
