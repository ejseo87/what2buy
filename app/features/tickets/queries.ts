import pkg from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const getTickets = async (
  client: SupabaseClient<Database>,
  {
    userId,
    status = "all"
  }:
    {
      userId: string,
      status: string
    }
) => {
  const baseQuery = client
    .from("tickets")
    .select("*")
    .eq("profile_id", userId)
    .order("ticket_id", { ascending: false });

  if (status !== "all") {
    baseQuery.eq("status", status);
  }
  const { data: tickets, error } = await baseQuery;

  if (error) {
    console.error(error);
    throw new Error("Failed to get tickets");
  }
  return tickets;
};


