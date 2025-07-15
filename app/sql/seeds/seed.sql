-- 1. profiles 먼저
INSERT INTO profiles (profile_id, avatar, name, username, created_at, updated_at)
VALUES (
  'fd97f837-683c-499f-8d95-bca873f5799a',
  'https://avatars.githubusercontent.com/u/85053204?v=4',
  '테스트유저',
  'testuser',
  now(),
  now()
);


-- SEED: stocks
INSERT INTO stocks (stock_name, stock_code, stock_count, per, pbr, eps, bps, roe, dividend_per_share, created_at, updated_at) VALUES
( '삼성전자', '005930', 5969782550, 12.5, 1.4, 3500, 50000, 10.2, 361, now(), now()),
('SK하이닉스', '000660', 728002365, 18.2, 1.7, 4200, 60000, 9.8, 1170, now(), now()),
('NAVER', '035420', 164263395, 32.1, 2.9, 2100, 72000, 8.5, 0, now(), now()),
('카카오', '035720', 445964487, 45.3, 2.1, 1200, 57000, 6.2, 0, now(), now()),
('현대차', '005380', 213668187, 8.7, 0.9, 9000, 100000, 11.5, 6000, now(), now()),
('LG화학', '051910', 70792764, 14.8, 1.2, 8000, 90000, 7.9, 12000, now(), now()),
('POSCO홀딩스', '005490', 87744587, 7.2, 0.8, 11000, 130000, 13.1, 10000, now(), now()),
('삼성바이오로직스', '207940', 66188606, 90.5, 6.1, 3000, 49000, 5.3, 0, now(), now()),
('셀트리온', '068270', 134370000, 38.6, 3.2, 2500, 78000, 8.7, 0, now(), now()),
( '기아', '000270', 405363347, 7.9, 1.1, 8500, 77000, 12.3, 4000, now(), now());

-- SEED: tickets
INSERT INTO tickets (ticket_type, ticket_description, ticket_duration_start, ticket_duration_end, status) VALUES
('free', '무료 체험권', '2024-06-01', '2024-07-01', 'not_used'),
('premium', '프리미엄 1개월', '2024-06-01', '2024-07-01', 'not_used'),
('premium', '프리미엄 3개월', '2024-06-01', '2024-09-01', 'used'),
('free', '무료 체험권', '2024-05-01', '2024-06-01', 'used'),
('premium', '프리미엄 1개월', '2024-05-01', '2024-06-01', 'not_used'),
('premium', '프리미엄 3개월', '2024-04-01', '2024-07-01', 'used'),
('free', '무료 체험권', '2024-03-01', '2024-04-01', 'used'),
('premium', '프리미엄 1개월', '2024-02-01', '2024-03-01', 'not_used'),
('premium', '프리미엄 3개월', '2024-01-01', '2024-04-01', 'used'),
('free', '무료 체험권', '2024-01-01', '2024-02-01', 'used');

-- SEED: notifications
INSERT INTO notifications ( profile_id, type, created_at) VALUES
( 'fd97f837-683c-499f-8d95-bca873f5799a', 'ticket_created', now()),
( 'fd97f837-683c-499f-8d95-bca873f5799a', 'ticket_used', now()),
( 'fd97f837-683c-499f-8d95-bca873f5799a', 'ticket_expired', now()),
( 'fd97f837-683c-499f-8d95-bca873f5799a', 'promotion', now()),
( 'fd97f837-683c-499f-8d95-bca873f5799a', 'ticket_refunded', now()),
( 'fd97f837-683c-499f-8d95-bca873f5799a', 'ticket_created', now()),
( 'fd97f837-683c-499f-8d95-bca873f5799a', 'ticket_used', now()),
( 'fd97f837-683c-499f-8d95-bca873f5799a', 'ticket_expired', now()),
( 'fd97f837-683c-499f-8d95-bca873f5799a', 'promotion', now()),
( 'fd97f837-683c-499f-8d95-bca873f5799a', 'ticket_refunded', now());

