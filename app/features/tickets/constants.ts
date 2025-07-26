// For schema usage (arrays)
export const TICKET_TYPES = [
  { label: "무료", value: "free" },
  { label: "프리미엄", value: "premium" },
  { label: "무제한", value: "unlimited" },
] as const;

export const TICKET_STATUS = [
  { label: "사용 가능", value: "available" },
  { label: "사용됨", value: "used" },
  { label: "만료됨", value: "expired" },
] as const;

// For component usage (object)
export const TICKET_TYPE_MAP = {
  PREMIUM: "premium",
  //UNLIMITED: "unlimited",
} as const;

export const TICKET_PLANS = [
  {
    id: "premium",
    type: TICKET_TYPE_MAP.PREMIUM,
    title: "유료 추천권",
    description: "인공지능이 주식을 추천해드립니다.",
    price: 500,
    duration: "1개월",
  },
  //{
  //  id: "unlimited",
  //  type: TICKET_TYPE_MAP.UNLIMITED,
  //  title: "1개월 무제한 추천권",
  //  description: "한 달간 무제한으로 주식 추천 서비스를 이용할 수 있습니다.",
  //  price: 19.99,
  //  duration: "1개월",
  //},
] as const;
