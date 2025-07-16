export const STOCK_OVERVIEW_FIELDS = [
  { label: "표준코드", value: "isu_cd" },
  { label: "단축코드", value: "isu_srt_cd" },
  { label: "한글 종목명", value: "isu_nm" },
  { label: "한글 종목약명", value: "isu_abbrv" },
  { label: "영문 종목명", value: "isu_eng_nm" },
  { label: "상장일", value: "list_dd" },
  { label: "시장구분", value: "mkt_tp_nm" },
  { label: "증권구분", value: "secugrp_nm" },
  { label: "소속부", value: "sect_tp_nm" },
  { label: "주식종류", value: "kind_stkcert_tp_nm" },
  { label: "액면가", value: "parval" },
  { label: "상장주식수", value: "list_shrs" },
] as const;

// KRX 지정/경보성 상태(한국어 라벨 ↔ 내부 코드)
// 필요에 따라 value 값을 DB enum / API 파라미터명과 맞춰 조정하세요.
export const KRX_STATUS_FIELDS = [
  { label: "매매거래정지", value: "trading_suspension" },
  { label: "정리매매 종목", value: "delisting_liquidation" },
  { label: "관리종목", value: "administrative_issue" },
  { label: "투자주의환기종목", value: "investment_caution_realert" },
  { label: "불성실공시법인", value: "unfaithful_disclosure" },
  {
    label: "단일가매매대상 초저유동성종목",
    value: "super_low_liquidity_single_price",
  },
  { label: "상장주식수 부족 우선주", value: "insufficient_listed_shares_pref" },
  { label: "단기과열종목", value: "short_term_overheated" },
  { label: "투자주의종목", value: "investment_caution" },
  { label: "투자경고종목", value: "investment_warning" },
  { label: "투자위험종목", value: "investment_risk" },
] as const;

/* 

"isu_srt_cd","isu_abbrv","trading_suspension","delisting_liquidation","administrative_issue","investment_caution_realert","unfaithful_disclosure","super_low_liquidity_single_price","insufficient_listed_shares_pref","short_term_overheated","investment_caution","investment_warning","investment_risk" */
