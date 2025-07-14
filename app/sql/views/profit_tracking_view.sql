DROP VIEW IF EXISTS profit_tracking_view;


-- Profit Tracking View: 수익률 추적 뷰
CREATE VIEW profit_tracking_view 
WITH (security_invoker = on)
AS
SELECT 
  hsr.recommendation_id,
  hsr.stock_id,
  h.profile_id,
  h.recommendation_date,
  s.stock_name,
  s.stock_code,
  -- 추천일 가격 (추천일 또는 그 이후 첫 번째 거래일)
  rec_ds.close as recommended_price,
  rec_ds.date as recommended_price_date,
  -- 현재 가격 (최근 거래일)
  curr_ds.close as current_price,
  curr_ds.date as current_price_date,
  -- 수익률 계산
  CASE 
    WHEN rec_ds.close > 0 THEN
      ROUND(((curr_ds.close - rec_ds.close) / rec_ds.close::decimal * 100), 2)
    ELSE 0
  END as profit_rate,
  -- 수익 금액
  (curr_ds.close - rec_ds.close) as profit_amount
FROM history_stock_relations hsr
JOIN histories h ON hsr.recommendation_id = h.recommendation_id
JOIN stocks s ON hsr.stock_id = s.stock_id
-- 추천일 가격 조회 (추천일 또는 그 이후 첫 번째 거래일)
LEFT JOIN LATERAL (
  SELECT close, date
  FROM daily_stocks 
  WHERE stock_id = hsr.stock_id 
    AND date >= h.recommendation_date::date
  ORDER BY date ASC 
  LIMIT 1
) rec_ds ON true
-- 현재 가격 조회 (최근 거래일)
LEFT JOIN LATERAL (
  SELECT close, date
  FROM daily_stocks 
  WHERE stock_id = hsr.stock_id 
  ORDER BY date DESC 
  LIMIT 1
) curr_ds ON true;





select * from profit_tracking_view;