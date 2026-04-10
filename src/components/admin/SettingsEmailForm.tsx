"use client";

import { useRef, useState, useTransition } from "react";

import { updateDefaultApplicationEmail } from "@/actions/settings";
import { AdminPresetPicker } from "@/components/admin/AdminPresetPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PRESET_INBOX_EMAILS } from "@/lib/admin/presets";
import { useLocale } from "@/lib/i18n/locale-context";

export function SettingsEmailForm({ initialEmail }: { initialEmail: string }) {
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
      const result = await updateDefaultApplicationEmail(null, new FormData(form));
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
    </form>
  );
}
