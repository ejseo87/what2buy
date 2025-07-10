DROP VIEW IF EXISTS stock_recommendation_chart_view;

CREATE OR REPLACE VIEW stock_recommendation_chart_view AS
SELECT
  h.recommendation_id,
  s.stock_id,
  s.stock_name,
  h.recommendation_date,
  -- Price on recommendation date (or next available trading day)
  (
    SELECT ds.close
    FROM daily_stocks ds
    WHERE ds.stock_id = s.stock_id
      AND ds.date >= h.recommendation_date::date
    ORDER BY ds.date ASC
    LIMIT 1
  ) AS recommendation_close,
  -- Latest price
  (
    SELECT ds.close
    FROM daily_stocks ds
    WHERE ds.stock_id = s.stock_id
    ORDER BY ds.date DESC
    LIMIT 1
  ) AS latest_close,
  -- Last 30 days of prices as JSON for charting
  (
    SELECT json_agg(json_build_object('date', to_char(ds.date, 'YYMMDD'), 'close', ds.close) ORDER BY ds.date)
    FROM (
      SELECT ds.date, ds.close
      FROM daily_stocks ds
      WHERE ds.stock_id = s.stock_id
      ORDER BY ds.date
      LIMIT 30
    ) ds
  ) AS chart_prices
FROM
  histories h
JOIN
  stocks s ON s.stock_id = h.stock1_id or s.stock_id = h.stock2_id or s.stock_id = h.stock3_id
;


select * from stock_recommendation_chart_view;