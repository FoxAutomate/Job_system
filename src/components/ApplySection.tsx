"use client";

import { useState } from "react";

import { ApplicationForm } from "@/components/ApplicationForm";
import { StickyCTA } from "@/components/StickyCTA";
import { SuccessScreen } from "@/components/SuccessScreen";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocale } from "@/lib/i18n/locale-context";
import type { ApplyFormValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

type ApplySectionProps = {
  variant: "general" | "job";
  jobId?: string | null;
  mailtoEmail?: string;
  mailtoSubject?: string;
  sectionId?: string;
  /** Server-passed URL prefill (e.g. from ?email=) */
  prefill?: Partial<ApplyFormValues>;
};

export function ApplySection({
  variant,
  jobId,
  mailtoEmail = "Birgit@cannery.eu",
  mailtoSubject = "Cannery Careers",
  sectionId = "apply",
  prefill,
}: ApplySectionProps) {
  const [success, setSuccess] = useState(false);
  const { locale, t } = useLocale();

  const title =
    variant === "general"
      ? t.applySectionTitleGeneral
      : t.applySectionTitleJob;

  const description =
    variant === "general"
      ? t.applySectionDescGeneral
      : t.applySectionDescJob;

  const stickyLabel =
    variant === "job" ? t.stickyApplyJob : t.stickyApply;

  return (
    <>
      <StickyCTA
        visible={!success}
        href={`#${sectionId}`}
        label={stickyLabel}
      />

      <section
        id={sectionId}
        className="scroll-mt-24 border-t border-neutral-200 bg-white px-4 py-10 pb-28 sm:scroll-mt-8 sm:px-6 sm:py-14 sm:pb-16"
      >
        <div className="mx-auto max-w-xl">
          {success ? (
            <SuccessScreen
              contactEmail={mailtoEmail}
              variant={variant}
            />
          ) : (
            <Card className="border-neutral-200 shadow-md">
              <CardHeader className="space-y-2">
                <CardTitle className="font-heading text-2xl font-bold">
                  {title}
                </CardTitle>
                <CardDescription
                  id="apply-intro"
                  className="text-base text-neutral-600"
                >
                  {description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ApplicationForm
                  key={locale}
                  onSuccess={() => setSuccess(true)}
                  jobId={jobId}
                  defaultValues={prefill}
                />
              </CardContent>
            </Card>
          )}

          {!success ? (
            <div className="mt-8 hidden sm:block">
              <a
                href={`mailto:${mailtoEmail}?subject=${encodeURIComponent(mailtoSubject)}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "flex min-h-12 w-full items-center justify-center text-center"
                )}
              >
                {t.applySectionEmailCta} {mailtoEmail}
              </a>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
