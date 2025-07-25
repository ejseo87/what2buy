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
import {
  getRecommendationHistories,
  getRecommendationHistoryTotalPages,
} from "../queries";
import { formatKoreanDate } from "~/common/utils";
import { z } from "zod";
import { SORT_OPTIONS } from "~/common/constants";
import AllPurposesPagination from "~/common/components/all-purposes-pagination";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Recommendation History | What2Buy" },
    { name: "description", content: "Stock recommendation history" },
  ];
};

const searchParamsSchema = z.object({
  sorting: z.enum(["newest", "oldest"]).optional().default("newest"),
  keyword: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client as any);
  console.log("[histories page] userId=", userId);
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw new Error("Invalid search params");
  }
  const totalPages = await getRecommendationHistoryTotalPages(client as any, {
    userId: userId,
    keyword: parsedData.keyword,
  });
  console.log("[histories page] totalPages=", totalPages);
  if (parsedData.page > totalPages) {
    throw new Error("Invalid page");
  }
  const histories = await getRecommendationHistories(client as any, {
    userId: userId,
    page: parsedData.page,
    sorting: parsedData.sorting,
    keyword: parsedData.keyword,
  });
  // 날짜 포맷팅 추가
  const formattedHistories = histories.map((h) => ({
    ...h,
    formattedDate: h.recommendation_date
      ? formatKoreanDate(h.recommendation_date)
      : "날짜 없음",
  }));
  return { histories: formattedHistories, totalPages };
};

export default function HistoriesPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";

  return (
    <div className="space-y-10">
      <Hero title="추천 기록" subtitle="지금까지의 추천 기록을 확인해보세요." />
      <div className=" items-start gap-40">
        <div className=" space-y-10">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="space-y-5 w-full sm:w-1/2">
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
                  placeholder="추천 기록을 키워드로 검색해보세요."
                />
              </Form>
            </div>
            <div className="flex justify-start sm:justify-end">
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
                date={history.formattedDate}
                description={history.overall_summary + "..."}
                stocks={[
                  history.stock1_name,
                  history.stock2_name,
                  history.stock3_name,
                ]}
              />
            ))}
          </div>
          <AllPurposesPagination totalPages={loaderData.totalPages} />
        </div>
      </div>
    </div>
  );
}
