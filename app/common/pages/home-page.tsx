"use client";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { Hero } from "../components/hero";
import { StockChart } from "../components/stock-chart";
import { a_profile_id } from "../constants";
import type { Route } from "./+types/home-page";
import { PulsatingButton } from "~/common/components/magicui/pulsating-button";
import {
  getDailyPricesByStockId,
  getStockOverview,
  getStockRecommendationChart,
  latestRecommendation,
} from "~/features/histories/queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Home | What2Buy" },
    { name: "description", content: "Stock recommendation platform home page" },
  ];
};

// Abstract function to transform stock price data
const transformStockPriceData = async (props: {
  stockId: number;
  stockName: string;
  count: number;
}) => {
  const { stockId, stockName, count } = props;

  const rawData = await getDailyPricesByStockId({
    stockId,
    count,
  });

  // Transform data to match constants.tsx format
  return rawData.map((item) => {
    // Convert date from "2024-05-27" to "5/27" format
    const date = new Date(item.date);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;

    return {
      date: formattedDate,
      [stockName]: Number(item.close),
    };
  });
};
/*
  const chart_prices_1 = stock_chart_data_1.chart_prices.map((item) => {
    // Convert date from "2024-05-27" to "5/27" format
    const date = new Date(item.date);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;

    return {
      date: formattedDate,
      [stock_chart_data_1.stock_name]: item.close,
    };
  });
*/

export const loader = async () => {
  const latest_recommendation = await latestRecommendation(a_profile_id);
  //console.log(latest_recommendation);

  const stock_chart_data_1 = await getStockRecommendationChart({
    recommendation_id: latest_recommendation.recommendation_id,
    stock_id: latest_recommendation.stock1_id,
  });
  const changeAmount_1 =
    (stock_chart_data_1.latest_close ?? 0) -
    (stock_chart_data_1.recommendation_close ?? 0);
  const changePercent_1 =
    stock_chart_data_1.recommendation_close &&
    stock_chart_data_1.recommendation_close !== 0
      ? (changeAmount_1 / stock_chart_data_1.recommendation_close) * 100
      : 0;

  const stock_chart_data_2 = await getStockRecommendationChart({
    recommendation_id: latest_recommendation.recommendation_id,
    stock_id: latest_recommendation.stock2_id,
  });
  const changeAmount_2 =
    (stock_chart_data_2.latest_close ?? 0) -
    (stock_chart_data_2.recommendation_close ?? 0);
  const changePercent_2 =
    stock_chart_data_2.recommendation_close &&
    stock_chart_data_2.recommendation_close !== 0
      ? (changeAmount_2 / stock_chart_data_2.recommendation_close) * 100
      : 0;

  const stock_chart_data_3 = await getStockRecommendationChart({
    recommendation_id: latest_recommendation.recommendation_id,
    stock_id: latest_recommendation.stock3_id,
  });
  const changeAmount_3 =
    (stock_chart_data_3.latest_close ?? 0) -
    (stock_chart_data_3.recommendation_close ?? 0);
  const changePercent_3 =
    stock_chart_data_3.recommendation_close &&
    stock_chart_data_3.recommendation_close !== 0
      ? (changeAmount_3 / stock_chart_data_3.recommendation_close) * 100
      : 0;

  return {
    latest_recommendation,
    stock_chart_data_1,
    changeAmount_1,
    changePercent_1,
    stock_chart_data_2,
    changeAmount_2,
    changePercent_2,
    stock_chart_data_3,
    changeAmount_3,
    changePercent_3,
  };
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const {
    latest_recommendation,
    stock_chart_data_1,

    stock_chart_data_2,
    stock_chart_data_3,
    changeAmount_1,
    changePercent_1,
    changeAmount_2,
    changePercent_2,
    changeAmount_3,
    changePercent_3,
  } = loaderData;
  return (
    <div className="container mx-auto space-y-10">
      <Hero
        title="주식을 추천해주는 What2Buy"
        subtitle="가치가 있는 주식 중에 내일 상승할 확률이 높은 주식을 추천해드립니다. "
      />
      <div className="flex flex-col gap-10">
        <div className="flex flex-row justify-between gap-3 items-center">
          <div className="text-2xl  font-bold  py-2.5">
            최근에 추천한 주식 종목 현황
          </div>
          <PulsatingButton pulseColor="#FF007F" className="text-2xl px-10 ">
            주식 추천 받으러 가기
          </PulsatingButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
          <StockChart
            title={stock_chart_data_1.stock_name ?? "주식 1"}
            description={stock_chart_data_1.stock_name ?? "주식 1"}
            dataKey={stock_chart_data_1.stock_name ?? "stock1"}
            chartData={
              Array.isArray(stock_chart_data_1.chart_prices)
                ? (stock_chart_data_1.chart_prices as any[])
                : []
            }
            recommendationDate={latest_recommendation.recommendation_date}
            referencePrice={stock_chart_data_1.recommendation_close}
            currentPrice={stock_chart_data_1.latest_close}
            changeAmount={changeAmount_1}
            changePercent={changePercent_1}
          />
          <StockChart
            title={stock_chart_data_2.stock_name ?? "주식 2"}
            description={stock_chart_data_2.stock_name ?? "주식 2"}
            dataKey={stock_chart_data_2.stock_name ?? "stock2"}
            chartData={
              Array.isArray(stock_chart_data_2.chart_prices)
                ? (stock_chart_data_2.chart_prices as any[])
                : []
            }
            recommendationDate={latest_recommendation.recommendation_date}
            referencePrice={stock_chart_data_2.recommendation_close}
            currentPrice={stock_chart_data_2.latest_close}
            changeAmount={changeAmount_2}
            changePercent={changePercent_2}
          />
          <StockChart
            title={stock_chart_data_3.stock_name ?? "주식 3"}
            description={stock_chart_data_3.stock_name ?? "주식 3"}
            dataKey={stock_chart_data_3.stock_name ?? "stock3"}
            chartData={
              Array.isArray(stock_chart_data_3.chart_prices)
                ? (stock_chart_data_3.chart_prices as any[])
                : []
            }
            recommendationDate={latest_recommendation.recommendation_date}
            referencePrice={stock_chart_data_3.recommendation_close}
            currentPrice={stock_chart_data_3.latest_close}
            changeAmount={changeAmount_3}
            changePercent={changePercent_3}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">최근 주식 추천 내역</h2>
          <p className="text-gray-600 mb-4">
            최근 주식 추천 상세내용을 확인해보세요.
          </p>
          <a
            href="/histories/latests"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            보기 →
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            주식 추천 내역 전체보기
          </h2>
          <p className="text-gray-600 mb-4">
            주식 추천 내역 전체를 확인해보세요.
          </p>
          <a
            href="/histories"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            모두 보기 →
          </a>
        </div>
      </div>
    </div>
  );
}
