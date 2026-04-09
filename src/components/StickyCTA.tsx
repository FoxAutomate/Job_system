"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StickyCTAProps = {
  visible: boolean;
};

export function StickyCTA({ visible }: StickyCTAProps) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden"
        >
          <div className="pointer-events-auto w-full max-w-md px-4">
            <Link
              href="#apply"
              className={cn(
                buttonVariants({ size: "lg" }),
                "flex h-14 w-full items-center justify-center rounded-xl border border-amber-500/30 bg-[var(--cannery-amber)] text-base font-semibold text-neutral-950 shadow-lg"
              )}
            >
              Kandideeri kohe
            </Link>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
