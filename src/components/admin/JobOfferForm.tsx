"use client";

import { useRef, useState, useTransition } from "react";

import { upsertJob } from "@/actions/jobs";
import { AdminPresetPicker } from "@/components/admin/AdminPresetPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Job } from "@/db/schema";
import {
  PRESET_INBOX_EMAILS,
  PRESET_LOCATIONS,
  PRESET_TAGLINES,
} from "@/lib/admin/presets";
import { useLocale } from "@/lib/i18n/locale-context";

type Props = {
  job?: Job | null;
};

export function JobOfferForm({ job }: Props) {
  const c = job?.content;
  const en = c?.en;
  const [secondLang, setSecondLang] = useState(
    Boolean(c?.secondLanguageEnabled && en)
  );
  const [state, setState] = useState<{ ok: boolean; message?: string } | null>(
    null
  );
  const [pending, startTransition] = useTransition();
  const emailToRef = useRef<HTMLInputElement>(null);
  const taglineRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const { t } = useLocale();
  const sx = t.adminFormEnSuffix;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    startTransition(async () => {
      const result = await upsertJob(null, new FormData(form));
      setState(result);
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      {job ? <input type="hidden" name="id" value={job.id} /> : null}

      <p className="rounded-lg border border-amber-200/90 bg-amber-50/95 px-3 py-2.5 text-sm text-neutral-800">
        {t.adminFormValidationPreservesData}
      </p>

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
          <p className="text-xs leading-snug text-neutral-600">
            {t.adminFormSlugWarning}
          </p>
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
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="emailTo">{t.adminFormEmailTo}</Label>
          <AdminPresetPicker
            id="preset-inbox-email"
            label={t.adminFormPresetPickLabel}
            placeholder={t.adminFormPresetPickPlaceholder}
            options={PRESET_INBOX_EMAILS}
            onPick={(v) => {
              if (emailToRef.current) emailToRef.current.value = v;
            }}
            className="max-w-md"
          />
          <Input
            ref={emailToRef}
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
          <AdminPresetPicker
            id="preset-tagline"
            label={t.adminFormPresetPickLabel}
            placeholder={t.adminFormPresetPickPlaceholder}
            options={PRESET_TAGLINES}
            onPick={(v) => {
              if (taglineRef.current) taglineRef.current.value = v;
            }}
            className="max-w-xl"
          />
          <Input
            ref={taglineRef}
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
            <AdminPresetPicker
              id="preset-location"
              label={t.adminFormPresetPickLabel}
              placeholder={t.adminFormPresetPickPlaceholder}
              options={PRESET_LOCATIONS}
              onPick={(v) => {
                if (locationRef.current) locationRef.current.value = v;
              }}
            />
            <Input
              ref={locationRef}
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

        <input
          type="hidden"
          name="secondLanguageEnabled"
          value={secondLang ? "true" : "false"}
        />
        <div className="space-y-2 sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-sm font-medium">
            <input
              type="checkbox"
              checked={secondLang}
              onChange={(e) => setSecondLang(e.target.checked)}
              className="mt-0.5 size-4 rounded border-neutral-300"
            />
            <span>
              {t.adminFormSecondLanguage}
              <span className="mt-1 block font-normal text-neutral-600">
                {t.adminFormSecondLanguageHelp}
              </span>
            </span>
          </label>
        </div>
      </div>

      {secondLang ? (
        <div className="space-y-4 border-t border-amber-200/80 bg-amber-50/40 px-3 py-6 sm:px-4">
          <h3 className="text-lg font-semibold text-neutral-900">
            {t.adminFormSectionEnglish}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="enTitle">
                {t.adminFormTitleLabel}
                {sx}
              </Label>
              <Input
                id="enTitle"
                name="enTitle"
                required={secondLang}
                defaultValue={en?.title ?? ""}
                className="min-h-10"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="enShortDescription">
                {t.adminFormShortDesc}
                {sx}
              </Label>
              <Textarea
                id="enShortDescription"
                name="enShortDescription"
                required={secondLang}
                rows={2}
                defaultValue={en?.shortDescription ?? ""}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="enTagline">
                {t.adminFormTagline}
                {sx}
              </Label>
              <Input
                id="enTagline"
                name="enTagline"
                required={secondLang}
                defaultValue={en?.tagline ?? ""}
                placeholder={t.adminFormTaglinePh}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="enHeroIntro">
                {t.adminFormHeroIntro}
                {sx}
              </Label>
              <Textarea
                id="enHeroIntro"
                name="enHeroIntro"
                required={secondLang}
                rows={4}
                defaultValue={en?.heroIntro ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enLocation">
                {t.adminFormLocation}
                {sx}
              </Label>
              <Input
                id="enLocation"
                name="enLocation"
                required={secondLang}
                defaultValue={en?.location ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enDeadlineDisplay">
                {t.adminFormDeadlineText}
                {sx}
              </Label>
              <Input
                id="enDeadlineDisplay"
                name="enDeadlineDisplay"
                required={secondLang}
                defaultValue={en?.deadlineDisplay ?? ""}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="enDeadlineIso">
                {t.adminFormDeadlineIsoOptional}
                {sx}
              </Label>
              <Input
                id="enDeadlineIso"
                name="enDeadlineIso"
                defaultValue={en?.deadlineIso ?? ""}
                placeholder="2026-06-30"
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="enResponsibilities">
                {t.adminFormResp}
                {sx}
              </Label>
              <p className="text-xs text-neutral-500">{t.adminFormListLineHint}</p>
              <Textarea
                id="enResponsibilities"
                name="enResponsibilities"
                required={secondLang}
                rows={8}
                defaultValue={en?.responsibilities?.join("\n") ?? ""}
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="enRequirements">
                {t.adminFormReq}
                {sx}
              </Label>
              <Textarea
                id="enRequirements"
                name="enRequirements"
                required={secondLang}
                rows={8}
                defaultValue={en?.requirements?.join("\n") ?? ""}
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="enNiceToHave">
                {t.adminFormNice}
                {sx}
              </Label>
              <Textarea
                id="enNiceToHave"
                name="enNiceToHave"
                required={secondLang}
                rows={6}
                defaultValue={en?.niceToHave?.join("\n") ?? ""}
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="enWeOffer">
                {t.adminFormWeOffer}
                {sx}
              </Label>
              <Textarea
                id="enWeOffer"
                name="enWeOffer"
                required={secondLang}
                rows={6}
                defaultValue={en?.weOffer?.join("\n") ?? ""}
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="enSalaryCardLine">
                {t.adminFormSalaryCardLine}
                {sx}
              </Label>
              <Input
                id="enSalaryCardLine"
                name="enSalaryCardLine"
                defaultValue={en?.salaryCardLine ?? ""}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="enFooterEmail">
                {t.adminFormFooterEmail}
                {sx}
              </Label>
              <Input
                id="enFooterEmail"
                name="enFooterEmail"
                type="email"
                defaultValue={en?.footerEmail ?? ""}
              />
            </div>
          </div>
        </div>
      ) : null}

      {state && !state.ok ? (
        <p className="text-sm text-destructive">{state.message}</p>
      ) : null}
      {state?.ok ? (
        <p className="text-sm text-emerald-700">{t.adminFormSaved}</p>
      ) : null}

      <Button type="submit" size="lg" className="min-h-11" disabled={pending}>
        {t.adminFormSubmitOffer}
      </Button>
    </form>
  );
}
