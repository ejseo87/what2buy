import { histories, stocks, daily_stocks } from "./schema";
import { PAGE_SIZE } from "~/common/constants";
import type { Database } from "~/supa-client";
import pkg from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "react-router";

/*
2025.07.24 refactoring codes for recommendation history
*/
export const getLatestRecommendation = async (
  client: SupabaseClient<Database>,
  { userId }: { userId: string }
) => {
  const { data: lastest_history, error } = await client
    .from("get_recommendation_history_detail_view")
    .select("*")
    .eq("profile_id", userId)
    .order("recommendation_date", { ascending: false })
    .limit(1);

  if (error) {
    console.log("[getLatestRecommendation] error=", error);
    throw redirect("/recommendation");
  }

  // 추천 기록이 없는 경우 (새 사용자)
  if (!lastest_history || lastest_history.length === 0) {
    console.log("[getLatestRecommendation] No recommendation history found");
    throw redirect("/recommendation");
  }

  return lastest_history[0];
};

export const getRecommendationHistoryTotalPages = async (
  client: SupabaseClient<Database>,
  {
    userId,
    keyword,
  }: {
    userId: string;
    keyword: string;
  }
) => {
  const baseQuery = client
    .from("get_recommendation_history_detail_view")
    .select("recommendation_id", { count: "exact", head: true })
    .eq("profile_id", userId);

  if (keyword) {
    baseQuery.or(
      `stock1_name.ilike.%${keyword}%,stock2_name.ilike.%${keyword}%, stock3_name.ilike.%${keyword}%,overall_summary.ilike.%${keyword}%`
    );
  }

  const { count, error } = await baseQuery;
  if (error) {
    console.log("[getRecommendationHistoryTotalPages] error=", error);
    throw error;
  }
  if (count === null || count === 0) return 1;
  //console.log("[getRecommendationHistoryTotalPages] count=", count);
  return Math.ceil(count / PAGE_SIZE);
};

export const getRecommendationCount = async (
  client: SupabaseClient<Database>,
  { profile_id }: { profile_id: string }
) => {
  const { count, error } = await client
    .from("get_recommendation_history_detail_view")
    .select("recommendation_id", { count: "exact", head: true })
    .eq("profile_id", profile_id);

  if (error) {
    console.log("[getRecommendationCount] error=", error);
    throw error;
  }

  return count || 0;
};

export const getRecommendationHistories = async (
  client: SupabaseClient<Database>,
  {
    userId,
    page,
    sorting,
    keyword,
  }: {
    userId: string;
    page: number;
    sorting: "newest" | "oldest";
    keyword: string;
  }
) => {
  const isAscending = sorting === "oldest";

  const baseQuery = client
    .from("get_recommendation_history_detail_view")
    .select(
      `
      recommendation_id,
      recommendation_date,
      overall_summary,
      stock1_code,
      stock2_code,
      stock3_code,
      stock1_name,
      stock2_name,
      stock3_name
      `
    )
    .eq("profile_id", userId)
    .order("recommendation_date", { ascending: isAscending })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (keyword) {
    baseQuery.or(
      `stock1_name.ilike.%${keyword}%,stock2_name.ilike.%${keyword}%, stock3_name.ilike.%${keyword}%,overall_summary.ilike.%${keyword}%`
    );
  }
  const { data: histories, error } = await baseQuery;
  if (error) {
    console.log(error);
    throw new Error("Failed to get recommendation histories");
  }
  //console.log("[getRecommendationHistories] histories=", histories);
  return histories;
};

export const getRecommendationHistoryDetail = async (
  client: SupabaseClient<Database>,
  { recommendationId }: { recommendationId: number }
) => {
  const { data: recommendation_history_detail, error } = await client
    .from("get_recommendation_history_detail_view")
    .select("*")
    .eq("recommendation_id", recommendationId)
    .single();
  if (error) {
    console.log(error);
    throw new Error("Failed to get recommendation history detail");
  }
  //console.log(
  //  "[getRecommendationHistoryDetail] recommendation_history_detail=",
  //  recommendation_history_detail
  //);
  return recommendation_history_detail;
};

