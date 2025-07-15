import type { Database } from "~/supa-client";
import pkg from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "react-router";

export const updateUser = async (
  client: SupabaseClient<Database>,
  {
    profile_id,
    name,
    username,
  }: {
    profile_id: string;
    name: string;
    username: string;
  }
) => {
  console.log("Updating user with profile_id:", profile_id);

  // 먼저 현재 사용자 정보 확인
  const { data: currentUser, error: selectError } = await client
    .from("profiles")
    .select("*")
    .eq("profile_id", profile_id)
    .single();

  console.log("Current user data:", currentUser);
  console.log("Select error:", selectError);

  const { data, error } = await client
    .from("profiles")
    .update({ name, username } as any)
    .eq("profile_id", profile_id)
    .select()
    .single();
  if (error) {
    console.error("Update user error:", error);
    throw new Error("Failed to update user");
  }

  console.log("Updated user data:", data);
  return { success: true, data };
};

export const updateUserAvatar = async (
  client: SupabaseClient<Database>,
  {
    profile_id,
    avatarUrl,
  }: {
    profile_id: string;
    avatarUrl: string;
  }
) => {
  const { data, error } = await client
    .from("profiles")
    .update({
      avatar: avatarUrl,
    })
    .eq("profile_id", profile_id)
    .select()
    .single();

  if (error) {
    console.error("Update user avatar error:", error);
    throw new Error("Failed to update user avatar");
  }

  console.log("Updated user avatar data:", data);
  return { success: true, data };
};
