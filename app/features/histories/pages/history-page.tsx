import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/history-page";
import { RecommendedStockCard } from "../components/recommended-stock-card";
import { getHistory, getReturnRateInfo } from "../queries";
import { formatKoreanDate } from "~/common/utils";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Recommendation Detail | What2Buy" },
    { name: "description", content: "Stock recommendation detail" },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { recommendationId } = params;
  const recommendation = await getHistory(Number(recommendationId));
  if (!recommendation) {
    throw new Error("Recommendation not found");
  }
  // Get return rate information for all stocks
  const stock1_return_info = await getReturnRateInfo({
    stockId: (recommendation as any).stock1_id,
    recommendationDate: (recommendation as any).recommendation_date,
  });

  const stock2_return_info = await getReturnRateInfo({
    stockId: (recommendation as any).stock2_id,
    recommendationDate: (recommendation as any).recommendation_date,
  });

  const stock3_return_info = await getReturnRateInfo({
    stockId: (recommendation as any).stock3_id,
    recommendationDate: (recommendation as any).recommendation_date,
  });

  return {
    recommendation,
    stock1_return_info,
    stock2_return_info,
    stock3_return_info,
  };
};

export default function HistoryDetailPage({
  loaderData,
}: Route.ComponentProps) {
  const recommendation = loaderData.recommendation as any;
  const stock1_return = loaderData.stock1_return_info as any;
  const stock2_return = loaderData.stock2_return_info as any;
  const stock3_return = loaderData.stock3_return_info as any;

  return (
    <div className="space-y-10">
      <Hero
        title={`주식추천이력 #${recommendation.recommendation_id}`}
        subtitle="주식 추천 상세 내역"
      />
      <div className="flex flex-col gap-10 ">
        <h3 className="text-2xl font-bold">
          추천 날짜 : {formatKoreanDate(recommendation.recommendation_date)}
        </h3>
        <h3 className="text-2xl font-bold">추천 내용</h3>
        <p className="text-lg">{recommendation.summary}</p>

        <div className="flex flex-col gap-10">
          <RecommendedStockCard
            stockId={recommendation.stock1_id}
            recommendationDate={recommendation.recommendation_date}
            stockName={recommendation.stock1_name}
            description={recommendation.stock1_summary || "추천 주식 1번"}
            referencPrice={stock1_return.recommendationPrice}
            currentPrice={stock1_return.latestPrice}
            changeRate={parseFloat(stock1_return.profitRate)}
            per={recommendation.stock1_per || 0}
            pbr={recommendation.stock1_pbr || 0}
          />
          <RecommendedStockCard
            stockId={recommendation.stock2_id}
            recommendationDate={recommendation.recommendation_date}
            stockName={recommendation.stock2_name}
            description={recommendation.stock2_summary || "추천 주식 2번"}
            referencPrice={stock2_return.recommendationPrice}
            currentPrice={stock2_return.latestPrice}
            changeRate={parseFloat(stock2_return.profitRate)}
            per={recommendation.stock2_per || 0}
            pbr={recommendation.stock2_pbr || 0}
          />
          <RecommendedStockCard
            stockId={recommendation.stock3_id}
            recommendationDate={recommendation.recommendation_date}
            stockName={recommendation.stock3_name}
            description={recommendation.stock3_summary || "추천 주식 3번"}
            referencPrice={stock3_return.recommendationPrice}
            currentPrice={stock3_return.latestPrice}
            changeRate={parseFloat(stock3_return.profitRate)}
            per={recommendation.stock3_per || 0}
            pbr={recommendation.stock3_pbr || 0}
          />
        </div>
      </div>
    </div>
  );
}
