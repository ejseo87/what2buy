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
import { makeSSRClient } from "~/supa-client";
import {
  getStockPerformanceChart,
  getStocksOverviewByStockCode,
  getStocksSummaryWithRaitosByStockCode,
  getRecommendationHistoriesByStockCode,
} from "../queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Stock Detail | What2Buy" },
    { name: "description", content: "Stock detail and profit tracking" },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { stockCode } = params;
  console.log("stock-page params=", params);
  // 주식 상세 정보 가져오기
  // stockoverview stocks_warnings stocks_summary_with_raitos
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
    }
  );

  // 차트 데이터 가져오기 (최근 30일)
  const chartData = await getStockPerformanceChart(client as any, {
    stockCode: stockCode,
    days: 30,
  });
  //console.log("chartData=", chartData);

  return {
    stockOverview,
    stocksSummaryWithRaitos,
    recommendationHistories,
    chartData,
    headers,
  };
};

export default function StockDetailPage({ loaderData }: Route.ComponentProps) {
  const {
    stockOverview,
    stocksSummaryWithRaitos,
    recommendationHistories,
    chartData,
    headers,
  } = loaderData;

  // 현재 가격 및 변동률 계산
/*   const currentPrice = stockDetail?.daily_stocks?.[0]?.close || 0;
  const changeAmount = currentPrice - recommendationPrice;
  const changePercent =
    recommendationPrice > 0
      ? ((changeAmount / recommendationPrice) * 100).toFixed(2)
      : "0"; */
  // 차트 데이터 변환
  const transformedChartData =
    chartData?.map((item, index) => ({
      date: item.date,
      [stockOverview?.isu_abbrv || "Stock"]: item.close,
    })) || [];
  return (
    <div className="space-y-10">
      <Hero
        title={stockOverview?.isu_abbrv || "주식 상세 정보"}
        subtitle="추천된 종목에 대한 자세한 정보를 확인해 보세요."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="md:col-span-1 ">
          <StockChart
            title={`${stockOverview?.isu_abbrv || "주식"} 주가`}
            description="최근 30일 주가 추이"
            chartData={transformedChartData}
            dataKey={stockOverview?.isu_abbrv || "Stock"}
            currentPrice={0}
            changeAmount={0}
            changePercent={0}
            referencePrice={0}
            recommendationDate={
              recommendationHistories[0]?.recommendation_date || ""
            }
          />
        </div>

        <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div className="text-sm text-gray-500">
              <span>시장 구분 : {stockOverview?.mkt_tp_nm || "N/A"}</span>
              <span>종목 코드 : {stockOverview?.isu_srt_cd || "N/A"}</span>
              <span>영문 이름 : {stockOverview?.isu_eng_abbrv || "N/A"}</span>
            </div>

            {/* Stock Information */}
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-3">종목 정보</h2>
              <ul className="space-y-1 text-sm">
                <li>
                  Trailing PE : {stocksSummaryWithRaitos?.trailing_pe || "N/A"}
                </li>
                <li>
                  Forward PE : {stocksSummaryWithRaitos?.forward_pe || "N/A"}
                </li>
                <li>PBR : {stocksSummaryWithRaitos?.pbr || "N/A"}</li>
                <li>PCR : {stocksSummaryWithRaitos?.pcr || "N/A"}</li>
                <li>PSR : {stocksSummaryWithRaitos?.psr || "N/A"}</li>
                <li>
                  EV/EBITDA : {stocksSummaryWithRaitos?.ev_to_ebitda || "N/A"}
                </li>
                <li>
                  EV/Revenue : {stocksSummaryWithRaitos?.ev_to_revenue || "N/A"}
                </li>
                <li>ROE : {stocksSummaryWithRaitos?.roe || "N/A"}</li>
                <li>ROA : {stocksSummaryWithRaitos?.roa || "N/A"}</li>
                <li>RPS : {stocksSummaryWithRaitos?.rps || "N/A"}</li>
                <li>Beta : {stocksSummaryWithRaitos?.beta || "N/A"}</li>
                <li>액면가 : {stockOverview?.par_val || "N/A"}</li>
                <li>
                  주식수 :
                  {stockOverview?.list_shrs
                    ? `${stockOverview.list_shrs}주`
                    : "N/A"}
                </li>
              </ul>
            </div>

            {/* Profit Tracking */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Profit Tracking</h2>
{/*               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>추천일</TableHead>
                    <TableHead>추천 종가</TableHead>
                    <TableHead>현재 가격</TableHead>
                    <TableHead>수익률</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profitTracking?.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {data.recommendation_date
                          ? new Date(
                              data.recommendation_date
                            ).toLocaleDateString("ko-KR")
                          : "N/A"}
                      </TableCell>
                      <TableCell>{data.recommended_price || "N/A"}</TableCell>
                      <TableCell>{currentPrice || "N/A"}</TableCell>
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
                  {(!profitTracking || profitTracking.length === 0) && (
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
              </Table> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
