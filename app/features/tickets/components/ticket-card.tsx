import { Badge } from "~/common/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Separator } from "~/common/components/ui/separator";

interface TicketCardProps {
  title: number;
  type: string;
  duration_start: string;
  duration_end: string;
  status: string;
  usedDate: string;
}

export function TicketCard({
  title,
  type,
  duration_start,
  duration_end,
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
              className={`text-2xl sm:text-3xl font-bold ${
                status === "used" ? "" : "text-primary"
              } px-4 sm:px-10`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span>{type === "free" ? "무료" : "유료"} 사용권</span>
                <div className="flex items-center">
                  <span className="text-muted-foreground text-sm sm:text-lg text-light mx-2">
                    {" "}
                    |{" "}
                  </span>
                  <span>{status === "used" ? "사용함" : "미사용"}</span>
                </div>
              </div>
            </div>
            <Badge
              className={`text-sm sm:text-xl text-bold ${
                status === "used" ? "" : "text-primary"
              }`}
              variant="secondary"
            >
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span>{duration_start}</span>
                <span className="hidden sm:inline"> ~ </span>
                <span className="sm:hidden">~</span>
                <span>{duration_end}</span>
              </div>
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-10 justify-start">
        <Badge variant="secondary">{status}</Badge>
        {status === "used" && <span>{usedDate}</span>}
      </CardFooter>
    </Card>
  );
}
