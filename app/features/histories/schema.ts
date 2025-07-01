import {
  bigint,
  date,
  numeric,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { tickets } from "../tickets/schema";
import { profiles } from "../users/schema";

export const stocks = pgTable("stocks", {
  stock_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  stock_name: text().notNull(),
  stock_code: text().notNull(),
  stock_count: numeric().notNull(),
  per: numeric(),
  pbr: numeric(),
  eps: numeric(),
  bps: numeric(),
  roe: numeric(),
  dividend_per_share: numeric().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const histories = pgTable("histories", {
  recommendation_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  recommendation_date: timestamp().notNull().defaultNow(),
  profile_id: uuid()
    .references(() => profiles.profile_id, { onDelete: "cascade" })
    .notNull(),
  ticket_id: bigint({ mode: "number" }).references(() => tickets.ticket_id),
  summary: text().notNull(),
  stock1_id: bigint({ mode: "number" }).references(() => stocks.stock_id),
  stock2_id: bigint({ mode: "number" }).references(() => stocks.stock_id),
  stock3_id: bigint({ mode: "number" }).references(() => stocks.stock_id),
  stock1_summary: text(),
  stock2_summary: text(),
  stock3_summary: text(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const history_stock_relations = pgTable(
  "history_stock_relations",
  {
    recommendation_id: bigint({ mode: "number" }).references(
      () => histories.recommendation_id,
      { onDelete: "cascade" }
    ),
    stock_id: bigint({ mode: "number" }).references(() => stocks.stock_id, {
      onDelete: "cascade",
    }),
    recommendation_date: timestamp().notNull().defaultNow(),
    profit: numeric(),
    profit_rate: numeric(),
  },
  (table) => [
    primaryKey({ columns: [table.recommendation_id, table.stock_id] }),
  ]
);
