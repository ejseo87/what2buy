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
  getStockDetail,
  getProfitTrackingByStockId,
  getStockPerformanceChart,
} from "../queries";
import { a_profile_id } from "~/common/constants";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Stock Detail | What2Buy" },
    { name: "description", content: "Stock detail and profit tracking" },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { stockId } = params;
  //console.log("stock-page params=", params);
  // 주식 상세 정보 가져오기
  const stockDetail = await getStockDetail(client as any, {
    stockId: Number(stockId),
  });
  //console.log("stockDetail=", stockDetail);
  // 수익률 추적 정보 가져오기
  const profitTracking = await getProfitTrackingByStockId(client as any, {
    stockId: Number(stockId),
    profileId: a_profile_id,
  });
  //console.log("profitTracking=", profitTracking);
  const recommendationDate =
    profitTracking[profitTracking.length - 1]?.recommended_price_date || "";
  //console.log("recommendationDate=", recommendationDate);
  const recommendationPrice =
    profitTracking[profitTracking.length - 1]?.recommended_price || 0;
  //console.log("recommendationPrice=", recommendationPrice);

  // 차트 데이터 가져오기 (최근 30일)
  const chartData = await getStockPerformanceChart(client as any, {
    stockId: Number(stockId),
    days: 30,
  });
  //console.log("chartData=", chartData);
  // 차트 데이터 변환
  const transformedChartData =
    chartData?.map((item, index) => ({
      date: item.date,
      [stockDetail?.stock_name || "Stock"]: item.close,
    })) || [];
  return {
    stockDetail,
    profitTracking,
    transformedChartData,
    recommendationDate,
    recommendationPrice,
    headers,
  };
};

export default function StockDetailPage({ loaderData }: Route.ComponentProps) {
  const {
    stockDetail,
    profitTracking,
    transformedChartData,
    recommendationDate,
    recommendationPrice,
  } = loaderData;

  // 현재 가격 및 변동률 계산
  const currentPrice = stockDetail?.daily_stocks?.[0]?.close || 0;
  const changeAmount = currentPrice - recommendationPrice;
  const changePercent =
    recommendationPrice > 0
      ? ((changeAmount / recommendationPrice) * 100).toFixed(2)
      : "0";

  return (
    <div className="space-y-10">
      <Hero
        title={stockDetail?.stock_name || "주식 상세"}
        subtitle="추천된 주식 종목에 대한 자세한 내역을 확인해보세요."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="md:col-span-1 ">
          <StockChart
            title={`${stockDetail?.stock_name || "주식"} 주가`}
            description="최근 30일 주가 추이"
            chartData={transformedChartData}
            dataKey={stockDetail?.stock_name || "Stock"}
            currentPrice={currentPrice}
            changeAmount={changeAmount}
            changePercent={Number(changePercent)}
            referencePrice={recommendationPrice}
            recommendationDate={recommendationDate || ""}
          />
        </div>

        <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              종목 코드 : {stockDetail?.stock_code || "N/A"}
            </p>

            {/* Stock Information */}
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-3">종목 정보</h2>
              <ul className="space-y-1 text-sm">
                <li>PER : {stockDetail?.per || "N/A"}</li>
                <li>PBR : {stockDetail?.pbr || "N/A"}</li>
                <li>
                  ROE : {stockDetail?.roe ? `${stockDetail.roe}%` : "N/A"}
                </li>
                <li>
                  EPS : {stockDetail?.eps ? `${stockDetail.eps}원` : "N/A"}
                </li>
                <li>
                  BPS : {stockDetail?.bps ? `${stockDetail.bps}원` : "N/A"}
                </li>
                <li>
                  주당 배당금 :{" "}
                  {stockDetail?.dividend_per_share
                    ? `${stockDetail.dividend_per_share}원`
                    : "N/A"}
                </li>
                <li>
                  주식 수 :{" "}
                  {stockDetail?.stock_count
                    ? `${stockDetail.stock_count}주`
                    : "N/A"}
                </li>
              </ul>
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
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
