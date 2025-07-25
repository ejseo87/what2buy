DROP VIEW IF EXISTS get_stocks_list_view;

CREATE OR REPLACE VIEW get_stocks_list_view 
AS 
SELECT 
  ss.isu_srt_cd as stock_code,
  ss.isu_abbrv as korean_name,
  so.isu_eng_nm as english_name,
  so.mkt_tp_nm as market_type,
  ss.pbr as price_to_book_ratio,
  ss.trailing_pe as trailing_price_to_earnings_ratio,
  ss.forward_pe as forward_price_to_earnings_ratio,
  ss.ev_to_ebitda,
  ss.ev_to_revenue,
  ss.roe as return_on_equity,
  ss.roa as return_on_assets,
  ss.rps as revenue_per_share,
  ss.recommendation_key as analyst_recommendation,
  rh_grouped.profile_id,
  rh_grouped.latest_recommendation_date as recommendation_date,
  rh_grouped.latest_recommendation_id as recommendation_id,
  rh_grouped.recommendation_count,
  rh_grouped.recommendation_dates
FROM (
  SELECT 
    stock_codes.stock_code,
    rh.profile_id,
    MAX(rh.recommendation_date) as latest_recommendation_date,
    MAX(rh.recommendation_id) as latest_recommendation_id,
    COUNT(*) as recommendation_count,
    ARRAY_AGG(rh.recommendation_date ORDER BY rh.recommendation_date DESC) as recommendation_dates
  FROM public.recommendation_histories rh
  CROSS JOIN LATERAL (
    SELECT unnest(ARRAY[rh.stock1_code, rh.stock2_code, rh.stock3_code]) as stock_code
  ) stock_codes
  WHERE stock_codes.stock_code IS NOT NULL
  GROUP BY stock_codes.stock_code, rh.profile_id
) rh_grouped
JOIN stocks_summary_with_ratios ss ON ss.isu_srt_cd = rh_grouped.stock_code
JOIN stocks_overview so ON so.isu_srt_cd = ss.isu_srt_cd
ORDER BY rh_grouped.profile_id, rh_grouped.latest_recommendation_date DESC;

SELECT * FROM get_stocks_list_view;