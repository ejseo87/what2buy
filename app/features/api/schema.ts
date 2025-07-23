import { sql } from "drizzle-orm";
import {
  bigint,
  check,
  numeric,
  pgPolicy,
  pgTable,
  primaryKey,
  text,
  timestamp,
  integer,
  decimal,
} from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";

export const stocks_overview = pgTable(
  "stocks_overview",
  {
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
  },
  (table) => [
    pgPolicy("stocks_overview-select-policy", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`true`,
    }),
  ]
);

export const stocks_wargings = pgTable(
  "stocks_wargings",
  {
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
  },
  (table) => [
    pgPolicy("stocks_wargings-select-policy", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`true`,
    }),
  ]
);

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
  (table) => [
    primaryKey({ columns: [table.isu_srt_cd, table.date] }),
    pgPolicy("stocks_historical_data-select-policy", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`true`,
    }),
  ]
);

export const yahoo_financial_data = pgTable(
  "yahoo_financial_data",
  {
    isu_srt_cd: text("isu_srt_cd")
      .references(() => stocks_overview.isu_srt_cd)
      .notNull()
      .primaryKey(),

    // Financial Data
    current_price: integer("current_price"),
    target_high_price: integer("target_high_price"),
    target_low_price: integer("target_low_price"),
    target_mean_price: integer("target_mean_price"),
    target_median_price: integer("target_median_price"),
    recommendation_mean: decimal("recommendation_mean", {
      precision: 10,
      scale: 5,
    }),
    recommendation_key: text("recommendation_key"),
    number_of_analyst_opinions: integer("number_of_analyst_opinions"),
    total_cash: bigint("total_cash", { mode: "number" }),
    total_cash_per_share: decimal("total_cash_per_share", {
      precision: 15,
      scale: 3,
    }),
    ebitda: bigint("ebitda", { mode: "number" }),
    total_debt: bigint("total_debt", { mode: "number" }),
    quick_ratio: decimal("quick_ratio", { precision: 10, scale: 3 }),
    current_ratio: decimal("current_ratio", { precision: 10, scale: 3 }),
    total_revenue: bigint("total_revenue", { mode: "number" }),
    debt_to_equity: decimal("debt_to_equity", { precision: 10, scale: 3 }),
    revenue_per_share: decimal("revenue_per_share", {
      precision: 10,
      scale: 3,
    }),
    return_on_assets: decimal("return_on_assets", { precision: 10, scale: 5 }),
    return_on_equity: decimal("return_on_equity", { precision: 10, scale: 5 }),
    gross_profits: bigint("gross_profits", { mode: "number" }),
    free_cashflow: bigint("free_cashflow", { mode: "number" }),
    operating_cashflow: bigint("operating_cashflow", { mode: "number" }),
    earnings_growth: decimal("earnings_growth", { precision: 10, scale: 3 }),
    revenue_growth: decimal("revenue_growth", { precision: 10, scale: 3 }),
    gross_margins: decimal("gross_margins", { precision: 10, scale: 5 }),
    ebitda_margins: decimal("ebitda_margins", { precision: 10, scale: 5 }),
    operating_margins: decimal("operating_margins", {
      precision: 10,
      scale: 5,
    }),
    profit_margins: decimal("profit_margins", { precision: 10, scale: 5 }),
    financial_currency: text("financial_currency"),

    // Metadata
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    pgPolicy("financial_data-select-policy", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`true`,
    }),
  ]
);

export const yahoo_summary_detail = pgTable(
  "yahoo_summary_detail",
  {
    isu_srt_cd: text("isu_srt_cd")
      .references(() => stocks_overview.isu_srt_cd)
      .notNull()
      .primaryKey(),
    // Summary Detail
    previous_close: integer("previous_close"),
    open: integer("open"),
    day_low: integer("day_low"),
    day_high: integer("day_high"),
    dividend_rate: integer("dividend_rate"),
    dividend_yield: decimal("dividend_yield", { precision: 10, scale: 5 }),
    ex_dividend_date: timestamp("ex_dividend_date"),
    payout_ratio: decimal("payout_ratio", { precision: 10, scale: 4 }),
    five_year_avg_dividend_yield: decimal("five_year_avg_dividend_yield", {
      precision: 10,
      scale: 2,
    }),
    beta: decimal("beta", { precision: 10, scale: 3 }),
    volume: integer("volume"),
    average_volume: integer("average_volume"),
    average_volume_10days: integer("average_volume_10days"),
    bid: integer("bid"),
    ask: integer("ask"),
    market_cap: bigint("market_cap", { mode: "number" }),
    fifty_two_week_low: integer("fifty_two_week_low"),
    fifty_two_week_high: integer("fifty_two_week_high"),
    price_to_sales_trailing_12_months: decimal(
      "price_to_sales_trailing_12_months",
      { precision: 10, scale: 8 }
    ),
    fifty_day_average: decimal("fifty_day_average", {
      precision: 10,
      scale: 2,
    }),
    two_hundred_day_average: decimal("two_hundred_day_average", {
      precision: 10,
      scale: 2,
    }),
    currency: text("currency"),

    // Metadata
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    pgPolicy("summary_detail-select-policy", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`true`,
    }),
  ]
);

