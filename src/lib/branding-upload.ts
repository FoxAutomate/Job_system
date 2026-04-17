import { randomUUID } from "node:crypto";

export const BRANDING_KINDS = [
  "logo",
  "homeHeroBg",
  "jobHeroBg",
  "homeOg",
  "jobOg",
  "jobIllustration",
] as const;

export type BrandingUploadKind = (typeof BRANDING_KINDS)[number];

const LOGO_MAX = 1.5 * 1024 * 1024;
const BG_MAX = 4 * 1024 * 1024;
const OG_MAX = 2.5 * 1024 * 1024;
/** Job hero illustration — strict (PNG/WebP only, PNG pixel bounds) */
const JOB_ILLUSTRATION_MAX = 600 * 1024;
const JOB_ILLUSTRATION_MIN_SIDE = 200;
const JOB_ILLUSTRATION_MAX_SIDE = 1024;

function isPngBuffer(buf: Buffer): boolean {
  return (
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  );
}

function readPngIhdrDimensions(buf: Buffer): { w: number; h: number } | null {
  if (!isPngBuffer(buf) || buf.length < 24) return null;
  const chunkLen = buf.readUInt32BE(8);
  if (chunkLen !== 13) return null;
  if (buf.toString("ascii", 12, 16) !== "IHDR") return null;
  return {
    w: buf.readUInt32BE(16),
    h: buf.readUInt32BE(20),
  };
}

function isWebpBuffer(buf: Buffer): boolean {
  if (buf.length < 12) return false;
  return (
    buf.toString("ascii", 0, 4) === "RIFF" &&
    buf.toString("ascii", 8, 12) === "WEBP"
  );
}

function extForMime(mime: string): string {
  switch (mime) {
    case "image/png":
      return ".png";
    case "image/webp":
      return ".webp";
    case "image/jpeg":
      return ".jpg";
    default:
      return ".bin";
  }
}

export function resolveBrandingMime(file: File): string | null {
  const t = (file.type || "").toLowerCase().split(";")[0].trim();
  if (
    t === "image/png" ||
    t === "image/webp" ||
    t === "image/jpeg" ||
    t === "image/jpg"
  ) {
    return t === "image/jpg" ? "image/jpeg" : t;
  }
  const name = file.name.toLowerCase();
  if (name.endsWith(".png")) return "image/png";
  if (name.endsWith(".webp")) return "image/webp";
  if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "image/jpeg";
  return null;
}

export type BrandingValidateResult =
  | { ok: true; mime: string; pathname: string }
  | { ok: false; error: string };

export async function validateBrandingUpload(
  kind: BrandingUploadKind,
  file: File,
  buf: Buffer
): Promise<BrandingValidateResult> {
  const mime = resolveBrandingMime(file);
  if (!mime) {
    return { ok: false, error: "invalid_mime" };
  }

  const id = randomUUID().slice(0, 8);
  const ext = extForMime(mime);
  const pathname = `branding/${kind}-${id}${ext}`;

  switch (kind) {
    case "logo": {
      if (buf.length > LOGO_MAX) return { ok: false, error: "too_large" };
      if (!["image/png", "image/webp", "image/jpeg"].includes(mime)) {
        return { ok: false, error: "invalid_mime" };
      }
      return { ok: true, mime, pathname };
    }
    case "homeHeroBg":
    case "jobHeroBg": {
      if (buf.length > BG_MAX) return { ok: false, error: "too_large" };
      if (!["image/png", "image/webp", "image/jpeg"].includes(mime)) {
        return { ok: false, error: "invalid_mime" };
      }
      return { ok: true, mime, pathname };
    }
    case "homeOg":
    case "jobOg": {
      if (buf.length > OG_MAX) return { ok: false, error: "too_large" };
      if (!["image/png", "image/webp", "image/jpeg"].includes(mime)) {
        return { ok: false, error: "invalid_mime" };
      }
      return { ok: true, mime, pathname };
    }
    case "jobIllustration": {
      if (buf.length > JOB_ILLUSTRATION_MAX) {
        return { ok: false, error: "too_large" };
      }
      if (mime === "image/png") {
        const dim = readPngIhdrDimensions(buf);
        if (!dim) return { ok: false, error: "invalid_png" };
        if (
          dim.w < JOB_ILLUSTRATION_MIN_SIDE ||
          dim.h < JOB_ILLUSTRATION_MIN_SIDE ||
          dim.w > JOB_ILLUSTRATION_MAX_SIDE ||
          dim.h > JOB_ILLUSTRATION_MAX_SIDE
        ) {
          return { ok: false, error: "illustration_dimensions" };
        }
        return { ok: true, mime, pathname };
      }
      if (mime === "image/webp") {
        if (!isWebpBuffer(buf)) return { ok: false, error: "invalid_webp" };
        return { ok: true, mime, pathname };
      }
      return { ok: false, error: "invalid_mime" };
    }
    default:
      return { ok: false, error: "unknown_kind" };
  }
}
