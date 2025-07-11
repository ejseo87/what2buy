import { Link } from "react-router";
import { Badge } from "~/common/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/common/components/ui/card";

interface RecommendedStockCardProps {
  stockId: number;
  recommendationDate: string;
  stockName: string;
  description: string;
  referencPrice: number;
  currentPrice: number;
  changeRate: number;
  per: number;
  pbr: number;
}

export function RecommendedStockCard({
  stockId,
  recommendationDate,
  stockName,
  description,
  referencPrice,
  currentPrice,
  changeRate,
  per,
  pbr,
}: RecommendedStockCardProps) {
  return (
    <Link
      to={`/histories/stocks/${stockId}?recommendationDate=${recommendationDate}`}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{stockName}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <p className="text-lg">{description}</p>
          <div className="flex flex-row gap-10">
            <Badge variant="secondary" className="text-lg">
              PER : {per}
            </Badge>
            <Badge variant="secondary" className="text-lg">
              PBR : {pbr}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row gap-10 ">
          <span className="text-lg block">
            추천일 종가 : {referencPrice.toLocaleString()}원
          </span>
          <span className="text-lg text-red-700 font-bold block">
            최근 종가 : {currentPrice.toLocaleString()}원
          </span>
          <span className="text-lg font-bold block">
            현재 수익률 : {changeRate.toFixed(2)}%
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
