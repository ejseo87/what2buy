CREATE TYPE "public"."ticket_status" AS ENUM('used', 'not_used', 'expired');--> statement-breakpoint
CREATE TYPE "public"."ticket_types" AS ENUM('free', 'premium');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('alert', 'system', 'promotion', 'information');--> statement-breakpoint
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
ALTER TABLE "daily_stocks" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "histories" (
	"recommendation_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "histories_recommendation_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"recommendation_date" timestamp DEFAULT now() NOT NULL,
	"profile_id" uuid NOT NULL,
	"ticket_id" bigint,
	"summary" text NOT NULL,
	"stock1_id" bigint NOT NULL,
	"stock2_id" bigint NOT NULL,
	"stock3_id" bigint NOT NULL,
	"stock1_summary" text,
	"stock2_summary" text,
	"stock3_summary" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "histories" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "history_stock_relations" (
	"recommendation_id" bigint NOT NULL,
	"stock_id" bigint NOT NULL,
	"recommendation_date" timestamp DEFAULT now() NOT NULL,
	"profit" numeric,
	"profit_rate" numeric,
	CONSTRAINT "history_stock_relations_recommendation_id_stock_id_pk" PRIMARY KEY("recommendation_id","stock_id")
);
--> statement-breakpoint
ALTER TABLE "history_stock_relations" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "stocks" (
	"stock_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "stocks_stock_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"stock_name" text NOT NULL,
	"stock_code" text NOT NULL,
	"stock_count" numeric NOT NULL,
	"per" numeric,
	"pbr" numeric,
	"eps" numeric,
	"bps" numeric,
	"roe" numeric,
	"dividend_per_share" numeric NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "stocks" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "tickets" (
	"ticket_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tickets_ticket_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"ticket_type" "ticket_types" NOT NULL,
	"ticket_description" text,
	"ticket_duration_start" date NOT NULL,
	"ticket_duration_end" date NOT NULL,
	"status" "ticket_status" NOT NULL,
	"used_date" date,
	"profile_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tickets" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "notifications" (
	"notification_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "notifications_notification_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"profile_id" uuid,
	"type" "notification_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "notifications" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "profiles" (
	"profile_id" uuid PRIMARY KEY NOT NULL,
	"avatar" text,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "daily_stocks" ADD CONSTRAINT "daily_stocks_stock_id_stocks_stock_id_fk" FOREIGN KEY ("stock_id") REFERENCES "public"."stocks"("stock_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "histories" ADD CONSTRAINT "histories_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "histories" ADD CONSTRAINT "histories_ticket_id_tickets_ticket_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."tickets"("ticket_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "histories" ADD CONSTRAINT "histories_stock1_id_stocks_stock_id_fk" FOREIGN KEY ("stock1_id") REFERENCES "public"."stocks"("stock_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "histories" ADD CONSTRAINT "histories_stock2_id_stocks_stock_id_fk" FOREIGN KEY ("stock2_id") REFERENCES "public"."stocks"("stock_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "histories" ADD CONSTRAINT "histories_stock3_id_stocks_stock_id_fk" FOREIGN KEY ("stock3_id") REFERENCES "public"."stocks"("stock_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "history_stock_relations" ADD CONSTRAINT "history_stock_relations_recommendation_id_histories_recommendation_id_fk" FOREIGN KEY ("recommendation_id") REFERENCES "public"."histories"("recommendation_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "history_stock_relations" ADD CONSTRAINT "history_stock_relations_stock_id_stocks_stock_id_fk" FOREIGN KEY ("stock_id") REFERENCES "public"."stocks"("stock_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_profile_id_profiles_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_profile_id_users_id_fk" FOREIGN KEY ("profile_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "stocks-select-policy" ON "daily_stocks" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "histories-select-policy" ON "histories" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "histories"."profile_id");--> statement-breakpoint
CREATE POLICY "histories-insert-policy" ON "histories" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "histories"."profile_id");--> statement-breakpoint
CREATE POLICY "history_stock_relations-select-policy" ON "history_stock_relations" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "history_stock_relations-insert-policy" ON "history_stock_relations" AS PERMISSIVE FOR INSERT TO "authenticated";--> statement-breakpoint
CREATE POLICY "stocks-select-policy" ON "stocks" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "tickets-insert-policy" ON "tickets" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "tickets"."profile_id");--> statement-breakpoint
CREATE POLICY "tickets-select-policy" ON "tickets" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "tickets"."profile_id");--> statement-breakpoint
CREATE POLICY "tickets-update-policy" ON "tickets" AS PERMISSIVE FOR UPDATE TO "authenticated" WITH CHECK ((select auth.uid()) = "tickets"."profile_id");--> statement-breakpoint
CREATE POLICY "notifications-insert-policy" ON "notifications" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "notifications"."profile_id");--> statement-breakpoint
CREATE POLICY "notifications-update-policy" ON "notifications" AS PERMISSIVE FOR UPDATE TO "authenticated" WITH CHECK ((select auth.uid()) = "notifications"."profile_id");--> statement-breakpoint
CREATE POLICY "notifications-select-policy" ON "notifications" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "notifications"."profile_id");--> statement-breakpoint
CREATE POLICY "profiles-insert-policy" ON "profiles" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "profiles"."profile_id");--> statement-breakpoint
CREATE POLICY "profiles-update-policy" ON "profiles" AS PERMISSIVE FOR UPDATE TO "authenticated" WITH CHECK ((select auth.uid()) = "profiles"."profile_id");--> statement-breakpoint
CREATE POLICY "profiles-select-policy" ON "profiles" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "profiles"."profile_id");