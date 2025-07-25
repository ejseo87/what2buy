import z from "zod";
import type { Route } from "./+types/search-page";
import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { formatKoreanDate } from "~/common/utils";
import {
  getRecommendationHistories,
  getRecommendationHistoryTotalPages,
} from "../queries";

import AllPurposesPagination from "~/common/components/all-purposes-pagination";
import { RecommendationCard } from "../components/recommedation-card";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";

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

  try {
    const userId = await getLoggedInUserId(client as any);
    console.log("[search-page] parsedData=", parsedData);
    console.log("[search-page] userId=", userId);

    if (parsedData.keyword !== "") {
      const totalPages = await getRecommendationHistoryTotalPages(
        client as any,
        {
          userId: userId,
          keyword: parsedData.keyword,
        }
      );
      console.log("[search-page] totalPages=", totalPages);

      if (parsedData.page > totalPages) {
        throw new Error("Invalid page");
      }

      const histories = await getRecommendationHistories(client as any, {
        userId: userId,
        page: parsedData.page,
        sorting: parsedData.sorting,
        keyword: parsedData.keyword,
      });

      console.log("[search-page] histories=", histories);

      // 날짜 포맷팅 추가
      const formattedHistories = histories.map((h: any) => ({
        ...h,
        formattedDate: h.recommendation_date
          ? formatKoreanDate(h.recommendation_date)
          : "날짜 없음",
      }));

      return {
        histories: formattedHistories,
        totalPages,
        keyword: parsedData.keyword,
        headers,
      };
    }
    return {
      histories: [],
      totalPages: 1,
      keyword: parsedData.keyword,
      headers,
    };
  } catch (error) {
    console.error("[search-page] error=", error);
    return {
      histories: [],
      totalPages: 1,
      keyword: "",
      headers: new Headers(),
    };
  }
};

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero title="추천 기록 검색" />
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-10">
          <Form className="flex flex-row gap-5 items-center justify-center w-1/2">
            <Input
              className="text-xl text-bold flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-praimary-500 "
              type="text"
              name="keyword"
              defaultValue={loaderData.keyword}
              placeholder="키워드로 추천 기록을 검색해보세요."
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
          {loaderData.histories.length === 0 ? (
            <p className="text-gray-600">검색 결과가 없습니다.</p>
          ) : (
            <>
              <p className="text-gray-600">
                {loaderData.histories.length}개의 검색 결과를 찾았습니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {loaderData.histories.map((history: any) => (
                  <RecommendationCard
                    key={history.recommendation_id}
                    id={history.recommendation_id}
                    date={history.formattedDate}
                    description={history.overall_summary}
                    stocks={[
                      history.stock1_name,
                      history.stock2_name,
                      history.stock3_name,
                    ]}
                  />
                ))}
              </div>
              <AllPurposesPagination totalPages={loaderData.totalPages} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
