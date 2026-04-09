import type { ApplicationStatus } from "@/db/schema";

/** CRM status labels (PL per product spec) */
export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  new: "Nowy",
  next: "Następny etap",
  interesting: "Wart uwagi",
  rejected: "Odrzucony",
  hired: "Zatrudniony",
};
