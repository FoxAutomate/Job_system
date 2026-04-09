"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";

export function SuccessScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-emerald-200/80 bg-emerald-50/90 px-4 py-8 text-center shadow-sm sm:px-8"
      role="status"
    >
      <div className="mx-auto flex max-w-md flex-col items-center gap-4">
        <span className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="size-8" aria-hidden />
        </span>
        <h2 className="font-heading text-xl font-bold text-neutral-900 sm:text-2xl">
          Aitäh — saime sinu andmed kätte
        </h2>
        <p className="text-pretty text-neutral-700">
          Võtame peagi ühendust. Kui sa ei lisanud veel CV-d, võid selle
          hiljem saata aadressile{" "}
          <a
            className="font-medium text-neutral-900 underline underline-offset-2"
            href="mailto:Birgit@cannery.eu?subject=Villimismasinate%20koostaja-tehnik%20—%20CV"
          >
            Birgit@cannery.eu
          </a>
          .
        </p>
        <p className="flex items-center justify-center gap-2 text-sm text-neutral-600">
          <Mail className="size-4 shrink-0" aria-hidden />
          Lisa võimalik tööle asumise aeg kirja sisusse.
        </p>
      </div>
    </motion.div>
  );
}
