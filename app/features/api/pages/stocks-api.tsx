import type { Route } from "./+types/stocks-api";
import {
  KoreanStockDataService,
  StockDataService,
} from "../utils/stock-data-service";
import { getNoWargingStockList, getStockList } from "../queries";
import { DateTime } from "luxon";
import { adminClient } from "~/supa-client";
import { insertStocksHistoricalData } from "../mutation";
import z from "zod";

export const searchParamsSchema = z.object({
  execute: z.string().optional().default("false"),
  exchange: z.enum(["KRX", "NASDAQ", "NYSE"]).optional().default("KRX"),
  startDate: z
    .string()
    .optional()
    .default(DateTime.now().minus({ days: 5 }).toFormat("yyyy-MM-dd")),
  endDate: z.string().optional().default(DateTime.now().toFormat("yyyy-MM-dd")),
});

export async function action({ request }: Route.ActionArgs) {
  // POST 메서드 확인
  if (request.method !== "POST") {
    return new Response(null, { status: 404 });
  }
  const header = request.headers.get("X-TOMATO");
  if (!header || header !== "X-TOMATO") {
    return new Response(null, { status: 404 });
  }

  // URL 파라미터에서 거래소 타입 가져오기
  const url = new URL(request.url);
  const { success, data, error } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  // 실행 제어를 위한 파라미터 추가
  const shouldExecute = url.searchParams.get("execute");
  if (shouldExecute !== "true") {
    return Response.json({
      message: "Add ?execute=true to URL to run the data import",
      stocksCount: 0,
    });
  }

  const endDate = data.endDate;
  const startDate = data.startDate;
  console.log("[stocks-api] startDate:", startDate);
  console.log("[stocks-api] endDate:", endDate);

  if (endDate < startDate) {
    return Response.json(
      { error: "endDate must be greater than startDate" },
      { status: 400 }
    );
  }

  const stocksList = await getStockList(adminClient);
  console.log(
    "[stocks-api] stocks length of noWargingStocks:",
    stocksList.length
  );

  let processedCount = 0;
  for (const stock of stocksList) {
    const koreanSymbol = `${stock.isu_srt_cd}.KS`;
    const historicalData = await StockDataService.getStockHistoricalData(
      koreanSymbol,
      startDate,
      endDate
    );
    if (!historicalData || historicalData.length === 0) {
      console.log(
        `[stocks-api] ${koreanSymbol} : historicalData is null or empty`
      );
      continue;
    }
    const transformedHistoricalData = (historicalData || []).map((data) => ({
      isu_srt_cd: stock.isu_srt_cd,
      date: data.date,
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
      volume: data.volume,
    }));
    await insertStocksHistoricalData(
      adminClient,
      transformedHistoricalData as any
    );
    console.log(
      `[stock-api] ${koreanSymbol} : ${processedCount}/${stocksList.length}`
    );
    processedCount++;
  }
  console.log(
    `[stocks-api] Stock Historical Data Inserted (${processedCount}/${stocksList.length})`
  );

  return Response.json({
    ok: true,
    processedCount,
    totalStocks: stocksList.length,
  });
}
