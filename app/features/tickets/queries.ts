import pkg from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const getTickets = async (
  client: SupabaseClient<Database>,
  {
    userId,
    status = "all",
  }: {
    userId: string;
    status: string;
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

export const getTicketCount = async (
  client: SupabaseClient<Database>,
  {
    profile_id,
    status = "all",
  }: {
    profile_id: string;
    status: string;
  }
) => {
  const baseQuery = client
    .from("tickets")
    .select("ticket_id", { count: "exact", head: true })
    .eq("profile_id", profile_id);
  if (status !== "all") {
    baseQuery.eq("status", status);
  }
  const { data: count, error } = await baseQuery;
  if (error) {
    console.error(error);
    throw new Error("Failed to get ticket count");
  }
  return count;
};
