CREATE TABLE "calculated_ratios" (
	"isu_srt_cd" text PRIMARY KEY NOT NULL,
	"trailingPE" numeric(10, 4),
	"forwardPE" numeric(10, 4),
	"priceToBook" numeric(10, 4),
	"pcr" numeric(10, 4),
	"psr" numeric(10, 4),
	"evToEbitda" numeric(10, 4),
	"evToRevenue" numeric(10, 4),
	"roa" numeric(10, 4),
	"roe" numeric(10, 4),
	"rps" numeric(10, 4),
	"beta" numeric(10, 4),
	"recommendationKey" text,
	"recommendationMean" numeric(10, 4),
	"numberOfAnalystOpinions" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "calculated_ratios" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "default_key_statistics" (
	"isu_srt_cd" text PRIMARY KEY NOT NULL,
	"enterprise_value" bigint,
	"forward_pe" numeric(10, 7),
	"float_shares" integer,
	"shares_outstanding" integer,
	"held_percent_insiders" numeric(10, 5),
	"held_percent_institutions" numeric(10, 5),
	"implied_shares_outstanding" integer,
	"last_fiscal_year_end" timestamp,
	"next_fiscal_year_end" timestamp,
	"most_recent_quarter" timestamp,
	"earnings_quarterly_growth" numeric(10, 3),
	"net_income_to_common" bigint,
	"enterprise_to_revenue" numeric(10, 3),
	"enterprise_to_ebitda" numeric(10, 3),
	"fifty_two_week_change" numeric(10, 8),
	"sand_p_fifty_two_week_change" numeric(10, 8),
	"last_dividend_value" integer,
	"last_dividend_date" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "default_key_statistics" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "financial_data" (
	"isu_srt_cd" text PRIMARY KEY NOT NULL,
	"current_price" integer,
	"target_high_price" integer,
	"target_low_price" integer,
	"target_mean_price" integer,
	"target_median_price" integer,
	"recommendation_mean" numeric(10, 5),
	"recommendation_key" text,
	"number_of_analyst_opinions" integer,
	"total_cash" bigint,
	"total_cash_per_share" numeric(15, 3),
	"ebitda" bigint,
	"total_debt" bigint,
	"quick_ratio" numeric(10, 3),
	"current_ratio" numeric(10, 3),
	"total_revenue" bigint,
	"debt_to_equity" numeric(10, 3),
	"revenue_per_share" integer,
	"return_on_assets" numeric(10, 5),
	"return_on_equity" numeric(10, 5),
	"gross_profits" bigint,
	"free_cashflow" bigint,
	"operating_cashflow" bigint,
	"earnings_growth" numeric(10, 3),
	"revenue_growth" numeric(10, 3),
	"gross_margins" numeric(10, 5),
	"ebitda_margins" numeric(10, 5),
	"operating_margins" numeric(10, 5),
	"profit_margins" numeric(10, 5),
	"financial_currency" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "financial_data" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "summary_detail" (
	"isu_srt_cd" text PRIMARY KEY NOT NULL,
	"previous_close" integer,
	"open" integer,
	"day_low" integer,
	"day_high" integer,
	"dividend_rate" integer,
	"dividend_yield" numeric(10, 5),
	"ex_dividend_date" timestamp,
	"payout_ratio" numeric(10, 4),
	"five_year_avg_dividend_yield" numeric(10, 2),
	"beta" numeric(10, 3),
	"volume" integer,
	"average_volume" integer,
	"average_volume_10days" integer,
	"bid" integer,
	"ask" integer,
	"market_cap" bigint,
	"fifty_two_week_low" integer,
	"fifty_two_week_high" integer,
	"price_to_sales_trailing_12_months" numeric(10, 8),
	"fifty_day_average" numeric(10, 2),
	"two_hundred_day_average" numeric(10, 2),
	"currency" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "summary_detail" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "calculated_ratios" ADD CONSTRAINT "calculated_ratios_isu_srt_cd_stocks_overview_isu_srt_cd_fk" FOREIGN KEY ("isu_srt_cd") REFERENCES "public"."stocks_overview"("isu_srt_cd") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "default_key_statistics" ADD CONSTRAINT "default_key_statistics_isu_srt_cd_stocks_overview_isu_srt_cd_fk" FOREIGN KEY ("isu_srt_cd") REFERENCES "public"."stocks_overview"("isu_srt_cd") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "financial_data" ADD CONSTRAINT "financial_data_isu_srt_cd_stocks_overview_isu_srt_cd_fk" FOREIGN KEY ("isu_srt_cd") REFERENCES "public"."stocks_overview"("isu_srt_cd") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "summary_detail" ADD CONSTRAINT "summary_detail_isu_srt_cd_stocks_overview_isu_srt_cd_fk" FOREIGN KEY ("isu_srt_cd") REFERENCES "public"."stocks_overview"("isu_srt_cd") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "calculated_ratios-select-policy" ON "calculated_ratios" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "default_key_statistics-select-policy" ON "default_key_statistics" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "financial_data-select-policy" ON "financial_data" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "summary_detail-select-policy" ON "summary_detail" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);