import type { Route } from "./+types/stocks-api";
import {
  KoreanStockDataService,
  StockDataService,
} from "../utils/stock-data-service";
import { getNoWargingStockList } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";
import { insertStocksHistoricalData } from "../mutation";

export async function loader({ request }: Route.LoaderArgs) {
  // URL 파라미터에서 거래소 타입 가져오기
  const url = new URL(request.url);
  const exchange = url.searchParams.get("exchange") || "KRX"; // 기본값은 KRX

  const endDate = DateTime.now().toFormat("yyyy-MM-dd");
  const startDate = DateTime.now().minus({ months: 1 }).toFormat("yyyy-MM-dd");
  console.log("startDate:", startDate);
  console.log("endDate:", endDate);

  const { client } = makeSSRClient(request);
  const noWargingStocks = await getNoWargingStockList(client as any);
  let i = 0;
  for (const stock of noWargingStocks) {
    console.log("noWargingStocks:", stock.isu_srt_cd);
    const koreanSymbol = `${stock.isu_srt_cd}.KS`;
    const historicalData = await StockDataService.getStockHistoricalData(
      koreanSymbol,
      startDate,
      endDate
    );
    if (!historicalData) {
      console.log(`${koreanSymbol} : historicalData is null`);
      continue;
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
    await insertStocksHistoricalData(client as any, transformedHistoricalData);
    console.log(`${koreanSymbol} : inserted`);
    await new Promise((resolve) => setTimeout(resolve, 300)); // 300ms 대기
  }

  return Response.json({
    ok: true,
  });
}
