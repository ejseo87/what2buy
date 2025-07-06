import client from "~/supa-client";
import { histories, stocks, daily_stocks } from "./schema";

export const getReturnRateInfo = async ({
  stockId,
  recommendationDate,
}: {
  stockId: number;
  recommendationDate: string;
}) => {
  // recommendationDate를 YYYY-MM-DD 형식으로 변환
  const recDate = recommendationDate.split("T")[0];

  // 추천일 주식 가격 가져오기 (추천일 또는 그 이후 첫 번째 거래일)
  const { data: recommendationPrice, error: recError } = await client
    .from("daily_stocks")
    .select("date, close")
    .eq("stock_id", stockId)
    .gte("date", recDate)
    .order("date", { ascending: true })
    .limit(1)
    .single();

  if (recError) {
    console.log("Recommendation date error:", recError);
    throw new Error("Failed to get recommendation date price");
  }

  // 가장 최근 날짜 주식 가격 가져오기
  const { data: latestPrice, error: latestError } = await client
    .from("daily_stocks")
    .select("date, close")
    .eq("stock_id", stockId)
    .order("date", { ascending: false })
    .limit(1)
    .single();

  if (latestError) {
    console.log("Latest price error:", latestError);
    throw new Error("Failed to get latest price");
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

export const getHistory = async (recommendation_id: string) => {
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

export const getHistories = async ({
  profile_id,
  limit,
  sorting,
  keyword,
}: {
  profile_id: string;
  limit: number;
  sorting: "newest" | "oldest";
  keyword: string;
}) => {
  const isAscending = sorting === "oldest";

  const baseQuery = client
    .from("recommendation_stocks_view")
    .select(
      `
      recommendation_id,
      recommendation_date,
      summary,
      stock1_id,
      stock2_id,
      stock3_id,
      stock1_name,
      stock2_name,
      stock3_name
      `
    )
    .eq("profile_id", profile_id)
    .order("recommendation_date", { ascending: isAscending })
    .limit(limit);
  if (keyword) {
    baseQuery.ilike("summary", `%${keyword}%`);
  }
  const { data: histories, error } = await baseQuery;
  if (error) {
    console.log(error);
    throw new Error("Failed to get histories");
  }
  //console.log(histories);
  return histories;
};

export const latestRecommendation = async (profile_id: string) => {
  const { data: lastest_history, error } = await client
    .from("histories")
    .select("*")
    .eq("profile_id", profile_id)
    .order("recommendation_date", { ascending: false })
    .limit(1)
    .single();
  if (error) {
    console.log(error);
    throw new Error("Failed to get latest recommendation");
  }
  //console.log(lastest_history);
  return lastest_history;
};

export const getStockOverview = async (stockId: number) => {
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

export const getDailyPricesByStockId = async ({
  stockId,
  count,
}: {
  stockId: number;
  count: number;
}) => {
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
