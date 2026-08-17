import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/login-form";
import { SiteLogo } from "@/components/marketing/site-logo";
import { getAdminSession } from "@/lib/auth/get-admin-session";

export const metadata: Metadata = {
  title: "Admin sign in | Living Echoes",
  robots: {
    index: false,
    follow: false,
  },
};

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;
  const session = await getAdminSession();

  if (session) {
    redirect(params.next ?? "/admin");
  }

  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <div className="mb-8">
        <SiteLogo />
      </div>
      <LoginForm nextPath={params.next} errorCode={params.error} />
    </main>
  );
}
