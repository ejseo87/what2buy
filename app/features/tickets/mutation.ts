import pkg from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const useTicket = async (
  client: SupabaseClient,
  {
    ticketId,
    userId,
  }: {
    ticketId: number;
    userId: string;
  }
) => {
  const { error: ticketError } = await client
    .from("tickets")
    .update({ status: "used", used_date: new Date().toISOString() })
    .eq("ticket_id", ticketId)
    .eq("profile_id", userId);
  if (ticketError) {
    console.error(ticketError);
    return false;
  }
  return true;
};

export const createTickets = async (
  client: SupabaseClient<Database>,
  {
    userId,
    ticketType,
    quantity,
  }: {
    userId: string;
    ticketType: string;
    quantity: number;
  }
) => {
  const now = new Date();
  const endDate = new Date(now);
  endDate.setMonth(endDate.getMonth() + 1); // 1개월 후

  const ticketsToCreate = Array.from({ length: quantity }, () => ({
    profile_id: userId,
    ticket_type: ticketType,
    ticket_description: null,
    ticket_duration_start: now.toISOString().split("T")[0],
    ticket_duration_end: endDate.toISOString().split("T")[0],
    status: "not_used" as const,
  }));

  const { data, error } = await (client as any)
    .from("tickets")
    .insert(ticketsToCreate)
    .select();

  if (error) {
    console.error("Error creating tickets:", error);
    throw new Error("Failed to create tickets");
  }

  return data;
};
