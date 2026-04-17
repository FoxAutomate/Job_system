"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";

import { updateSiteBranding } from "@/actions/branding";
import type { BrandingUploadKind } from "@/lib/branding-upload";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLocale } from "@/lib/i18n/locale-context";
import { BRANDING_DEFAULTS } from "@/lib/site-branding";
import { cn } from "@/lib/utils";

export type BrandingFormInitial = {
  siteLogoUrl: string;
  homeHeroBackgroundUrl: string;
  jobHeroBackgroundUrl: string;
  homeOpenGraphImageUrl: string;
  jobOpenGraphImageUrl: string;
  jobListingIllustrationUrl: string;
};

const KIND_BY_FIELD: Record<keyof BrandingFormInitial, BrandingUploadKind> = {
  siteLogoUrl: "logo",
  homeHeroBackgroundUrl: "homeHeroBg",
  jobHeroBackgroundUrl: "jobHeroBg",
  homeOpenGraphImageUrl: "homeOg",
  jobOpenGraphImageUrl: "jobOg",
  jobListingIllustrationUrl: "jobIllustration",
};

const DEFAULT_BY_FIELD: Record<
  keyof BrandingFormInitial,
  (typeof BRANDING_DEFAULTS)[keyof typeof BRANDING_DEFAULTS]
> = {
  siteLogoUrl: BRANDING_DEFAULTS.logo,
  homeHeroBackgroundUrl: BRANDING_DEFAULTS.homeHeroBg,
  jobHeroBackgroundUrl: BRANDING_DEFAULTS.jobHeroBg,
  homeOpenGraphImageUrl: BRANDING_DEFAULTS.homeOg,
  jobOpenGraphImageUrl: BRANDING_DEFAULTS.jobOg,
  jobListingIllustrationUrl: BRANDING_DEFAULTS.jobIllustration,
};

function effectiveSrc(stored: string, fallback: string): string {
  return stored.trim() || fallback;
}

type AssetRowProps = {
  field: keyof BrandingFormInitial;
  value: string;
  onChange: (v: string) => void;
  accept: string;
  label: string;
  hint: string;
  uploadLabel: string;
  uploadingLabel: string;
  clearLabel: string;
  previewCaption: string;
  uploadFailed: string;
};

function BrandingAssetRow({
  field,
  value,
  onChange,
  accept,
  label,
  hint,
  uploadLabel,
  uploadingLabel,
  clearLabel,
  previewCaption,
  uploadFailed,
}: AssetRowProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const kind = KIND_BY_FIELD[field];
  const fallback = DEFAULT_BY_FIELD[field];
  const previewSrc = effectiveSrc(value, fallback);
  const isRemote = previewSrc.startsWith("http");
  const tallPreview =
    field === "homeHeroBackgroundUrl" ||
    field === "jobHeroBackgroundUrl" ||
    field === "homeOpenGraphImageUrl" ||
    field === "jobOpenGraphImageUrl";

  async function onUpload() {
    const input = fileRef.current;
    const file = input?.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const body = new FormData();
      body.append("kind", kind);
      body.append("file", file);
      const res = await fetch("/api/admin/upload-branding", {
        method: "POST",
        body,
      });
      const data: unknown = await res.json().catch(() => null);
      if (
        res.ok &&
        data &&
        typeof data === "object" &&
        "ok" in data &&
        data.ok === true &&
        "url" in data &&
        typeof (data as { url: unknown }).url === "string"
      ) {
        onChange((data as { url: string }).url);
      } else {
        console.error("[Branding] upload", data);
        alert(uploadFailed);
      }
    } catch (e) {
      console.error(e);
      alert(uploadFailed);
    } finally {
      setUploading(false);
      if (input) input.value = "";
    }
  }

  return (
    <div className="space-y-2 rounded-lg border border-neutral-200 bg-white p-4">
      <Label className="text-base">{label}</Label>
      <p className="text-xs text-neutral-600">{hint}</p>
      <div
        className={cn(
          "relative overflow-hidden rounded-md bg-neutral-100",
          tallPreview ? "aspect-[21/9] max-h-40 w-full" : "flex h-36 w-full max-w-xs items-center justify-center sm:h-40"
        )}
      >
        {tallPreview ? (
          <Image
            src={previewSrc}
            alt=""
            fill
            className="object-cover object-center"
            unoptimized={isRemote}
            sizes="(max-width:768px) 100vw, 520px"
          />
        ) : (
          <Image
            src={previewSrc}
            alt=""
            width={280}
            height={200}
            className="max-h-full max-w-full object-contain"
            unoptimized={isRemote}
          />
        )}
      </div>
      <p className="text-xs text-neutral-500">
        {previewCaption}:{" "}
        <span className="break-all font-mono text-[11px]">{previewSrc}</span>
      </p>
      <input type="hidden" name={field} value={value} />
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept={accept}
          className="max-w-full text-sm"
        />
        <Button
          type="button"
          size="sm"
          variant="secondary"
          disabled={uploading}
          onClick={onUpload}
        >
          {uploading ? uploadingLabel : uploadLabel}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => onChange("")}
        >
          {clearLabel}
        </Button>
      </div>
    </div>
  );
}

