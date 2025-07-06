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
  per: number;
  pbr: number;
  roe: number;
}

export function StockCard({
  stockId,
  stockName,
  stockCode,
  recommendationCount,
  recommendationDates,
  per,
  pbr,
  roe,
}: StockCardProps) {
  return (
    <Link to={`/histories/stocks/${stockId}`}>
      <Card className="space-y-2 w-full max-w-screen-full">
        <CardHeader className="flex flex-row gap-5  justify-start items-center">
          <CardTitle className="text-xl font-bold">
            {stockName} ({stockCode})
          </CardTitle>
          <Badge className="text-bold text-lg">
            {recommendationCount}회 추천됨
          </Badge>
          <CardDescription className="text-sm">
            <span className="text-lg py-2 px-5">PER : {per}</span>
            <span className="text-lg py-2 px-5">PBR : {pbr}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row gap-5 items-center">
          {recommendationDates.map((date) => (
            <Badge key={date} variant="secondary" className="text-lg py-2 px-5">
              {formatKoreanDate(date)}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
}
