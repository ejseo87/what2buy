import {
  bigint,
  date,
  integer,
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

/**
- `stock_code` (string) : 상장회사인 경우 종목코드 6자리
- `date` (date) : 날짜
- `Open` (integer) : 시작가격
- `High` (integer) : 최고가
- `Low` (integer) : 최저가
- `Close` (integer) : 종가
- `Volume` (long integer) : 거래량
- `change` (float) : 변동

 */

export const daily_stocks = pgTable(
  "daily_stocks",
  {
    stock_id: bigint({ mode: "number" })
      .references(() => stocks.stock_id)
      .notNull(),
    date: date().notNull(),
    open: integer().notNull(),
    high: integer().notNull(),
    low: integer().notNull(),
    close: integer().notNull(),
    volume: bigint({ mode: "number" }).notNull(),
    change: real().notNull(),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.stock_id, table.date] })]
);

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
  stock1_id: bigint({ mode: "number" })
    .references(() => stocks.stock_id)
    .notNull(),
  stock2_id: bigint({ mode: "number" })
    .references(() => stocks.stock_id)
    .notNull(),
  stock3_id: bigint({ mode: "number" })
    .references(() => stocks.stock_id)
    .notNull(),
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
