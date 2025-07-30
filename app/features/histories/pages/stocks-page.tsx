import { Form } from "react-router";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { Hero } from "~/common/components/hero";
import { useSearchParams } from "react-router";
import { Input } from "~/common/components/ui/input";
import { PulsatingButton } from "~/common/components/magicui/pulsating-button";
import type { Route } from "./+types/stocks-page";
import { StockCard } from "../components/stock-card";
import { STOCK_SORT_OPTIONS } from "~/common/constants";
import { z } from "zod";
import {
  getStocksList,
  getStocksTotalPages,
  getRecommendedStockReturns,
} from "../queries";
import AllPurposesPagination from "~/common/components/all-purposes-pagination";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Recommended Stocks | What2Buy" },
    { name: "description", content: "Stock recommendation history" },
  ];
};

const searchParamsSchema = z.object({
  sorting: z.enum(["asc", "desc"]).optional().default("asc"),
  keyword: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw new Error("Invalid search params");
  }
  console.log("[stocks page] parsedData=", parsedData);
  const userId = await getLoggedInUserId(client as any);
  console.log("[stocks page] userId=", userId);
  const totalPages = await getStocksTotalPages(client as any, {
    profile_id: userId,
    keyword: parsedData.keyword,
  });
  if (parsedData.page > totalPages) {
    throw new Error("Invalid page");
  }
  const stocks_list = await getStocksList(client as any, {
    profile_id: userId,
    page: parsedData.page,
    sorting: parsedData.sorting,
    keyword: parsedData.keyword,
  });

  // 각 주식의 추천일별 수익률 계산
  const stocksWithReturns = await Promise.all(
    (stocks_list as any[]).map(async (stock) => {
      const recommendationReturns = [];

      // 각 추천일에 대해 수익률 계산
      for (const date of stock.recommendation_dates) {
        try {
          const returns = await getRecommendedStockReturns(client as any, {
            stockCode: stock.stock_code,
            recommendationDate: date,
          });

          recommendationReturns.push({
            date: date,
            profitRate: parseFloat(returns.profitRate),
            profitAmount: returns.profitAmount,
          });
        } catch (error) {
          console.log(
            `Error calculating returns for ${stock.stock_code} on ${date}:`,
            error
          );
          // 에러가 있는 경우 0% 수익률로 처리
          recommendationReturns.push({
            date: date,
            profitRate: 0,
            profitAmount: 0,
          });
        }
      }

      // 수익률 높은 순으로 정렬
      recommendationReturns.sort((a, b) => b.profitRate - a.profitRate);

      return {
        ...stock,
        recommendationReturns,
      };
    })
  );

  return { stocks_list: stocksWithReturns, totalPages };
};

export default function StocksPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "asc";
  const keyword = searchParams.get("keyword") || "";

  return (
    <div className="space-y-10">
      <Hero
        title="추천 주식 리스트"
        subtitle="지금까지 추천된 주식을 살펴보세요"
      />
      <div className=" items-start gap-40">
        <div className=" space-y-10">
          <div className="flex justify-between">
            <div className="space-y-5 w-1/2">
              <div className="flex items-center gap-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <span className="text-sm capitalize">{sorting}</span>
                    <ChevronDownIcon className="size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {STOCK_SORT_OPTIONS.map((option) => (
                      <DropdownMenuCheckboxItem
                        className="capitalize cursor-pointer"
                        key={option}
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            searchParams.set("sorting", option);
                            setSearchParams(searchParams);
                          }
                        }}
                      >
                        {option}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Form>
                <Input
                  type="text"
                  name="keyword"
                  placeholder="추천 이력을 키워드로 검색해보세요."
                  defaultValue={keyword}
                />
              </Form>
            </div>
            <div>
              <PulsatingButton
                pulseColor="#FF007F"
                className="text-xl py-2 px-5 mx-auto"
              >
                주식 추천 받으러 가기
              </PulsatingButton>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {(loaderData.stocks_list as any[]).map((stock) => (
              <StockCard
                key={stock.stock_code}
                stockId={stock.stock_code}
                stockName={stock.korean_name}
                stockCode={stock.stock_code}
                recommendationCount={stock.recommendation_count}
                recommendationReturns={stock.recommendationReturns}
                trailingPer={stock.trailing_price_to_earnings_ratio}
                forwardPer={stock.forward_price_to_earnings_ratio}
                pbr={stock.price_to_book_ratio}
                roe={stock.return_on_equity}
              />
            ))}
          </div>
          <AllPurposesPagination totalPages={loaderData.totalPages} />
        </div>
      </div>
    </div>
  );
}
