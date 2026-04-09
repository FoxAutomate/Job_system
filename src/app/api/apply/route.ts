import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

import {
  ALLOWED_CV_MIME,
  MAX_CV_BYTES,
  applyFormSchema,
} from "@/lib/validation";

export const runtime = "nodejs";

type PersistedApplication = {
  id: string;
  receivedAt: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  cv?: { name: string; size: number; type: string } | null;
};

function jsonError(message: string, status: number) {
  return NextResponse.json({ ok: false as const, message }, { status });
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonError("Vormi andmeid ei õnnestunud lugeda.", 400);
  }

  const parsed = applyFormSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message") ?? "",
  });

  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      Object.values(first).flat()[0] ?? "Palun kontrolli väljasid.";
    return jsonError(msg, 400);
  }

  const cvField = formData.get("cv");
  let cvMeta: PersistedApplication["cv"] = null;

  if (cvField instanceof File && cvField.size > 0) {
    if (cvField.size > MAX_CV_BYTES) {
      return jsonError(
        "CV fail on liiga suur (max 5 MB). Proovi väiksemat PDF-i või jäta praegu lisamata.",
        400
      );
    }
    const type = cvField.type || "application/octet-stream";
    if (!ALLOWED_CV_MIME.has(type)) {
      return jsonError(
        "Lubatud on ainult PDF, DOC või DOCX failid.",
        400
      );
    }
    await cvField.arrayBuffer();
    cvMeta = {
      name: cvField.name,
      size: cvField.size,
      type,
    };
  }

  const record: PersistedApplication = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    message: parsed.data.message ?? "",
    cv: cvMeta,
  };

  console.log("[cannery.apply] submission", {
    id: record.id,
    email: record.email,
    hasCv: Boolean(cvMeta),
  });

  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "applications.jsonl");
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8");
  } catch (err) {
    console.warn("[cannery.apply] could not persist to disk (ok on Vercel):", err);
  }

  return NextResponse.json({ ok: true as const, id: record.id });
}
