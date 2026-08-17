import { AdminHeader } from "@/components/admin/admin-header";
import { requireAdminSession } from "@/lib/auth/get-admin-session";

export default async function AdminDashboardLayout({
  children,
}: LayoutProps<"/admin">) {
  const session = await requireAdminSession();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <AdminHeader session={session} />
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</div>
    </div>
  );
}
