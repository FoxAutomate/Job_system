"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Suspense, useState } from "react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocale } from "@/lib/i18n/locale-context";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const { t } = useLocale();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    const password = String(fd.get("password") ?? "");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setPending(false);
    if (res?.error) {
      setError(t.adminLoginError);
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="flex justify-end">
        <LanguageSwitcher />
      </div>
      <Card className="border-neutral-200 shadow-md">
        <CardHeader>
          <CardTitle className="font-heading text-2xl">{t.adminLoginTitle}</CardTitle>
          <CardDescription>{t.adminLoginDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.adminLoginEmail}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                required
                className="min-h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.adminLoginPassword}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="min-h-11"
              />
            </div>
            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            <Button
              type="submit"
              className="w-full min-h-11"
              disabled={pending}
            >
              {pending ? t.adminLoginSigningIn : t.adminLoginSubmit}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminLoginPage() {
  const { t } = useLocale();

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-md rounded-lg border border-neutral-200 bg-white p-8 text-center text-neutral-600">
          {t.adminLoginLoading}
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
