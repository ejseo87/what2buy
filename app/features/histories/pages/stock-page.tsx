import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/stock-page";
import { StockChart } from "~/common/components/stock-chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/common/components/ui/table";
import { makeSSRClient, type Database } from "~/supa-client";
import {
  getStockPerformanceChart,
  getStocksOverviewByStockCode,
  getStocksSummaryWithRaitosByStockCode,
  getRecommendationHistoriesByStockCode,
  getRecommendedStockReturns,
} from "../queries";
import { getLoggedInUserId } from "~/features/users/queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Stock Detail | what2buy" },
    { name: "description", content: "Stock detail and profit tracking" },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { stockCode } = params;
  console.log("[stock-page] params=", params);
  // 주식 상세 정보 가져오기
  // stockoverview stocks_warnings stocks_summary_with_raitos
  const userId = await getLoggedInUserId(client as any);
  console.log("[stock-page] userId=", userId);
  const stockOverview = await getStocksOverviewByStockCode(client as any, {
    stockCode: stockCode,
  });
  const stocksSummaryWithRaitos = await getStocksSummaryWithRaitosByStockCode(
    client as any,
    {
      stockCode: stockCode,
    }
  );
  const recommendationHistories = await getRecommendationHistoriesByStockCode(
    client as any,
    {
      stockCode: stockCode,
      userId: userId,
    }
  );

  // 차트 데이터 가져오기 (최근 30일)
  const chartData = await getStockPerformanceChart(client as any, {
    stockCode: stockCode,
    days: 30,
  });

  // 각 추천 날짜별 수익률 계산
  const profitTrackingData = await Promise.all(
    recommendationHistories.map(async (history: any) => {
      try {
        const returns = await getRecommendedStockReturns(client as any, {
          stockCode: stockCode,
          recommendationDate: history.recommendation_date,
        });
        return {
          recommendation_date: history.recommendation_date,
          recommended_price: returns.recommendationPrice,
          current_price: returns.latestPrice,
          profit_rate: returns.profitRate,
          profit_amount: returns.profitAmount,
        };
      } catch (error) {
        console.error("Error calculating returns:", error);
        return {
          recommendation_date: history.recommendation_date,
          recommended_price: 0,
          current_price: 0,
          profit_rate: "0.00",
          profit_amount: 0,
        };
      }
    })
  );

  return {
    stockOverview,
    stocksSummaryWithRaitos,
    recommendationHistories,
    chartData,
    profitTrackingData,
    headers,
  };
};

export default function StockDetailPage({ loaderData }: Route.ComponentProps) {
  const {
    stockOverview,
    stocksSummaryWithRaitos,
    recommendationHistories,
    chartData,
    profitTrackingData,
    headers,
  } = loaderData;

  // 현재 가격 및 변동률 계산
  //const currentPrice = stockDetail?.daily_stocks?.[0]?.close || 0;
  //const changeAmount = currentPrice - recommendationPrice;
  //const changePercent =
  //  recommendationPrice > 0
  //    ? ((changeAmount / recommendationPrice) * 100).toFixed(2)
  //    : "0";
  // 차트 데이터 변환
  const transformedChartData =
    chartData?.map((item, index) => ({
      date: item.date,
      [stockOverview?.isu_abbrv || "Stock"]: item.close,
    })) || [];
  return (
    <div className="space-y-20">
      <Hero
        title={stockOverview?.isu_abbrv || "주식 상세 정보"}
        subtitle="추천된 종목에 대한 자세한 정보를 확인해 보세요."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className=" bg-white ">
          <StockChart
            title={`${stockOverview?.isu_abbrv || "주식"}`}
            description="최근 30일 주가 추이"
            chartData={transformedChartData}
            dataKey={stockOverview?.isu_abbrv || "Stock"}
            currentPrice={profitTrackingData[0]?.current_price || 0}
            changeAmount={profitTrackingData[0]?.profit_amount || 0}
            changePercent={Number(profitTrackingData[0]?.profit_rate) || 0}
            referencePrice={profitTrackingData[0]?.recommended_price || 0}
            recommendationDate={
              profitTrackingData[0]?.recommendation_date || ""
            }
          />
        </div>

        <div className=" bg-white rounded-lg shadow-md px-4 mt-5">
          <div className="space-y-4">
            <div className="text-sm text-gray-500">
              <span className="mr-5">
                시장 구분 : {stockOverview?.mkt_tp_nm || "N/A"}
              </span>
              <span className="mr-5">
                종목 코드 : {stockOverview?.isu_srt_cd || "N/A"}
              </span>
              <span className="mr-5">
                영문 이름 : {stockOverview?.isu_eng_nm || "N/A"}
              </span>
            </div>

            {/* Stock Information */}
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-3">종목 정보</h2>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium w-1/3">
                      Trailing PE
                    </TableCell>
                    <TableCell>
                      {(stocksSummaryWithRaitos as any)?.trailing_pe || "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Forward PE</TableCell>
                    <TableCell>
                      {(stocksSummaryWithRaitos as any)?.forward_pe || "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">PBR</TableCell>
                    <TableCell>
                      {(stocksSummaryWithRaitos as any)?.pbr || "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">PCR</TableCell>
                    <TableCell>
                      {(stocksSummaryWithRaitos as any)?.pcr || "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">PSR</TableCell>
                    <TableCell>
                      {(stocksSummaryWithRaitos as any)?.psr || "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">EV/EBITDA</TableCell>
                    <TableCell>
                      {(stocksSummaryWithRaitos as any)?.ev_to_ebitda || "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">EV/Revenue</TableCell>
                    <TableCell>
                      {(stocksSummaryWithRaitos as any)?.ev_to_revenue || "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ROE</TableCell>
                    <TableCell>
                      {(stocksSummaryWithRaitos as any)?.roe || "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ROA</TableCell>
                    <TableCell>
                      {(stocksSummaryWithRaitos as any)?.roa || "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">RPS</TableCell>
                    <TableCell>
                      {(stocksSummaryWithRaitos as any)?.rps || "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Beta</TableCell>
                    <TableCell>
                      {(stocksSummaryWithRaitos as any)?.beta || "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">액면가</TableCell>
                    <TableCell>
                      {(stockOverview as any)?.parval || "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">주식수</TableCell>
                    <TableCell>
                      {(stockOverview as any)?.list_shrs
                        ? `${(stockOverview as any).list_shrs}주`
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Profit Tracking */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Profit Tracking</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>추천일</TableHead>
                    <TableHead>추천 종가</TableHead>
                    <TableHead>현재 가격</TableHead>
                    <TableHead>수익률</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profitTrackingData?.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {data.recommendation_date
                          ? new Date(
                              data.recommendation_date
                            ).toLocaleDateString("ko-KR")
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {data.recommended_price.toLocaleString() || "N/A"}
                      </TableCell>
                      <TableCell>
                        {data.current_price.toLocaleString() || "N/A"}
                      </TableCell>
                      <TableCell
                        className={`${
                          Number(data.profit_rate) > 0
                            ? "text-green-600"
                            : Number(data.profit_rate) < 0
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {data.profit_rate ? `${data.profit_rate}%` : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                  {(!profitTrackingData || profitTrackingData.length === 0) && (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center text-gray-500"
                      >
                        수익률 추적 데이터가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
