import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { Link } from "react-router";

interface StockCardProps {
  stockId: number;
  stockName: string;
  stockCode: string;
  recommendationCount: number;
  recommendationReturns: Array<{
    date: string;
    profitRate: number;
    profitAmount: number;
  }>;
  trailingPer: number;
  forwardPer: number;
  pbr: number;
  roe: number;
}

export function StockCard({
  stockId,
  stockName,
  stockCode,
  recommendationCount,
  recommendationReturns,
  trailingPer,
  forwardPer,
  pbr,
  roe,
}: StockCardProps) {
  // 날짜를 짧은 형식으로 포맷팅
  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  return (
    <Link to={`/histories/stocks/${stockId}`} className="block">
      <Card className="flex flex-col justify-between bg-transparent hover:bg-card/50 transition-colors h-full">
        <CardHeader className="flex flex-col gap-5  justify-start">
          <CardTitle className="flex flex-row justify-between text-xl font-bold">
            <span className="block">
              {stockName} ({stockCode})
            </span>
            <Badge variant="outline" className="text-bold text-sm ml-10">
              {recommendationCount}회 추천됨
            </Badge>
          </CardTitle>

          <CardDescription className="flex flex-row ">
            <span className="text-sm mr-0.5 text-gray-500">후행PER </span>
            <span className="text-sm font-bold mr-5 text-green-500">
              {trailingPer?.toFixed(2)}
            </span>

            <span className="text-sm mr-0.5 text-gray-500">선행 PER </span>
            <span className="text-sm font-bold mr-5 text-green-500">
              {forwardPer?.toFixed(2)}
            </span>

            <span className="text-sm mr-0.5 text-gray-500">PBR </span>
            <span className="text-sm font-bold mr-5 text-green-500">
              {pbr?.toFixed(2)}
            </span>

            <span className="text-sm mr-0.5 text-gray-500">ROE </span>
            <span className="text-sm font-bold mr-5 text-green-500">
              {roe?.toFixed(2)}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="text-sm text-gray-600 font-medium">
            추천일별 수익률 (높은 순)
          </div>
          <div className="flex flex-row gap-2 flex-wrap">
            {recommendationReturns.map((item) => (
              <Badge
                key={item.date}
                variant={
                  item.profitRate > 0
                    ? "destructive" // 빨간색 (상승)
                    : item.profitRate < 0
                    ? "default" // 파란색 (하락)
                    : "secondary" // 회색 (보합)
                }
                className={`text-xs py-1 px-2 flex flex-col items-center ${
                  item.profitRate < 0
                    ? "bg-blue-500 text-white hover:bg-blue-600" // 파란색 강제 적용
                    : ""
                }`}
              >
                <span>{formatShortDate(item.date)}</span>
                <span className="font-bold">
                  {item.profitRate > 0 ? "+" : item.profitRate < 0 ? "" : ""}
                  {item.profitRate.toFixed(2)}%
                </span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
