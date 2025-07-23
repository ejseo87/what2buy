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

export const insertYahooFinancialData = async (
  client: SupabaseClient<Database>,
  dataToInsert: Database["public"]["Tables"]["yahoo_financial_data"]["Insert"][]
) => {
  const { error } = await client
    .from("yahoo_financial_data")
    .upsert(dataToInsert, { onConflict: "isu_srt_cd" });

  if (error) {
    console.error("Error inserting financial data:", error);
    throw new Error("Failed to insert financial data");
  }
};

export const insertYahooSummaryDetail = async (
  client: SupabaseClient<Database>,
  dataToInsert: Database["public"]["Tables"]["yahoo_summary_detail"]["Insert"][]
) => {
  const { error } = await client
    .from("yahoo_summary_detail")
    .upsert(dataToInsert, { onConflict: "isu_srt_cd" });

  if (error) {
    console.error("Error inserting summary detail:", error);
    throw new Error("Failed to insert summary detail");
  }
};

export const insertYahooDefaultKeyStatistics = async (
  client: SupabaseClient<Database>,
  dataToInsert: Database["public"]["Tables"]["yahoo_default_key_statistics"]["Insert"][]
) => {
  const { error } = await client
    .from("yahoo_default_key_statistics")
    .upsert(dataToInsert, { onConflict: "isu_srt_cd" });

  if (error) {
    console.error("Error inserting default key statistics:", error);
    throw new Error("Failed to insert default key statistics");
  }
};

export const insertStocksSummaryWithRatios = async (
  client: SupabaseClient<Database>,
  dataToInsert: Database["public"]["Tables"]["stocks_summary_detail"]["Insert"][]
) => {
  const { error } = await client
    .from("stocks_summary_with_ratios")
    .upsert(dataToInsert, { onConflict: "isu_srt_cd" });

  if (error) {
    console.error("Error inserting calculated ratios:", error);
    throw new Error("Failed to insert calculated ratios");
  }
};
