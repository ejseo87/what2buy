ALTER TABLE "stocks_historical_data" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "stocks_overview" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "stocks_wargings" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "stocks_historical_data-select-policy" ON "stocks_historical_data" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "stocks_overview-select-policy" ON "stocks_overview" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "stocks_wargings-select-policy" ON "stocks_wargings" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);