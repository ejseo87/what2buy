import { adminClient, makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/recommendation-page";
import { getLoggedInUserId } from "~/features/users/queries";
import { getTickets } from "~/features/tickets/queries";
import { Hero } from "~/common/components/hero";
import { Form, Link, redirect, useNavigation } from "react-router";
import SelectPair from "~/common/components/select-pair";
import LoadingButton from "~/common/components/loading-button";
import {
  createRecommendation,
  insertRecommendationHistory,
} from "~/features/recommendations/mutations";
import { Alert } from "~/common/components/ui/alert";
import AlertMessage from "~/common/components/alert-message";
import OpenAI from "openai";
import z from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { getGoodStockList, type GoodStock } from "~/features/api/queries";
import { useTicket } from "~/features/tickets/mutation";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Request Recommendation - What2Buy" },
    { name: "description", content: "Request stock recommendations" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client as any);

  const tickets = await getTickets(client as any, {
    userId: userId,
    status: "not_used",
  });
  return { tickets };
};
// Check if API key is available
const apiKey = process.env.OPENAI_API_KEY;
//console.log("generate-recommendation-page apiKey=", apiKey);
const openai = apiKey ? new OpenAI({ apiKey }) : null;

const ResponseSchema = z.object({
  overall_summary: z.string().min(100).max(500),
  stock1_name: z.string(),
  stock1_code: z.string(),
  stock1_summary: z.string().min(100).max(500),
  stock2_name: z.string(),
  stock2_code: z.string(),
  stock2_summary: z.string().min(100).max(500),
  stock3_name: z.string(),
  stock3_code: z.string(),
  stock3_summary: z.string().min(100).max(500),
});
export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client as any);
  const formData = await request.formData();
  const ticketId = formData.get("ticket_id");
  console.log("ticketId=", ticketId);
  const { recommendation_id } = await createRecommendation(client as any, {
    ticketId: Number(ticketId),
    userId: userId,
  });
  console.log(`redirect to /histories/${recommendation_id}`);
  const goodStocks: GoodStock[] = await getGoodStockList(client as any, {
    userId,
  });
  //console.log("goodStocks=", goodStocks);

  if (!goodStocks || goodStocks.length === 0) {
    return Response.json({
      error: "No good stocks found to generate a recommendation.",
      completion: null,
    });
  }

  if (!openai) {
    return Response.json({
      error: "OpenAI API key is not configured",
      completion: null,
    });
  }
  //with the provided financial metrics (PBR, PER, ROE, etc.)
  try {
    const completion = await openai.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
          You are an expert stock analyst. You will receive a list of stocks in JSON format.
          Your task is to analyze these stocks based on your own survey and recommend the three stocks for investment.
          For each recommended stock, provide its name, stock code, and a detailed summary explaining why it's a good investment.
          Recommendation should be in Korean.
          `,
        },
        {
          role: "user",
          content: `
          Here is a list of promising stocks based on our filtering criteria. Please analyze them and provide a recommendation for the three stocks.
          Stock List (JSON):
          ${JSON.stringify(goodStocks, null, 2)}
          `,
        },
      ],
      response_format: zodResponseFormat(ResponseSchema, "recommendation"),
    });

    const parsed = completion.choices[0].message.parsed;
    if (!parsed) {
      return Response.json(
        {
          error: "Failed to generate recommendation",
        },
        { status: 400 }
      );
    }
    const total_token = completion.usage?.total_tokens;

    //db insert
    const recommendation_id = await insertRecommendationHistory(
      adminClient as any,
      {
        profile_id: userId,
        ticket_id: Number(ticketId),
        overall_summary: parsed.overall_summary,
        stock1_name: parsed.stock1_name,
        stock1_code: parsed.stock1_code,
        stock1_summary: parsed.stock1_summary,
        stock2_name: parsed.stock2_name,
        stock2_code: parsed.stock2_code,
        stock2_summary: parsed.stock2_summary,
        stock3_name: parsed.stock3_name,
        stock3_code: parsed.stock3_code,
        stock3_summary: parsed.stock3_summary,
        total_token,
      }
    );
  console.log("recommendation_id=", recommendation_id);
    if (recommendation_id) {
      const ticketUsedResult = await useTicket(adminClient as any, {
        ticketId: Number(ticketId),
        userId: userId,
      });
      if (ticketUsedResult) {
        return redirect(`/histories/${recommendation_id}`);
      } else {
        return Response.json({
          error: "Failed to use ticket, but recommendation is created.",
        });
      }
    } else {
      return Response.json({
        error: "Failed to insert recommendation history",
      });
    }
  } catch (error) {
    console.error("OpenAI API error:", error);
    return Response.json(
      {
        error: "OpenAI API error, Failed to generate recommendation",
      },
      { status: 400 }
    );
  }
};

export default function RecommendationPage({
  loaderData,
}: Route.ComponentProps) {
  const { tickets } = loaderData as {
    tickets: { ticket_id: number; ticket_type: string }[];
  };
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="space-y-10">
      <Hero
        title="주식 추천 받기"
        subtitle="남은 추천권을 선택해 AI가 엄선한 오늘의 주식 종목을 확인해 보세요."
      />
      {tickets.length === 0 ? (
        <>
          <AlertMessage content="주식 추천을 받으려면 추천권이 필요합니다. 남은 추천권이 없다면, 지금 바로 구매하세요." />
          <Link to="/tickets">
            <Button>추천권 구매하기</Button>
          </Link>
        </>
      ) : (
        <>
          <Form className="flex flex-col gap-10 w-1/2 mx-auto " method="post">
            <SelectPair
              label="추천권"
              description="추천권을 선택해주세요."
              name="ticket_id"
              required
              placeholder="추천권을 선택해주세요."
              options={tickets.map((ticket) => ({
                label: `#${ticket.ticket_id} ${
                  ticket.ticket_type == "free" ? "무료 추천권" : "유료 추천권"
                }`,
                value: ticket.ticket_id.toString(),
              }))}
            />

            <LoadingButton type="submit" isLoading={isSubmitting}>
              주식 추천 받기
            </LoadingButton>
          </Form>
        </>
      )}
    </div>
  );
}
