import { histories, stocks, daily_stocks } from "./schema";
import { PAGE_SIZE } from "~/common/constants";
import type { Database } from "~/supa-client";
import pkg from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "react-router";

export const latestRecommendation = async (
  client: SupabaseClient<Database>,
  { profile_id }: { profile_id: string }
) => {
  const { data: lastest_history, error } = await client
    .from("histories")
    .select("*")
    .eq("profile_id", profile_id)
    .order("recommendation_date", { ascending: false })
    .limit(1)
    .single();
  if (error) {
    console.log(error);
    throw redirect("/recommendation");
  }
  //console.log(lastest_history);
  return lastest_history;
};

export const getHistory = async (
  client: SupabaseClient<Database>,
  { recommendation_id }: { recommendation_id: number }
) => {
  const { data: history, error } = await client
    .from("recommendation_stocks_view")
    .select("*")
    .eq("recommendation_id", recommendation_id)
    .single();
  if (error) {
    console.log(error);
    throw new Error("Failed to get history");
  }
  //console.log(history);
  return history;
};

export const getStockRecommendationChart = async (
  client: SupabaseClient<Database>,
  {
    recommendation_id,
    stock_id,
  }: {
    recommendation_id: number;
    stock_id: number;
  }
) => {
  const { data: stock_recommendation_chart, error } = await client
    .from("stock_recommendation_chart_view")
    .select("*")
    .eq("stock_id", stock_id)
    .eq("recommendation_id", recommendation_id)
    .single();
  if (error) {
    console.log(error);
    throw new Error("Failed to get stock recommendation chart");
  }
  //console.log(stock_recommendation_chart);
  return stock_recommendation_chart;
};

export const getRecommendationCount = async (
  client: SupabaseClient<Database>,
  { profile_id }: { profile_id: string }
) => {
  const { count, error } = await client
    .from("histories")
    .select("recommendation_id", { count: "exact", head: true })
    .eq("profile_id", profile_id);
  if (error) {
    console.log(error);
    throw new Error("Failed to get recommendation count");
  }
  return count;
};

export const getStockOverview = async (
  client: SupabaseClient<Database>,
  { stockId }: { stockId: number }
) => {
  const { data: stock_overview, error } = await client
    .from("stocks")
    .select("*")
    .eq("stock_id", stockId)
    .single();
  if (error) {
    console.log(error);
    throw new Error("Failed to get stock overview");
  }
  //console.log(stock_overview);
  return stock_overview;
};

export const getDailyPricesByStockId = async (
  client: SupabaseClient<Database>,
  {
    stockId,
    count,
  }: {
    stockId: number;
    count: number;
  }
) => {
  const { data: daily_prices, error } = await client
    .from("daily_stocks")
    .select("date, close")
    .eq("stock_id", stockId)
    .order("date", { ascending: false })
    .limit(count);

  if (error) {
    console.log(error);
    throw new Error("Failed to get daily prices");
  }

  // Reverse the array to get chronological order (oldest to newest)
  const sortedPrices = daily_prices?.reverse() || [];
  //console.log(sortedPrices);
  return sortedPrices;
};

// 새로운 뷰를 사용하는 함수들 추가 (기존 테이블 조인 방식 사용)
export const getStockDetail = async (
  client: SupabaseClient<Database>,
  { stockId }: { stockId: string }
) => {
  // 주식 정보와 최근 가격 정보를 함께 가져오기
  const { data: stock_detail, error } = await client
    .from("stocks")
    .select(
      `
      *,
      daily_stocks(
        date,
        close,
        open,
        high,
        low,
        volume,
        change
      )
    `
    )
    .eq("stock_id", stockId)
    .order("date", { ascending: false, referencedTable: "daily_stocks" })
    .limit(1, { referencedTable: "daily_stocks" })
    .single();

  if (error) {
    console.log(error);
    throw new Error("Failed to get stock detail");
  }

  return stock_detail;
};

export const getProfitTrackingByStockId = async (
  client: SupabaseClient<Database>,
  {
    stockId,
    profileId,
  }: {
    stockId: number;
    profileId: string;
  }
) => {
  // 수익률 추적 정보 가져오기
  const { data: profit_tracking, error } = await client
    .from("profit_tracking_view")
    .select("*")
    .eq("stock_id", stockId)
    .eq("profile_id", profileId)
    .order("recommendation_date", {
      ascending: false,
    });

  if (error) {
    console.log(error);
    throw new Error("Failed to get profit tracking");
  }

  return profit_tracking;
};

export const getStockRecommendationDetail = async (
  client: SupabaseClient<Database>,
  {
    recommendationId,
    stockId,
  }: {
    recommendationId: number;
    stockId: number;
  }
) => {
  // 특정 추천의 주식 상세 정보
  const { data: recommendation_detail, error } = await client
    .from("histories")
    .select(
      `
      *,
      stocks!histories_stock1_id_fkey(
        stock_id,
        stock_name,
        stock_code,
        per,
        pbr,
        eps,
        bps,
        roe,
        dividend_per_share
      ),
      history_stock_relations(
        profit,
        profit_rate
      )
    `
    )
    .eq("recommendation_id", recommendationId)
    .eq("history_stock_relations.stock_id", stockId)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Failed to get stock recommendation detail");
  }

  return recommendation_detail;
};

/*
2025.07.24 refactoring codes for recommendation history
*/
/*
2025.07.24 refactoring codes for recommendation history
*/
/*
2025.07.24 refactoring codes for recommendation history
*/
/*
2025.07.24 refactoring codes for recommendation history
*/
/*
2025.07.24 refactoring codes for recommendation history
*/
/*
2025.07.24 refactoring codes for recommendation history
*/
/*
2025.07.24 refactoring codes for recommendation history
*/
/*
2025.07.24 refactoring codes for recommendation history
*/

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
  console.log("[getRecommendationHistories] histories=", histories);
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
  console.log(
    "[getStocksOverviewByStockCode] stocks_overview=",
    stocks_overview
  );
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
