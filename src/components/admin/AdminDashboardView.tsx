"use client";

import Link from "next/link";

import { SettingsEmailForm } from "@/components/admin/SettingsEmailForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/lib/i18n/locale-context";

type Props = {
  jobCount: number;
  appCount: number;
  initialEmail: string;
  initialApplicantBodyEt: string;
  initialApplicantBodyEn: string;
};

export function AdminDashboardView({
  jobCount,
  appCount,
  initialEmail,
  initialApplicantBodyEt,
  initialApplicantBodyEn,
}: Props) {
  const { t } = useLocale();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">{t.adminDashTitle}</h1>
        <p className="text-neutral-600">{t.adminDashSubtitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t.adminDashJobsCard}</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{jobCount}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t.adminDashAppsCard}</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{appCount}</CardContent>
        </Card>
      </div>

      <SettingsEmailForm
        initialEmail={initialEmail}
        initialApplicantBodyEt={initialApplicantBodyEt}
        initialApplicantBodyEn={initialApplicantBodyEn}
      />

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/offers/new"
          className="inline-flex min-h-10 items-center rounded-lg bg-neutral-900 px-4 text-sm font-medium text-white hover:bg-neutral-800"
        >
          {t.adminDashNewOffer}
        </Link>
        <Link
          href="/admin/offers"
          className="inline-flex min-h-10 items-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-medium hover:bg-neutral-50"
        >
          {t.adminDashManageOffers}
        </Link>
        <Link
          href="/admin/applications"
          className="inline-flex min-h-10 items-center rounded-lg border border-neutral-300 bg-white px-4 text-sm font-medium hover:bg-neutral-50"
        >
          {t.adminDashOpenApps}
        </Link>
      </div>
    </div>
  );
}
