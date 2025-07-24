CREATE OR REPLACE VIEW get_recommendation_history_detail_view 
WITH (security_invoker = on)
AS
SELECT DISTINCT
  rh.recommendation_id,
  rh.profile_id,
  rh.ticket_id,
  rh.recommendation_date,
  rh.overall_summary,
  rh.stock1_code,
  rh.stock2_code,
  rh.stock3_code,
  rh.stock1_name,
  rh.stock2_name,
  rh.stock3_name,
  rh.stock1_summary,
  rh.stock2_summary,
  rh.stock3_summary,
  rh.total_token,
  s1.forward_pe as stock1_forward_per,
  s1.pbr as stock1_pbr,
  s1.roe as stock1_roe,
  s1.ev_to_ebitda as stock1_ev_to_ebitda,
  s1.recommendation_key as stock1_analysis_opinion,
  s2.forward_pe as stock2_forward_per,
  s2.pbr as stock2_pbr,
  s2.roe as stock2_roe,
  s2.ev_to_ebitda as stock2_ev_to_ebitda,
  s2.recommendation_key as stock2_analysis_opinion,
  s3.forward_pe as stock3_forward_per,
  s3.pbr as stock3_pbr,
  s3.roe as stock3_roe,
  s3.ev_to_ebitda as stock3_ev_to_ebitda,
  s3.recommendation_key as stock3_analysis_opinion,
FROM recommendation_histories rh
LEFT JOIN stocks_summary_with_ratios s1 ON rh.stock1_code = s1.isu_srt_cd
LEFT JOIN stocks_summary_with_ratios s2 ON rh.stock2_code = s2.isu_srt_cd
LEFT JOIN stocks_summary_with_ratios s3 ON rh.stock3_code = s3.isu_srt_cd;



select * from get_recommendation_history_detail_view;