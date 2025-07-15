import { getLoggedInUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/generate-recommendation-page";
import OpenAI from "openai";
import { getGoodStocks } from "../queries";
import z from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

// Check if API key is available
const apiKey = process.env.OPENAI_API_KEY;
//console.log("generate-recommendation-page apiKey=", apiKey);
const openai = apiKey ? new OpenAI({ apiKey }) : null;

const ResponseSchema = z.object({
  overall_summary: z.string().min(300).max(1000),
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
  const goodStocks = await getGoodStocks(client as any);
  console.log("goodStocks=", goodStocks);

  if (!openai) {
    return Response.json({
      error: "OpenAI API key is not configured",
      completion: null,
    });
  }

  try {
    const completion = await openai.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
          You are a helpful assistant that generates a recommendation for a stock.
          You will be given a list of stocks and you will need to generate a recommendation for three of them.
          `,
        },
        {
          role: "user",
          content: `
          Here is the list of stocks:
          ${goodStocks.map((stock) => stock.stock_name).join(", ")}
          Please generate a recommendation for three of them.
          `,
        },
      ],
      response_format: zodResponseFormat(ResponseSchema, "recommendation"),
    });

   ;

    return Response.json({
      completion,
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return Response.json({
      error: "Failed to generate recommendation",
      completion: null,
    });
  }
};
