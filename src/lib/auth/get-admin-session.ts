import "server-only";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type AdminSession = {
  userId: string;
  email: string;
  fullName: string | null;
  organizationId: string;
  organizationName: string;
  role: "admin" | "moderator";
};

export async function getAdminSession(): Promise<AdminSession | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, is_active")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("[getAdminSession] profiles query failed:", profileError.message);
    return null;
  }

  if (!profile?.is_active) {
    return null;
  }

  const { data: membership, error: membershipError } = await supabase
    .from("organization_members")
    .select("role, organization_id")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .in("role", ["admin", "moderator"])
    .maybeSingle();

  if (membershipError) {
    console.error(
      "[getAdminSession] organization_members query failed:",
      membershipError.message,
    );
    return null;
  }

  if (!membership) {
    return null;
  }

  const { data: organization } = await supabase
    .from("organizations")
    .select("name")
    .eq("id", membership.organization_id)
    .maybeSingle();

  return {
    userId: user.id,
    email: user.email ?? "",
    fullName: profile.full_name,
    organizationId: membership.organization_id,
    organizationName: organization?.name ?? "Organization",
    role: membership.role as AdminSession["role"],
  };
}

export async function requireAdminSession(): Promise<AdminSession> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login?error=unauthorized");
  }

  return session;
}
