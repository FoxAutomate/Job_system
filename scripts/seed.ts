import "dotenv/config";
import { eq } from "drizzle-orm";

import { getDb } from "../src/db";
import { jobs, siteSettings } from "../src/db/schema";
import { seedJob } from "../src/data/seed-job";
import { DEFAULT_PUBLIC_CONTACT_EMAIL } from "../src/lib/site-email-defaults";

async function main() {
  const db = getDb();
  const settingsRow = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.id, "default"))
    .limit(1);

  if (settingsRow.length === 0) {
    await db.insert(siteSettings).values({
      id: "default",
      defaultApplicationEmail: DEFAULT_PUBLIC_CONTACT_EMAIL,
    });
    console.log("Seeded site_settings");
  }

  const existing = await db
    .select({ id: jobs.id })
    .from(jobs)
    .where(eq(jobs.slug, seedJob.slug))
    .limit(1);

  if (existing.length === 0) {
    await db.insert(jobs).values({
      slug: seedJob.slug,
      title: seedJob.title,
      shortDescription: seedJob.shortDescription,
      active: seedJob.active,
      showSalary: seedJob.showSalary,
      salaryRange: seedJob.salaryRange,
      emailTo: seedJob.emailTo,
      content: seedJob.content,
    });
    console.log("Seeded job:", seedJob.slug);
  } else {
    console.log("Job already exists:", seedJob.slug);
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
