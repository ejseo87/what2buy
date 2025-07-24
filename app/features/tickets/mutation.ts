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
