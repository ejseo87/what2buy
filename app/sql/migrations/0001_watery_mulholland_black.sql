CREATE TABLE "daily_stocks" (
	"stock_id" bigint NOT NULL,
	"date" date NOT NULL,
	"open" integer NOT NULL,
	"high" integer NOT NULL,
	"low" integer NOT NULL,
	"close" integer NOT NULL,
	"volume" bigint NOT NULL,
	"change" real NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "daily_stocks_stock_id_date_pk" PRIMARY KEY("stock_id","date")
);
--> statement-breakpoint
ALTER TABLE "daily_stocks" ADD CONSTRAINT "daily_stocks_stock_id_stocks_stock_id_fk" FOREIGN KEY ("stock_id") REFERENCES "public"."stocks"("stock_id") ON DELETE no action ON UPDATE no action;