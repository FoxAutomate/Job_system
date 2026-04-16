import { AdminDemoBanner } from "@/components/admin/AdminDemoBanner";
import { AdminHomeLink } from "@/components/admin/AdminHomeLink";
import { AdminNav } from "@/components/admin/AdminNav";
import { SiteFooterCredits } from "@/components/SiteFooterCredits";
import { auth } from "@/auth";
import { isDemoMode } from "@/lib/demo-mode";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const demo = isDemoMode();

  return (
    <div className="flex min-h-dvh flex-col bg-neutral-100">
      {session ? <AdminNav /> : null}
      <div className="mx-auto max-w-5xl flex-1 px-4 py-8 sm:px-6">
        {session && demo ? <AdminDemoBanner /> : null}
        {children}
      </div>
      {!session ? (
        <p className="pb-4 text-center text-sm text-neutral-500">
          <AdminHomeLink />
        </p>
      ) : null}
      <SiteFooterCredits className="mt-auto border-t border-neutral-200/90 bg-neutral-100/90" />
    </div>
  );
}
