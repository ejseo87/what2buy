import { Badge } from "~/common/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/common/components/ui/card";

interface RecommendedStockCardProps {
  stockName: string;
  description: string;
  referencPrice: number;
  currentPrice: number;
  changeRate: number;
  per: number;
  pbr:number;
}

export function RecommendedStockCard({ stockName, description, referencPrice, currentPrice, changeRate, per, pbr }: RecommendedStockCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{stockName}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-lg">{description}</p>
        <div className="flex flex-row gap-10">
          <Badge variant="outline" className="text-lg">
            PER : {per}
          </Badge>
          <Badge variant="outline" className="text-lg">
            PBR : {pbr}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-10 ">
        <span className="text-lg block">추천일 종가 : {referencPrice}</span>
        <span className="text-lg text-red-700 font-bold block">
          현재가 : {currentPrice}
        </span>
        <span className="text-lg font-bold block">현재 수익률 : {changeRate}</span>
      </CardFooter>
    </Card>
  );
}
