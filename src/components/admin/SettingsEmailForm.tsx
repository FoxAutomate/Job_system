"use client";

import { useActionState } from "react";

import { updateDefaultApplicationEmail } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SettingsEmailForm({ initialEmail }: { initialEmail: string }) {
  const [state, formAction] = useActionState(updateDefaultApplicationEmail, null);

  return (
    <form action={formAction} className="space-y-3 rounded-lg border border-neutral-200 bg-white p-4">
      <Label htmlFor="defaultApplicationEmail">
        Vaikimisi e-post üldiste kandideerimiste jaoks
      </Label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <Input
          id="defaultApplicationEmail"
          name="defaultApplicationEmail"
          type="email"
          required
          defaultValue={initialEmail}
          className="min-h-10 sm:max-w-md"
        />
        <Button type="submit" variant="secondary">
          Salvesta
        </Button>
      </div>
      {state?.ok ? (
        <p className="text-sm text-emerald-700">Salvestatud.</p>
      ) : null}
      {state && !state.ok ? (
        <p className="text-sm text-destructive">{state.message}</p>
      ) : null}
    </form>
  );
}
