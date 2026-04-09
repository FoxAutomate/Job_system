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

const sections = [
  {
    key: "tasks",
    title: "Tööülesanded",
    icon: ClipboardList,
    items: [
      "Mehaaniline montaaž ja seadmete kokkupanek",
      "Seadistamine ja testimine",
      "Vigade tuvastamine ja lahendamine",
      "Suhtlemine tarnijatega",
      "Komponentide inventuur",
      "Töökeskkonna ja seadmete hooldus",
      "Vajadusel väiksed muudatused CAD-is",
    ],
  },
  {
    key: "expectations",
    title: "Ootused",
    icon: Briefcase,
    items: [
      "Tehniline haridus (omandatud või pooleli) või kogemus masinate kokkupanekus",
      "Hea käelisus ja tehniline mõtlemine",
      "Kiire õppimisvõime",
      "Täpsus, hoolikkus ja vastutus",
      "Hea füüsiline vorm",
      "Valmidus ärireisideks",
    ],
  },
  {
    key: "nice",
    title: "Kasuks tuleb",
    icon: Sparkles,
    items: [
      "Kogemus tootmisliinide või automatikaga",
      "Põhiteadmised elektrist ja pneumaatikast",
      "Huvi masinate ja joogitööstuse vastu",
      "B-kategooria juhiluba",
    ],
  },
  {
    key: "offer",
    title: "Omalt poolt pakume",
    icon: HeartHandshake,
    items: [
      "Huvitavaid ja mitmekülgseid projekte",
      "Õpetamist kohapeal",
      "Tervisekindlustust või spordikompensatsiooni",
      "Arenguvõimalusi",
    ],
    highlight: "Brutopalk 1400–1700 € kuus",
  },
] as const;

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

export function JobSections() {
  return (
    <section className="border-t border-neutral-200 bg-neutral-50/80 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Ametikoht
          </p>
          <h2 className="font-heading text-2xl font-bold text-neutral-950 sm:text-3xl">
            Üks leht — kõik oluline
          </h2>
          <p className="text-pretty text-neutral-700">
            Töökoht:{" "}
            <span className="font-medium text-neutral-900">
              Hoiu 16, Laagri, Harjumaa
            </span>
            . Kandideerimise tähtaeg:{" "}
            <span className="font-medium text-neutral-900">30.06.2026</span>.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-4"
        >
          {sections.map((block) => {
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
                    {"highlight" in block && block.highlight ? (
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
            Masinaehitus &amp; testimine
          </span>
          <span className="inline-flex items-center gap-2">
            <Cpu className="size-4 text-neutral-600" aria-hidden />
            CAD &amp; automaatika keskkond
          </span>
          <span className="inline-flex items-center gap-2">
            <Truck className="size-4 text-neutral-600" aria-hidden />
            Reisivalmidus
          </span>
        </motion.div>
      </div>
    </section>
  );
}
