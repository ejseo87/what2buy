import pkg from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const insertStocksHistoricalData = async (
  client: SupabaseClient<Database>,
  transformedHistoricalData: Database["public"]["Tables"]["stocks_historical_data"]["Insert"][]
) => {
  const { error } = await client
    .from("stocks_historical_data")
    .insert(transformedHistoricalData);
  if (error) {
    console.error(error);
    throw new Error("Failed to insert stocks historical data");
  }
};
