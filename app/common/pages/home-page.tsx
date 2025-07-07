"use client";
import { Hero } from "../components/hero";
import { StockChart } from "../components/stock-chart";
import { a_profile_id } from "../constants";
import type { Route } from "./+types/home-page";
import { PulsatingButton } from "~/common/components/magicui/pulsating-button";
import {
  getDailyPricesByStockId,
  getStockOverview,
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

export const loader = async () => {
  const latest_recommendation = await latestRecommendation(a_profile_id);

  const stock1_overview = await getStockOverview(
    latest_recommendation.stock1_id
  );

  const stock2_overview = await getStockOverview(
    latest_recommendation.stock2_id
  );

  const stock3_overview = await getStockOverview(
    latest_recommendation.stock3_id
  );

  // Use the abstracted function
  const daily_stock_price1 = await transformStockPriceData({
    stockId: latest_recommendation.stock1_id,
    stockName: stock1_overview.stock_name,
    count: 30,
  });

  const daily_stock_price2 = await transformStockPriceData({
    stockId: latest_recommendation.stock2_id,
    stockName: stock2_overview.stock_name,
    count: 30,
  });

  const daily_stock_price3 = await transformStockPriceData({
    stockId: latest_recommendation.stock3_id,
    stockName: stock3_overview.stock_name,
    count: 30,
  });

  // 최신 주가 (배열의 마지막 항목)
  const currentPrice1 = daily_stock_price1[daily_stock_price1.length - 1][
    stock1_overview.stock_name
  ] as number;

  const currentPrice2 = daily_stock_price2[daily_stock_price2.length - 1][
    stock2_overview.stock_name
  ] as number;

  const currentPrice3 = daily_stock_price3[daily_stock_price3.length - 1][
    stock3_overview.stock_name
  ] as number;

  // 추천일 주가 (recommendation_date 기준)
  const recommendationDate = new Date(
    latest_recommendation.recommendation_date
  );
  const formattedRecommendationDate = `${
    recommendationDate.getMonth() + 1
  }/${recommendationDate.getDate()}`;

  const referencePrice1 =
    (daily_stock_price1.find(
      (item) => item.date === formattedRecommendationDate
    )?.[stock1_overview.stock_name] as number) ||
    (daily_stock_price1[0][stock1_overview.stock_name] as number);

  const referencePrice2 =
    (daily_stock_price2.find(
      (item) => item.date === formattedRecommendationDate
    )?.[stock2_overview.stock_name] as number) ||
    (daily_stock_price2[0][stock2_overview.stock_name] as number);

  const referencePrice3 =
    (daily_stock_price3.find(
      (item) => item.date === formattedRecommendationDate
    )?.[stock3_overview.stock_name] as number) ||
    (daily_stock_price3[0][stock3_overview.stock_name] as number);

  // 가격 변화 계산
  const changeAmount1 = currentPrice1 - referencePrice1;
  const changePercent1 = ((changeAmount1 / referencePrice1) * 100).toFixed(1);

  const changeAmount2 = currentPrice2 - referencePrice2;
  const changePercent2 = ((changeAmount2 / referencePrice2) * 100).toFixed(1);

  const changeAmount3 = currentPrice3 - referencePrice3;
  const changePercent3 = ((changeAmount3 / referencePrice3) * 100).toFixed(1);

  return {
    formattedRecommendationDate,
    stock1_overview,
    daily_stock_price1,
    currentPrice1,
    referencePrice1,
    changeAmount1,
    changePercent1,
    stock2_overview,
    daily_stock_price2,
    currentPrice2,
    referencePrice2,
    changeAmount2,
    changePercent2,
    stock3_overview,
    daily_stock_price3,
    currentPrice3,
    referencePrice3,
    changeAmount3,
    changePercent3,
  };
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <StockChart
            title={`${loaderData.stock1_overview.stock_name} 주가`}
            description={`${loaderData.daily_stock_price1[0].date} ~ ${
              loaderData.daily_stock_price1[
                loaderData.daily_stock_price1.length - 1
              ].date
            } (30일)`}
            chartData={loaderData.daily_stock_price1}
            dataKey={loaderData.stock1_overview.stock_name}
            currentPrice={loaderData.currentPrice1}
            changeAmount={loaderData.changeAmount1}
            changePercent={loaderData.changePercent1}
            referencePrice={loaderData.referencePrice1}
            recommendationDate={loaderData.formattedRecommendationDate}
          />
          <StockChart
            title={`${loaderData.stock2_overview.stock_name} 주가`}
            description={`${loaderData.daily_stock_price2[0].date} ~ ${
              loaderData.daily_stock_price2[
                loaderData.daily_stock_price2.length - 1
              ].date
            } (30일)`}
            chartData={loaderData.daily_stock_price2}
            dataKey={loaderData.stock2_overview.stock_name}
            currentPrice={loaderData.currentPrice2}
            changeAmount={loaderData.changeAmount2}
            changePercent={loaderData.changePercent2}
            referencePrice={loaderData.referencePrice2}
            recommendationDate={loaderData.formattedRecommendationDate}
          />
          <StockChart
            title={`${loaderData.stock3_overview.stock_name} 주가`}
            description={`${loaderData.daily_stock_price3[0].date} ~ ${
              loaderData.daily_stock_price3[
                loaderData.daily_stock_price3.length - 1
              ].date
            } (30일)`}
            chartData={loaderData.daily_stock_price3}
            dataKey={loaderData.stock3_overview.stock_name}
            currentPrice={loaderData.currentPrice3}
            changeAmount={loaderData.changeAmount3}
            changePercent={loaderData.changePercent3}
            referencePrice={loaderData.referencePrice3}
            recommendationDate={loaderData.formattedRecommendationDate}
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
