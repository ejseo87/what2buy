import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/common/components/ui/tooltip";
import { Info } from "lucide-react";

// 주식 지표 설명 데이터
const stockIndicatorDescriptions = {
  "Trailing PE": {
    title: "Trailing PE (후행 PER)",
    description:
      "주가수익비율. 현재 주가를 지난 12개월 주당순이익으로 나눈 값으로, 주식이 얼마나 비싸게 거래되고 있는지를 나타냅니다. 낮을수록 저평가된 것으로 해석됩니다.",
  },
  "Forward PE": {
    title: "Forward PE (선행 PER)",
    description:
      "예상 주가수익비율. 현재 주가를 향후 12개월 예상 주당순이익으로 나눈 값으로, 미래 수익성 기준으로 주식의 가치를 평가합니다.",
  },
  PBR: {
    title: "PBR (주가순자산비율)",
    description:
      "Price to Book Ratio. 현재 주가를 주당순자산으로 나눈 값으로, 기업의 자산 대비 주가가 얼마나 비싼지를 나타냅니다. 1 이하면 순자산보다 싸게 거래되는 것입니다.",
  },
  PCR: {
    title: "PCR (주가현금흐름비율)",
    description:
      "Price to Cash Flow Ratio. 현재 주가를 주당현금흐름으로 나눈 값으로, 기업이 창출하는 현금흐름 대비 주가의 적정성을 평가합니다.",
  },
  PSR: {
    title: "PSR (주가매출액비율)",
    description:
      "Price to Sales Ratio. 현재 주가를 주당매출액으로 나눈 값으로, 매출 대비 주가가 적정한지를 평가합니다. 적자 기업도 평가할 수 있는 지표입니다.",
  },
  "EV/EBITDA": {
    title: "EV/EBITDA",
    description:
      "Enterprise Value to EBITDA. 기업가치를 세전이익에 상각비를 더한 값으로 나눈 비율로, 기업의 현금 창출 능력 대비 가치를 평가합니다.",
  },
  "EV/Revenue": {
    title: "EV/Revenue",
    description:
      "기업가치를 매출액으로 나눈 비율로, 매출 대비 기업의 전체 가치를 평가하는 지표입니다.",
  },
  ROE: {
    title: "ROE (자기자본이익률)",
    description:
      "Return on Equity. 당기순이익을 자기자본으로 나눈 값으로, 주주가 투자한 자본 대비 얼마나 효율적으로 이익을 창출하는지를 나타냅니다.",
  },
  ROA: {
    title: "ROA (총자산이익률)",
    description:
      "Return on Assets. 당기순이익을 총자산으로 나눈 값으로, 기업이 보유한 자산을 얼마나 효율적으로 활용하여 이익을 창출하는지를 나타냅니다.",
  },
  RPS: {
    title: "RPS (주당매출액)",
    description:
      "Revenue Per Share. 매출액을 총 발행주식수로 나눈 값으로, 주당 얼마의 매출을 올리고 있는지를 나타냅니다.",
  },
  Beta: {
    title: "베타 (Beta)",
    description:
      "주식의 시장 대비 변동성을 나타내는 지표입니다. 1보다 크면 시장보다 변동성이 크고, 1보다 작으면 시장보다 안정적입니다.",
  },
};

// Tooltip이 적용된 지표 라벨 컴포넌트
export default function IndicatorLabel({
  indicator,
  children,
}: {
  indicator: string;
  children: React.ReactNode;
}) {
  const description =
    stockIndicatorDescriptions[
      indicator as keyof typeof stockIndicatorDescriptions
    ];

  if (!description) {
    return <span className="font-medium">{children}</span>;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="font-medium text-left hover:text-blue-600 transition-colors cursor-help flex items-center gap-1">
          {children}
          <Info className="h-3 w-3 text-gray-400" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <div className="space-y-1">
          <p className="font-semibold text-sm">{description.title}</p>
          <p className="text-xs text-gray-600">{description.description}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
