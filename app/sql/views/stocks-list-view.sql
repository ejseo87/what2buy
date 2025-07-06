CREATE OR REPLACE VIEW stocks_list_view AS
SELECT DISTINCT
  history_stock_relations.stock_id,
  history_stock_relations.recommendation_id,
  history_stock_relations.recommendation_date,
  history_stock_relations.profit,
  history_stock_relations.profit_rate,
  stocks.stock_name,
  stocks.stock_code,
  stocks.per,
  stocks.pbr,
  stocks.roe,
  stocks.dividend_per_share,
  stocks.stock_count
FROM history_stock_relations
LEFT JOIN stocks ON history_stock_relations.stock_id = stocks.stock_id;