-- SEED: histories
INSERT INTO histories ( recommendation_date, profile_id, ticket_id, summary, stock1_id, stock2_id, stock3_id, stock1_summary, stock2_summary, stock3_summary, updated_at) VALUES
('2024-06-01', 'fd97f837-683c-499f-8d95-bca873f5799a', 8, '반도체 강세, IT 대장주 추천', 1, 2, 3, '삼성전자 강세', 'SK하이닉스 성장', 'NAVER 안정', now()),
('2024-06-02', 'fd97f837-683c-499f-8d95-bca873f5799a', 9, '인터넷/플랫폼주 추천', 3, 4, 5, 'NAVER 성장', '카카오 반등', '현대차 실적', now()),
('2024-06-03', 'fd97f837-683c-499f-8d95-bca873f5799a', 10, '자동차/화학주 추천', 5, 6, 7, '현대차 호조', 'LG화학 실적', 'POSCO홀딩스 강세', now()),
('2024-06-04', 'fd97f837-683c-499f-8d95-bca873f5799a', 11, '바이오/IT 추천', 8, 9, 1, '삼성바이오로직스 성장', '셀트리온 반등', '삼성전자 안정', now()),
('2024-06-05', 'fd97f837-683c-499f-8d95-bca873f5799a', 12, '자동차/IT 추천', 10, 1, 2, '기아 성장', '삼성전자 강세', 'SK하이닉스 성장', now()),
('2024-06-06', 'fd97f837-683c-499f-8d95-bca873f5799a', 13, '화학/철강주 추천', 6, 7, 8, 'LG화학 실적', 'POSCO홀딩스 강세', '삼성바이오로직스 성장', now()),
('2024-06-07', 'fd97f837-683c-499f-8d95-bca873f5799a', 14, '바이오/자동차 추천', 9, 10, 5, '셀트리온 반등', '기아 성장', '현대차 호조', now()),
('2024-06-08', 'fd97f837-683c-499f-8d95-bca873f5799a', 15, 'IT/플랫폼주 추천', 2, 3, 4, 'SK하이닉스 성장', 'NAVER 안정', '카카오 반등', now()),
('2024-06-09', 'fd97f837-683c-499f-8d95-bca873f5799a', 16, '철강/자동차 추천', 7, 5, 10, 'POSCO홀딩스 강세', '현대차 실적', '기아 성장', now()),
('2024-06-10', 'fd97f837-683c-499f-8d95-bca873f5799a', 17, '자동차/IT 추천', 10, 1, 2, '기아 성장', '삼성전자 강세', 'SK하이닉스 성장', now());

-- SEED: history_stock_relations (composite PK)
-- SEED: history_stock_relations (composite PK)
INSERT INTO history_stock_relations (recommendation_id, stock_id, recommendation_date, profit, profit_rate) VALUES
(17, 9, '2024-06-01', 100, 0.5),
(17, 10, '2024-06-01', 120, 0.6),
(17, 11, '2024-06-01', 80, 0.3),

(18, 11, '2024-06-02', 90, 0.4),
(18, 12, '2024-06-02', 110, 0.5),
(18, 13, '2024-06-02', 130, 0.7),

(19, 14, '2024-06-03', 140, 0.8),
(19, 15, '2024-06-03', 150, 0.9),
(19, 16, '2024-06-03', 160, 1.0),

(20, 16, '2024-06-04', 170, 1.1),
(20, 17, '2024-06-04', 180, 1.2),
(20, 9, '2024-06-04', 190, 1.3),

(21, 18, '2024-06-05', 200, 1.4),
(21, 9, '2024-06-05', 210, 1.5),
(21, 10, '2024-06-05', 220, 1.6),

(22, 14, '2024-06-06', 230, 1.7),
(22, 15, '2024-06-06', 240, 1.8),
(22, 16, '2024-06-06', 250, 1.9),

(23, 17, '2024-06-07', 260, 2.0),
(23, 18, '2024-06-07', 270, 2.1),
(23, 13, '2024-06-07', 280, 2.2),

(24, 10, '2024-06-08', 290, 2.3),
(24, 11, '2024-06-08', 300, 2.4),
(24, 12, '2024-06-08', 310, 2.5),

(25, 15, '2024-06-09', 320, 2.6),
(25, 13, '2024-06-09', 330, 2.7),
(25, 18, '2024-06-09', 340, 2.8),

(26, 13, '2024-06-10', 350, 2.9),
(26, 9, '2024-06-10', 360, 3.0),
(26, 10, '2024-06-10', 370, 3.1); 

-- SEED: user_ticket_relations (composite PK)
INSERT INTO user_ticket_relations (profile_id, ticket_id, created_at) VALUES
('fd97f837-683c-499f-8d95-bca873f5799a', 8, now()),
('fd97f837-683c-499f-8d95-bca873f5799a', 9, now()),
('fd97f837-683c-499f-8d95-bca873f5799a', 10, now()),
('fd97f837-683c-499f-8d95-bca873f5799a', 11, now()),
('fd97f837-683c-499f-8d95-bca873f5799a', 12, now()),
('fd97f837-683c-499f-8d95-bca873f5799a', 13, now()),
('fd97f837-683c-499f-8d95-bca873f5799a', 14, now()),
('fd97f837-683c-499f-8d95-bca873f5799a', 15, now()),
('fd97f837-683c-499f-8d95-bca873f5799a', 16, now()),
('fd97f837-683c-499f-8d95-bca873f5799a', 17, now());


select * from histories;
select * from stocks where stock_id >= 9;
SELECT * FROM histories WHERE profile_id = 'fd97f837-683c-499f-8d95-bca873f5799a';