import Link from "next/link";
import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAdminFamilies } from "@/lib/admin/get-families";
import { requireAdminSession } from "@/lib/auth/get-admin-session";

export const metadata: Metadata = {
  title: "Admin dashboard | Living Echoes",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();
  const families = await getAdminFamilies(session.organizationId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back{session.fullName ? `, ${session.fullName}` : ""}. Manage
          families, biographies, and media from here.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Families</CardTitle>
            <CardDescription>
              Customer accounts created after purchase or by staff.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between gap-4">
            <p className="text-3xl font-semibold tabular-nums">{families.length}</p>
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href="/admin/families" />}
            >
              View families
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Biographies</CardTitle>
            <CardDescription>
              Memorial content built and published for each family.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Coming in Ship 3.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
