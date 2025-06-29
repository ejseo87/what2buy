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

export const SORT_OPTIONS = ["최신순", "오래된순"] as const;

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Recommended Stocks | What2Buy" },
    { name: "description", content: "Stock recommendation history" },
  ];
};

export default function StocksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";

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
                    {SORT_OPTIONS.map((option) => (
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
                  name="search"
                  placeholder="추천 이력을 키워드로 검색해보세요."
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
            {Array.from({ length: 10 }).map((_, index) => (
              <StockCard
                key={index}
                id={index}
                stockName="삼성전자"
                recommendationCount={3}
                recommendationDates={[
                  "2025년 06월 01일",
                  "2025년 06월 02일",
                  "2025년 06월 03일",
                ]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
