"use client";

import { useActionState } from "react";

import { upsertJob } from "@/actions/jobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Job } from "@/db/schema";

type Props = {
  job?: Job | null;
};

export function JobOfferForm({ job }: Props) {
  const c = job?.content;
  const [state, formAction] = useActionState(upsertJob, null);

  return (
    <form action={formAction} className="space-y-8">
      {job ? <input type="hidden" name="id" value={job.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="slug">Slug (URL) *</Label>
          <Input
            id="slug"
            name="slug"
            required
            defaultValue={job?.slug ?? ""}
            placeholder="villimismasinate-koostaja-tehnik"
            className="min-h-10 font-mono text-sm"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="title">Pealkiri *</Label>
          <Input
            id="title"
            name="title"
            required
            defaultValue={job?.title ?? ""}
            className="min-h-10"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="shortDescription">Lühikirjeldus (nimekiri) *</Label>
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
            Aktiivne
          </label>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="showSalary"
              value="true"
              defaultChecked={job?.showSalary ?? true}
              className="size-4 rounded border-neutral-300"
            />
            Näita palka
          </label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="salaryRange">Palga vahemik</Label>
          <Input
            id="salaryRange"
            name="salaryRange"
            defaultValue={job?.salaryRange ?? ""}
            placeholder="1400–1700 € / kuu"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emailTo">E-post vastuvõtt *</Label>
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
        <h3 className="text-lg font-semibold">Lehe sisu</h3>
        <div className="space-y-2">
          <Label htmlFor="tagline">Ribatekst (hero)</Label>
          <Input
            id="tagline"
            name="tagline"
            defaultValue={c?.tagline ?? ""}
            placeholder="Cannery OÜ · Harjumaa"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="heroIntro">Sissejuhatus *</Label>
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
            <Label htmlFor="location">Asukoht *</Label>
            <Input
              id="location"
              name="location"
              required
              defaultValue={c?.location ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadlineDisplay">Tähtaeg (tekst) *</Label>
            <Input
              id="deadlineDisplay"
              name="deadlineDisplay"
              required
              defaultValue={c?.deadlineDisplay ?? ""}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="responsibilities">Tööülesanded (üks rida = üks punkt) *</Label>
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
          <Label htmlFor="requirements">Ootused (üks rida = üks punkt) *</Label>
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
          <Label htmlFor="niceToHave">Kasuks tuleb *</Label>
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
          <Label htmlFor="weOffer">Pakume *</Label>
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
          <Label htmlFor="salaryCardLine">Palga rida (kaardi all)</Label>
          <Input
            id="salaryCardLine"
            name="salaryCardLine"
            defaultValue={c?.salaryCardLine ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="footerEmail">Jalus / kontakt e-post (valikuline)</Label>
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
        <p className="text-sm text-emerald-700">Salvestatud.</p>
      ) : null}

      <Button type="submit" size="lg" className="min-h-11">
        Salvesta kuulutus
      </Button>
    </form>
  );
}
