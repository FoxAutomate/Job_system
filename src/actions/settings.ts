"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getDb } from "@/db";
import { siteSettings } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-guard";

const schema = z.object({
  defaultApplicationEmail: z.string().email(),
});

export async function updateDefaultApplicationEmail(
  _prev: unknown,
  formData: FormData
): Promise<{ ok: boolean; message?: string }> {
  await requireAdmin();
  const raw = String(formData.get("defaultApplicationEmail") ?? "");
  const parsed = schema.safeParse({ defaultApplicationEmail: raw });
  if (!parsed.success) {
    return { ok: false, message: "Kehtiv e-posti aadress on vajalik." };
  }
  const db = getDb();
  const email = parsed.data.defaultApplicationEmail;
  await db
    .insert(siteSettings)
    .values({
      id: "default",
      defaultApplicationEmail: email,
    })
    .onConflictDoUpdate({
      target: siteSettings.id,
      set: {
        defaultApplicationEmail: email,
        updatedAt: new Date(),
      },
    });
  revalidatePath("/admin");
  revalidatePath("/");
  return { ok: true };
}
