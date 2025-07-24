CREATE TABLE "recommendation_histories" (
	"recommendation_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "recommendation_histories_recommendation_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"recommendation_date" timestamp DEFAULT now() NOT NULL,
	"profile_id" uuid NOT NULL,
	"ticket_id" bigint,
	"overall_summary" text NOT NULL,
	"stock1_code" text NOT NULL,
	"stock1_name" text NOT NULL,
	"stock1_summary" text NOT NULL,
	"stock2_code" text NOT NULL,
	"stock2_name" text NOT NULL,
	"stock2_summary" text NOT NULL,
	"stock3_code" text NOT NULL,
	"stock3_name" text NOT NULL,
	"stock3_summary" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "recommendation_histories" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "recommendation_histories" ADD CONSTRAINT "recommendation_histories_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recommendation_histories" ADD CONSTRAINT "recommendation_histories_ticket_id_tickets_ticket_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."tickets"("ticket_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recommendation_histories" ADD CONSTRAINT "recommendation_histories_stock1_code_stocks_overview_isu_srt_cd_fk" FOREIGN KEY ("stock1_code") REFERENCES "public"."stocks_overview"("isu_srt_cd") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recommendation_histories" ADD CONSTRAINT "recommendation_histories_stock2_code_stocks_overview_isu_srt_cd_fk" FOREIGN KEY ("stock2_code") REFERENCES "public"."stocks_overview"("isu_srt_cd") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recommendation_histories" ADD CONSTRAINT "recommendation_histories_stock3_code_stocks_overview_isu_srt_cd_fk" FOREIGN KEY ("stock3_code") REFERENCES "public"."stocks_overview"("isu_srt_cd") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "histories-select-policy" ON "recommendation_histories" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "recommendation_histories"."profile_id");