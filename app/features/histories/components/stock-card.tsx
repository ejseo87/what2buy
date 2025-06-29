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
  id: number;
  stockName: string;
  recommendationCount: number;
  recommendationDates: string[];
  description?: string;
}

export function StockCard({
  id,
  stockName,
  recommendationCount,
  recommendationDates,
  description = "자세한 내역을 보려면 카드를 클릭해주세요.",
}: StockCardProps) {
  return (
    <Link to={`/histories/stocks/${id}`}>
      <Card className="space-y-2 w-full max-w-screen-full">
        <CardHeader className="flex flex-row gap-5  justify-start items-center">
          <CardTitle className="text-xl font-bold">{stockName}</CardTitle>
          <Badge variant="outline" className="text-bold text-sm">
            {recommendationCount}회 추천됨
          </Badge>
          <CardDescription className="text-right text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row gap-5 items-center">
          {recommendationDates.map((date) => (
            <Badge key={date} variant="outline" className="text-lg py-2 px-5">
              {date}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
}
