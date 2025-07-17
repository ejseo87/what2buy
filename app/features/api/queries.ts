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
