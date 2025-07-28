import { cn } from "~/lib/utils";

interface ServiceIntroMessageProps {
  addedClassName?: string;
}

export default function ServiceIntroMessage(
  { addedClassName }: ServiceIntroMessageProps) {
  return (
    <p className={cn("text-sm text-muted-foreground mx-auto text-justify", addedClassName)}>
      What2Buy는 복잡한 주식 시장 데이터 분석을 통해 사용자에게 유망한 투자
      종목을 추천해주는 인공지능(AI) 기반 서비스입니다. 저희 AI는 PER, PBR,
      ROE와 같은 주요 재무 지표와 시장 동향, 기업 성장성 등을 종합적으로
      분석하여 저평가된 우량주나 성장 가능성이 높은 주식을 발굴합니다. 기술적
      분석보다는 기업의 내재 가치에 중점을 둔 추천을 제공합니다.
    </p>
  );
}
