CREATE TABLE "stocks_historical_data" (
	"isu_srt_cd" text NOT NULL,
	"date" text NOT NULL,
	"open" numeric NOT NULL,
	"high" numeric NOT NULL,
	"low" numeric NOT NULL,
	"close" numeric NOT NULL,
	"volume" numeric NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "stocks_historical_data" ADD CONSTRAINT "stocks_historical_data_isu_srt_cd_stocks_overview_isu_srt_cd_fk" FOREIGN KEY ("isu_srt_cd") REFERENCES "public"."stocks_overview"("isu_srt_cd") ON DELETE no action ON UPDATE no action;