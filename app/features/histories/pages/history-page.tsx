import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/history-page";
import { RecommendedStockCard } from "../components/recommended-stock-card";
import {
  getRecommendationHistoryDetail,
  getRecommendedStockReturns,
} from "../queries";
import { formatKoreanDate } from "~/common/utils";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Recommendation Detail | What2Buy" },
    { name: "description", content: "Stock recommendation detail" },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client as any);
  console.log("userId=", userId);
  const { recommendationId } = params;
  console.log("recommendationId=", recommendationId);
  const recommendation = await getRecommendationHistoryDetail(client, {
    recommendationId: Number(recommendationId),
  });
  if (!recommendation) {
    throw new Error("Recommendation not found");
  }

  // Get return rate information for all stocks
  const stock1_return_info = await getRecommendedStockReturns(client as any, {
    stockCode: (recommendation as any).stock1_code,
    recommendationDate: (recommendation as any).recommendation_date,
  });
  console.log("[history-page] stock1_return_info=", stock1_return_info);
  const stock2_return_info = await getRecommendedStockReturns(client as any, {
    stockCode: (recommendation as any).stock2_code,
    recommendationDate: (recommendation as any).recommendation_date,
  });
  console.log("[history-page] stock2_return_info=", stock2_return_info);

  const stock3_return_info = await getRecommendedStockReturns(client as any, {
    stockCode: (recommendation as any).stock3_code,
    recommendationDate: (recommendation as any).recommendation_date,
  });
  console.log("[history-page] stock3_return_info=", stock3_return_info);

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
    <div className="space-y-20">
      <Hero
        title={` 추천 내역 #${recommendation.recommendation_id}`}
        subtitle="추천된 종목들의 주요 지표와 수익률을 확인해 보세요"
      />
      <div className="flex flex-col gap-10 ">
        <div>
          <span className="font-medium text-lg">추천 날짜 : </span>
          <span className="text-gray-700 text-lg font-bold">
            {formatKoreanDate(recommendation.recommendation_date)}
          </span>
        </div>

        <p className="text-xl font-bold">{recommendation.overall_summary}</p>

        <div className="flex flex-col gap-10">
          <RecommendedStockCard
            stockCode={recommendation.stock1_code}
            recommendationDate={recommendation.recommendation_date}
            stockName={recommendation.stock1_name}
            description={recommendation.stock1_summary || "추천 주식 1번"}
            referencPrice={stock1_return.recommendationPrice}
            currentPrice={stock1_return.latestPrice}
            changeRate={parseFloat(stock1_return.profitRate)}
            per={recommendation.stock1_forward_per || 0}
            pbr={recommendation.stock1_pbr || 0}
            roe={recommendation.stock1_roe || 0}
            ev_to_ebitda={recommendation.stock1_ev_to_ebitda || 0}
          />
          <RecommendedStockCard
            stockCode={recommendation.stock2_code}
            recommendationDate={recommendation.recommendation_date}
            stockName={recommendation.stock2_name}
            description={recommendation.stock2_summary || "추천 주식 2번"}
            referencPrice={stock2_return.recommendationPrice}
            currentPrice={stock2_return.latestPrice}
            changeRate={parseFloat(stock2_return.profitRate)}
            per={recommendation.stock2_forward_per || 0}
            pbr={recommendation.stock2_pbr || 0}
            roe={recommendation.stock2_roe || 0}
            ev_to_ebitda={recommendation.stock2_ev_to_ebitda || 0}
          />
          <RecommendedStockCard
            stockCode={recommendation.stock3_code}
            recommendationDate={recommendation.recommendation_date}
            stockName={recommendation.stock3_name}
            description={recommendation.stock3_summary || "추천 주식 3번"}
            referencPrice={stock3_return.recommendationPrice}
            currentPrice={stock3_return.latestPrice}
            changeRate={parseFloat(stock3_return.profitRate)}
            per={recommendation.stock3_forward_per || 0}
            pbr={recommendation.stock3_pbr || 0}
            roe={recommendation.stock3_roe || 0}
            ev_to_ebitda={recommendation.stock3_ev_to_ebitda || 0}
          />
        </div>
      </div>
    </div>
  );
}
