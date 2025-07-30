import { adminClient, makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/recommendation-page";
import { getLoggedInUserId } from "~/features/users/queries";
import { getTickets } from "~/features/tickets/queries";
import { Hero } from "~/common/components/hero";
import { Form, Link, redirect, useNavigation } from "react-router";
import SelectPair from "~/common/components/select-pair";
import LoadingButton from "~/common/components/loading-button";
import { insertRecommendationHistory } from "~/features/recommendations/mutations";
import AlertMessage from "~/common/components/alert-message";
import OpenAI from "openai";
import z from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { getGoodStockListByUserId } from "~/features/histories/queries";
import { useTicket } from "~/features/tickets/mutation";
import { Button } from "~/common/components/ui/button";
import { Label } from "~/common/components/ui/label";
import { Checkbox } from "~/common/components/ui/checkbox";
import ServiceIntroMessage from "~/common/components/service-intro-message";
import { useState } from "react";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Request Recommendation - what2buy" },
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
  overall_summary: z.string().min(100).max(1000),
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
  console.log("[recommendation-page] ticketId=", ticketId);
  console.log("[recommendation-page] userId=", userId);

  const goodStocks = await getGoodStockListByUserId(client as any, {
    userId,
  });

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
          Your task is to analyze these stocks based on valluation, momentum, financial health and other factors. Your analysis results should be quantified as something like 70/100. Finally recommend the three best stocks based on your quantitative analysis.
          For each recommended stock, provide its name, stock code, and a detailed summary explaining why it's a good investment.
          Recommendation should be in Korean.
          `,
        },
        {
          role: "user",
          content: `
          Here is a list of promising stocks based on our filtering criteria. Please analyze them and provide a recommendation for the three stocks with your quantitative analysis.
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
    console.log("[recommendation-page] recommendation_id=", recommendation_id);
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
    console.error("[recommendation-page] OpenAI API error:", error);
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

  // 사용자 동의 상태 관리
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <div className="space-y-10">
      <Hero
        title="주식 추천 받기"
        subtitle="남은 추천권을 선택해 AI가 엄선한 오늘의 주식 종목을 확인해 보세요."
      />
      <ServiceIntroMessage addedClassName="w-1/2" />
      {tickets.length === 0 ? (
        <div className="w-1/2 mx-auto">
          <AlertMessage content="주식 추천을 받으려면 추천권이 필요합니다. 남은 추천권이 없다면, 지금 바로 구매하세요." />
          <Link to="/tickets/buy">
            <Button>추천권 구매</Button>
          </Link>
        </div>
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

            {/* 사용자 동의 체크박스 */}
            <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="user-agreement"
                  checked={isAgreed}
                  onCheckedChange={(checked) => setIsAgreed(checked === true)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="user-agreement"
                    className="text-sm font-medium leading-relaxed cursor-pointer"
                  >
                    투자 위험 고지 및 서비스 이용 동의
                  </Label>
                  <div className="text-xs text-muted-foreground space-y-2">
                    <p>
                      • what2buy는 AI 분석을 통해 성장 가능성이 확률적으로 높은
                      주식을 추천하는 서비스입니다.
                    </p>
                    <p>
                      • 주식 투자는 원금 손실의 위험이 있으며, 모든 투자 결정에
                      대한 책임은 투자자 본인에게 있습니다.
                    </p>
                    <p>
                      • 추천 받은 종목에 대해 충분한 검토 후 신중하게 투자
                      결정을 내릴 것에 동의합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <LoadingButton
              type="submit"
              isLoading={isSubmitting}
              disabled={!isAgreed || isSubmitting}
              className={!isAgreed ? "opacity-50 cursor-not-allowed" : ""}
            >
              {!isAgreed
                ? "위 내용에 동의하고 주식 추천 받기"
                : "주식 추천 받기"}
            </LoadingButton>
          </Form>
        </>
      )}
    </div>
  );
}
