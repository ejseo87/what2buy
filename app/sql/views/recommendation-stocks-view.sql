CREATE VIEW recommendation_stocks_view AS
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
  s3.stock_name as stock3_name
FROM histories
LEFT JOIN stocks s1 ON histories.stock1_id = s1.stock_id
LEFT JOIN stocks s2 ON histories.stock2_id = s2.stock_id
LEFT JOIN stocks s3 ON histories.stock3_id = s3.stock_id;
