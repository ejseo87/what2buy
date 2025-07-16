DROP VIEW IF EXISTS get_no_warging_stock_list_view;



CREATE OR REPLACE VIEW get_no_warging_stock_list_view 
WITH (security_invoker = on)
AS
SELECT DISTINCT
  so.isu_srt_cd,
  so.isu_abbrv,
  so.mkt_tp_nm,
  so.secugrp_nm,
  so.kind_stkcert_tp_nm,
  so.parval,
  so.list_shrs
FROM stocks_overview so
LEFT JOIN stocks_wargings sw ON so.isu_srt_cd = sw.isu_srt_cd
where (sw.trading_suspension IS NULL OR sw.trading_suspension = 'X') AND
  (sw.delisting_liquidation IS NULL OR sw.delisting_liquidation = 'X') AND
  (sw.administrative_issue IS NULL OR sw.administrative_issue = 'X') AND
  (sw.investment_caution_realert IS NULL OR sw.investment_caution_realert = 'X') AND
  (sw.unfaithful_disclosure IS NULL OR sw.unfaithful_disclosure = 'X') AND
  (sw.super_low_liquidity_single_price IS NULL OR sw.super_low_liquidity_single_price = 'X') AND
  (sw.insufficient_listed_shares_pref IS NULL OR sw.insufficient_listed_shares_pref = 'X') AND
  (sw.short_term_overheated IS NULL OR sw.short_term_overheated = 'X') AND
  (sw.investment_caution IS NULL OR sw.investment_caution = 'X') AND
  (sw.investment_warning IS NULL OR sw.investment_warning = 'X') AND
  (sw.investment_risk IS NULL OR sw.investment_risk = 'X');





select * from get_no_warging_stock_list_view;

