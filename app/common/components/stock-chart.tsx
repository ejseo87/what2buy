"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

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
import { Separator } from "./ui/separator";

export const description = "A stock price line chart";

interface StockChartProps {
  title: string;
  description: string;
  chartData: Array<{ date: string; [key: string]: number | string }>;
  dataKey: string;
  currentPrice: number;
  changeAmount: number;
  changePercent: string;
  referencePrice: number;
  recommendationDate: string;
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
  recommendationDate,
}: StockChartProps) {
  // Create a safe key for CSS variable
  const safeDataKey = "stock";
  const chartConfig = {
    [safeDataKey]: {
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
              hide={true}
              dataKey={dataKey}
              domain={["dataMin-2000", "dataMax+2000"]}
            />
            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent
                  hideLabel={false}
                  labelFormatter={(label) => `날짜: ${label}`}
                  formatter={(value, name) => [
                    `${Number(value).toLocaleString()}원 ${name}`,
                  ]}
                />
              }
            />
            <Line
              dataKey={dataKey}
              type="linear"
              stroke={`var(--color-${safeDataKey})`}
              strokeWidth={2}
              dot={false}
            />
            <ReferenceLine
              x={recommendationDate}
              stroke="#ff6b6b"
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{ value: "추천일", position: "top" }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex flex-row gap-2 leading-none  font-bold">
          추천일 종가 대비 {changeAmount.toLocaleString()}원 ({changePercent}%)
          {parseFloat(changePercent) > 0 ? (
            <TrendingUp className="size-5 text-green-500" />
          ) : (
            <TrendingDown className="size-5 text-red-500" />
          )}
        </div>
        <div className="flex flex-row justify-between w-full text-muted-foreground">
          <span className="block">
            추천일 종가: {referencePrice.toLocaleString()}원
          </span>
          <span className="block">
            현재가: {currentPrice.toLocaleString()}원
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
