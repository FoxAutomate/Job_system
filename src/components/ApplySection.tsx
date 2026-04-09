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
import { cn } from "@/lib/utils";

export function ApplySection() {
  const [success, setSuccess] = useState(false);

  return (
    <>
      <StickyCTA visible={!success} />

      <section
        id="apply"
        className="scroll-mt-4 border-t border-neutral-200 bg-white px-4 py-10 pb-28 sm:px-6 sm:py-14 sm:pb-16"
      >
        <div className="mx-auto max-w-xl">
          {success ? (
            <SuccessScreen />
          ) : (
            <Card className="border-neutral-200 shadow-md">
              <CardHeader className="space-y-2">
                <CardTitle className="font-heading text-2xl font-bold">
                  Kandideeri 60 sekundiga
                </CardTitle>
                <CardDescription
                  id="apply-intro"
                  className="text-base text-neutral-600"
                >
                  Täida vähemalt nimi, e-post ja telefon. CV võid jätta
                  praegu lisamata — saad selle hiljem e-postiga saata.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ApplicationForm onSuccess={() => setSuccess(true)} />
              </CardContent>
            </Card>
          )}

          {!success ? (
            <div className="mt-8 hidden sm:block">
              <a
                href="mailto:Birgit@cannery.eu?subject=Villimismasinate%20koostaja-tehnik"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "flex min-h-12 w-full items-center justify-center text-center"
                )}
              >
                Eelistad otse e-posti? Kirjuta Birgit@cannery.eu
              </a>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
