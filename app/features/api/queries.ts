import pkg from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";
import type { GoodStock } from "./types";

export const getNoWargingStockList = async (
  client: SupabaseClient<Database>
) => {
  let allData: any[] = [];
  let page = 0;
  const pageSize = 1000;

  while (true) {
    const { data, error } = await client
      .from("get_no_warging_stock_list_view")
      .select("isu_srt_cd")
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error) {
      console.error(error);
      throw new Error("Failed to get no warging stock list");
    }

    if (!data || data.length === 0) {
      break; // 더 이상 데이터가 없으면 종료
    }

    allData = allData.concat(data);
    page++;

    // 안전장치: 너무 많은 페이지를 가져오지 않도록
    if (page > 10) {
      console.warn("Too many pages, stopping at page", page);
      break;
    }
  }

  return allData;
};

export const getStockList = async (client: SupabaseClient<Database>) => {
  let allData: any[] = [];
  let page = 0;
  const pageSize = 1000;

  while (true) {
    const { data, error } = await client
      .from("stocks_overview")
      .select("isu_srt_cd, isu_abbrv, isu_eng_nm")
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error) {
      console.error(error);
      throw new Error("Failed to get overall stock list");
    }

    if (!data || data.length === 0) {
      break; // 더 이상 데이터가 없으면 종료
    }

    allData = allData.concat(data);
    page++;

    // 안전장치: 너무 많은 페이지를 가져오지 않도록
    if (page > 10) {
      console.warn("Too many pages, stopping at page", page);
      break;
    }
  }

  return allData;
};

async function getRecommendedStocksNByUserId(
  client: SupabaseClient<Database>,
  userId: string
): Promise<string[]> {
  const { data, error } = await client
    .from("get_recommendation_history_detail_view")
    .select("stock1_code, stock2_code, stock3_code")
    .eq("profile_id", userId);

  if (error) {
    console.error("Error fetching recommended stock codes:", error);
    return [];
  }

  const stockCodes = (data as any[]) // Assuming RecommendedHistory is no longer needed, so cast to any[]
    .flatMap((row) => [row.stock1_code, row.stock2_code, row.stock3_code])
    .filter((code): code is string => !!code); // Filter out null/undefined and assert type

  // remove duplicates
  return [...new Set(stockCodes)];
}

export const getGoodStockListByUserId = async (
  client: SupabaseClient<Database>,
  { userId }: { userId: string }
): Promise<GoodStock[]> => {
  const recommendedStockCodes = await getRecommendedStocksNByUserId(
    client,
    userId
  );
  console.log(
    "[getGoodStockListByUserId] recommendedStockCodes=",
    recommendedStockCodes
  );
  const query = client
    .from("get_good_stocks_list_view")
    .select("stock_code, korean_name, english_name, market_type");

  if (recommendedStockCodes.length > 0) {
    const codes = recommendedStockCodes.map((code) => `'${code}'`).join(",");
    console.log("[getGoodStockListByUserId] codes=", codes);
    query.not("stock_code", "in", `(${codes})`);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Failed to get good stocks");
  }
  console.log("[getGoodStockListByUserId] data=", data);
  return data as GoodStock[];
};
