import z from "zod";
import type { Route } from "./+types/stock-earnings-api";
import yahooFinance from "yahoo-finance2";
import { getStockList } from "../queries";
import { adminClient } from "../../../supa-client";
import {
  insertYahooFinancialData,
  insertYahooSummaryDetail,
  insertYahooDefaultKeyStatistics,
  insertStocksSummaryWithRatios,
} from "../mutation";
import type { Database } from "~/database.types";

type YahooFinancialDataInsert =
  Database["public"]["Tables"]["yahoo_financial_data"]["Insert"];
type YahooSummaryDetailInsert =
  Database["public"]["Tables"]["yahoo_summary_detail"]["Insert"];
type YahooDefaultKeyStatisticsInsert =
  Database["public"]["Tables"]["yahoo_default_key_statistics"]["Insert"];
type StocksSummaryDetailInsert =
  Database["public"]["Tables"]["stocks_summary_detail"]["Insert"];

function safeParseInt(value: any): number | null {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return null;
  }
  return parseInt(String(value), 10);
}

export const searchParamsSchema = z.object({
  execute: z.string().optional().default("false"),
  exchange: z.enum(["KRX", "NASDAQ", "NYSE"]).optional().default("KRX"),
});

export const action = async ({ request }: Route.ActionArgs) => {
  // POST 메서드 확인
  if (request.method !== "POST") {
    return new Response(null, { status: 404 });
  }
  const header = request.headers.get("X-TOMATO");
  if (!header || header !== "X-TOMATO") {
    return new Response(null, { status: 404 });
  }

  const url = new URL(request.url);
  const { success } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );

  if (!success) {
    return Response.json({ error: "Invalid search params" }, { status: 400 });
  }

  const shouldExecute = url.searchParams.get("execute");
  if (shouldExecute !== "true") {
    return Response.json({
      message: "Add ?execute=true to URL to run the data import",
    });
  }

  const stocksList = await getStockList(adminClient);
  let processedCount = 0;

  for (const stock of stocksList) {
    const koreanSymbol = `${stock.isu_srt_cd}.KS`;

    let summary: any = null;
    let quoteData: any = null;

    try {
      summary = await yahooFinance.quoteSummary(koreanSymbol, {
        modules: ["financialData", "summaryDetail", "defaultKeyStatistics"],
      });
    } catch (error) {
      console.error(
        `[stock-earnings-api] Failed to fetch quoteSummary data for ${koreanSymbol}`,
        error
      );
    }
    /*     console.log(
      "[stock-earnings-api] summary:\n",
      JSON.stringify(summary, null, 2)
    ); */
    try {
      quoteData = await yahooFinance.quote(koreanSymbol);
      /*       console.log(
        "[stock-earnings-api] quoteData:\n",
        JSON.stringify(quoteData, null, 2)
      ); */
    } catch (error) {
      console.error(
        `[stock-earnings-api] Failed to fetch quote data for ${koreanSymbol}:`,
        error
      );
    }

    if (!summary && !quoteData) {
      console.log(
        `[stock-earnings-api] Skipping ${koreanSymbol} due to complete data failure.`
      );
      continue;
    }

    try {
      const financialData = summary?.financialData ?? null;
      const summaryDetail = summary?.summaryDetail ?? null;
      const defaultKeyStatistics = summary?.defaultKeyStatistics ?? null;
      const earnings = summary?.earnings ?? null;
      if (financialData) {
        const dataToInsert: YahooFinancialDataInsert = {
          isu_srt_cd: stock.isu_srt_cd,
          current_price: safeParseInt(financialData.currentPrice),
          target_high_price: safeParseInt(financialData.targetHighPrice),
          target_low_price: safeParseInt(financialData.targetLowPrice),
          target_mean_price: safeParseInt(financialData.targetMeanPrice),
          target_median_price: safeParseInt(financialData.targetMedianPrice),
          recommendation_mean:
            financialData.recommendationMean?.toString() ?? null,
          recommendation_key: financialData.recommendationKey ?? null,
          number_of_analyst_opinions: safeParseInt(
            financialData.numberOfAnalystOpinions
          ),
          total_cash: safeParseInt(financialData.totalCash),
          total_cash_per_share:
            financialData.totalCashPerShare?.toString() ?? null,
          ebitda: safeParseInt(financialData.ebitda),
          total_debt: safeParseInt(financialData.totalDebt),
          quick_ratio: financialData.quickRatio?.toString() ?? null,
          current_ratio: financialData.currentRatio?.toString() ?? null,
          total_revenue: safeParseInt(financialData.totalRevenue),
          debt_to_equity: financialData.debtToEquity?.toString() ?? null,
          revenue_per_share: financialData.revenuePerShare?.toString() ?? null,
          return_on_assets: financialData.returnOnAssets?.toString() ?? null,
          return_on_equity: financialData.returnOnEquity?.toString() ?? null,
          gross_profits: safeParseInt(financialData.grossProfits),
          free_cashflow: safeParseInt(financialData.freeCashflow),
          operating_cashflow: safeParseInt(financialData.operatingCashflow),
          earnings_growth: financialData.earningsGrowth?.toString() ?? null,
          revenue_growth: financialData.revenueGrowth?.toString() ?? null,
          gross_margins: financialData.grossMargins?.toString() ?? null,
          ebitda_margins: financialData.ebitdaMargins?.toString() ?? null,
          operating_margins: financialData.operatingMargins?.toString() ?? null,
          profit_margins: financialData.profitMargins?.toString() ?? null,
          financial_currency: financialData.financialCurrency ?? null,
        };
        await insertYahooFinancialData(adminClient, [dataToInsert]);
      }

      if (summaryDetail) {
        const dataToInsert: YahooSummaryDetailInsert = {
          isu_srt_cd: stock.isu_srt_cd,
          previous_close: safeParseInt(summaryDetail.previousClose),
          open: safeParseInt(summaryDetail.open),
          day_low: safeParseInt(summaryDetail.dayLow),
          day_high: safeParseInt(summaryDetail.dayHigh),
          dividend_rate: safeParseInt(summaryDetail.dividendRate),
          dividend_yield: summaryDetail.dividendYield?.toString() ?? null,
          ex_dividend_date: summaryDetail.exDividendDate?.toISOString() ?? null,
          payout_ratio: summaryDetail.payoutRatio?.toString() ?? null,
          five_year_avg_dividend_yield:
            summaryDetail.fiveYearAvgDividendYield?.toString() ?? null,
          beta: summaryDetail.beta?.toString() ?? null,
          volume: safeParseInt(summaryDetail.volume),
          average_volume: safeParseInt(summaryDetail.averageVolume),
          average_volume_10days: safeParseInt(
            summaryDetail.averageVolume10days
          ),
          bid: safeParseInt(summaryDetail.bid),
          ask: safeParseInt(summaryDetail.ask),
          market_cap: safeParseInt(summaryDetail.marketCap),
          fifty_two_week_low: safeParseInt(summaryDetail.fiftyTwoWeekLow),
          fifty_two_week_high: safeParseInt(summaryDetail.fiftyTwoWeekHigh),
          price_to_sales_trailing_12_months:
            summaryDetail.priceToSalesTrailing12Months?.toString() ?? null,
          fifty_day_average: summaryDetail.fiftyDayAverage?.toString() ?? null,
          two_hundred_day_average:
            summaryDetail.twoHundredDayAverage?.toString() ?? null,
          currency: summaryDetail.currency ?? null,
        };
        await insertYahooSummaryDetail(adminClient, [dataToInsert]);
      }

      if (defaultKeyStatistics) {
        const dataToInsert: YahooDefaultKeyStatisticsInsert = {
          isu_srt_cd: stock.isu_srt_cd,
          enterprise_value: safeParseInt(defaultKeyStatistics.enterpriseValue),
          forward_pe: defaultKeyStatistics.forwardPE?.toString() ?? null,
          float_shares: safeParseInt(defaultKeyStatistics.floatShares),
          shares_outstanding: safeParseInt(
            defaultKeyStatistics.sharesOutstanding
          ),
          held_percent_insiders:
            defaultKeyStatistics.heldPercentInsiders?.toString() ?? null,
          held_percent_institutions:
            defaultKeyStatistics.heldPercentInstitutions?.toString() ?? null,
          implied_shares_outstanding: safeParseInt(
            defaultKeyStatistics.impliedSharesOutstanding
          ),
          last_fiscal_year_end:
            defaultKeyStatistics.lastFiscalYearEnd?.toISOString() ?? null,
          next_fiscal_year_end:
            defaultKeyStatistics.nextFiscalYearEnd?.toISOString() ?? null,
          most_recent_quarter:
            defaultKeyStatistics.mostRecentQuarter?.toISOString() ?? null,
          earnings_quarterly_growth:
            defaultKeyStatistics.earningsQuarterlyGrowth?.toString() ?? null,
          net_income_to_common: safeParseInt(
            defaultKeyStatistics.netIncomeToCommon
          ),
          enterprise_to_revenue:
            defaultKeyStatistics.enterpriseToRevenue?.toString() ?? null,
          enterprise_to_ebitda:
            defaultKeyStatistics.enterpriseToEbitda?.toString() ?? null,
          fifty_two_week_change:
            defaultKeyStatistics["52WeekChange"]?.toString() ?? null,
          sand_p_fifty_two_week_change:
            defaultKeyStatistics.SandP52WeekChange?.toString() ?? null,
          last_dividend_value: safeParseInt(
            defaultKeyStatistics.lastDividendValue
          ),
          last_dividend_date:
            defaultKeyStatistics.lastDividendDate?.toISOString() ?? null,
        };
        await insertYahooDefaultKeyStatistics(adminClient, [dataToInsert]);
      }

      const beta = defaultKeyStatistics?.beta ?? quoteData?.beta ?? null;
      const recommendationKey = financialData?.recommendationKey ?? null;
      const recommendationMean = financialData?.recommendationMean ?? null;

      const forwardPE = defaultKeyStatistics?.forwardPE ?? null;
      const trailingPE = quoteData?.priceEpsCurrentYear ?? null;
      const totalCashPerShare = financialData?.totalCashPerShare;
      const pcr =
        summaryDetail?.previousClose && totalCashPerShare
          ? summaryDetail.previousClose / totalCashPerShare
          : null;
      const psr = summaryDetail?.priceToSalesTrailing12Months ?? null;
      const roa = financialData?.returnOnAssets ?? null;
      const roe = financialData?.returnOnEquity ?? null;
      const pbr = trailingPE != null && roe != null ? trailingPE * roe : null;
      const rps = financialData?.revenuePerShare ?? null;
      const evToEbitda = defaultKeyStatistics?.enterpriseToEbitda ?? null;
      const evToRevenue = defaultKeyStatistics?.enterpriseToRevenue ?? null;

      const stocksSummaryDetailToInsert: StocksSummaryDetailInsert = {
        isu_srt_cd: stock.isu_srt_cd,
        isu_abbrv: stock.isu_abbrv,
        recommendation_key: recommendationKey ?? null,
        recommendation_mean: recommendationMean?.toString() ?? null,
        forward_pe: forwardPE?.toString() ?? null,
        trailing_pe: trailingPE?.toString() ?? null,
        eps_trailing_twelve_months: quoteData?.epsTrailingTwelveMonths ?? null,
        eps_forward: quoteData?.epsForward ?? null,
        pbr: pbr?.toString() ?? null,
        pcr: pcr?.toString() ?? null,
        psr: psr?.toString() ?? null,
        ev_to_ebitda: evToEbitda?.toString() ?? null,
        ev_to_revenue: evToRevenue?.toString() ?? null,
        roa: roa?.toString() ?? null,
        roe: roe?.toString() ?? null,
        rps: rps?.toString() ?? null,
        beta: beta?.toString() ?? null,
      };
      await insertStocksSummaryWithRatios(adminClient, [
        stocksSummaryDetailToInsert,
      ]);
      processedCount++;
      /*       if (processedCount > 2) {
        break;
      } */
      console.log(
        `[stock-earnings-api] Successfully processed ${processedCount}/${stocksList.length}: ${koreanSymbol}`
      );
    } catch (error) {
      console.error(
        `[stock-earnings-api] Failed to process and insert data for ${koreanSymbol}:`,
        error
      );
    }
  }

  return Response.json({
    ok: true,
    message: `Successfully processed ${processedCount} of ${stocksList.length} stocks.`,
  });
};
