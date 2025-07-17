import pkg from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const insertStocksHistoricalData = async (
  client: SupabaseClient<Database>,
  transformedHistoricalData: Database["public"]["Tables"]["stocks_historical_data"]["Insert"][]
) => {
  const { error: insertError } = await client
    .from("stocks_historical_data")
    .upsert(transformedHistoricalData, {
      onConflict: "isu_srt_cd, date",
      ignoreDuplicates: true,
    });

  if (insertError) {
    console.error(insertError);
    throw new Error("Failed to insert stocks historical data");
  }
};
