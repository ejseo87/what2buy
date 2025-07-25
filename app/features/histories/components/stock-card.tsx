import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { Link } from "react-router";
import { formatKoreanDate } from "~/common/utils";

interface StockCardProps {
  stockId: number;
  stockName: string;
  stockCode: string;
  recommendationCount: number;
  recommendationDates: string[];
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
  recommendationDates,
  trailingPer,
  forwardPer,
  pbr,
  roe,
}: StockCardProps) {
  return (
    <Link to={`/histories/stocks/${stockId}`} className="block">
      <Card className="flex flex-col justify-between bg-transparent hover:bg-card/50 transition-colors h-full">
        <CardHeader className="flex flex-col gap-5  justify-start">
          <CardTitle className="text-xl font-bold">
            {stockName} ({stockCode})
            <Badge className="text-bold text-sm ml-10">
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
        <CardContent className="flex flex-row gap-5 items-center">
          {recommendationDates.map((date) => (
            <Badge key={date} variant="secondary" className="text-sm py-2 px-2">
              {formatKoreanDate(date)}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
}
