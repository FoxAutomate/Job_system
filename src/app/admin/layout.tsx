import Link from "next/link";

import { AdminNav } from "@/components/admin/AdminNav";
import { auth } from "@/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-dvh bg-neutral-100">
      {session ? <AdminNav /> : null}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</div>
      {!session ? (
        <p className="pb-6 text-center text-sm text-neutral-500">
          <Link href="/" className="hover:underline">
            ← Avaleht
          </Link>
        </p>
      ) : null}
    </div>
  );
}
