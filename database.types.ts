export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      daily_stocks: {
        Row: {
          change: number
          close: number
          created_at: string
          date: string
          high: number
          low: number
          open: number
          stock_id: number
          volume: number
        }
        Insert: {
          change: number
          close: number
          created_at?: string
          date: string
          high: number
          low: number
          open: number
          stock_id: number
          volume: number
        }
        Update: {
          change?: number
          close?: number
          created_at?: string
          date?: string
          high?: number
          low?: number
          open?: number
          stock_id?: number
          volume?: number
        }
        Relationships: [
          {
            foreignKeyName: "daily_stocks_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stock_card_list_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "daily_stocks_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stock_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "daily_stocks_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_chart_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "daily_stocks_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "daily_stocks_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["stock_id"]
          },
        ]
      }
      histories: {
        Row: {
          profile_id: string
          recommendation_date: string
          recommendation_id: number
          stock1_id: number
          stock1_summary: string | null
          stock2_id: number
          stock2_summary: string | null
          stock3_id: number
          stock3_summary: string | null
          summary: string
          ticket_id: number | null
          updated_at: string
        }
        Insert: {
          profile_id: string
          recommendation_date?: string
          recommendation_id?: never
          stock1_id: number
          stock1_summary?: string | null
          stock2_id: number
          stock2_summary?: string | null
          stock3_id: number
          stock3_summary?: string | null
          summary: string
          ticket_id?: number | null
          updated_at?: string
        }
        Update: {
          profile_id?: string
          recommendation_date?: string
          recommendation_id?: never
          stock1_id?: number
          stock1_summary?: string | null
          stock2_id?: number
          stock2_summary?: string | null
          stock3_id?: number
          stock3_summary?: string | null
          summary?: string
          ticket_id?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "histories_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "histories_stock1_id_stocks_stock_id_fk"
            columns: ["stock1_id"]
            isOneToOne: false
            referencedRelation: "stock_card_list_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock1_id_stocks_stock_id_fk"
            columns: ["stock1_id"]
            isOneToOne: false
            referencedRelation: "stock_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock1_id_stocks_stock_id_fk"
            columns: ["stock1_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_chart_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock1_id_stocks_stock_id_fk"
            columns: ["stock1_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock1_id_stocks_stock_id_fk"
            columns: ["stock1_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock2_id_stocks_stock_id_fk"
            columns: ["stock2_id"]
            isOneToOne: false
            referencedRelation: "stock_card_list_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock2_id_stocks_stock_id_fk"
            columns: ["stock2_id"]
            isOneToOne: false
            referencedRelation: "stock_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock2_id_stocks_stock_id_fk"
            columns: ["stock2_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_chart_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock2_id_stocks_stock_id_fk"
            columns: ["stock2_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock2_id_stocks_stock_id_fk"
            columns: ["stock2_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock3_id_stocks_stock_id_fk"
            columns: ["stock3_id"]
            isOneToOne: false
            referencedRelation: "stock_card_list_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock3_id_stocks_stock_id_fk"
            columns: ["stock3_id"]
            isOneToOne: false
            referencedRelation: "stock_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock3_id_stocks_stock_id_fk"
            columns: ["stock3_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_chart_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock3_id_stocks_stock_id_fk"
            columns: ["stock3_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock3_id_stocks_stock_id_fk"
            columns: ["stock3_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_ticket_id_tickets_ticket_id_fk"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["ticket_id"]
          },
        ]
      }
      history_stock_relations: {
        Row: {
          profit: number | null
          profit_rate: number | null
          recommendation_date: string
          recommendation_id: number
          stock_id: number
        }
        Insert: {
          profit?: number | null
          profit_rate?: number | null
          recommendation_date?: string
          recommendation_id: number
          stock_id: number
        }
        Update: {
          profit?: number | null
          profit_rate?: number | null
          recommendation_date?: string
          recommendation_id?: number
          stock_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "history_stock_relations_recommendation_id_histories_recommendat"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "histories"
            referencedColumns: ["recommendation_id"]
          },
          {
            foreignKeyName: "history_stock_relations_recommendation_id_histories_recommendat"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "recommendation_stocks_view"
            referencedColumns: ["recommendation_id"]
          },
          {
            foreignKeyName: "history_stock_relations_recommendation_id_histories_recommendat"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_chart_view"
            referencedColumns: ["recommendation_id"]
          },
          {
            foreignKeyName: "history_stock_relations_recommendation_id_histories_recommendat"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_detail_view"
            referencedColumns: ["recommendation_id"]
          },
          {
            foreignKeyName: "history_stock_relations_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stock_card_list_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "history_stock_relations_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stock_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "history_stock_relations_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_chart_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "history_stock_relations_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "history_stock_relations_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["stock_id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          notification_id: number
          profile_id: string | null
          type: Database["public"]["Enums"]["notification_type"]
        }
        Insert: {
          created_at?: string
          notification_id?: never
          profile_id?: string | null
          type: Database["public"]["Enums"]["notification_type"]
        }
        Update: {
          created_at?: string
          notification_id?: never
          profile_id?: string | null
          type?: Database["public"]["Enums"]["notification_type"]
        }
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string
          name: string
          profile_id: string
          updated_at: string
          username: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          name: string
          profile_id: string
          updated_at?: string
          username: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          name?: string
          profile_id?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      recommendation_histories: {
        Row: {
          overall_summary: string
          profile_id: string
          recommendation_date: string
          recommendation_id: number
          stock1_code: string
          stock1_name: string
          stock1_summary: string
          stock2_code: string
          stock2_name: string
          stock2_summary: string
          stock3_code: string
          stock3_name: string
          stock3_summary: string
          ticket_id: number | null
          total_token: number
          updated_at: string
        }
        Insert: {
          overall_summary: string
          profile_id: string
          recommendation_date?: string
          recommendation_id?: never
          stock1_code: string
          stock1_name: string
          stock1_summary: string
          stock2_code: string
          stock2_name: string
          stock2_summary: string
          stock3_code: string
          stock3_name: string
          stock3_summary: string
          ticket_id?: number | null
          total_token: number
          updated_at?: string
        }
        Update: {
          overall_summary?: string
          profile_id?: string
          recommendation_date?: string
          recommendation_id?: never
          stock1_code?: string
          stock1_name?: string
          stock1_summary?: string
          stock2_code?: string
          stock2_name?: string
          stock2_summary?: string
          stock3_code?: string
          stock3_name?: string
          stock3_summary?: string
          ticket_id?: number | null
          total_token?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendation_histories_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "recommendation_histories_stock1_code_stocks_overview_isu_srt_cd"
            columns: ["stock1_code"]
            isOneToOne: false
            referencedRelation: "get_no_warging_stock_list_view"
            referencedColumns: ["isu_srt_cd"]
          },
          {
            foreignKeyName: "recommendation_histories_stock1_code_stocks_overview_isu_srt_cd"
            columns: ["stock1_code"]
            isOneToOne: false
            referencedRelation: "stocks_overview"
            referencedColumns: ["isu_srt_cd"]
          },
          {
            foreignKeyName: "recommendation_histories_stock2_code_stocks_overview_isu_srt_cd"
            columns: ["stock2_code"]
            isOneToOne: false
            referencedRelation: "get_no_warging_stock_list_view"
            referencedColumns: ["isu_srt_cd"]
          },
          {
            foreignKeyName: "recommendation_histories_stock2_code_stocks_overview_isu_srt_cd"
            columns: ["stock2_code"]
            isOneToOne: false
            referencedRelation: "stocks_overview"
            referencedColumns: ["isu_srt_cd"]
          },
          {
            foreignKeyName: "recommendation_histories_stock3_code_stocks_overview_isu_srt_cd"
            columns: ["stock3_code"]
            isOneToOne: false
            referencedRelation: "get_no_warging_stock_list_view"
            referencedColumns: ["isu_srt_cd"]
          },
          {
            foreignKeyName: "recommendation_histories_stock3_code_stocks_overview_isu_srt_cd"
            columns: ["stock3_code"]
            isOneToOne: false
            referencedRelation: "stocks_overview"
            referencedColumns: ["isu_srt_cd"]
          },
          {
            foreignKeyName: "recommendation_histories_ticket_id_tickets_ticket_id_fk"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["ticket_id"]
          },
        ]
      }
      stocks: {
        Row: {
          bps: number | null
          created_at: string
          dividend_per_share: number
          eps: number | null
          pbr: number | null
          per: number | null
          roe: number | null
          stock_code: string
          stock_count: number
          stock_id: number
          stock_name: string
          updated_at: string
        }
        Insert: {
          bps?: number | null
          created_at?: string
          dividend_per_share: number
          eps?: number | null
          pbr?: number | null
          per?: number | null
          roe?: number | null
          stock_code: string
          stock_count: number
          stock_id?: never
          stock_name: string
          updated_at?: string
        }
        Update: {
          bps?: number | null
          created_at?: string
          dividend_per_share?: number
          eps?: number | null
          pbr?: number | null
          per?: number | null
          roe?: number | null
          stock_code?: string
          stock_count?: number
          stock_id?: never
          stock_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      stocks_historical_data: {
        Row: {
          close: number
          created_at: string
          date: string
          high: number
          isu_srt_cd: string
          low: number
          open: number
          volume: number
        }
        Insert: {
          close: number
          created_at?: string
          date: string
          high: number
          isu_srt_cd: string
          low: number
          open: number
          volume: number
        }
        Update: {
          close?: number
          created_at?: string
          date?: string
          high?: number
          isu_srt_cd?: string
          low?: number
          open?: number
          volume?: number
        }
        Relationships: [
          {
            foreignKeyName: "stocks_historical_data_isu_srt_cd_stocks_overview_isu_srt_cd_fk"
            columns: ["isu_srt_cd"]
            isOneToOne: false
            referencedRelation: "get_no_warging_stock_list_view"
            referencedColumns: ["isu_srt_cd"]
          },
          {
            foreignKeyName: "stocks_historical_data_isu_srt_cd_stocks_overview_isu_srt_cd_fk"
            columns: ["isu_srt_cd"]
            isOneToOne: false
            referencedRelation: "stocks_overview"
            referencedColumns: ["isu_srt_cd"]
          },
        ]
      }
      stocks_overview: {
        Row: {
          created_at: string
          isu_abbrv: string
          isu_cd: string
          isu_eng_nm: string
          isu_id: number
          isu_nm: string
          isu_srt_cd: string
          kind_stkcert_tp_nm: string
          list_dd: string
          list_shrs: number
          mkt_tp_nm: string
          parval: number
          sect_tp_nm: string | null
          secugrp_nm: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          isu_abbrv: string
          isu_cd: string
          isu_eng_nm: string
          isu_id?: never
          isu_nm: string
          isu_srt_cd: string
          kind_stkcert_tp_nm: string
          list_dd: string
          list_shrs: number
          mkt_tp_nm: string
          parval: number
          sect_tp_nm?: string | null
          secugrp_nm: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          isu_abbrv?: string
          isu_cd?: string
          isu_eng_nm?: string
          isu_id?: never
          isu_nm?: string
          isu_srt_cd?: string
          kind_stkcert_tp_nm?: string
          list_dd?: string
          list_shrs?: number
          mkt_tp_nm?: string
          parval?: number
          sect_tp_nm?: string | null
          secugrp_nm?: string
          updated_at?: string
        }
        Relationships: []
      }
      stocks_summary_with_ratios: {
        Row: {
          beta: number | null
          created_at: string | null
          eps_forward: number | null
          eps_trailing_twelve_months: number | null
          ev_to_ebitda: number | null
          ev_to_revenue: number | null
          forward_pe: number | null
          isu_abbrv: string | null
          isu_srt_cd: string
          pbr: number | null
          pcr: number | null
          psr: number | null
          recommendation_key: string | null
          recommendation_mean: number | null
          roa: number | null
          roe: number | null
          rps: number | null
          trailing_pe: number | null
          updated_at: string | null
        }
        Insert: {
          beta?: number | null
          created_at?: string | null
          eps_forward?: number | null
          eps_trailing_twelve_months?: number | null
          ev_to_ebitda?: number | null
          ev_to_revenue?: number | null
          forward_pe?: number | null
          isu_abbrv?: string | null
          isu_srt_cd: string
          pbr?: number | null
          pcr?: number | null
          psr?: number | null
          recommendation_key?: string | null
          recommendation_mean?: number | null
          roa?: number | null
          roe?: number | null
          rps?: number | null
          trailing_pe?: number | null
          updated_at?: string | null
        }
        Update: {
          beta?: number | null
          created_at?: string | null
          eps_forward?: number | null
          eps_trailing_twelve_months?: number | null
          ev_to_ebitda?: number | null
          ev_to_revenue?: number | null
          forward_pe?: number | null
          isu_abbrv?: string | null
          isu_srt_cd?: string
          pbr?: number | null
          pcr?: number | null
          psr?: number | null
          recommendation_key?: string | null
          recommendation_mean?: number | null
          roa?: number | null
          roe?: number | null
          rps?: number | null
          trailing_pe?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stocks_summary_with_ratios_isu_srt_cd_stocks_overview_isu_srt_c"
            columns: ["isu_srt_cd"]
            isOneToOne: true
            referencedRelation: "get_no_warging_stock_list_view"
            referencedColumns: ["isu_srt_cd"]
          },
          {
            foreignKeyName: "stocks_summary_with_ratios_isu_srt_cd_stocks_overview_isu_srt_c"
            columns: ["isu_srt_cd"]
            isOneToOne: true
            referencedRelation: "stocks_overview"
            referencedColumns: ["isu_srt_cd"]
          },
        ]
      }
      stocks_wargings: {
        Row: {
          administrative_issue: string
          created_at: string
          delisting_liquidation: string
          insufficient_listed_shares_pref: string
          investment_caution: string
          investment_caution_realert: string
          investment_risk: string
          investment_warning: string
          isu_abbrv: string
          isu_srt_cd: string
          short_term_overheated: string
          super_low_liquidity_single_price: string
          trading_suspension: string
          unfaithful_disclosure: string
          updated_at: string
        }
        Insert: {
          administrative_issue: string
          created_at?: string
          delisting_liquidation: string
          insufficient_listed_shares_pref: string
          investment_caution: string
          investment_caution_realert: string
          investment_risk: string
          investment_warning: string
          isu_abbrv: string
          isu_srt_cd: string
          short_term_overheated: string
          super_low_liquidity_single_price: string
          trading_suspension: string
          unfaithful_disclosure: string
          updated_at?: string
        }
        Update: {
          administrative_issue?: string
          created_at?: string
          delisting_liquidation?: string
          insufficient_listed_shares_pref?: string
          investment_caution?: string
          investment_caution_realert?: string
          investment_risk?: string
          investment_warning?: string
          isu_abbrv?: string
          isu_srt_cd?: string
          short_term_overheated?: string
          super_low_liquidity_single_price?: string
          trading_suspension?: string
          unfaithful_disclosure?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stocks_wargings_isu_srt_cd_stocks_overview_isu_srt_cd_fk"
            columns: ["isu_srt_cd"]
            isOneToOne: false
            referencedRelation: "get_no_warging_stock_list_view"
            referencedColumns: ["isu_srt_cd"]
          },
          {
            foreignKeyName: "stocks_wargings_isu_srt_cd_stocks_overview_isu_srt_cd_fk"
            columns: ["isu_srt_cd"]
            isOneToOne: false
            referencedRelation: "stocks_overview"
            referencedColumns: ["isu_srt_cd"]
          },
        ]
      }
      tickets: {
        Row: {
          created_at: string
          profile_id: string
          status: Database["public"]["Enums"]["ticket_status"]
          ticket_description: string | null
          ticket_duration_end: string
          ticket_duration_start: string
          ticket_id: number
          ticket_type: Database["public"]["Enums"]["ticket_types"]
          updated_at: string
          used_date: string | null
        }
        Insert: {
          created_at?: string
          profile_id: string
          status: Database["public"]["Enums"]["ticket_status"]
          ticket_description?: string | null
          ticket_duration_end: string
          ticket_duration_start: string
          ticket_id?: never
          ticket_type: Database["public"]["Enums"]["ticket_types"]
          updated_at?: string
          used_date?: string | null
        }
        Update: {
          created_at?: string
          profile_id?: string
          status?: Database["public"]["Enums"]["ticket_status"]
          ticket_description?: string | null
          ticket_duration_end?: string
          ticket_duration_start?: string
          ticket_id?: never
          ticket_type?: Database["public"]["Enums"]["ticket_types"]
          updated_at?: string
          used_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      yahoo_default_key_statistics: {
        Row: {
          created_at: string | null
          earnings_quarterly_growth: number | null
          enterprise_to_ebitda: number | null
          enterprise_to_revenue: number | null
          enterprise_value: number | null
          fifty_two_week_change: number | null
          float_shares: number | null
          forward_pe: number | null
          held_percent_insiders: number | null
          held_percent_institutions: number | null
          implied_shares_outstanding: number | null
          isu_srt_cd: string
          last_dividend_date: string | null
          last_dividend_value: number | null
          last_fiscal_year_end: string | null
          most_recent_quarter: string | null
          net_income_to_common: number | null
          next_fiscal_year_end: string | null
          sand_p_fifty_two_week_change: number | null
          shares_outstanding: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          earnings_quarterly_growth?: number | null
          enterprise_to_ebitda?: number | null
          enterprise_to_revenue?: number | null
          enterprise_value?: number | null
          fifty_two_week_change?: number | null
          float_shares?: number | null
          forward_pe?: number | null
          held_percent_insiders?: number | null
          held_percent_institutions?: number | null
          implied_shares_outstanding?: number | null
          isu_srt_cd: string
          last_dividend_date?: string | null
          last_dividend_value?: number | null
          last_fiscal_year_end?: string | null
          most_recent_quarter?: string | null
          net_income_to_common?: number | null
          next_fiscal_year_end?: string | null
          sand_p_fifty_two_week_change?: number | null
          shares_outstanding?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          earnings_quarterly_growth?: number | null
          enterprise_to_ebitda?: number | null
          enterprise_to_revenue?: number | null
          enterprise_value?: number | null
          fifty_two_week_change?: number | null
          float_shares?: number | null
          forward_pe?: number | null
          held_percent_insiders?: number | null
          held_percent_institutions?: number | null
          implied_shares_outstanding?: number | null
          isu_srt_cd?: string
          last_dividend_date?: string | null
          last_dividend_value?: number | null
          last_fiscal_year_end?: string | null
          most_recent_quarter?: string | null
          net_income_to_common?: number | null
          next_fiscal_year_end?: string | null
          sand_p_fifty_two_week_change?: number | null
          shares_outstanding?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "yahoo_default_key_statistics_isu_srt_cd_stocks_overview_isu_srt"
            columns: ["isu_srt_cd"]
            isOneToOne: true
            referencedRelation: "get_no_warging_stock_list_view"
            referencedColumns: ["isu_srt_cd"]
          },
          {
            foreignKeyName: "yahoo_default_key_statistics_isu_srt_cd_stocks_overview_isu_srt"
            columns: ["isu_srt_cd"]
            isOneToOne: true
            referencedRelation: "stocks_overview"
            referencedColumns: ["isu_srt_cd"]
          },
        ]
      }
      yahoo_financial_data: {
        Row: {
          created_at: string | null
          current_price: number | null
          current_ratio: number | null
          debt_to_equity: number | null
          earnings_growth: number | null
          ebitda: number | null
          ebitda_margins: number | null
          financial_currency: string | null
          free_cashflow: number | null
          gross_margins: number | null
          gross_profits: number | null
          isu_srt_cd: string
          number_of_analyst_opinions: number | null
          operating_cashflow: number | null
          operating_margins: number | null
          profit_margins: number | null
          quick_ratio: number | null
          recommendation_key: string | null
          recommendation_mean: number | null
          return_on_assets: number | null
          return_on_equity: number | null
          revenue_growth: number | null
          revenue_per_share: number | null
          target_high_price: number | null
          target_low_price: number | null
          target_mean_price: number | null
          target_median_price: number | null
          total_cash: number | null
          total_cash_per_share: number | null
          total_debt: number | null
          total_revenue: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_price?: number | null
          current_ratio?: number | null
          debt_to_equity?: number | null
          earnings_growth?: number | null
          ebitda?: number | null
          ebitda_margins?: number | null
          financial_currency?: string | null
          free_cashflow?: number | null
          gross_margins?: number | null
          gross_profits?: number | null
          isu_srt_cd: string
          number_of_analyst_opinions?: number | null
          operating_cashflow?: number | null
          operating_margins?: number | null
          profit_margins?: number | null
          quick_ratio?: number | null
          recommendation_key?: string | null
          recommendation_mean?: number | null
          return_on_assets?: number | null
          return_on_equity?: number | null
          revenue_growth?: number | null
          revenue_per_share?: number | null
          target_high_price?: number | null
          target_low_price?: number | null
          target_mean_price?: number | null
          target_median_price?: number | null
          total_cash?: number | null
          total_cash_per_share?: number | null
          total_debt?: number | null
          total_revenue?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_price?: number | null
          current_ratio?: number | null
          debt_to_equity?: number | null
          earnings_growth?: number | null
          ebitda?: number | null
          ebitda_margins?: number | null
          financial_currency?: string | null
          free_cashflow?: number | null
          gross_margins?: number | null
          gross_profits?: number | null
          isu_srt_cd?: string
          number_of_analyst_opinions?: number | null
          operating_cashflow?: number | null
          operating_margins?: number | null
          profit_margins?: number | null
          quick_ratio?: number | null
          recommendation_key?: string | null
          recommendation_mean?: number | null
          return_on_assets?: number | null
          return_on_equity?: number | null
          revenue_growth?: number | null
          revenue_per_share?: number | null
          target_high_price?: number | null
          target_low_price?: number | null
          target_mean_price?: number | null
          target_median_price?: number | null
          total_cash?: number | null
          total_cash_per_share?: number | null
          total_debt?: number | null
          total_revenue?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "yahoo_financial_data_isu_srt_cd_stocks_overview_isu_srt_cd_fk"
            columns: ["isu_srt_cd"]
            isOneToOne: true
            referencedRelation: "get_no_warging_stock_list_view"
            referencedColumns: ["isu_srt_cd"]
          },
          {
            foreignKeyName: "yahoo_financial_data_isu_srt_cd_stocks_overview_isu_srt_cd_fk"
            columns: ["isu_srt_cd"]
            isOneToOne: true
            referencedRelation: "stocks_overview"
            referencedColumns: ["isu_srt_cd"]
          },
        ]
      }
      yahoo_summary_detail: {
        Row: {
          ask: number | null
          average_volume: number | null
          average_volume_10days: number | null
          beta: number | null
          bid: number | null
          created_at: string | null
          currency: string | null
          day_high: number | null
          day_low: number | null
          dividend_rate: number | null
          dividend_yield: number | null
          ex_dividend_date: string | null
          fifty_day_average: number | null
          fifty_two_week_high: number | null
          fifty_two_week_low: number | null
          five_year_avg_dividend_yield: number | null
          isu_srt_cd: string
          market_cap: number | null
          open: number | null
          payout_ratio: number | null
          previous_close: number | null
          price_to_sales_trailing_12_months: number | null
          two_hundred_day_average: number | null
          updated_at: string | null
          volume: number | null
        }
        Insert: {
          ask?: number | null
          average_volume?: number | null
          average_volume_10days?: number | null
          beta?: number | null
          bid?: number | null
          created_at?: string | null
          currency?: string | null
          day_high?: number | null
          day_low?: number | null
          dividend_rate?: number | null
          dividend_yield?: number | null
          ex_dividend_date?: string | null
          fifty_day_average?: number | null
          fifty_two_week_high?: number | null
          fifty_two_week_low?: number | null
          five_year_avg_dividend_yield?: number | null
          isu_srt_cd: string
          market_cap?: number | null
          open?: number | null
          payout_ratio?: number | null
          previous_close?: number | null
          price_to_sales_trailing_12_months?: number | null
          two_hundred_day_average?: number | null
          updated_at?: string | null
          volume?: number | null
        }
        Update: {
          ask?: number | null
          average_volume?: number | null
          average_volume_10days?: number | null
          beta?: number | null
          bid?: number | null
          created_at?: string | null
          currency?: string | null
          day_high?: number | null
          day_low?: number | null
          dividend_rate?: number | null
          dividend_yield?: number | null
          ex_dividend_date?: string | null
          fifty_day_average?: number | null
          fifty_two_week_high?: number | null
          fifty_two_week_low?: number | null
          five_year_avg_dividend_yield?: number | null
          isu_srt_cd?: string
          market_cap?: number | null
          open?: number | null
          payout_ratio?: number | null
          previous_close?: number | null
          price_to_sales_trailing_12_months?: number | null
          two_hundred_day_average?: number | null
          updated_at?: string | null
          volume?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "yahoo_summary_detail_isu_srt_cd_stocks_overview_isu_srt_cd_fk"
            columns: ["isu_srt_cd"]
            isOneToOne: true
            referencedRelation: "get_no_warging_stock_list_view"
            referencedColumns: ["isu_srt_cd"]
          },
          {
            foreignKeyName: "yahoo_summary_detail_isu_srt_cd_stocks_overview_isu_srt_cd_fk"
            columns: ["isu_srt_cd"]
            isOneToOne: true
            referencedRelation: "stocks_overview"
            referencedColumns: ["isu_srt_cd"]
          },
        ]
      }
    }
    Views: {
      get_good_stocks_list_view: {
        Row: {
          analyst_recommendation: string | null
          english_name: string | null
          ev_to_ebitda: number | null
          ev_to_revenue: number | null
          forward_price_to_earnings_ratio: number | null
          korean_name: string | null
          list_shares: number | null
          market_type: string | null
          par_value: number | null
          price_to_book_ratio: number | null
          return_on_assets: number | null
          return_on_equity: number | null
          revenue_per_share: number | null
          stock_code: string | null
          trailing_price_to_earnings_ratio: number | null
        }
        Relationships: [
          {
            foreignKeyName: "stocks_summary_with_ratios_isu_srt_cd_stocks_overview_isu_srt_c"
            columns: ["stock_code"]
            isOneToOne: true
            referencedRelation: "get_no_warging_stock_list_view"
            referencedColumns: ["isu_srt_cd"]
          },
          {
            foreignKeyName: "stocks_summary_with_ratios_isu_srt_cd_stocks_overview_isu_srt_c"
            columns: ["stock_code"]
            isOneToOne: true
            referencedRelation: "stocks_overview"
            referencedColumns: ["isu_srt_cd"]
          },
        ]
      }
      get_no_warging_stock_list_view: {
        Row: {
          isu_abbrv: string | null
          isu_srt_cd: string | null
          kind_stkcert_tp_nm: string | null
          list_shrs: number | null
          mkt_tp_nm: string | null
          parval: number | null
          secugrp_nm: string | null
        }
        Relationships: []
      }
      profit_tracking_view: {
        Row: {
          current_price: number | null
          current_price_date: string | null
          profile_id: string | null
          profit_amount: number | null
          profit_rate: number | null
          recommendation_date: string | null
          recommendation_id: number | null
          recommended_price: number | null
          recommended_price_date: string | null
          stock_code: string | null
          stock_id: number | null
          stock_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "histories_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "history_stock_relations_recommendation_id_histories_recommendat"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "histories"
            referencedColumns: ["recommendation_id"]
          },
          {
            foreignKeyName: "history_stock_relations_recommendation_id_histories_recommendat"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "recommendation_stocks_view"
            referencedColumns: ["recommendation_id"]
          },
          {
            foreignKeyName: "history_stock_relations_recommendation_id_histories_recommendat"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_chart_view"
            referencedColumns: ["recommendation_id"]
          },
          {
            foreignKeyName: "history_stock_relations_recommendation_id_histories_recommendat"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_detail_view"
            referencedColumns: ["recommendation_id"]
          },
          {
            foreignKeyName: "history_stock_relations_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stock_card_list_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "history_stock_relations_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stock_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "history_stock_relations_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_chart_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "history_stock_relations_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "history_stock_relations_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["stock_id"]
          },
        ]
      }
      recommendation_stocks_view: {
        Row: {
          profile_id: string | null
          recommendation_date: string | null
          recommendation_id: number | null
          stock1_dividend_per_share: number | null
          stock1_id: number | null
          stock1_name: string | null
          stock1_pbr: number | null
          stock1_per: number | null
          stock1_roe: number | null
          stock1_summary: string | null
          stock2_dividend_per_share: number | null
          stock2_id: number | null
          stock2_name: string | null
          stock2_pbr: number | null
          stock2_per: number | null
          stock2_roe: number | null
          stock2_summary: string | null
          stock3_dividend_per_share: number | null
          stock3_id: number | null
          stock3_name: string | null
          stock3_pbr: number | null
          stock3_per: number | null
          stock3_roe: number | null
          stock3_summary: string | null
          summary: string | null
        }
        Relationships: [
          {
            foreignKeyName: "histories_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "histories_stock1_id_stocks_stock_id_fk"
            columns: ["stock1_id"]
            isOneToOne: false
            referencedRelation: "stock_card_list_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock1_id_stocks_stock_id_fk"
            columns: ["stock1_id"]
            isOneToOne: false
            referencedRelation: "stock_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock1_id_stocks_stock_id_fk"
            columns: ["stock1_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_chart_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock1_id_stocks_stock_id_fk"
            columns: ["stock1_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock1_id_stocks_stock_id_fk"
            columns: ["stock1_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock2_id_stocks_stock_id_fk"
            columns: ["stock2_id"]
            isOneToOne: false
            referencedRelation: "stock_card_list_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock2_id_stocks_stock_id_fk"
            columns: ["stock2_id"]
            isOneToOne: false
            referencedRelation: "stock_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock2_id_stocks_stock_id_fk"
            columns: ["stock2_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_chart_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock2_id_stocks_stock_id_fk"
            columns: ["stock2_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock2_id_stocks_stock_id_fk"
            columns: ["stock2_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock3_id_stocks_stock_id_fk"
            columns: ["stock3_id"]
            isOneToOne: false
            referencedRelation: "stock_card_list_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock3_id_stocks_stock_id_fk"
            columns: ["stock3_id"]
            isOneToOne: false
            referencedRelation: "stock_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock3_id_stocks_stock_id_fk"
            columns: ["stock3_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_chart_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock3_id_stocks_stock_id_fk"
            columns: ["stock3_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "histories_stock3_id_stocks_stock_id_fk"
            columns: ["stock3_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["stock_id"]
          },
        ]
      }
      stock_card_list_view: {
        Row: {
          pbr: number | null
          per: number | null
          profile_id: string | null
          recommendation_count: number | null
          recommendation_dates: string[] | null
          stock_code: string | null
          stock_id: number | null
          stock_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "histories_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      stock_detail_view: {
        Row: {
          bps: number | null
          current_price: number | null
          current_price_date: string | null
          dividend_per_share: number | null
          eps: number | null
          high: number | null
          low: number | null
          open: number | null
          pbr: number | null
          per: number | null
          roe: number | null
          stock_code: string | null
          stock_count: number | null
          stock_id: number | null
          stock_name: string | null
          volume: number | null
        }
        Relationships: []
      }
      stock_recommendation_chart_view: {
        Row: {
          chart_prices: Json | null
          latest_close: number | null
          recommendation_close: number | null
          recommendation_date: string | null
          recommendation_id: number | null
          stock_id: number | null
          stock_name: string | null
        }
        Relationships: []
      }
      stock_recommendation_detail_view: {
        Row: {
          bps: number | null
          current_price: number | null
          dividend_per_share: number | null
          eps: number | null
          pbr: number | null
          per: number | null
          profile_id: string | null
          profit_amount: number | null
          profit_rate: number | null
          recommendation_date: string | null
          recommendation_id: number | null
          recommended_price: number | null
          roe: number | null
          stock_code: string | null
          stock_id: number | null
          stock_name: string | null
          stock_position: number | null
          summary: string | null
        }
        Relationships: [
          {
            foreignKeyName: "histories_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      stocks_list_view: {
        Row: {
          dividend_per_share: number | null
          pbr: number | null
          per: number | null
          profit: number | null
          profit_rate: number | null
          recommendation_date: string | null
          recommendation_id: number | null
          roe: number | null
          stock_code: string | null
          stock_count: number | null
          stock_id: number | null
          stock_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "history_stock_relations_recommendation_id_histories_recommendat"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "histories"
            referencedColumns: ["recommendation_id"]
          },
          {
            foreignKeyName: "history_stock_relations_recommendation_id_histories_recommendat"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "recommendation_stocks_view"
            referencedColumns: ["recommendation_id"]
          },
          {
            foreignKeyName: "history_stock_relations_recommendation_id_histories_recommendat"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_chart_view"
            referencedColumns: ["recommendation_id"]
          },
          {
            foreignKeyName: "history_stock_relations_recommendation_id_histories_recommendat"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_detail_view"
            referencedColumns: ["recommendation_id"]
          },
          {
            foreignKeyName: "history_stock_relations_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stock_card_list_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "history_stock_relations_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stock_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "history_stock_relations_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_chart_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "history_stock_relations_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stock_recommendation_detail_view"
            referencedColumns: ["stock_id"]
          },
          {
            foreignKeyName: "history_stock_relations_stock_id_stocks_stock_id_fk"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["stock_id"]
          },
        ]
      }
    }
    Functions: {
      cleanup_old_avatars: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      notification_type: "alert" | "system" | "promotion" | "information"
      ticket_status: "used" | "not_used" | "expired"
      ticket_types: "free" | "premium"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      notification_type: ["alert", "system", "promotion", "information"],
      ticket_status: ["used", "not_used", "expired"],
      ticket_types: ["free", "premium"],
    },
  },
} as const
