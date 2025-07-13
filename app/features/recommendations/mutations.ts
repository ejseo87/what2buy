import pkg from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const createRecommendation = async (
  client: SupabaseClient,
  {
    ticketId,
    userId,
  }: {
    ticketId: number;
    userId: string;
  }
) => {
  const { data: stocksData, error: stocksError } = await client
    .from("stocks")
    .select("stock_id, stock_name, pbr, per, roe")
    .lte("pbr", 1.5);

  if (stocksError) {
    console.error(stocksError);
    throw new Error("Failed to get stocks");
  }
  // 무작위 3개 추출
  const shuffled = [...stocksData].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 3);

  const [s1, s2, s3] = selected;
  console.log("s1=", s1);
  console.log("s2=", s2);
  console.log("s3=", s3);
  const summary = `추천 주식 3개: ${s1.stock_name}, ${s2.stock_name}, ${s3.stock_name}`;
  const stock1_summary = `${s1.stock_name}, pbr: ${s1.pbr}, per: ${s1.per}, roe: ${s1.roe}`;
  const stock2_summary = `${s2.stock_name}, pbr: ${s2.pbr}, per: ${s2.per}, roe: ${s2.roe}`;
  const stock3_summary = `${s3.stock_name}, pbr: ${s3.pbr}, per: ${s3.per}, roe: ${s3.roe}`;
  console.log("summary=", summary);
  console.log("stock1_summary=", stock1_summary);
  console.log("stock2_summary=", stock2_summary);
  console.log("stock3_summary=", stock3_summary);
  const { data: recommendationsData, error: recommendationsError } =
    await client
      .from("histories")
      .insert({
        ticket_id: ticketId,
        profile_id: userId,
        recommendation_date: new Date().toISOString(),
        stock1_id: s1.stock_id,
        stock2_id: s2.stock_id,
        stock3_id: s3.stock_id,
        updated_at: new Date().toISOString(),
        summary: summary,
        stock1_summary: stock1_summary,
        stock2_summary: stock2_summary,
        stock3_summary: stock3_summary,
      })
      .select()
      .single();
  if (recommendationsError) {
    console.error(recommendationsError);
    throw new Error("Failed to create recommendation");
  }
  console.log("recommendationsData=", recommendationsData);
  const { data: ticketData, error: ticketError } = await client
    .from("tickets")
    .update({ status: "used", used_date: new Date().toISOString() })
    .eq("ticket_id", ticketId);
  if (ticketError) {
    console.error(ticketError);
    throw new Error("Failed to update ticket");
  }
  console.log("ticketData=", ticketData);

  return recommendationsData;
};
