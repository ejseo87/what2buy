import { createClient } from "@supabase/supabase-js";
import type { Database as SupabaseDatabase } from "../database.types";
import type { MergeDeep, SetNonNullable } from "type-fest";

const client = createClient<
  MergeDeep<
    SupabaseDatabase,
    {
      public: {
        Views: {
          recommendation_stocks_view: {
            ROW: SetNonNullable<
              SupabaseDatabase["public"]["Tables"]["recommendation_stocks_view"]["Row"]
            >;
          };
          stocks_list_view: {
            ROW: SetNonNullable<
              SupabaseDatabase["public"]["Tables"]["stocks_list_view"]["Row"]
            >;
          };
          stocks_cards_list_view: {
            ROW: SetNonNullable<
              SupabaseDatabase["public"]["Tables"]["stock_card_list_view"]["Row"]
            >;
          };
          stock_recommendation_chart_view: {
            ROW: SetNonNullable<
              SupabaseDatabase["public"]["Tables"]["stock_recommendation_chart_view"]["Row"]
            >;
          };
        };
      };
    }
  >
>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export default client;
