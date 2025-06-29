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
      <Card>
        <CardHeader>
          <CardTitle>{date}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row gap-5">
          {stocks.map((stock) => (
            <Badge key={stock} variant="outline" className="text-xl">
              {stock}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
}
