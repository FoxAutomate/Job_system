import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/** Structured job page content (Estonian UI strings + lists) */
export type JobContent = {
  tagline: string;
  heroIntro: string;
  location: string;
  deadlineDisplay: string;
  deadlineIso?: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  weOffer: string[];
  /** Shown in offer card when showSalary + salaryRange */
  salaryCardLine?: string;
  footerEmail?: string;
};

export const siteSettings = pgTable("site_settings", {
  id: text("id").primaryKey(),
  defaultApplicationEmail: text("default_application_email").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  shortDescription: text("short_description").notNull(),
  active: boolean("active").notNull().default(true),
  showSalary: boolean("show_salary").notNull().default(true),
  salaryRange: text("salary_range"),
  emailTo: text("email_to").notNull(),
  content: jsonb("content").$type<JobContent>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const applicationStatusEnum = [
  "new",
  "next",
  "interesting",
  "rejected",
  "hired",
] as const;
export type ApplicationStatus = (typeof applicationStatusEnum)[number];

export const applications = pgTable("applications", {
  id: uuid("id").defaultRandom().primaryKey(),
  jobId: uuid("job_id").references(() => jobs.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull().default(""),
  cvUrl: text("cv_url"),
  cvFileName: text("cv_file_name"),
  status: text("status").notNull().default("new").$type<ApplicationStatus>(),
  notes: text("notes").notNull().default(""),
  /** Admin-only CV quality score 1–5 (null = not rated) */
  cvRating: integer("cv_rating"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
