"use client";

import { MoveRightIcon, TrendingDown, TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
  ResponsiveContainer,
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

export const description = "A stock price line chart";

interface StockChartProps {
  title: string;
  description: string;
  dataKey: string;
  chartData: Array<{ date: string; [key: string]: number | string }>;
  recommendationDate: string;
  currentPrice: number | null;
  referencePrice: number | null;
  changeAmount: number;
  changePercent: number;
}
export function StockChart({
  title,
  description,
  dataKey,
  chartData,
  recommendationDate,
  currentPrice,
  referencePrice,
  changeAmount,
  changePercent,
}: StockChartProps) {
  //console.log("StockChart:changePercent", changePercent);
  //console.log("StockChart:changeAmount", changeAmount);
  //console.log("StockChart:chartData", chartData);
  console.log("StockChart:recommendationDate", recommendationDate);
  // Create a safe key for CSS variable
  const safeDataKey = "stock";
  const chartConfig = {
    [dataKey]: {
      label: "close",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;
  //console.log("StockChart:chartConfig", chartConfig);
  //console.log("StockChart:line stroke", `var(--color-${safeDataKey})`);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                hide={true}
                tickLine={false}
                axisLine={false}
                tickMargin={2}
                tickFormatter={(value) =>
                  `${value.slice(5, 7)}/${value.slice(8, 10)}`
                }
                className="text-xs"
              />
              <YAxis
                hide={true}
                dataKey={dataKey}
                domain={["dataMin", "dataMax"]}
                tickLine={false}
                axisLine={false}
                tickMargin={2}
                tickFormatter={(value) => `${Number(value).toLocaleString()}원`}
                className="text-xs"
              />
              <ChartTooltip
                cursor={true}
                content={
                  <ChartTooltipContent
                    hideLabel={false}
                    labelFormatter={(label) => `${label} 종가`}
                    formatter={(value, name) => [
                      `${name}: ${Number(value).toLocaleString()}원`,
                    ]}
                  />
                }
              />
              <Line
                dataKey={dataKey}
                type="linear"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
              <ReferenceLine
                x={recommendationDate ? recommendationDate : ""}
                stroke="#ff6b6b"
                strokeDasharray="5 5"
                strokeWidth={2}
                label={{ value: "추천일", position: "right" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex flex-row gap-2 leading-none  font-bold">
          추천일 종가 대비 {(changeAmount ?? 0).toLocaleString()}원 (
          {changePercent ?? "0"}%)
          {changePercent > 0 ? (
            <TrendingUp className="size-5 text-green-500" />
          ) : changePercent === 0 ? (
            <MoveRightIcon className="size-5 text-grey-500" />
          ) : (
            <TrendingDown className="size-5 text-red-500" />
          )}
        </div>
        <div className="flex flex-row justify-between w-full text-muted-foreground">
          <span className="block">
            추천일 종가: {(referencePrice ?? 0).toLocaleString()}원
          </span>
          <span className="block">
            현재가: {(currentPrice ?? 0).toLocaleString()}원
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