export const getRecommendedStockReturns = async (
  client: SupabaseClient<Database>,
  {
    stockCode,
    recommendationDate,
  }: {
    stockCode: string;
    recommendationDate: string;
  }
) => {
  // recommendationDate를 YYYY-MM-DD 형식으로 변환
  let recDate = recommendationDate.split("T")[0];

  // 가장 최근 날짜 주식 가격 가져오기
  const { data: latestPrice, error: latestError } = await client
    .from("stocks_historical_data")
    .select("date, close")
    .eq("isu_srt_cd", stockCode)
    .order("date", { ascending: false })
    .limit(1)
    .single();

  if (latestError) {
    console.log("Latest price error:", latestError);
    throw new Error("Failed to get latest price");
  }
  // 추천일 주식 가격 가져오기 (추천일 또는 그 이후 첫 번째 거래일)
  if (recDate > (latestPrice as any)?.date) {
    recDate = (latestPrice as any)?.date;
  }
  const { data: recommendationPrice, error: recError } = await client
    .from("stocks_historical_data")
    .select("date, close")
    .eq("isu_srt_cd", stockCode)
    .gte("date", recDate)
    .order("date", { ascending: true })
    .limit(1)
    .single();

  if (recError) {
    console.log("Recommendation date error:", recError);
    throw new Error("Failed to get recommendation date price");
  }

  return {
    recommendationPrice: (recommendationPrice as any)?.close || 0,
    recommendationDate: (recommendationPrice as any)?.date || recDate,
    latestPrice: (latestPrice as any)?.close || 0,
    latestDate:
      (latestPrice as any)?.date || new Date().toISOString().split("T")[0],
    profitAmount:
      ((latestPrice as any)?.close || 0) -
      ((recommendationPrice as any)?.close || 0),
    profitRate:
      (recommendationPrice as any)?.close > 0
        ? (
            (((latestPrice as any)?.close -
              (recommendationPrice as any)?.close) /
              (recommendationPrice as any)?.close) *
            100
          ).toFixed(2)
        : "0.00",
  };
};

export const getStocksOverviewByStockCode = async (
  client: SupabaseClient<Database>,
  { stockCode }: { stockCode: string }
) => {
  const { data: stocks_overview, error } = await client
    .from("stocks_overview")
    .select("*")
    .eq("isu_srt_cd", stockCode)
    .single();
  if (error) {
    console.log(error);
    throw new Error("Failed to get stocks overview");
  }
  //console.log(
  //  "[getStocksOverviewByStockCode] stocks_overview=",
  //  stocks_overview
  //);
  return stocks_overview;
};

export const getStocksSummaryWithRaitosByStockCode = async (
  client: SupabaseClient<Database>,
  { stockCode }: { stockCode: string }
) => {
  const { data, error } = await client
    .from("stocks_summary_with_ratios")
    .select("*")
    .eq("isu_srt_cd", stockCode)
    .single();
  if (error) {
    console.log(error);
    throw new Error("Failed to get stocks summary with raitos");
  }
  //console.log("[getStocksSummaryWithRaitosByStockCode] data=", data);
  return data;
};

export const getRecommendationHistoriesByStockCode = async (
  client: SupabaseClient<Database>,
  {
    stockCode,
    userId,
  }: {
    stockCode: string;
    userId: string;
  }
) => {
  const { data, error } = await client
    .from("recommendation_histories")
    .select("recommendation_id, recommendation_date")
    .eq("profile_id", userId)
    .or(
      `stock1_code.eq.${stockCode},stock2_code.eq.${stockCode},stock3_code.eq.${stockCode}`
    );
  if (error) {
    console.log(error);
    throw new Error("Failed to get recommendation histories");
  }
  //console.log("[getRecommendationHistoriesByStockCode] data=", data);
  return data;
};

export const getStockPerformanceChart = async (
  client: SupabaseClient<Database>,
  { stockCode, days = 30 }: { stockCode: string; days?: number }
) => {
  // 해당 종목의 최근 날짜 찾기
  const { data: latestData, error: latestError } = await client
    .from("stocks_historical_data")
    .select("date")
    .eq("isu_srt_cd", stockCode)
    .order("date", { ascending: false })
    .limit(1);

  if (latestError || !latestData || latestData.length === 0) {
    console.log("[getStockPerformanceChart] latestError=", latestError);
    throw new Error("Failed to get latest date for stock");
  }

  const latestDate = (latestData as any)[0].date;

  // 최근 날짜부터 N일 전까지의 데이터 가져오기
  const { data: chart_data, error } = await client
    .from("stocks_historical_data")
    .select("date, close")
    .eq("isu_srt_cd", stockCode)
    .gte(
      "date",
      new Date(
        new Date(latestDate).getTime() - (days - 1) * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0]
    )
    .lte("date", latestDate)
    .order("date", { ascending: true });

  if (error) {
    console.log(error);
    throw new Error("Failed to get stock performance chart");
  }

  return chart_data;
};

export const getStocksTotalPages = async (
  client: SupabaseClient<Database>,
  {
    profile_id,
    keyword,
  }: {
    profile_id: string;
    keyword: string;
  }
) => {
  let baseQuery = client
    .from("get_stocks_list_view")
    .select("stock_code", { count: "exact", head: true })
    .eq("profile_id", profile_id);

  if (keyword) {
    baseQuery.or(
      `korean_name.ilike.%${keyword}%,english_name.ilike.%${keyword}%,stock_code.ilike.%${keyword}%`
    );
  }

  const { count, error } = await baseQuery;
  if (error) throw error;
  if (count === null) return 1;
  //console.log("[getTotalPagesStocks] count=", count);
  return Math.ceil(count / PAGE_SIZE);
};

