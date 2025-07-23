DROP VIEW IF EXISTS get_good_stocks_list_view;


CREATE OR REPLACE VIEW get_good_stocks_list_view 
WITH (security_invoker = on)
AS
SELECT 
  ss.isu_srt_cd as stock_code,
  so.mkt_tp_nm as market_type,
  ss.isu_abbrv as korean_name,
  so.isu_eng_nm as english_name,
  ss.pbr as price_to_book_ratio,
  ss.trailing_pe as trailing_price_to_earnings_ratio,
  ss.forward_pe as forward_price_to_earnings_ratio,
  ss.ev_to_ebitda,
  ss.ev_to_revenue,
  ss.roe as return_on_equity,
  ss.roa as return_on_assets,
  ss.rps as revenue_per_share,
  ss.recommendation_key as analyst_recommendation,
  so.parval as par_value,
  so.list_shrs as list_shares
FROM stocks_summary_with_ratios ss
LEFT JOIN stocks_overview so ON ss.isu_srt_cd = so.isu_srt_cd
WHERE ss.pbr > 0 
AND ss.forward_pe > 5
AND ss.trailing_pe > 5
AND ss.ev_to_ebitda > 0
AND ss.roe > 0.05
AND ss.recommendation_key = 'strong_buy';


select COUNT(*) from get_good_stocks_list_view;

select * from get_good_stocks_list_view;