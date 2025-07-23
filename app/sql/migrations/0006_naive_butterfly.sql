CREATE TABLE "stocks_summary_with_ratios" (
	"isu_srt_cd" text PRIMARY KEY NOT NULL,
	"isu_abbrv" text,
	"trailing_pe" numeric(20, 6),
	"forward_pe" numeric(20, 6),
	"eps_trailing_twelve_months" numeric(20, 6),
	"eps_forward" numeric(20, 6),
	"pbr" numeric(20, 6),
	"pcr" numeric(20, 6),
	"psr" numeric(20, 6),
	"ev_to_ebitda" numeric(20, 6),
	"ev_to_revenue" numeric(20, 6),
	"roa" numeric(20, 6),
	"roe" numeric(20, 6),
	"rps" numeric(20, 6),
	"recommendation_key" text,
	"recommendation_mean" numeric(20, 6),
	"beta" numeric(20, 6),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "stocks_summary_with_ratios" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP POLICY "calculated_ratios-select-policy" ON "stocks_summary_detail" CASCADE;--> statement-breakpoint
DROP TABLE "stocks_summary_detail" CASCADE;--> statement-breakpoint
ALTER TABLE "stocks_summary_with_ratios" ADD CONSTRAINT "stocks_summary_with_ratios_isu_srt_cd_stocks_overview_isu_srt_cd_fk" FOREIGN KEY ("isu_srt_cd") REFERENCES "public"."stocks_overview"("isu_srt_cd") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "calculated_ratios-select-policy" ON "stocks_summary_with_ratios" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);