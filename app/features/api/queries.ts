import pkg from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

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

export type GoodStock = {
  stock_code: string;
  market_type: string;
  korean_name: string;
  english_name: string;
  /*  price_to_book_ratio: number;
  trailing_price_to_earnings_ratio: number;
  forward_price_to_earnings_ratio: number;
  ev_to_ebitda: number;
  ev_to_revenue: number;
  return_on_equity: number;
  return_on_assets: number;
  revenue_per_share: number;
  analyst_recommendation: string;
  par_value: number;
  list_shares: number;*/
};

export const getGoodStockList = async (
  client: SupabaseClient<Database>,
  {userId}: {userId: string}
): Promise<GoodStock[]> => {
  const { data, error } = await client
    .from("get_good_stocks_list_view")
    .select("stock_code, korean_name, english_name, market_type");
    /*.order("return_on_equity", { ascending: false })
    .limit(20);*/
  if (error) {
    console.error(error);
    throw new Error("Failed to get good stocks");
  }
  return data as GoodStock[];
};
