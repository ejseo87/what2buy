import { getLoggedInUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/generate-recommendation-page";
import OpenAI from "openai";
import z from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { getGoodStockList, type GoodStock } from "~/features/api/queries";

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

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client as any);
  const goodStocks: GoodStock[] = await getGoodStockList(client as any);
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
    console.log(parsed?.overall_summary);
    console.log(parsed?.stock1_name);
    console.log(parsed?.stock1_code);
    console.log(parsed?.stock1_summary);
    console.log(parsed?.stock2_name);
    console.log(parsed?.stock2_code);
    console.log(parsed?.stock2_summary);
    console.log(parsed?.stock3_name);

    //db insert

    return Response.json({
      ok: true,
    });
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
