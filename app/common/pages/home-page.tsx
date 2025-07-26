import { Hero } from "../components/hero";
import { StockChart } from "../components/stock-chart";
import type { Route } from "./+types/home-page";
import { PulsatingButton } from "~/common/components/magicui/pulsating-button";
import {
  getLatestRecommendation,
  getStockPerformanceChart,
} from "~/features/histories/queries";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { Link } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Home | What2Buy" },
    { name: "description", content: "Stock recommendation platform home page" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client as any);
  const latest_recommendation = await getLatestRecommendation(client as any, {
    userId: userId,
  });
  console.log("[home-page] latest_recommendation=", latest_recommendation);
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
  // const stockDetail_1 = await getStockDetail(client as any, {
  //   stockId: latest_recommendation.stock1_id,
  // });
  // #1 차트 데이터 가져오기 (최근 30일)
  const chartData_1 = await getStockPerformanceChart(client as any, {
    stockCode: latest_recommendation.stock1_code,
    days: 30,
  });
  //console.log("chartData_1=", chartData_1);
  const recommendationPrice_1 =
    chartData_1.find((item) => item.date === recommendationDate)?.close ?? 0;
  console.log("recommendationPrice_1=", recommendationPrice_1);

  // 추천일 종가 대비 변동률 계산
  const currentPrice_1 = chartData_1[0].close || 0;
  const changeAmount_1 = currentPrice_1 - recommendationPrice_1;
  const changePercent_1 =
    recommendationPrice_1 > 0
      ? ((changeAmount_1 / recommendationPrice_1) * 100).toFixed(2)
      : "0";
  console.log("changeAmount_1=", changeAmount_1);
  console.log("changePercent_1=", changePercent_1);
  // #2 주식 상세 정보 가져오기
  //const stockDetail_2 = await getStockDetail(client as any, {
  //  stockId: latest_recommendation.stock2_id,
  //});
  // #2 차트 데이터 가져오기 (최근 30일)
  const chartData_2 = await getStockPerformanceChart(client as any, {
    stockCode: latest_recommendation.stock2_code,
    days: 30,
  });
  //console.log("chartData_2=", chartData_2);
  const recommendationPrice_2 =
    chartData_2.find((item) => item.date === recommendationDate)?.close ?? 0;
  console.log("recommendationPrice_2=", recommendationPrice_2);
  // 추천일 종가 대비 변동률 계산
  const currentPrice_2 = chartData_2[0].close || 0;
  const changeAmount_2 = currentPrice_2 - recommendationPrice_2;
  const changePercent_2 =
    recommendationPrice_2 > 0
      ? ((changeAmount_2 / recommendationPrice_2) * 100).toFixed(2)
      : "0";
  console.log("changeAmount_2=", changeAmount_2);
  console.log("changePercent_2=", changePercent_2);
  // #3 주식 상세 정보 가져오기
  //const stockDetail_3 = await getStockDetail(client as any, {
  //  stockId: latest_recommendation.stock3_id,
  //});
  // #3 차트 데이터 가져오기 (최근 30일)
  const chartData_3 = await getStockPerformanceChart(client as any, {
    stockCode: latest_recommendation.stock3_code,
    days: 30,
  });
  console.log("chartData_3=", (chartData_3 as any)?.slice(0, 3)); // 처음 3개 항목만 출력
  console.log("recommendationDate=", recommendationDate);
  console.log("첫번째 chartData_3 날짜=", (chartData_3 as any)?.[0]?.date);
  // 정확한 날짜가 없으면 가장 최근 날짜 사용 (데이터가 추천일보다 이전이므로)
  const recommendationPrice_3 =
    (chartData_3 as any).find((item: any) => item.date === recommendationDate)
      ?.close ??
    (chartData_3 as any)[(chartData_3 as any).length - 1]?.close ??
    0;
  console.log("recommendationPrice_3=", recommendationPrice_3);

  // 추천일 종가 대비 변동률 계산
  const currentPrice_3 = chartData_3[0].close || 0;
  const changeAmount_3 = currentPrice_3 - recommendationPrice_3;
  const changePercent_3 =
    recommendationPrice_3 > 0
      ? ((changeAmount_3 / recommendationPrice_3) * 100).toFixed(2)
      : "0";
  console.log("changeAmount_3=", changeAmount_3);
  console.log("changePercent_3=", changePercent_3);
  // #1 차트 데이터 변환
  const transformedChartData_1 =
    chartData_1?.map((item, index) => ({
      date: item.date,
      [latest_recommendation.stock1_name || "Stock"]: item.close,
    })) || [];

  //console.log("transformedChartData_1=", transformedChartData_1);
  // #2 차트 데이터 변환
  const transformedChartData_2 =
    chartData_2?.map((item, index) => ({
      date: item.date,
      [latest_recommendation.stock2_name || "Stock"]: item.close,
    })) || [];
  //console.log("transformedChartData_2=", transformedChartData_2);
  // #3 차트 데이터 변환
  const transformedChartData_3 =
    chartData_3?.map((item, index) => ({
      date: item.date,
      [latest_recommendation.stock3_name || "Stock"]: item.close,
    })) || [];
  //console.log("transformedChartData_3=", transformedChartData_3);
  return {
    latest_recommendation,
    recommendationDate,
    transformedChartData_1,
    recommendationPrice_1,
    currentPrice_1,
    changeAmount_1,
    changePercent_1,
    transformedChartData_2,
    recommendationPrice_2,
    currentPrice_2,
    changeAmount_2,
    changePercent_2,
    chartData_3,
    transformedChartData_3,
    recommendationPrice_3,
    currentPrice_3,
    changeAmount_3,
    changePercent_3,
  };
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const {
    latest_recommendation,
    recommendationDate,
    transformedChartData_1,
    recommendationPrice_1,
    currentPrice_1,
    changeAmount_1,
    changePercent_1,
    transformedChartData_2,
    recommendationPrice_2,
    currentPrice_2,
    changeAmount_2,
    changePercent_2,
    transformedChartData_3,
    recommendationPrice_3,
    currentPrice_3,
    changeAmount_3,
    changePercent_3,
  } = loaderData;

  return (
    <div className="space-y-10 w-full">
      <Hero
        title="인공지능이 추천하는 주식 What2Buy"
        subtitle="주식시장이 어렵고 부담스럽다면, 이곳에서 당신만을 위한 주식 추천을 받아보세요"
      />
      <div className="flex flex-col sm:flex-row justify-between gap-3 items-center">
        <div className="order-2 sm:order-1 text-2xl font-bold py-2.5">
          최근 추천 기록
        </div>
        <div className="order-1 sm:order-2">
          <Link to="/recommendation">
            <PulsatingButton pulseColor="#FF007F" className="text-2xl px-10">
              주식 추천 받으러 가져오기
            </PulsatingButton>
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="w-full">
          <StockChart
            title={latest_recommendation.stock1_name ?? "추천 주식 1"}
            description={"최근 30일 주가 추이"}
            dataKey={latest_recommendation.stock1_name ?? "stock1"}
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
            title={latest_recommendation.stock2_name ?? "추천 주식 2"}
            description={"최근 30일 주가 추이"}
            dataKey={latest_recommendation.stock2_name ?? "stock2"}
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
            title={latest_recommendation.stock3_name ?? "추천 주식 3"}
            description={"최근 30일 주가 추이"}
            dataKey={latest_recommendation.stock3_name ?? "stock3"}
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
          <h2 className="text-xl font-semibold mb-4">최근 추천 내역</h2>
          <p className="text-gray-600 mb-4">
            최근 추천 상세 내용을 확인해보세요.
          </p>
          <a
            href={`/histories/${latest_recommendation.recommendation_id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            보기 →
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">추천 기록 전체보기</h2>
          <p className="text-gray-600 mb-4">추천 기록 전체를 확인해보세요.</p>
          <a
            href="/histories"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            추천 기록 모두 보기 →
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">추천받은 주식 전체보기</h2>
          <p className="text-gray-600 mb-4">
            추천받는 주식 전체를 확인해보세요.
          </p>
          <a
            href="/histories/stocks"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            추천받은 주식 모두 보기 →
          </a>
        </div>
      </div>
    </div>
  );
}
