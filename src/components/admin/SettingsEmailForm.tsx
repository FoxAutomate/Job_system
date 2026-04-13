"use client";

import { useRef, useState, useTransition } from "react";

import { updateSiteEmailSettings } from "@/actions/settings";
import { AdminPresetPicker } from "@/components/admin/AdminPresetPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PRESET_INBOX_EMAILS } from "@/lib/admin/presets";
import { useLocale } from "@/lib/i18n/locale-context";

type SettingsEmailFormProps = {
  initialEmail: string;
  initialApplicantBodyEt: string;
  initialApplicantBodyEn: string;
};

export function SettingsEmailForm({
  initialEmail,
  initialApplicantBodyEt,
  initialApplicantBodyEn,
}: SettingsEmailFormProps) {
  const [state, setState] = useState<{ ok: boolean; message?: string } | null>(
    null
  );
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLocale();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    startTransition(async () => {
      const result = await updateSiteEmailSettings(null, new FormData(form));
      setState(result);
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-3 rounded-lg border border-neutral-200 bg-white p-4"
    >
      <div>
        <Label htmlFor="defaultApplicationEmail">
          {t.adminSettingsEmailLabel}
        </Label>
        <p className="mt-1 text-xs text-neutral-600">{t.adminSettingsPresetHint}</p>
      </div>
      <AdminPresetPicker
        id="preset-default-inbox"
        label={t.adminFormPresetPickLabel}
        placeholder={t.adminFormPresetPickPlaceholder}
        options={PRESET_INBOX_EMAILS}
        onPick={(v) => {
          if (inputRef.current) inputRef.current.value = v;
        }}
        className="max-w-md"
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <Input
          ref={inputRef}
          id="defaultApplicationEmail"
          name="defaultApplicationEmail"
          type="email"
          required
          defaultValue={initialEmail}
          className="min-h-10 sm:max-w-md"
        />
        <Button type="submit" variant="secondary" disabled={pending}>
          {t.adminSettingsSave}
        </Button>
      </div>
      <p className="text-xs text-neutral-600">
        {t.adminFormValidationPreservesData}
      </p>
      {state?.ok ? (
        <p className="text-sm text-emerald-700">{t.adminSettingsSaved}</p>
      ) : null}
      {state && !state.ok ? (
        <p className="text-sm text-destructive">{state.message}</p>
      ) : null}

      <div className="border-t border-neutral-200 pt-4">
        <h3 className="text-sm font-semibold text-neutral-900">
          {t.adminSettingsApplicantTemplatesTitle}
        </h3>
        <p className="mt-1 text-xs text-neutral-600">
          {t.adminSettingsApplicantPlaceholderHint}
        </p>
        <div className="mt-3 space-y-3">
          <div>
            <Label htmlFor="applicantEmailBodyEt">
              {t.adminSettingsApplicantBodyEt}
            </Label>
            <Textarea
              id="applicantEmailBodyEt"
              name="applicantEmailBodyEt"
              defaultValue={initialApplicantBodyEt}
              rows={6}
              className="mt-1.5 min-h-[140px] font-mono text-xs sm:text-sm"
              placeholder=""
            />
          </div>
          <div>
            <Label htmlFor="applicantEmailBodyEn">
              {t.adminSettingsApplicantBodyEn}
            </Label>
            <Textarea
              id="applicantEmailBodyEn"
              name="applicantEmailBodyEn"
              defaultValue={initialApplicantBodyEn}
              rows={6}
              className="mt-1.5 min-h-[140px] font-mono text-xs sm:text-sm"
              placeholder=""
            />
          </div>
        </div>
      </div>
    </form>
  );
}
