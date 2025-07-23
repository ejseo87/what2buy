"use client";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { Hero } from "../components/hero";
import { StockChart } from "../components/stock-chart";
import { a_profile_id } from "../constants";
import type { Route } from "./+types/home-page";
import { PulsatingButton } from "~/common/components/magicui/pulsating-button";
import {
  getStockDetail,
  getStockPerformanceChart,
  latestRecommendation,
} from "~/features/histories/queries";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Home | What2Buy" },
    { name: "description", content: "Stock recommendation platform home page" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client as any);
  const latest_recommendation = await latestRecommendation(client as any, {
    profile_id: userId,
  });
  //console.log(latest_recommendation);
  const recommendationDate = latest_recommendation.recommendation_date.slice(
    0,
    10
  );
  console.log(
    "recommendationDate=",
    recommendationDate,
    "recommendationDate.length=",
    recommendationDate.length
  );
  // #1 주식 상세 정보 가져오기
  const stockDetail_1 = await getStockDetail(client as any, {
    stockId: latest_recommendation.stock1_id,
  });
  // #1 차트 데이터 가져오기 (최근 30일)
  const chartData_1 = await getStockPerformanceChart(client as any, {
    stockId: latest_recommendation.stock1_id,
    days: 30,
  });
  //console.log("chartData_1=", chartData_1);
  const recommendationPrice_1 =
    chartData_1.find((item) => item.date === recommendationDate)?.close ?? 0;
  //console.log("recommendationPrice_1=", recommendationPrice_1);

  // 추천일 종가 대비 변동률 계산
  const currentPrice_1 = stockDetail_1?.daily_stocks?.[0]?.close || 0;
  const changeAmount_1 = currentPrice_1 - recommendationPrice_1;
  const changePercent_1 =
    recommendationPrice_1 > 0
      ? ((changeAmount_1 / recommendationPrice_1) * 100).toFixed(2)
      : "0";
  //console.log("changeAmount_1=", changeAmount_1);
  //console.log("changePercent_1=", changePercent_1);
  // #2 주식 상세 정보 가져오기
  const stockDetail_2 = await getStockDetail(client as any, {
    stockId: latest_recommendation.stock2_id,
  });
  // #2 차트 데이터 가져오기 (최근 30일)
  const chartData_2 = await getStockPerformanceChart(client as any, {
    stockId: latest_recommendation.stock2_id,
    days: 30,
  });
  //console.log("chartData_2=", chartData_2);
  const recommendationPrice_2 =
    chartData_2.find((item) => item.date === recommendationDate)?.close ?? 0;
  //console.log("recommendationPrice_2=", recommendationPrice_2);
  // 추천일 종가 대비 변동률 계산
  const currentPrice_2 = stockDetail_2?.daily_stocks?.[0]?.close || 0;
  const changeAmount_2 = currentPrice_2 - recommendationPrice_2;
  const changePercent_2 =
    recommendationPrice_2 > 0
      ? ((changeAmount_2 / recommendationPrice_2) * 100).toFixed(2)
      : "0";
  //console.log("changeAmount_2=", changeAmount_2);
  //console.log("changePercent_2=", changePercent_2);
  // #3 주식 상세 정보 가져오기
  const stockDetail_3 = await getStockDetail(client as any, {
    stockId: latest_recommendation.stock3_id,
  });
  // #3 차트 데이터 가져오기 (최근 30일)
  const chartData_3 = await getStockPerformanceChart(client as any, {
    stockId: latest_recommendation.stock3_id,
    days: 30,
  });
  //console.log("chartData_3=", chartData_3);
  const recommendationPrice_3 =
    chartData_3.find((item) => item.date === recommendationDate)?.close ?? 0;
  //console.log("recommendationPrice_3=", recommendationPrice_3);

  // 추천일 종가 대비 변동률 계산
  const currentPrice_3 = stockDetail_3?.daily_stocks?.[0]?.close || 0;
  const changeAmount_3 = currentPrice_3 - recommendationPrice_3;
  const changePercent_3 =
    recommendationPrice_3 > 0
      ? ((changeAmount_3 / recommendationPrice_3) * 100).toFixed(2)
      : "0";
  //console.log("changeAmount_3=", changeAmount_3);
  //console.log("changePercent_3=", changePercent_3);

  return {
    recommendationDate,
    stockDetail_1,
    chartData_1,
    recommendationPrice_1,
    currentPrice_1,
    changeAmount_1,
    changePercent_1,
    stockDetail_2,
    chartData_2,
    recommendationPrice_2,
    currentPrice_2,
    changeAmount_2,
    changePercent_2,
    stockDetail_3,
    chartData_3,
    recommendationPrice_3,
    currentPrice_3,
    changeAmount_3,
    changePercent_3,
  };
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const {
    recommendationDate,
    stockDetail_1,
    chartData_1,
    recommendationPrice_1,
    currentPrice_1,
    changeAmount_1,
    changePercent_1,
    stockDetail_2,
    chartData_2,
    recommendationPrice_2,
    currentPrice_2,
    changeAmount_2,
    changePercent_2,
    stockDetail_3,
    chartData_3,
    recommendationPrice_3,
    currentPrice_3,
    changeAmount_3,
    changePercent_3,
  } = loaderData;
  // #1 차트 데이터 변환
  const transformedChartData_1 =
    chartData_1?.map((item, index) => ({
      date: item.date,
      [stockDetail_1?.stock_name || "Stock"]: item.close,
    })) || [];

  //console.log("transformedChartData_1=", transformedChartData_1);
  // #2 차트 데이터 변환
  const transformedChartData_2 =
    chartData_2?.map((item, index) => ({
      date: item.date,
      [stockDetail_2?.stock_name || "Stock"]: item.close,
    })) || [];
  //console.log("transformedChartData_2=", transformedChartData_2);
  // #3 차트 데이터 변환
  const transformedChartData_3 =
    chartData_3?.map((item, index) => ({
      date: item.date,
      [stockDetail_3?.stock_name || "Stock"]: item.close,
    })) || [];
  //console.log("transformedChartData_3=", transformedChartData_3);
  return (
    <div className="space-y-10 w-full">
      <Hero
        title="주식을 추천해주는 What2Buy"
        subtitle="가치가 있는 주식 중에 내일 상승할 확률이 높은 주식을 추천해드립니다. "
      />
      <div className="flex flex-col sm:flex-row justify-between gap-3 items-center">
        <div className="order-2 sm:order-1 text-2xl font-bold py-2.5">
          최근에 추천한 주식 종목 현황
        </div>
        <div className="order-1 sm:order-2">
          <PulsatingButton pulseColor="#FF007F" className="text-2xl px-10">
            주식 추천 받으러 가기
          </PulsatingButton>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="w-full">
          <StockChart
            title={stockDetail_1?.stock_name ?? "주식 1"}
            description={"최근 30일 주가 추이"}
            dataKey={stockDetail_1?.stock_name ?? "stock1"}
            chartData={transformedChartData_1}
            recommendationDate={recommendationDate}
            referencePrice={recommendationPrice_1}
            currentPrice={currentPrice_1}
            changeAmount={changeAmount_1}
            changePercent={Number(changePercent_1)}
          />
        </div>
        <div className="w-full">
          <StockChart
            title={stockDetail_2?.stock_name ?? "주식 2"}
            description={"최근 30일 주가 추이"}
            dataKey={stockDetail_2?.stock_name ?? "stock2"}
            chartData={transformedChartData_2}
            recommendationDate={recommendationDate}
            referencePrice={recommendationPrice_2}
            currentPrice={currentPrice_2}
            changeAmount={changeAmount_2}
            changePercent={Number(changePercent_2)}
          />
        </div>
        <div className="w-full">
          <StockChart
            title={stockDetail_3?.stock_name ?? "주식 3"}
            description={"최근 30일 주가 추이"}
            dataKey={stockDetail_3?.stock_name ?? "stock3"}
            chartData={transformedChartData_3}
            recommendationDate={recommendationDate}
            referencePrice={recommendationPrice_3}
            currentPrice={currentPrice_3}
            changeAmount={changeAmount_3}
            changePercent={Number(changePercent_3)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
