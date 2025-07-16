import pkg from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const getNoWargingStockList = async (
  client: SupabaseClient<Database>
) => {
  const { data, error } = await client
    .from("get_no_warging_stock_list_view")
    .select("isu_srt_cd, isu_abbrv");

  if (error) {
    console.error(error);
    throw new Error("Failed to get no warging stock list");
  }
  
  return data;
};
