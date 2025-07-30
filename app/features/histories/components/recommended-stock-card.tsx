import {
  ArrowDownIcon,
  ArrowUpIcon,
  CircleDot,
  CircleDotIcon,
  CircleIcon,
  CircleSmallIcon,
  DotIcon,
} from "lucide-react";
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
  stockCode: string;
  recommendationDate: string;
  stockName: string;
  description: string;
  referencPrice: number;
  currentPrice: number;
  changeRate: number;
  per: number;
  pbr: number;
  roe: number;
  ev_to_ebitda: number;
}

export function RecommendedStockCard({
  stockCode,
  recommendationDate,
  stockName,
  description,
  referencPrice,
  currentPrice,
  changeRate,
  per,
  pbr,
  roe,
  ev_to_ebitda,
}: RecommendedStockCardProps) {
  return (
    <Link
      to={`/histories/stocks/${stockCode}?recommendationDate=${recommendationDate}`}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-600">
            {stockName} ({stockCode})
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <p className="text-lg">{description}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Badge variant="secondary" className="text-lg">
              PER(주가수익률) {per.toFixed(2)}%
            </Badge>
            <Badge variant="secondary" className="text-lg">
              PBR(주가순자산비율) {pbr.toFixed(2)}%
            </Badge>
            <Badge variant="secondary" className="text-lg">
              ROE(자기자본이익률) {(roe * 100).toFixed(2)}%
            </Badge>
            <Badge variant="secondary" className="text-lg">
              EV/EBITDA(기업가차/상각전영업이익) {ev_to_ebitda.toFixed(2)}배
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="grid md:grid-cols-2 lg:grid-cols-3  gap-4 ">
          <span className="text-lg block">
            추천일 마감가 {referencPrice.toLocaleString()}원
          </span>
          <span className="text-lg font-bold  flex items-center">
            현재가{" "}
            {currentPrice > referencPrice ? (
              <ArrowUpIcon className="w-4 h-4 text-red-600" />
            ) : currentPrice === referencPrice ? (
              <CircleSmallIcon className="w-4 h-4 text-gray-600 fill-gray-600" />
            ) : (
              <ArrowDownIcon className="w-4 h-4 text-blue-600" />
            )}
            <span
              className={
                currentPrice > referencPrice
                  ? "text-red-600"
                  : currentPrice === referencPrice
                  ? "text-gray-600"
                  : "text-blue-600"
              }
            >
              {currentPrice.toLocaleString()}원 (
              {(currentPrice - referencPrice).toLocaleString()}원)
            </span>
          </span>

          <span
            className={
              currentPrice > referencPrice
                ? "text-red-600"
                : currentPrice === referencPrice
                ? "text-gray-600"
                : "text-blue-600"
            }
          >
            수익률 {changeRate.toFixed(2)}%
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
