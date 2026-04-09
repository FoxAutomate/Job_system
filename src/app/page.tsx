import { ApplySection } from "@/components/ApplySection";
import { Hero } from "@/components/Hero";
import { JobSections } from "@/components/JobSections";

export default function Home() {
  return (
    <div className="min-h-dvh bg-neutral-50">
      <Hero />
      <JobSections />
      <ApplySection />
      <footer className="border-t border-neutral-200 bg-neutral-100 px-4 py-8 text-center text-sm text-neutral-600 sm:px-6">
        <p className="font-medium text-neutral-800">
          Kandideerimise tähtaeg:{" "}
          <time dateTime="2026-06-30">30.06.2026</time>
        </p>
        <p className="mt-2">
          Saada CV ja võimalik tööleasumise aeg:{" "}
          <a
            className="font-medium text-neutral-900 underline underline-offset-2"
            href="mailto:Birgit@cannery.eu"
          >
            Birgit@cannery.eu
          </a>
        </p>
        <p className="mt-6 text-xs text-neutral-500">
          Made for Cannery OÜ · Villimismasinate koostaja-tehnik
        </p>
      </footer>
    </div>
  );
}
