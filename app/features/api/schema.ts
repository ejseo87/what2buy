import { sql } from "drizzle-orm";
import {
  bigint,
  check,
  numeric,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const stocks_overview = pgTable("stocks_overview", {
  isu_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  isu_cd: text().notNull().unique(),
  isu_srt_cd: text().notNull().unique(),
  isu_nm: text().notNull(),
  isu_abbrv: text().notNull(),
  isu_eng_nm: text().notNull(),
  list_dd: text().notNull(),
  mkt_tp_nm: text().notNull(),
  secugrp_nm: text().notNull(),
  sect_tp_nm: text(),
  kind_stkcert_tp_nm: text().notNull(),
  parval: numeric().notNull(),
  list_shrs: numeric().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const stocks_wargings = pgTable("stocks_wargings", {
  isu_srt_cd: text()
    .references(() => stocks_overview.isu_srt_cd)
    .notNull(),
  isu_abbrv: text().notNull(),
  trading_suspension: text().notNull(),
  delisting_liquidation: text().notNull(),
  administrative_issue: text().notNull(),
  investment_caution_realert: text().notNull(),
  unfaithful_disclosure: text().notNull(),
  super_low_liquidity_single_price: text().notNull(),
  insufficient_listed_shares_pref: text().notNull(),
  short_term_overheated: text().notNull(),
  investment_caution: text().notNull(),
  investment_warning: text().notNull(),
  investment_risk: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const stocks_historical_data = pgTable(
  "stocks_historical_data",
  {
    isu_srt_cd: text()
      .references(() => stocks_overview.isu_srt_cd)
      .notNull(),
    date: text().notNull(),
    open: numeric().notNull(),
    high: numeric().notNull(),
    low: numeric().notNull(),
    close: numeric().notNull(),
    volume: numeric().notNull(),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.isu_srt_cd, table.date] })]
);
