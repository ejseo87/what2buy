DROP VIEW IF EXISTS recommendation_stocks_view;


CREATE OR REPLACE VIEW recommendation_stocks_view 
WITH (security_invoker = on)
AS
SELECT
  histories.recommendation_id,
  histories.recommendation_date,
  histories.summary,
  histories.profile_id,
  histories.stock1_id,
  histories.stock2_id,
  histories.stock3_id,
  s1.stock_name as stock1_name,
  s2.stock_name as stock2_name,
  s3.stock_name as stock3_name,
  s1.per as stock1_per,
  s1.pbr as stock1_pbr,
  s1.roe as stock1_roe,
  s1.dividend_per_share as stock1_dividend_per_share,
  s2.per as stock2_per,
  s2.pbr as stock2_pbr,
  s2.roe as stock2_roe,
  s2.dividend_per_share as stock2_dividend_per_share,
  s3.per as stock3_per,
  s3.pbr as stock3_pbr,
  s3.roe as stock3_roe,
  s3.dividend_per_share as stock3_dividend_per_share,
  histories.stock1_summary as stock1_summary,
  histories.stock2_summary as stock2_summary,
  histories.stock3_summary as stock3_summary
FROM histories
LEFT JOIN stocks s1 ON histories.stock1_id = s1.stock_id
LEFT JOIN stocks s2 ON histories.stock2_id = s2.stock_id
LEFT JOIN stocks s3 ON histories.stock3_id = s3.stock_id;




select * from recommendation_stocks_view;

select * from recommendation_stocks_view where profile_id = 'fd97f837-683c-499f-8d95-bca873f5799a' order by recommendation_date desc limit 1;