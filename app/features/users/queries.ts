import pkg from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";
import { redirect } from "react-router";


export const getUserProfile = async (
  client: SupabaseClient<Database>,
  { username }: { username: string }
) => {
  //console.log("getUserProfile username=", username);

  const { data: profile, error: directError } = await client
    .from("profiles")
    .select(
      `
          profile_id,
          name,
          username,
          avatar,
          created_at,
          updated_at
          `
    )
    .eq("username", username)
    .single();

  if (directError) {
    console.error("getUserProfile direct query error:", directError);
    return null;
  }

  //console.log("getUserProfile profile=", profile);
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
  //console.log("profile=", profile);
  return profile;
};

export const getLoggedInUserId = async (client: SupabaseClient<Database>) => {
  const { data, error } = await client.auth.getUser();
  if (error || data.user == null) {
    console.error(error);
    throw redirect("/auth/login");
  }
  return data.user.id;
};

export const checkUsername = async (
  client: SupabaseClient<Database>,
  { username }: { username: string }
) => {
  const { count, error } = await client
    .from("profiles")
    .select("username", { count: "exact", head: true })
    .eq("username", username);
  if (error) {
    console.error(error);
    throw new Error("Failed to check username");
  }
  return count;
};

export const getEmailByUserId = async (
  client: SupabaseClient<Database>,
  { userId }: { userId: string }
) => {
  const { data, error } = await client.auth.admin.getUserById(userId);
  if (error) {
    console.error(error);
    throw new Error("Failed to get email");
  }
  //console.log("getEmailByUserId data=", data);
  return data.user.email;
};