export const getStocksList = async (
  client: SupabaseClient<Database>,
  {
    profile_id,
    page,
    sorting,
    keyword,
  }: {
    profile_id: string;
    page: number;
    sorting: "asc" | "desc";
    keyword: string;
  }
) => {
  const isAscending = sorting === "asc";
  const baseQuery = client
    .from("get_stocks_list_view")
    .select("*")
    .eq("profile_id", profile_id)
    .order("korean_name", { ascending: isAscending })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (keyword) {
    baseQuery.or(
      `korean_name.ilike.%${keyword}%,english_name.ilike.%${keyword}%,stock_code.ilike.%${keyword}%`
    );
  }

  const { data: stocks_list, error } = await baseQuery;

  if (error) {
    console.log(error);
    throw new Error("Failed to get stocks list");
  }

  //console.log("[getStocksList] stocks_list=", stocks_list);
  return stocks_list;
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
export interface GoodStock {
  stock_code: string;
  korean_name: string;
  english_name: string;
  market_type: string;
}
export const getGoodStockListByUserId = async (
  client: SupabaseClient<Database>,
  { userId }: { userId: string }
): Promise<GoodStock[]> => {
  const recommendedStockCodes = await getRecommendedStocksNByUserId(
    client,
    userId
  );

  let query = client
    .from("get_good_stocks_list_view")
    .select("stock_code, korean_name, english_name, market_type");

  // 이미 추천받은 주식들을 제외
  if (recommendedStockCodes.length > 0) {
    //console.log(
    //  "[getGoodStockListByUserId] Excluding previously recommended stocks:",
    //  recommendedStockCodes
    //);
    // 각 주식 코드를 개별적으로 제외 (더 확실한 방법)
    recommendedStockCodes.forEach((code) => {
      query = query.neq("stock_code", code);
    });
  }

  const { data, error } = await query;

  if (error) {
    console.error("[getGoodStockListByUserId] Query error:", error);
    throw new Error("Failed to get good stocks");
  }

  console.log(
    "[getGoodStockListByUserId] Final filtered data count:",
    data?.length
  );
  console.log("[getGoodStockListByUserId] Sample data:", data?.slice(0, 3));

  return data as GoodStock[];
};

export const getTopPerformingRecommendedStocks = async (
  client: SupabaseClient<Database>,
  { userId }: { userId: string }
) => {
  // 1. 사용자의 모든 추천 기록 가져오기
  const { data: recommendations, error: recError } = await client
    .from("get_recommendation_history_detail_view")
    .select(
      `
      recommendation_id,
      recommendation_date,
      stock1_code,
      stock1_name,
      stock2_code,
      stock2_name,
      stock3_code,
      stock3_name
    `
    )
    .eq("profile_id", userId)
    .order("recommendation_date", { ascending: false });

  if (recError) {
    console.error("[getTopPerformingRecommendedStocks] Error:", recError);
    throw new Error("Failed to get recommendations");
  }

  if (!recommendations || recommendations.length === 0) {
    return [];
  }

  // 2. 모든 추천 주식들의 수익률 계산
  const stockPerformances = [];

  for (const rec of recommendations) {
    const stocks = [
      { code: (rec as any).stock1_code, name: (rec as any).stock1_name },
      { code: (rec as any).stock2_code, name: (rec as any).stock2_name },
      { code: (rec as any).stock3_code, name: (rec as any).stock3_name },
    ];

    for (const stock of stocks) {
      if (stock.code && stock.name) {
        try {
          const returns = await getRecommendedStockReturns(client, {
            stockCode: stock.code,
            recommendationDate: (rec as any).recommendation_date,
          });

          stockPerformances.push({
            stockCode: stock.code,
            stockName: stock.name,
            recommendationId: (rec as any).recommendation_id,
            recommendationDate: (rec as any).recommendation_date,
            profitRate: parseFloat(returns.profitRate),
            profitAmount: returns.profitAmount,
            recommendationPrice: returns.recommendationPrice,
            currentPrice: returns.latestPrice,
          });
        } catch (error) {
          console.log(
            `[getTopPerformingRecommendedStocks] Error for ${stock.code}:`,
            error
          );
          // 에러가 있는 주식은 건너뛰기
        }
      }
    }
  }

  // 3. 주식 코드별로 중복 제거 (가장 높은 수익률만 유지)
  const uniqueStocksMap = new Map();

  stockPerformances.forEach((stock) => {
    if (
      !uniqueStocksMap.has(stock.stockCode) ||
      uniqueStocksMap.get(stock.stockCode).profitRate < stock.profitRate
    ) {
      uniqueStocksMap.set(stock.stockCode, stock);
    }
  });

  // 4. 수익률 기준으로 정렬하고 TOP 3 선택
  const uniqueStocks = Array.from(uniqueStocksMap.values());
  const top3Stocks = uniqueStocks
    .sort((a, b) => b.profitRate - a.profitRate)
    .slice(0, 3);

  console.log(
    "[getTopPerformingRecommendedStocks] Top 3 unique stocks:",
    top3Stocks
  );
  return top3Stocks;
};
