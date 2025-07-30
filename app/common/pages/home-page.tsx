import { Hero } from "../components/hero";
import { StockChart } from "../components/stock-chart";
import type { Route } from "./+types/home-page";
import { PulsatingButton } from "~/common/components/magicui/pulsating-button";
import {
  getTopPerformingRecommendedStocks,
  getStockPerformanceChart,
} from "~/features/histories/queries";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { Link } from "react-router";
import { redirect } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Home | what2buy" },
    { name: "description", content: "Stock recommendation platform home page" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);

  try {
    const userId = await getLoggedInUserId(client as any);
    const topPerformingStocks = await getTopPerformingRecommendedStocks(
      client as any,
      {
        userId: userId,
      }
    );

    if (!topPerformingStocks || topPerformingStocks.length === 0) {
      throw redirect("/recommendation");
    }

    // 각 TOP3 주식에 대한 차트 데이터와 계산된 수익률 정보 준비
    const stocksData = [];

    for (let i = 0; i < Math.min(topPerformingStocks.length, 3); i++) {
      const stock = topPerformingStocks[i];
      const recommendationDate = stock.recommendationDate.slice(0, 10);

      // 차트 데이터 가져오기 (최근 30일)
      const chartData = (await getStockPerformanceChart(client as any, {
        stockCode: stock.stockCode,
        days: 30,
      })) as any;

      // 차트 데이터 변환
      const transformedChartData =
        chartData?.map((item: any) => ({
          date: item.date,
          [stock.stockName || "Stock"]: item.close,
        })) || [];

      stocksData.push({
        stockName: stock.stockName,
        stockCode: stock.stockCode,
        recommendationId: stock.recommendationId,
        recommendationDate: recommendationDate,
        transformedChartData: transformedChartData,
        recommendationPrice: stock.recommendationPrice,
        currentPrice: stock.currentPrice,
        changeAmount: stock.profitAmount,
        changePercent: stock.profitRate,
      });
    }

    return {
      stocksData,
    };
  } catch (error: any) {
    console.error("[home-page] error=", error);

    // 인증 에러 처리
    const errorMessage = error?.message || error?.details || "";
    if (
      errorMessage.includes("Auth session missing") ||
      errorMessage.includes("JWT")
    ) {
      throw redirect("/auth/login");
    }

    // 추천 기록이 없는 경우 (새 사용자)
    if (error?.code === "PGRST116" || errorMessage.includes("0 rows")) {
      throw redirect("/recommendation");
    }

    throw error;
  }
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { stocksData } = loaderData;

  return (
    <div className="space-y-10 w-full">
      <Hero
        title="인공지능이 추천하는 주식 what2buy"
        subtitle="주식시장이 어렵고 부담스럽다면, 이곳에서 당신만을 위한 주식 추천을 받아보세요"
      />

      <div className="flex flex-col sm:flex-row justify-between gap-3 items-center">
        <div className="order-2 sm:order-1 text-2xl font-bold py-2.5">
          수익률 TOP3 추천 주식
        </div>
        <div className="order-1 sm:order-2">
          <Link to="/recommendation">
            <PulsatingButton
              pulseColor="#FF007F"
              className="text-2xl px-5 sm:px-10"
            >
              주식 추천 받으러 가기
            </PulsatingButton>
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {stocksData.map((stock, index) => (
          <div key={index} className="w-full">
            <StockChart
              title={stock.stockName ?? "추천 주식"}
              description={`수익률 ${
                stock.changePercent >= 0 ? "+" : ""
              }${stock.changePercent.toFixed(2)}% (${index + 1}위)`}
              dataKey={stock.stockName ?? "stock"}
              chartData={stock.transformedChartData}
              recommendationDate={stock.recommendationDate}
              referencePrice={stock.recommendationPrice}
              currentPrice={stock.currentPrice}
              changeAmount={stock.changeAmount}
              changePercent={Number(stock.changePercent)}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">1위 주식 상세 보기</h2>
          <p className="text-gray-600 mb-4">
            가장 높은 수익률을 기록한 추천 주식의 상세 내용을 확인해보세요.
          </p>
          <a
            href={`/histories/${stocksData[0]?.recommendationId}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            보기 →
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">추천 기록 전체보기</h2>
          <p className="text-gray-600 mb-4">모든 추천 기록을 확인해보세요.</p>
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
            추천받은 모든 주식을 확인해보세요.
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
