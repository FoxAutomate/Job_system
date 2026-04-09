"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitApplication } from "@/actions/applications";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MAX_CV_BYTES,
  applyFormSchema,
  type ApplyFormValues,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

type ApplicationFormProps = {
  onSuccess: () => void;
  jobId?: string | null;
  defaultValues?: Partial<ApplyFormValues>;
};

export function ApplicationForm({
  onSuccess,
  jobId,
  defaultValues,
}: ApplicationFormProps) {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvHint, setCvHint] = useState<string | null>(null);
  const [rootError, setRootError] = useState<string | null>(null);

  const form = useForm<ApplyFormValues>({
    resolver: zodResolver(applyFormSchema),
    defaultValues: {
      fullName: defaultValues?.fullName ?? "",
      email: defaultValues?.email ?? "",
      phone: defaultValues?.phone ?? "",
      message: defaultValues?.message ?? "",
    },
  });

  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setCvHint(null);
      if (!file) {
        setCvFile(null);
        return;
      }
      if (file.size > MAX_CV_BYTES) {
        setCvFile(null);
        setCvHint("Fail on liiga suur (max 5 MB). Proovi väiksemat PDF-i.");
        event.target.value = "";
        return;
      }
      setCvFile(file);
    },
    []
  );

  const onSubmit = form.handleSubmit(async (values) => {
    setRootError(null);
    const body = new FormData();
    body.append("fullName", values.fullName);
    body.append("email", values.email);
    body.append("phone", values.phone);
    body.append("message", values.message ?? "");
    if (jobId) body.append("jobId", jobId);
    if (cvFile) body.append("cv", cvFile);

    const result = await submitApplication(null, body);
    if (result.ok) {
      toast.success("Kandideerimine salvestatud", {
        description: result.emailSimulated
          ? "Teavitus simuleeritud (seadista RESEND_API_KEY). / Application submitted — we will contact you soon."
          : "Võtame peagi ühendust. / Application submitted successfully. We will contact you soon.",
      });
      form.reset();
      setCvFile(null);
      onSuccess();
    } else {
      const msg = result.message ?? "Viga";
      setRootError(msg);
      toast.error("Saatmine ebaõnnestus", { description: msg });
    }
  });

  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-1">
        <div className="space-y-2">
          <Label htmlFor="fullName">Ees- ja perekonnanimi *</Label>
          <Input
            id="fullName"
            autoComplete="name"
            inputMode="text"
            placeholder="nt. Mari Mets"
            className="min-h-12 text-base"
            aria-invalid={Boolean(errors.fullName)}
            {...register("fullName")}
          />
          {errors.fullName ? (
            <p className="text-sm text-destructive" role="alert">
              {errors.fullName.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-post *</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="sinu@näide.ee"
            className="min-h-12 text-base"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-sm text-destructive" role="alert">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefon *</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+372 …"
            className="min-h-12 text-base"
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
          {errors.phone ? (
            <p className="text-sm text-destructive" role="alert">
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cv">CV (valikuline)</Label>
          <Input
            id="cv"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className={cn(
              "min-h-12 cursor-pointer text-base file:mr-3 file:rounded-md file:border-0 file:bg-neutral-200 file:px-3 file:py-1.5 file:text-sm file:font-medium"
            )}
            onChange={onFileChange}
            disabled={isSubmitting}
          />
          <p className="text-sm text-neutral-600">
            PDF, DOC või DOCX, kuni 5 MB. Telefonist kandideerides võid CV
            hiljem saata — see pole kohustuslik.
          </p>
          {cvHint ? (
            <p className="text-sm text-amber-800" role="status">
              {cvHint}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Lühike sissejuhatus (valikuline)</Label>
          <Textarea
            id="message"
            rows={4}
            placeholder="Miks see töö sind huvitab? (2–3 lauset piisab)"
            className="min-h-[7rem] text-base"
            aria-invalid={Boolean(errors.message)}
            {...register("message")}
          />
          {errors.message ? (
            <p className="text-sm text-destructive" role="alert">
              {errors.message.message}
            </p>
          ) : null}
        </div>
      </div>

      {rootError ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {rootError}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-[var(--cannery-amber)] text-base font-semibold text-neutral-950 hover:bg-[var(--cannery-amber)]/90"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden />
            Saadan…
          </>
        ) : (
          "Saada kandideerimine"
        )}
      </Button>
    </form>
  );
}
