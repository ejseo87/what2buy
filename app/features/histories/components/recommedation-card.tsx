import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { Link } from "react-router";

interface RecommendationCardProps {
  id: number;
  date: string;
  description: string;
  stocks: string[];
}

export function RecommendationCard({
  id,
  date,
  description,
  stocks,
}: RecommendationCardProps) {
  return (
    <Link to={`/histories/${id}`} className="block">
      <Card className="flex flex-col justify-between h-full">
        <CardHeader>
          <CardTitle>{date}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row justify-between gap-3">
          {stocks.map((stock) => (
            <Badge key={stock} variant="secondary" className="text-sm">
              {stock}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
}
