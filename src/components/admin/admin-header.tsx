import Link from "next/link";

import { signOut } from "@/app/admin/(dashboard)/actions";
import { Button } from "@/components/ui/button";
import type { AdminSession } from "@/lib/auth/get-admin-session";

type AdminHeaderProps = {
  session: AdminSession;
};

export function AdminHeader({ session }: AdminHeaderProps) {
  const displayName = session.fullName ?? session.email;

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex min-w-0 items-center gap-6">
          <Link
            href="/admin"
            className="font-heading text-base font-medium text-foreground"
          >
            Living Echoes Admin
          </Link>
          <nav
            aria-label="Admin"
            className="hidden items-center gap-4 text-sm text-muted-foreground sm:flex"
          >
            <span>Families</span>
            <span>Biographies</span>
          </nav>
        </div>

        <div className="flex min-w-0 items-center gap-3">
          <div className="hidden min-w-0 text-right sm:block">
            <p className="truncate text-sm font-medium">{displayName}</p>
            <p className="truncate text-xs text-muted-foreground">
              {session.organizationName} · {session.role}
            </p>
          </div>
          <form action={signOut}>
            <Button type="submit" variant="outline" size="sm">
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
