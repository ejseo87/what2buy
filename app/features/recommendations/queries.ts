import pkg from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const getGoodStocks = async (client: SupabaseClient) => {
  const { data: goodStocksData, error: goodStocksError } = await client
    .from("stocks")
    .select(
      "stock_name, stock_code, stock_count, pbr, per, roe, eps, bps, dividend_per_share"
    )
    .lte("pbr", 1.5);
  if (goodStocksError) {
    console.error(goodStocksError);
    throw new Error("Failed to get good stocks");
  }
  return goodStocksData;
};
