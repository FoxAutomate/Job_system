"use client";

import { motion } from "framer-motion";
import {
  BadgeEuro,
  Briefcase,
  ClipboardList,
  Cpu,
  HeartHandshake,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocale } from "@/lib/i18n/locale-context";
import type { Job, JobContent } from "@/db/schema";

type Props = {
  job: Job;
  content: JobContent;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function JobContentSections({ job, content }: Props) {
  const { t } = useLocale();

  const blocks = [
    {
      key: "tasks",
      title: t.jobDetailTasks,
      icon: ClipboardList,
      items: content.responsibilities,
    },
    {
      key: "expectations",
      title: t.jobDetailExpectations,
      icon: Briefcase,
      items: content.requirements,
    },
    {
      key: "nice",
      title: t.jobDetailNice,
      icon: Sparkles,
      items: content.niceToHave,
    },
    {
      key: "offer",
      title: t.jobDetailWeOffer,
      icon: HeartHandshake,
      items: content.weOffer,
      highlight:
        job.showSalary && content.salaryCardLine ? content.salaryCardLine : null,
    },
  ];

  return (
    <section className="border-t border-neutral-200 bg-neutral-50/80 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            {t.jobDetailEyebrow}
          </p>
          <h2 className="font-heading text-2xl font-bold text-neutral-950 sm:text-3xl">
            {t.jobDetailOnePager}
          </h2>
          <p className="text-pretty text-neutral-700">
            {t.jobDetailLocLabel}{" "}
            <span className="font-medium text-neutral-900">
              {content.location}
            </span>
            . {t.jobDetailDeadLabel}{" "}
            <span className="font-medium text-neutral-900">
              {content.deadlineDisplay}
            </span>
            .
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-4"
        >
          {blocks.map((block) => {
            const Icon = block.icon;
            return (
              <motion.div key={block.key} variants={item}>
                <Card className="border-neutral-200/80 bg-white shadow-sm">
                  <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-[var(--cannery-amber)]/25 text-neutral-900">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <CardTitle className="text-lg font-semibold">
                      {block.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <ul className="list-inside list-disc space-y-1.5 text-neutral-800">
                      {block.items.map((line) => (
                        <li key={line} className="text-pretty pl-0.5">
                          {line}
                        </li>
                      ))}
                    </ul>
                    {block.highlight ? (
                      <p className="flex flex-wrap items-center gap-2 rounded-lg border border-amber-400/40 bg-[var(--cannery-amber)]/15 px-3 py-2 text-sm font-semibold text-neutral-900">
                        <BadgeEuro className="size-4 shrink-0" aria-hidden />
                        {block.highlight}
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4 rounded-xl border border-dashed border-neutral-300 bg-white/60 px-4 py-4 text-sm text-neutral-700 sm:justify-start"
        >
          <span className="inline-flex items-center gap-2">
            <Wrench className="size-4 text-neutral-600" aria-hidden />
            {t.jobDetailBadge1}
          </span>
          <span className="inline-flex items-center gap-2">
            <Cpu className="size-4 text-neutral-600" aria-hidden />
            {t.jobDetailBadge2}
          </span>
          <span className="inline-flex items-center gap-2">
            <Truck className="size-4 text-neutral-600" aria-hidden />
            {t.jobDetailBadge3}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
