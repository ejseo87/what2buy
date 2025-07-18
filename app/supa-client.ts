import {
  createBrowserClient,
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import type { Database as SupabaseDatabase } from "~/database.types";
import type { MergeDeep, SetNonNullable } from "type-fest";
import { createClient } from "@supabase/supabase-js";

export type Database = MergeDeep<
  SupabaseDatabase,
  {
    public: {
      Views: {
        recommendation_stocks_view: {
          ROW: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["recommendation_stocks_view"]["Row"]
          >;
        };
        stocks_list_view: {
          ROW: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["stocks_list_view"]["Row"]
          >;
        };
        stock_card_list_view: {
          ROW: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["stock_card_list_view"]["Row"]
          >;
        };
        stock_recommendation_chart_view: {
          ROW: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["stock_recommendation_chart_view"]["Row"]
          >;
        };
        profit_tracking_view: {
          ROW: SetNonNullable<
            SupabaseDatabase["public"]["Views"]["profit_tracking_view"]["Row"]
          >;
        };
      };
    };
  }
>;

export const browserClient = createBrowserClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export const makeSSRClient = (request: Request) => {
  const headers = new Headers();
  const serverSideClient = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = parseCookieHeader(
            request.headers.get("Cookie") ?? ""
          );
          return cookies.map(({ name, value }) => ({
            name,
            value: value ?? "",
          }));
        },
        setAll(
          cookiesToSet: Array<{ name: string; value: string; options?: any }>
        ) {
          cookiesToSet.forEach(({ name, value, options }) => {
            headers.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options)
            );
          });
        },
      },
    }
  );
  return { client: serverSideClient, headers };
};

export const adminClient = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    db: {
      schema: "public",
    },
  }
);
