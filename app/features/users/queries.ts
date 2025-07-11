import type { Database } from "~/supa-client";
import pkg from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

export const getUserProfile = async (
  client: SupabaseClient<Database>,
  { username }: { username: string }
) => {
  const { data: profile, error } = await client
    .from("profiles")
    .select(
      `
      profile_id,
      name,
      username,
      avatar
      `
    )
    .eq("username", username)
    .single();
  if (error) {
    console.error(error);
    throw new Error("Failed to get user profile");
  }
  console.log("profile=", profile);
  return profile;
};

export const getUserById = async (
  client: SupabaseClient<Database>,
  { id }: { id: string }
) => {
  const { data: profile, error } = await client
    .from("profiles")
    .select(
      `
      profile_id,
      name,
      username,
      avatar
      `
    )
    .eq("profile_id", id)
    .single();
  if (error) {
    console.error(error);
    throw new Error("Failed to get user profile");
  }
  console.log("profile=", profile);
  return profile;
};
