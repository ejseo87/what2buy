export const TICKET_TYPES = [
  { label: "무료", value: "free" },
  { label: "유료", value: "premium" },
] as const;

export const TICKET_STATUS = [
  { label: "사용함", value: "used" },
  { label: "미사용", value: "not_used" },
  { label: "만료", value: "expired" },
] as const;
