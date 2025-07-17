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
CREATE TABLE "stocks_overview" (
	"isu_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "stocks_overview_isu_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"isu_cd" text NOT NULL,
	"isu_srt_cd" text NOT NULL,
	"isu_nm" text NOT NULL,
	"isu_abbrv" text NOT NULL,
	"isu_eng_nm" text NOT NULL,
	"list_dd" text NOT NULL,
	"mkt_tp_nm" text NOT NULL,
	"secugrp_nm" text NOT NULL,
	"sect_tp_nm" text,
	"kind_stkcert_tp_nm" text NOT NULL,
	"parval" numeric NOT NULL,
	"list_shrs" numeric NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "stocks_overview_isu_cd_unique" UNIQUE("isu_cd"),
	CONSTRAINT "stocks_overview_isu_srt_cd_unique" UNIQUE("isu_srt_cd")
);
--> statement-breakpoint
CREATE TABLE "stocks_wargings" (
	"isu_srt_cd" text NOT NULL,
	"isu_abbrv" text NOT NULL,
	"trading_suspension" text NOT NULL,
	"delisting_liquidation" text NOT NULL,
	"administrative_issue" text NOT NULL,
	"investment_caution_realert" text NOT NULL,
	"unfaithful_disclosure" text NOT NULL,
	"super_low_liquidity_single_price" text NOT NULL,
	"insufficient_listed_shares_pref" text NOT NULL,
	"short_term_overheated" text NOT NULL,
	"investment_caution" text NOT NULL,
	"investment_warning" text NOT NULL,
	"investment_risk" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "stocks_historical_data" ADD CONSTRAINT "stocks_historical_data_isu_srt_cd_stocks_overview_isu_srt_cd_fk" FOREIGN KEY ("isu_srt_cd") REFERENCES "public"."stocks_overview"("isu_srt_cd") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stocks_wargings" ADD CONSTRAINT "stocks_wargings_isu_srt_cd_stocks_overview_isu_srt_cd_fk" FOREIGN KEY ("isu_srt_cd") REFERENCES "public"."stocks_overview"("isu_srt_cd") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
