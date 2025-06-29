"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

export const description = "A stock price line chart";

interface StockChartProps {
  title: string;
  description: string;
  chartData: Array<{ date: string; [key: string]: number | string }>;
  dataKey: string;
  currentPrice: string;
  changeAmount: string;
  changePercent: string;
  referencePrice: string;
}
export function StockChart({
  title,
  description,
  chartData,
  dataKey,
  currentPrice,
  changeAmount,
  changePercent,
  referencePrice,
}: StockChartProps) {
  const chartConfig = {
    [dataKey]: {
      label: dataKey,
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              hide={true}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis
              dataKey={dataKey}
              domain={["dataMin-2000", "dataMax+2000"]}
              hide={true}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey={dataKey}
              type="linear"
              stroke={`var(--color-${dataKey})`}
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          추천일 종가 대비 {changeAmount} ({changePercent}){" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          현재가: {currentPrice} | 추천일 종가: {referencePrice}
        </div>
      </CardFooter>
    </Card>
  );
}
