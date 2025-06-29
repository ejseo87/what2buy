"use client";
import { Hero } from "../components/hero";
import { StockChart } from "../components/stock-chart";
import type { Route } from "./+types/home-page";
import { PulsatingButton } from "~/common/components/magicui/pulsating-button";
import { samsungData, hyundaiData, lgEnergyData } from "../constants";
export const description = "A line chart";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Home | What2Buy" },
    { name: "description", content: "Stock recommendation platform home page" },
  ];
};

export default function HomePage() {
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
            title="삼성전자 주가"
            description="5/27 ~ 6/27 (1개월)"
            chartData={samsungData}
            dataKey="삼성전자"
            currentPrice="60,700원"
            changeAmount="+1000원"
            changePercent="+8.3%"
            referencePrice="57,700원"
          />
          <StockChart
            title="현대차 주가"
            description="5/27 ~ 6/27 (1개월)"
            chartData={hyundaiData}
            dataKey="현대차"
            currentPrice="204,500원"
            changeAmount="4,500원"
            changePercent="2.39%"
            referencePrice="200,000원"
          />
          <StockChart
            title="LG에너지솔루션 주가"
            description="5/27 ~ 6/27 (1개월)"
            chartData={lgEnergyData}
            dataKey="LG에너지솔루션"
            currentPrice="288,000원"
            changeAmount="8,000원"
            changePercent="3.03%"
            referencePrice="280,000원"
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
            href="/histories/all"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            모두 보기 →
          </a>
        </div>
      </div>
    </div>
  );
}
