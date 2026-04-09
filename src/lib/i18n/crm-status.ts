import type { ApplicationStatus } from "@/db/schema";

import type { Locale } from "@/lib/i18n/messages";
import { messages } from "@/lib/i18n/messages";

export function applicationStatusLabel(
  locale: Locale,
  status: ApplicationStatus
): string {
  const m = messages[locale];
  const map: Record<ApplicationStatus, string> = {
    new: m.adminCrmNew,
    next: m.adminCrmNext,
    interesting: m.adminCrmInteresting,
    rejected: m.adminCrmRejected,
    hired: m.adminCrmHired,
  };
  return map[status];
}
