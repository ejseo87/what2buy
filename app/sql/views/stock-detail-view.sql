drop view if exists stock_detail_view ;

-- Stock Detail View: 주식 상세 정보 뷰
CREATE OR REPLACE VIEW stock_detail_view 
WITH (security_invoker = on)
AS
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
  ds.date as current_price_date,
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



select * from stock_detail_view;
