import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/stock-page";
import { StockChart } from "~/common/components/stock-chart";
import { samsungData } from "~/common/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/common/components/ui/table";

const profitTrackingData = [
  {
    date: "2025-06-01",
    recommendedPrice: 100000,
    currentPrice: 105000,
    profitRate: 5,
  },
  {
    date: "2025-06-02",
    recommendedPrice: 101000,
    currentPrice: 106000,
    profitRate: 5,
  },
  {
    date: "2025-06-03",
    recommendedPrice: 101000,
    currentPrice: 106000,
    profitRate: 5,
  },
];

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Stock Detail | What2Buy" },
    { name: "description", content: "Stock detail and profit tracking" },
  ];
};

export default function StockDetailPage({
  params: { stockId },
}: Route.ComponentProps) {
  return (
    <div className="space-y-10">
      <Hero
        title={`삼성전자`}
        subtitle="추천된 주식 종목에 대한 자세한 내역을 확인해보세요."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="md:col-span-1">
          <h3 className="text-2xl font-bold">최근 주가 추이</h3>
          <StockChart
            title="삼성전자 주가"
            description="5/27 ~ 6/27 (1개월)"
            chartData={samsungData}
            dataKey="삼성전자"
            currentPrice="60,700원"
            changeAmount="+2000원"
            changePercent="+8.3%"
            referencePrice="57,700원"
          />
        </div>

        <div className="md:col-span-1bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Stock ID: {stockId}</p>

            {/* Stock Information */}
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-3">Stock Information</h2>
              <p className="text-gray-600">Stock details</p>
              <ul>
                <li> PER : 10.5</li>
                <li> PBR : 1.2</li>
                <li> ROE : 15.2%</li>
                <li> EPS : 1,000원</li>
                <li> BPS : 10,000원</li>
                <li> 주당 배당금 : 100원</li>
                <li> 주당 순이익 : 1,000원</li>
                <li> 주당 주식 수 : 100주</li>
                <li> 주당 주식 수 : 100주</li>
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
                  {profitTrackingData.map((data) => (
                    <TableRow key={data.date}>
                      <TableCell>{data.date}</TableCell>
                      <TableCell>{data.recommendedPrice}</TableCell>
                      <TableCell>{data.currentPrice}</TableCell>
                      <TableCell>{data.profitRate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
