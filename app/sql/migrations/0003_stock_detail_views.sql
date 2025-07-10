-- Stock Detail View: 주식 상세 정보 뷰
CREATE VIEW stock_detail_view AS
SELECT 
  s.stock_id,
  s.stock_name,
  s.stock_code,
  s.stock_count,
  s.per,
  s.pbr,
  s.eps,
  s.bps,
  s.roe,
  s.dividend_per_share,
  -- 최근 주가 정보
  ds.close as current_price,
  ds.date as price_date,
  ds.change as price_change,
  -- 수익률 계산을 위한 추가 정보
  ds.open,
  ds.high,
  ds.low,
  ds.volume
FROM stocks s
LEFT JOIN LATERAL (
  SELECT 
    close, 
    date, 
    change, 
    open, 
    high, 
    low, 
    volume
  FROM daily_stocks 
  WHERE stock_id = s.stock_id 
  ORDER BY date DESC 
  LIMIT 1
) ds ON true;

-- Profit Tracking View: 수익률 추적 뷰
CREATE VIEW profit_tracking_view AS
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

-- Stock Performance Chart View: 주식 성과 차트 뷰 (30일 데이터)
CREATE VIEW stock_performance_chart_view AS
SELECT 
  s.stock_id,
  s.stock_name,
  s.stock_code,
  ds.date,
  ds.close,
  ds.open,
  ds.high,
  ds.low,
  ds.volume,
  ds.change,
  -- 30일 이동평균
  AVG(ds.close) OVER (
    PARTITION BY s.stock_id 
    ORDER BY ds.date 
    ROWS BETWEEN 29 PRECEDING AND CURRENT ROW
  ) as moving_avg_30
FROM stocks s
JOIN daily_stocks ds ON s.stock_id = ds.stock_id
WHERE ds.date >= CURRENT_DATE - INTERVAL '90 days'
ORDER BY s.stock_id, ds.date;

-- Stock Recommendation Detail View: 특정 추천에 대한 주식 상세 뷰
CREATE VIEW stock_recommendation_detail_view AS
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