export const yahoo_default_key_statistics = pgTable(
  "yahoo_default_key_statistics",
  {
    isu_srt_cd: text("isu_srt_cd")
      .references(() => stocks_overview.isu_srt_cd)
      .notNull()
      .primaryKey(),
    // Default Key Statistics
    enterprise_value: bigint("enterprise_value", { mode: "number" }),
    forward_pe: decimal("forward_pe", { precision: 10, scale: 7 }),
    float_shares: integer("float_shares"),
    shares_outstanding: integer("shares_outstanding"),
    held_percent_insiders: decimal("held_percent_insiders", {
      precision: 10,
      scale: 5,
    }),
    held_percent_institutions: decimal("held_percent_institutions", {
      precision: 10,
      scale: 5,
    }),
    implied_shares_outstanding: integer("implied_shares_outstanding"),
    last_fiscal_year_end: timestamp("last_fiscal_year_end"),
    next_fiscal_year_end: timestamp("next_fiscal_year_end"),
    most_recent_quarter: timestamp("most_recent_quarter"),
    earnings_quarterly_growth: decimal("earnings_quarterly_growth", {
      precision: 10,
      scale: 3,
    }),
    net_income_to_common: bigint("net_income_to_common", { mode: "number" }),
    enterprise_to_revenue: decimal("enterprise_to_revenue", {
      precision: 10,
      scale: 3,
    }),
    enterprise_to_ebitda: decimal("enterprise_to_ebitda", {
      precision: 10,
      scale: 3,
    }),
    fifty_two_week_change: decimal("fifty_two_week_change", {
      precision: 10,
      scale: 8,
    }),
    sand_p_fifty_two_week_change: decimal("sand_p_fifty_two_week_change", {
      precision: 10,
      scale: 8,
    }),
    last_dividend_value: integer("last_dividend_value"),
    last_dividend_date: timestamp("last_dividend_date"),
    // Metadata
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    pgPolicy("default_key_statistics-select-policy", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`true`,
    }),
  ]
);

export const stocks_summary_with_ratios = pgTable(
  "stocks_summary_with_ratios",
  {
    isu_srt_cd: text("isu_srt_cd")
      .references(() => stocks_overview.isu_srt_cd)
      .notNull()
      .primaryKey(),
    isu_abbrv: text("isu_abbrv"),
    // Calculated Ratios - increased precision
    trailing_pe: decimal("trailing_pe", { precision: 20, scale: 6 }),
    forward_pe: decimal("forward_pe", { precision: 20, scale: 6 }),
    eps_trailing_twelve_months: decimal("eps_trailing_twelve_months", {
      precision: 20,
      scale: 6,
    }),
    eps_forward: decimal("eps_forward", { precision: 20, scale: 6 }),
    pbr: decimal("pbr", { precision: 20, scale: 6 }),
    pcr: decimal("pcr", { precision: 20, scale: 6 }),
    psr: decimal("psr", { precision: 20, scale: 6 }),
    ev_to_ebitda: decimal("ev_to_ebitda", { precision: 20, scale: 6 }),
    ev_to_revenue: decimal("ev_to_revenue", { precision: 20, scale: 6 }),
    roa: decimal("roa", { precision: 20, scale: 6 }),
    roe: decimal("roe", { precision: 20, scale: 6 }),
    rps: decimal("rps", { precision: 20, scale: 6 }),
    recommendation_key: text("recommendation_key"),
    recommendation_mean: decimal("recommendation_mean", {
      precision: 20,
      scale: 6,
    }),
    beta: decimal("beta", { precision: 20, scale: 6 }),
    // Metadata
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    pgPolicy("calculated_ratios-select-policy", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      using: sql`true`,
    }),
  ]
);
