"use client";

import { useActionState } from "react";

import { upsertJob } from "@/actions/jobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocale } from "@/lib/i18n/locale-context";
import type { Job } from "@/db/schema";

type Props = {
  job?: Job | null;
};

export function JobOfferForm({ job }: Props) {
  const c = job?.content;
  const [state, formAction] = useActionState(upsertJob, null);
  const { t } = useLocale();

  return (
    <form action={formAction} className="space-y-8">
      {job ? <input type="hidden" name="id" value={job.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="slug">{t.adminFormSlug}</Label>
          <Input
            id="slug"
            name="slug"
            required
            defaultValue={job?.slug ?? ""}
            placeholder={t.adminFormSlugPh}
            className="min-h-10 font-mono text-sm"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="title">{t.adminFormTitleLabel}</Label>
          <Input
            id="title"
            name="title"
            required
            defaultValue={job?.title ?? ""}
            className="min-h-10"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="shortDescription">{t.adminFormShortDesc}</Label>
          <Textarea
            id="shortDescription"
            name="shortDescription"
            required
            rows={2}
            defaultValue={job?.shortDescription ?? ""}
          />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="active"
              value="true"
              defaultChecked={job?.active ?? true}
              className="size-4 rounded border-neutral-300"
            />
            {t.adminFormActive}
          </label>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="showSalary"
              value="true"
              defaultChecked={job?.showSalary ?? true}
              className="size-4 rounded border-neutral-300"
            />
            {t.adminFormShowSalary}
          </label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="salaryRange">{t.adminFormSalaryRange}</Label>
          <Input
            id="salaryRange"
            name="salaryRange"
            defaultValue={job?.salaryRange ?? ""}
            placeholder={t.adminFormSalaryPh}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emailTo">{t.adminFormEmailTo}</Label>
          <Input
            id="emailTo"
            name="emailTo"
            type="email"
            required
            defaultValue={job?.emailTo ?? ""}
          />
        </div>
      </div>

      <div className="space-y-4 border-t border-neutral-200 pt-6">
        <h3 className="text-lg font-semibold">{t.adminFormSectionPage}</h3>
        <div className="space-y-2">
          <Label htmlFor="tagline">{t.adminFormTagline}</Label>
          <Input
            id="tagline"
            name="tagline"
            defaultValue={c?.tagline ?? ""}
            placeholder={t.adminFormTaglinePh}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="heroIntro">{t.adminFormHeroIntro}</Label>
          <Textarea
            id="heroIntro"
            name="heroIntro"
            required
            rows={4}
            defaultValue={c?.heroIntro ?? ""}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="location">{t.adminFormLocation}</Label>
            <Input
              id="location"
              name="location"
              required
              defaultValue={c?.location ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadlineDisplay">{t.adminFormDeadlineText}</Label>
            <Input
              id="deadlineDisplay"
              name="deadlineDisplay"
              required
              defaultValue={c?.deadlineDisplay ?? ""}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="responsibilities">{t.adminFormResp}</Label>
          <p className="text-xs text-neutral-500">{t.adminFormListLineHint}</p>
          <Textarea
            id="responsibilities"
            name="responsibilities"
            required
            rows={8}
            defaultValue={c?.responsibilities?.join("\n") ?? ""}
            className="font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="requirements">{t.adminFormReq}</Label>
          <Textarea
            id="requirements"
            name="requirements"
            required
            rows={8}
            defaultValue={c?.requirements?.join("\n") ?? ""}
            className="font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="niceToHave">{t.adminFormNice}</Label>
          <Textarea
            id="niceToHave"
            name="niceToHave"
            required
            rows={6}
            defaultValue={c?.niceToHave?.join("\n") ?? ""}
            className="font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weOffer">{t.adminFormWeOffer}</Label>
          <Textarea
            id="weOffer"
            name="weOffer"
            required
            rows={6}
            defaultValue={c?.weOffer?.join("\n") ?? ""}
            className="font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="salaryCardLine">{t.adminFormSalaryCardLine}</Label>
          <Input
            id="salaryCardLine"
            name="salaryCardLine"
            defaultValue={c?.salaryCardLine ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="footerEmail">{t.adminFormFooterEmail}</Label>
          <Input
            id="footerEmail"
            name="footerEmail"
            type="email"
            defaultValue={c?.footerEmail ?? ""}
          />
        </div>
      </div>

      {state && !state.ok ? (
        <p className="text-sm text-destructive">{state.message}</p>
      ) : null}
      {state?.ok ? (
        <p className="text-sm text-emerald-700">{t.adminFormSaved}</p>
      ) : null}

      <Button type="submit" size="lg" className="min-h-11">
        {t.adminFormSubmitOffer}
      </Button>
    </form>
  );
}
