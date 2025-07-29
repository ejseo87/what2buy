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
    .default(DateTime.now().minus({ days: 2 }).toFormat("yyyy-MM-dd")),
  endDate: z.string().optional().default(DateTime.now().toFormat("yyyy-MM-dd")),
  batchSize: z.string().optional().default("10"), // 배치 크기 추가
});

//https://what2buy.cool/api/stocks?execute=true&startDate=2025-07-20&endDate=2025-07-27

// 배치 처리를 위한 유틸리티 함수
async function processBatch<T, R>(
  items: T[],
  batchSize: number,
  processFn: (item: T) => Promise<R>
): Promise<{ success: R[]; failed: { item: T; error: Error }[] }> {
  const success: R[] = [];
  const failed: { item: T; error: Error }[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    console.log(
      `[stocks-api] Processing batch ${
        Math.floor(i / batchSize) + 1
      }/${Math.ceil(items.length / batchSize)}`
    );

    const batchPromises = batch.map(
      async (
        item
      ): Promise<{ success: R; item: T } | { error: Error; item: T }> => {
        try {
          const result = await processFn(item);
          return { success: result, item };
        } catch (error) {
          return { error: error as Error, item };
        }
      }
    );

    const batchResults = await Promise.allSettled(batchPromises);

    batchResults.forEach((result) => {
      if (result.status === "fulfilled") {
        if ("success" in result.value) {
          success.push(result.value.success);
        } else {
          failed.push({ item: result.value.item, error: result.value.error });
        }
      } else {
        // Promise.allSettled에서 rejected인 경우는 거의 없지만 안전장치
        console.error("[stocks-api] Unexpected batch error:", result.reason);
      }
    });

    // 배치 간 짧은 대기 시간 (API rate limiting 방지)
    if (i + batchSize < items.length) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  return { success, failed };
}

export async function action({ request }: Route.ActionArgs) {
  // POST 메서드 확인
  if (request.method !== "POST") {
    return new Response(null, { status: 404 });
  }
  const header = request.headers.get("X-TOMATO");
  if (!header || header !== "X-TOMATO") {
    return new Response(null, { status: 404 });
  }

  // URL 파라미터에서 설정 가져오기
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
  const batchSize = parseInt(data.batchSize);

  console.log("[stocks-api] startDate:", startDate);
  console.log("[stocks-api] endDate:", endDate);
  console.log("[stocks-api] batchSize:", batchSize);

  if (endDate < startDate) {
    return Response.json(
      { error: "endDate must be greater than startDate" },
      { status: 400 }
    );
  }

  const stocksList = await getStockList(adminClient);
  console.log("[stocks-api] stocks length of stocksList:", stocksList.length);

  // 개선된 배치 처리로 주식 데이터 수집
  const { success: successfulStocks, failed: failedStocks } =
    await processBatch(stocksList, batchSize, async (stock) => {
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
        return { symbol: koreanSymbol, dataCount: 0 };
      }

      const transformedHistoricalData = historicalData.map((data) => ({
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
        `[stocks-api] ${koreanSymbol} : processed ${historicalData.length} records`
      );

      return { symbol: koreanSymbol, dataCount: historicalData.length };
    });

  const processedCount = successfulStocks.length;
  const failedCount = failedStocks.length;
  const totalDataPoints = successfulStocks.reduce(
    (sum, stock) => sum + stock.dataCount,
    0
  );

  console.log(
    `[stocks-api] Processing completed: ${processedCount} successful, ${failedCount} failed in ${totalDataPoints} data points`
  );

  // 실패한 주식들 로깅
  if (failedStocks.length > 0) {
    console.error(
      "[stocks-api] Failed stocks:",
      failedStocks.map((f) => ({
        symbol: `${f.item.isu_srt_cd}.KS`,
        error: f.error.message,
      }))
    );
  }

  return Response.json({
    ok: true,
    processedCount,
    failedCount,
    totalStocks: stocksList.length,
    totalDataPoints,
    successRate: ((processedCount / stocksList.length) * 100).toFixed(2) + "%",
    failedStocks:
      failedStocks.length > 0
        ? failedStocks.map((f) => ({
            symbol: `${f.item.isu_srt_cd}.KS`,
            error: f.error.message,
          }))
        : undefined,
  });
}
