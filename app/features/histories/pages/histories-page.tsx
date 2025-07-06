import type { Route } from "./+types/histories-page";
import { Form, Link } from "react-router";
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
import { RecommendationCard } from "../components/recommedation-card";
import { getHistories } from "../queries";
import { formatKoreanDate } from "~/common/utils";
import { z } from "zod";
import { SORT_OPTIONS } from "../constants";

const a_profile_id = "47cb62d9-c4b5-4d90-b661-165df9138afd";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Recommendation History | What2Buy" },
    { name: "description", content: "Stock recommendation history" },
  ];
};

const searchParamsSchema = z.object({
  sorting: z.enum(["newest", "oldest"]).optional().default("newest"),
  keyword: z.string().optional().default(""),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw new Error("Invalid search params");
  }
  const { sorting } = parsedData;

  const histories = await getHistories({
    profile_id: a_profile_id,
    limit: 20,
    sorting,
    keyword: parsedData.keyword,
  });
  return { histories };
};

export default function HistoriesPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";

  return (
    <div className="space-y-10">
      <Hero
        title="주식 추천 이력"
        subtitle="주식 종목 추천 이력을 확인해보세요."
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
                  name="keyword"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {loaderData.histories.map((history: any) => (
              <RecommendationCard
                key={history.recommendation_id}
                id={history.recommendation_id}
                date={formatKoreanDate(history.recommendation_date)}
                description={history.summary.slice(0, 500) + "..."}
                stocks={[
                  `Stock ${history.stock1_id}`,
                  `Stock ${history.stock2_id}`,
                  `Stock ${history.stock3_id}`,
                ]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
