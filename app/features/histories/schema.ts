import {
  bigint,
  date,
  integer,
  numeric,
  pgPolicy,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { tickets } from "../tickets/schema";
import { profiles } from "../users/schema";
import { sql } from "drizzle-orm";
import {
  authenticatedRole,
  anonRole,
  authUid,
  authUsers,
} from "drizzle-orm/supabase";


export const stocks = pgTable(
  "stocks",
  {
    stock_id: bigint({ mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
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
  },
  (table) => [
    pgPolicy("stocks-select-policy", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`true`,
    }),
  ]
);


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
  (table) => [
    primaryKey({ columns: [table.stock_id, table.date] }),
    pgPolicy("stocks-select-policy", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`true`,
    }),
  ]
);

export const histories = pgTable(
  "histories",
  {
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
  },
  (table) => [
    pgPolicy("histories-select-policy", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      withCheck: sql`${authUid} = ${table.profile_id}`,
    }),
    pgPolicy("histories-insert-policy", {
      for: "insert",
      to: authenticatedRole,
      as: "permissive",
      withCheck: sql`${authUid} = ${table.profile_id}`,
    }),
  ]
);

export const history_stock_relations = pgTable(
  "history_stock_relations",
  {
    recommendation_id: bigint({ mode: "number" })
      .references(() => histories.recommendation_id, { onDelete: "cascade" })
      .notNull(),
    stock_id: bigint({ mode: "number" })
      .references(() => stocks.stock_id, {
        onDelete: "cascade",
      })
      .notNull(),
    recommendation_date: timestamp().notNull().defaultNow(),
    profit: numeric(),
    profit_rate: numeric(),
  },
  (table) => [
    primaryKey({ columns: [table.recommendation_id, table.stock_id] }),
    pgPolicy("history_stock_relations-select-policy", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`true`,
    }),
    pgPolicy("history_stock_relations-insert-policy", {
      for: "insert",
      to: authenticatedRole,
      as: "permissive",
      using: sql`true`,
    }),
  ]
);
