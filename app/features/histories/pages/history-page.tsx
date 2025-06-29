import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/history-page";
import { RecommendedStockCard } from "../components/recommended-stock-card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Recommendation Detail | What2Buy" },
    { name: "description", content: "Stock recommendation detail" },
  ];
};

export default function HistoryDetailPage({
  params: { recommendationId },
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        title={`Recommendation #${recommendationId + 1}`}
        subtitle="Recommendation Detail"
      />
      <div className="flex flex-col gap-10 ">
        <h3 className="text-2xl font-bold">
          추천 날짜 : 2025년 06월 {Number(recommendationId) * 2 + 5} 일
        </h3>
        <h3 className="text-2xl font-bold">추천 내용</h3>
        <p className="text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam, quos.
        </p>

        <div className="flex flex-col gap-10">
          <RecommendedStockCard
            stockName="삼성전자"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quisq"
            referencPrice={100000}
            currentPrice={100000}
            changeRate={10}
            per={10}
            pbr={10}
          />
          <RecommendedStockCard
            stockName="현대차"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quisq"
            referencPrice={100000}
            currentPrice={100000}
            changeRate={10}
            per={10}
            pbr={10}
          />
          <RecommendedStockCard
            stockName="LG에너지솔루션"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quisq"
            referencPrice={100000}
            currentPrice={100000}
            changeRate={10}
            per={10}
            pbr={10}
          />
        </div>
      </div>
    </div>
  );
}
