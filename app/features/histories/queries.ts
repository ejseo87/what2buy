import client from "~/supa-client";

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
