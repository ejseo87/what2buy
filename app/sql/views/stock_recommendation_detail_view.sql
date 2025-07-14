DROP VIEW IF EXISTS stock_recommendation_detail_view;



-- Stock Recommendation Detail View: 특정 추천에 대한 주식 상세 뷰
CREATE VIEW stock_recommendation_detail_view 
WITH (security_invoker = on)
AS
SELECT 
  h.recommendation_id,
  h.profile_id,
  h.recommendation_date,
  h.summary,
  s.stock_id,
  s.stock_name,
  s.stock_code,
  s.per,
  s.pbr,
  s.eps,
  s.bps,
  s.roe,
  s.dividend_per_share,
  -- 수익률 정보
  pt.recommended_price,
  pt.current_price,
  pt.profit_rate,
  pt.profit_amount,
  -- 최근 30일 차트 데이터용
  CASE 
    WHEN s.stock_id = h.stock1_id THEN 1
    WHEN s.stock_id = h.stock2_id THEN 2
    WHEN s.stock_id = h.stock3_id THEN 3
  END as stock_position
FROM histories h
JOIN stocks s ON s.stock_id IN (h.stock1_id, h.stock2_id, h.stock3_id)
LEFT JOIN profit_tracking_view pt ON pt.recommendation_id = h.recommendation_id 
  AND pt.stock_id = s.stock_id; 




select * from stock_recommendation_detail_view;