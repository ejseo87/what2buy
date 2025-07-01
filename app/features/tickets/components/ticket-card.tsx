import { Badge } from "~/common/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

interface TicketCardProps {
  title: string;
  type: string;
  duration: string;
  status: string;
  usedDate: string;
}

export function TicketCard({
  title,
  type,
  duration,
  status,
  usedDate,
}: TicketCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div
              className={`text-3xl font-bold ${
                status === "사용함" ? "" : "text-primary"
              } px-10`}
            >
              {type} 사용권
            </div>
            <Badge
              className={`text-xl text-bold ${
                status === "사용함" ? "" : "text-primary"
              }`}
              variant="secondary"
            >
              {duration}
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-row gap-10 justify-start">
        <Badge variant="secondary">{status}</Badge>
        {status === "사용함" && <span>{usedDate}</span>}
      </CardFooter>
    </Card>
  );
}
