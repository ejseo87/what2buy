DROP VIEW IF EXISTS stock_card_list_view;


CREATE OR REPLACE VIEW stock_card_list_view 
WITH (security_invoker = on)
AS
SELECT
  s.stock_id,
  s.stock_name,
  s.stock_code,
  s.per,
  s.pbr,
  h2.profile_id,  
  ARRAY_AGG(h.recommendation_date ORDER BY h.recommendation_date DESC) AS recommendation_dates,
  COUNT(h.recommendation_id) AS recommendation_count
FROM
  history_stock_relations h
LEFT JOIN
  stocks s ON h.stock_id = s.stock_id
LEFT JOIN
  histories h2 ON h.recommendation_id = h2.recommendation_id  
GROUP BY
  s.stock_id, s.stock_name, s.stock_code, s.per, s.pbr, h2.profile_id
ORDER BY
  recommendation_count DESC;



select * from stock_card_list_view;
