CREATE VIEW stocks_in_a_recommendation_view AS
SELECT
  histories.recommendation_id,
  histories.recommendation_date,
  histories.stock1_id,
  
  histories.stock2_id,
  histories.stock3_id,
