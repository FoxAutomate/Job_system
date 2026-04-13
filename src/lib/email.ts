import nodemailer from "nodemailer";

import type { Application, Job } from "@/db/schema";
import { DEFAULT_CANNERY_CAREERS_EMAIL } from "@/lib/site-email-defaults";

/** All application notifications go here unless `APPLICATION_NOTIFY_EMAIL` is set. */
const DEFAULT_APPLICATION_INBOX = DEFAULT_CANNERY_CAREERS_EMAIL;

export type EmailSendResult =
  | { ok: true; via: "smtp" }
  | { ok: true; via: "simulated"; reason: "missing_smtp_pass" };

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

function getSmtpPass(): string | undefined {
  const p = process.env.SMTP_PASS?.trim();
  return p && p.length > 0 ? p : undefined;
}

function getNotifyRecipient(): string {
  const v = process.env.APPLICATION_NOTIFY_EMAIL?.trim();
  return v && v.length > 0 ? v : DEFAULT_APPLICATION_INBOX;
}

function getFromHeader(): string {
  const email =
    process.env.SMTP_FROM_EMAIL?.trim() || DEFAULT_CANNERY_CAREERS_EMAIL;
  const name = process.env.SMTP_FROM_NAME?.trim() || "Cannery Careers";
  const safeName = name.replace(/"/g, "\\");
  return `"${safeName}" <${email}>`;
}

function createSmtpTransport() {
  const pass = getSmtpPass();
  if (!pass) return null;

  const host = process.env.SMTP_HOST?.trim() || "s188.cyber-folks.pl";
  const portRaw = process.env.SMTP_PORT?.trim();
  const port = portRaw ? Number(portRaw) : 465;
  const user =
    process.env.SMTP_USER?.trim() || DEFAULT_CANNERY_CAREERS_EMAIL;

  return nodemailer.createTransport({
    host,
    port: Number.isFinite(port) ? port : 465,
    secure: port === 465,
    auth: { user, pass },
  });
}

function buildNotificationHtml(
  application: Application,
  job: Job | null | undefined,
  adminAppUrl: string
): { html: string; subject: string } {
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
  <p style="font-size:12px;color:#a3a3a3;margin-top:24px;">Cannery Careers · see kiri saadeti automaatselt (SMTP)</p>
</body>
</html>
`;

  const subject = job
    ? `Uus kandideerimine: ${job.title} — ${application.name}`
    : `Uus üldine kandideerimine — ${application.name}`;

  return { html, subject };
}

/**
 * Sends an HTML notification to the application inbox (Cyberfolks SMTP).
 * Requires `SMTP_PASS` for real delivery; otherwise logs payload and returns simulated.
 *
 * Recipient: `APPLICATION_NOTIFY_EMAIL` or {@link DEFAULT_APPLICATION_INBOX}.
 */
export async function sendApplicationNotification(
  application: Application,
  job?: Job | null
): Promise<EmailSendResult> {
  const base = getPublicSiteUrl();
  const adminAppUrl = `${base}/admin/applications?id=${encodeURIComponent(application.id)}`;
  const notifyTo = getNotifyRecipient();
  const { html, subject } = buildNotificationHtml(
    application,
    job ?? null,
    adminAppUrl
  );

  const logPayload = {
    to: notifyTo,
    subject,
    applicationId: application.id,
    applicant: {
      name: application.name,
      email: application.email,
      phone: application.phone,
    },
    job: job
      ? { id: job.id, title: job.title, slug: job.slug }
      : null,
    hasCv: Boolean(application.cvUrl),
    cvUrl: application.cvUrl,
    adminAppUrl,
    sentAt: formatDate(application.createdAt),
  };

  if (!getSmtpPass()) {
    console.warn(
      "[email] SMTP_PASS is not set — simulated notification (set SMTP_PASS on the server for real delivery)"
    );
    console.log(JSON.stringify(logPayload, null, 2));
    return { ok: true, via: "simulated", reason: "missing_smtp_pass" };
  }

  const transport = createSmtpTransport();
  if (!transport) {
    console.warn("[email] SMTP transport could not be created — simulated");
    console.log(JSON.stringify(logPayload, null, 2));
    return { ok: true, via: "simulated", reason: "missing_smtp_pass" };
  }

  try {
    await transport.sendMail({
      from: getFromHeader(),
      to: notifyTo,
      subject,
      html,
    });
  } catch (err) {
    const msg =
      err instanceof Error
        ? err.message
        : typeof err === "object" && err !== null && "message" in err
          ? String((err as { message: unknown }).message)
          : "Unknown SMTP error";
    console.error("[email] SMTP send failed:", err);
    console.log("[email] Payload log:", logPayload);
    throw new Error(`SMTP: ${msg}`);
  }

  return { ok: true, via: "smtp" };
}
