import { Resend } from "resend";

import type { Application, Job } from "@/db/schema";

export type EmailSendResult =
  | { ok: true; via: "resend" }
  | { ok: true; via: "simulated"; reason: "missing_resend_key" };

/** Canonical public URL for links in emails (admin, etc.) */
export function getPublicSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "")}`;
  return "http://localhost:3000";
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(iso: Date | string | null | undefined): string {
  if (!iso) return "—";
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("et-EE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

/**
 * Sends a professional HTML notification to HR about a new application.
 * @param application — persisted row (must include `id`)
 * @param job — concrete job when application is tied to an offer; `null` for general applications
 * @param notifyTo — recipient (job `emailTo` or `site_settings.defaultApplicationEmail`)
 */
export async function sendApplicationNotification(
  application: Application,
  job: Job | null | undefined,
  notifyTo: string
): Promise<EmailSendResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  const base = getPublicSiteUrl();
  const adminAppUrl = `${base}/admin/applications?id=${encodeURIComponent(application.id)}`;

  const jobLabel = job
    ? escapeHtml(job.title)
    : "Üldine kandideerimine (pole seotud konkreetse kuulutusega)";

  const cvBlock =
    application.cvUrl && application.cvUrl.length > 0
      ? `<p><strong>CV:</strong> <a href="${escapeHtml(application.cvUrl)}">${escapeHtml(application.cvFileName ?? "Fail")}</a></p>`
      : "<p><strong>CV:</strong> ei lisatud</p>";

  const messageBlock =
    application.message?.trim()
      ? `<div style="margin-top:12px;padding:12px;background:#f4f4f5;border-radius:8px;"><strong>Sõnum:</strong><br/>${escapeHtml(application.message).replace(/\n/g, "<br/>")}</div>`
      : "<p><em>Sõnumit ei lisatud.</em></p>";

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:system-ui,-apple-system,sans-serif;line-height:1.5;color:#171717;max-width:560px;margin:0;padding:24px;">
  <div style="border-bottom:4px solid #fdb813;padding-bottom:16px;margin-bottom:20px;">
    <h1 style="margin:0;font-size:20px;">Cannery Careers — uus kandideerimine</h1>
    <p style="margin:8px 0 0;font-size:14px;color:#525252;">Saadetud: ${escapeHtml(formatDate(application.createdAt))}</p>
  </div>
  <table style="width:100%;border-collapse:collapse;font-size:15px;">
    <tr><td style="padding:6px 0;color:#737373;width:120px;">Nimi</td><td style="padding:6px 0;"><strong>${escapeHtml(application.name)}</strong></td></tr>
    <tr><td style="padding:6px 0;color:#737373;">E-post</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(application.email)}">${escapeHtml(application.email)}</a></td></tr>
    <tr><td style="padding:6px 0;color:#737373;">Telefon</td><td style="padding:6px 0;">${escapeHtml(application.phone)}</td></tr>
    <tr><td style="padding:6px 0;color:#737373;vertical-align:top;">Ametikoht</td><td style="padding:6px 0;">${jobLabel}</td></tr>
  </table>
  ${messageBlock}
  ${cvBlock}
  <p style="margin-top:24px;">
    <a href="${escapeHtml(adminAppUrl)}" style="display:inline-block;background:#171717;color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px;font-size:14px;font-weight:600;">Ava adminis</a>
  </p>
  <p style="font-size:12px;color:#a3a3a3;margin-top:24px;">Cannery Careers · see kiri saadeti automaatselt</p>
</body>
</html>
`;

  const subject = job
    ? `Uus kandideerimine: ${job.title} — ${application.name}`
    : `Uus üldine kandideerimine — ${application.name}`;

  const logPayload = {
    to: notifyTo,
    subject,
    applicationId: application.id,
    applicant: {
      name: application.name,
      email: application.email,
      phone: application.phone,
    },
    job: job ? { id: job.id, title: job.title, slug: job.slug } : null,
    hasCv: Boolean(application.cvUrl),
    cvUrl: application.cvUrl,
    adminAppUrl,
    sentAt: formatDate(application.createdAt),
  };

  if (!key) {
    console.log(
      "[email] RESEND_API_KEY missing — simulated notification (copy template below)"
    );
    console.log(JSON.stringify(logPayload, null, 2));
    return { ok: true, via: "simulated", reason: "missing_resend_key" };
  }

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to: notifyTo,
    subject,
    html,
  });

  if (error) {
    console.error("[email] Resend error:", error);
    console.log("[email] Fallback log:", logPayload);
    throw new Error(error.message ?? "Email send failed");
  }

  return { ok: true, via: "resend" };
}