type Props = { initial: BrandingFormInitial };

export function BrandingSettingsForm({ initial }: Props) {
  const { t } = useLocale();
  const [values, setValues] = useState<BrandingFormInitial>(initial);
  const [state, setState] = useState<{ ok: boolean; message?: string } | null>(
    null
  );
  const [pending, startTransition] = useTransition();

  function setField<K extends keyof BrandingFormInitial>(
    field: K,
    v: string
  ) {
    setValues((prev) => ({ ...prev, [field]: v }));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    startTransition(async () => {
      const fd = new FormData(form);
      const result = await updateSiteBranding(null, fd);
      setState(result);
    });
  }

  const rowProps = {
    uploadLabel: t.adminBrandingUpload,
    uploadingLabel: t.adminBrandingUploading,
    clearLabel: t.adminBrandingClear,
    previewCaption: t.adminBrandingCurrent,
    uploadFailed: t.adminBrandingUploadFailed,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">{t.adminBrandingTitle}</h1>
        <p className="text-neutral-600">{t.adminBrandingSubtitle}</p>
      </div>
    <form onSubmit={onSubmit} className="space-y-6">
      <BrandingAssetRow
        field="siteLogoUrl"
        value={values.siteLogoUrl}
        onChange={(v) => setField("siteLogoUrl", v)}
        accept=".png,.webp,.jpg,.jpeg,image/png,image/webp,image/jpeg"
        label={t.adminBrandingLogo}
        hint={t.adminBrandingHintLogo}
        {...rowProps}
      />
      <BrandingAssetRow
        field="homeHeroBackgroundUrl"
        value={values.homeHeroBackgroundUrl}
        onChange={(v) => setField("homeHeroBackgroundUrl", v)}
        accept=".png,.webp,.jpg,.jpeg,image/png,image/webp,image/jpeg"
        label={t.adminBrandingHomeBg}
        hint={t.adminBrandingHintBg}
        {...rowProps}
      />
      <BrandingAssetRow
        field="jobHeroBackgroundUrl"
        value={values.jobHeroBackgroundUrl}
        onChange={(v) => setField("jobHeroBackgroundUrl", v)}
        accept=".png,.webp,.jpg,.jpeg,image/png,image/webp,image/jpeg"
        label={t.adminBrandingJobBg}
        hint={t.adminBrandingHintBg}
        {...rowProps}
      />
      <BrandingAssetRow
        field="homeOpenGraphImageUrl"
        value={values.homeOpenGraphImageUrl}
        onChange={(v) => setField("homeOpenGraphImageUrl", v)}
        accept=".png,.webp,.jpg,.jpeg,image/png,image/webp,image/jpeg"
        label={t.adminBrandingHomeOg}
        hint={t.adminBrandingHintOg}
        {...rowProps}
      />
      <BrandingAssetRow
        field="jobOpenGraphImageUrl"
        value={values.jobOpenGraphImageUrl}
        onChange={(v) => setField("jobOpenGraphImageUrl", v)}
        accept=".png,.webp,.jpg,.jpeg,image/png,image/webp,image/jpeg"
        label={t.adminBrandingJobOg}
        hint={t.adminBrandingHintOg}
        {...rowProps}
      />
      <BrandingAssetRow
        field="jobListingIllustrationUrl"
        value={values.jobListingIllustrationUrl}
        onChange={(v) => setField("jobListingIllustrationUrl", v)}
        accept=".png,.webp,image/png,image/webp"
        label={t.adminBrandingJobIllustration}
        hint={t.adminBrandingHintIllustration}
        {...rowProps}
      />

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "…" : t.adminBrandingSave}
        </Button>
      </div>

      {state?.ok ? (
        <p className="text-sm text-emerald-800">{t.adminBrandingSaved}</p>
      ) : null}
      {state && !state.ok && state.message ? (
        <p className="text-sm text-destructive" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
    </div>
  );
}
