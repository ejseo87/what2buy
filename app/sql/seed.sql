-- Seed data for what2buy database
-- Using provided profile_id values: fd97f837-683c-499f-8d95-bca873f5799a and 47cb62d9-c4b5-4d90-b661-165df9138afd

-- Insert tickets
INSERT INTO "tickets" ("ticket_type", "ticket_description", "ticket_duration_start", "ticket_duration_end", "status") VALUES
('free', 'Basic stock analysis ticket', '2024-01-01', '2024-01-31', 'used'),
('premium', 'Advanced portfolio analysis with AI insights', '2024-01-15', '2024-02-15', 'not_used'),
('free', 'Monthly stock recommendation', '2024-02-01', '2024-02-28', 'used'),
('premium', 'Quarterly market analysis report', '2024-01-01', '2024-03-31', 'not_used'),
('free', 'Weekly market insights', '2024-02-15', '2024-02-22', 'used'),
('premium', 'Enterprise portfolio management', '2024-01-01', '2024-12-31', 'not_used'),
('free', 'Beginner investment guide', '2024-02-01', '2024-02-07', 'used');

-- Insert stocks
INSERT INTO "stocks" ("stock_name", "stock_code", "stock_count", "per", "pbr", "eps", "bps", "roe", "dividend_per_share") VALUES
('Apple Inc.', 'AAPL', 1000000, 15.5, 2.3, 12.45, 54.20, 22.8, 0.95),
('Microsoft Corporation', 'MSFT', 800000, 18.2, 3.1, 14.22, 48.90, 29.1, 2.72),
('Amazon.com Inc.', 'AMZN', 600000, 25.8, 4.2, 8.95, 76.30, 11.7, 0.00),
('Tesla Inc.', 'TSLA', 450000, 35.1, 5.8, 9.87, 32.10, 30.7, 0.00),
('Alphabet Inc.', 'GOOGL', 700000, 14.9, 2.8, 18.45, 65.80, 28.0, 0.00),
('Meta Platforms Inc.', 'META', 520000, 16.7, 3.5, 16.32, 47.20, 34.6, 0.00),
('NVIDIA Corporation', 'NVDA', 380000, 42.3, 8.1, 12.75, 23.80, 53.6, 0.16),
('Netflix Inc.', 'NFLX', 300000, 28.9, 4.7, 15.60, 41.30, 37.8, 0.00);

-- Insert histories (recommendations)
INSERT INTO "histories" ("profile_id", "ticket_id", "summary", "stock1_id", "stock2_id", "stock3_id", "stock1_summary", "stock2_summary", "stock3_summary") VALUES
('fd97f837-683c-499f-8d95-bca873f5799a', 1, 'Tech giants showing strong growth potential in Q1 2024', 1, 2, 3, 'Apple continues to dominate with iPhone sales', 'Microsoft Azure growth accelerating', 'Amazon e-commerce recovery underway'),
('47cb62d9-c4b5-4d90-b661-165df9138afd', 2, 'EV and AI stocks positioned for breakthrough year', 4, 7, 5, 'Tesla FSD progress showing promise', 'NVIDIA AI chip demand surging', 'Google Bard competing with ChatGPT'),
('fd97f837-683c-499f-8d95-bca873f5799a', 3, 'Social media platforms adapting to new regulations', 6, 8, 1, 'Meta VR investments starting to pay off', 'Netflix content strategy driving subscriptions', 'Apple services revenue growing steadily'),
('47cb62d9-c4b5-4d90-b661-165df9138afd', 4, 'Cloud computing leaders expanding market share', 2, 5, 3, 'Microsoft Office 365 adoption increasing', 'Google Cloud gaining enterprise customers', 'Amazon AWS maintaining leadership'),
('fd97f837-683c-499f-8d95-bca873f5799a', 5, 'Diversified tech portfolio for long-term growth', 1, 4, 6, 'Apple ecosystem strength unmatched', 'Tesla energy business expanding', 'Meta Reality Labs showing progress'),
('47cb62d9-c4b5-4d90-b661-165df9138afd', 6, 'AI revolution beneficiaries across sectors', 7, 2, 5, 'NVIDIA data center revenue exploding', 'Microsoft Copilot integration advancing', 'Google AI research leading innovation');

-- Insert history_stock_relations (composite primary key table)
INSERT INTO "history_stock_relations" ("recommendation_id", "stock_id", "profit", "profit_rate") VALUES
(1, 1, 125.50, 8.3),
(1, 2, 89.20, 5.7),
(1, 3, -15.80, -1.2),
(2, 4, 342.75, 22.8),
(2, 7, 156.90, 18.5),
(2, 5, 78.45, 4.9),
(3, 6, 45.60, 3.2),
(3, 8, 92.30, 11.7),
(3, 1, 67.40, 4.5),
(4, 2, 134.20, 8.9),
(4, 5, 89.70, 5.6),
(4, 3, 23.50, 1.8),
(5, 1, 98.80, 6.5),
(5, 4, 287.60, 19.2),
(5, 6, 56.90, 4.0),
(6, 7, 445.30, 28.7),
(6, 2, 112.40, 7.4),
(6, 5, 67.80, 4.2);

-- Insert notifications
INSERT INTO "notifications" ("profile_id", "type") VALUES
('fd97f837-683c-499f-8d95-bca873f5799a', 'ticket_created'),
('47cb62d9-c4b5-4d90-b661-165df9138afd', 'ticket_created'),
('fd97f837-683c-499f-8d95-bca873f5799a', 'ticket_used'),
('47cb62d9-c4b5-4d90-b661-165df9138afd', 'promotion'),
('fd97f837-683c-499f-8d95-bca873f5799a', 'ticket_expired'),
('47cb62d9-c4b5-4d90-b661-165df9138afd', 'ticket_used'),
('fd97f837-683c-499f-8d95-bca873f5799a', 'promotion'),
('47cb62d9-c4b5-4d90-b661-165df9138afd', 'ticket_refunded'),
('fd97f837-683c-499f-8d95-bca873f5799a', 'ticket_created'),
('47cb62d9-c4b5-4d90-b661-165df9138afd', 'ticket_expired');

-- Insert user_ticket_relations (composite primary key table)
INSERT INTO "user_ticket_relations" ("profile_id", "ticket_id") VALUES
('fd97f837-683c-499f-8d95-bca873f5799a', 1),
('47cb62d9-c4b5-4d90-b661-165df9138afd', 2),
('fd97f837-683c-499f-8d95-bca873f5799a', 3),
('47cb62d9-c4b5-4d90-b661-165df9138afd', 4),
('fd97f837-683c-499f-8d95-bca873f5799a', 5),
('47cb62d9-c4b5-4d90-b661-165df9138afd', 6),
('fd97f837-683c-499f-8d95-bca873f5799a', 7),
('47cb62d9-c4b5-4d90-b661-165df9138afd', 1),
('fd97f837-683c-499f-8d95-bca873f5799a', 2),
('47cb62d9-c4b5-4d90-b661-165df9138afd', 3); 