export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
            referencedRelation: "stocks"
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
      tickets: {
        Row: {
          status: Database["public"]["Enums"]["ticket_status"]
          ticket_description: string | null
          ticket_duration_end: string
          ticket_duration_start: string
          ticket_id: number
          ticket_type: Database["public"]["Enums"]["ticket_types"]
        }
        Insert: {
          status: Database["public"]["Enums"]["ticket_status"]
          ticket_description?: string | null
          ticket_duration_end: string
          ticket_duration_start: string
          ticket_id?: never
          ticket_type: Database["public"]["Enums"]["ticket_types"]
        }
        Update: {
          status?: Database["public"]["Enums"]["ticket_status"]
          ticket_description?: string | null
          ticket_duration_end?: string
          ticket_duration_start?: string
          ticket_id?: never
          ticket_type?: Database["public"]["Enums"]["ticket_types"]
        }
        Relationships: []
      }
      user_ticket_relations: {
        Row: {
          created_at: string
          profile_id: string
          ticket_id: number
        }
        Insert: {
          created_at?: string
          profile_id: string
          ticket_id: number
        }
        Update: {
          created_at?: string
          profile_id?: string
          ticket_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_ticket_relations_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "user_ticket_relations_ticket_id_tickets_ticket_id_fk"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["ticket_id"]
          },
        ]
      }
    }
    Views: {
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
            referencedRelation: "stocks"
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
            referencedRelation: "stocks"
            referencedColumns: ["stock_id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      notification_type:
        | "ticket_expired"
        | "ticket_used"
        | "ticket_created"
        | "ticket_refunded"
        | "promotion"
      role:
        | "developer"
        | "designer"
        | "marketer"
        | "founder"
        | "product-manager"
      ticket_status: "used" | "not_used"
      ticket_types: "free" | "premium"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      notification_type: [
        "ticket_expired",
        "ticket_used",
        "ticket_created",
        "ticket_refunded",
        "promotion",
      ],
      role: ["developer", "designer", "marketer", "founder", "product-manager"],
      ticket_status: ["used", "not_used"],
      ticket_types: ["free", "premium"],
    },
  },
} as const
