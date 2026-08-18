import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminFamilies } from "@/lib/admin/get-families";
import { requireAdminSession } from "@/lib/auth/get-admin-session";
import { formatDateTime, formatMoneyFromStripe } from "@/lib/format";

export const metadata: Metadata = {
  title: "Families | Living Echoes Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminFamiliesPage() {
  const session = await requireAdminSession();
  const families = await getAdminFamilies(session.organizationId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Families
        </h1>
        <p className="mt-2 text-muted-foreground">
          Customer accounts created after Stripe checkout. Read-only in Milestone
          2 — full management arrives in Milestone 3.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All families</CardTitle>
          <CardDescription>
            {families.length === 0
              ? "No families yet. Complete a test checkout to create the first record."
              : `${families.length} family account${families.length === 1 ? "" : "ies"} in ${session.organizationName}.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {families.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Families appear here automatically when Stripe webhook processing
              succeeds.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Family</TableHead>
                  <TableHead>Primary contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Latest order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {families.map((family) => (
                  <TableRow key={family.id}>
                    <TableCell className="font-medium">{family.name}</TableCell>
                    <TableCell>{family.primaryContactName ?? "—"}</TableCell>
                    <TableCell>{family.primaryContactEmail ?? "—"}</TableCell>
                    <TableCell>{family.primaryContactPhone ?? "—"}</TableCell>
                    <TableCell>
                      {formatMoneyFromStripe(
                        family.latestOrderAmount,
                        family.latestOrderCurrency,
                      )}
                    </TableCell>
                    <TableCell className="capitalize">
                      {family.latestOrderStatus ?? family.status}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatDateTime(family.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
