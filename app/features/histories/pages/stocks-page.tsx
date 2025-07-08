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
import { getStocksList, getTotalPagesStocks } from "../queries";
import { a_profile_id } from "~/common/constants";
import AllPurposesPagination from "~/common/components/all-purposes-pagination";

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
  try {
    const url = new URL(request.url);
    const { success, data: parsedData } = searchParamsSchema.safeParse(
      Object.fromEntries(url.searchParams)
    );
    if (!success) {
      throw new Error("Invalid search params");
    }
    const totalPages = await getTotalPagesStocks({
      profile_id: a_profile_id,
      keyword: parsedData.keyword,
    });
    if (parsedData.page > totalPages) {
      throw new Error("Invalid page");
    }
    const stocks_list = await getStocksList({
      profile_id: a_profile_id,
      page: parsedData.page,
      sorting: parsedData.sorting,
      keyword: parsedData.keyword,
    });
    return { stocks_list, totalPages };
  } catch (e) {
    console.error("Loader error:", JSON.stringify(e, null, 2), e?.stack);
    throw e;
  }
};

export default function StocksPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "asc";
  const keyword = searchParams.get("keyword") || "";

  return (
    <div className="space-y-10">
      <Hero
        title="추천된 주식 목록"
        subtitle="지금까지 어떤 주식들이 추천되어 왔는지 확인해보세요."
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
          <div className="flex flex-col gap-10">
            {(loaderData.stocks_list as any[]).map((stock) => (
              <StockCard
                key={stock.stock_id}
                stockId={stock.stock_id}
                stockName={stock.stock_name}
                stockCode={stock.stock_code}
                recommendationCount={stock.recommendation_count}
                recommendationDates={stock.recommendation_dates}
                per={stock.per}
                pbr={stock.pbr}
                roe={stock.roe}
              />
            ))}
          </div>
          <AllPurposesPagination totalPages={loaderData.totalPages} />
        </div>
      </div>
    </div>
  );
}
