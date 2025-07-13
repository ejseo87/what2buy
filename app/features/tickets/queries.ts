import pkg from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const getTickets = async (
  client: SupabaseClient<Database>,
  { userId }: { userId: string }
) => {
  const { data: tickets, error } = await client
    .from("tickets")
    .select("*")
    .eq("profile_id", userId)
    .order("ticket_id", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Failed to get tickets");
  }
  //console.log("getTickets tickets=", tickets);
  return tickets;
};
