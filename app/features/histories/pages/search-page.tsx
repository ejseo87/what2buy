import z from "zod";
import type { Route } from "./+types/search-page";
import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { formatKoreanDate } from "~/common/utils";
import { getHistories, getTotalPages } from "../queries";
import { a_profile_id } from "~/common/constants";
import AllPurposesPagination from "~/common/components/all-purposes-pagination";
import { RecommendationCard } from "../components/recommedation-card";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Search | What2Buy" },
    {
      name: "description",
      content: "Search recommendation history and stocks",
    },
  ];
};

const searchParamsSchema = z.object({
  keyword: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1),
  sorting: z.enum(["newest", "oldest"]).optional().default("newest"),
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
  const totalPages = await getTotalPages(client,{
    profile_id: a_profile_id,
    keyword: parsedData.keyword,
  });
  //console.log(totalPages);
  if (parsedData.page > totalPages) {
    throw new Error("Invalid page");
  }
  const histories = await getHistories(client,{
    profile_id: a_profile_id,
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

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="검색" subtitle="추천 이력과 주식을 키워드로 검색해보세요." />
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-10">
          <Form className="flex flex-row gap-5 items-center justify-center w-1/2">
            <Input
              className="text-xl text-bold flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-praimary-500 "
              type="text"
              name="keyword"
              placeholder="추천 이력과 주식을 키워드로 검색해보세요."
            />
            <Button
              type="submit"
              className="text-xl text-bold px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              검색
            </Button>
          </Form>
        </div>

        {/* Search Results */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Search Results</h2>
          <p className="text-gray-600">No search results to display</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {loaderData.histories.map((history: any) => (
              <RecommendationCard
                key={history.recommendation_id}
                id={history.recommendation_id}
                date={history.formattedDate}
                description={history.summary.slice(0, 500) + "..."}
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
