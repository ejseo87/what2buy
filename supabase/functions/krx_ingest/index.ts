// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { parse } from "https://deno.land/std@0.224.0/csv/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ────────────────────────────────────────────────────────────
// 0) Supabase 클라이언트 (Service-Role 키 필요: 쓰기권한)
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

// ────────────────────────────────────────────────────────────
// Utility function to ensure 6-digit stock code format
function padStockCodeToSixDigits(stockCode: string): string {
  if (!stockCode) return "000000";
  return stockCode.padStart(6, "0");
}

// ────────────────────────────────────────────────────────────
// 1) KRX CSV 내려받기 (OTP → CSV)
async function fetchKrxCsv(market = "ALL"): Promise<string> {
  // 1-A) OTP
  const otpParams = new URLSearchParams({
    name: "fileDown",
    filetype: "csv",
    mktId: market, // KOSPI | KOSDAQ | KONEX | ALL
    url: "dbms/MDC/STAT/standard/MDCSTAT01901",
  });

  const otpResp = await fetch(
    "https://data.krx.co.kr/comm/fileDn/GenerateOTP/generate.cmd",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        referer: "https://data.krx.co.kr/",
      },
      body: otpParams,
    }
  );
  if (!otpResp.ok) throw new Error("OTP 발급 실패");
  const otp = await otpResp.text();

  // 1-B) CSV
  const csvResp = await fetch(
    "https://data.krx.co.kr/comm/fileDn/download_csv/download.cmd",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        referer: "https://data.krx.co.kr/",
      },
      body: `code=${otp}`,
    }
  );
  if (!csvResp.ok) throw new Error("CSV 다운로드 실패");
  return await csvResp.text();
}

// ────────────────────────────────────────────────────────────
// 2) CSV → 객체 배열로 파싱
interface Row {
  ISU_SRT_CD: string; // 티커
  ISU_ABBRV: string; // 한글명
  MKT_NM: string; // 시장구분
  LIST_DD: string; // 상장일 (yyyymmdd)
  PAR_VAL?: string; // 액면가 (선택)
  STD_CD?: string; // ISIN (선택)
}

function parseCsv(csv: string): Row[] {
  const records = parse(csv, { skipFirstRow: false }) as string[][];
  const [header, ...rows] = records;
  const idx = (col: string) => header.indexOf(col);

  return rows.map((r) => ({
    ISU_SRT_CD: r[idx("단축코드")],
    ISU_ABBRV: r[idx("한글종목명")],
    MKT_NM: r[idx("시장구분")],
    LIST_DD: r[idx("상장일")],
    PAR_VAL: r[idx("액면가")],
    STD_CD: r[idx("표준코드")],
  }));
}

// ────────────────────────────────────────────────────────────
// 3) Supabase upsert (1000 행씩 Chunk 처리)
async function upsertToSupabase(rows: Row[]) {
  const chunks = Array.from({ length: Math.ceil(rows.length / 1000) }, (_, i) =>
    rows.slice(i * 1000, (i + 1) * 1000)
  );

  let inserted = 0;
  for (const c of chunks) {
    const payload = c.map((r) => ({
      isu_cd: r.STD_CD || "",
      isu_srt_cd: padStockCodeToSixDigits(r.ISU_SRT_CD), // Apply 6-digit padding
      isu_nm: r.ISU_ABBRV,
      isu_abbrv: r.ISU_ABBRV,
      isu_eng_nm: r.ISU_ABBRV, // Using Korean name as English name for now
      list_dd: r.LIST_DD,
      mkt_tp_nm: r.MKT_NM,
      secugrp_nm: "주식", // Default value
      sect_tp_nm: null,
      kind_stkcert_tp_nm: "보통주", // Default value
      parval: r.PAR_VAL ? Number(r.PAR_VAL.replace(/,/g, "")) : 0,
      list_shrs: 0, // Default value
      updated_at: new Date().toISOString(),
    }));

    const { error, count } = await supabase
      .from("stocks_overview")
      .upsert(payload, { onConflict: "isu_srt_cd", count: "exact" });

    if (error) throw error;
    inserted += count ?? 0;
  }
  return inserted;
}

// ────────────────────────────────────────────────────────────
// 4) Edge Function 엔트리포인트
serve(async (req) => {
  try {
    const url = new URL(req.url);
    const market = url.searchParams.get("market") ?? "ALL";

    const csv = await fetchKrxCsv(market); // 1)
    const rows = parseCsv(csv); // 2)
    const done = await upsertToSupabase(rows); // 3)

    return new Response(
      JSON.stringify({ ok: true, processed: rows.length, upserted: done }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ ok: false, error: (e as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

/*

이제 데이터베이스에 stocks_overview 테이블을 생성하는 마이그레이션 파일을 만들어보겠습니다

0003_stock_overview.sql

-- Create stocks_overview table for KRX stock data
create table if not exists public.stocks_overview (
  ticker        text primary key,        -- ISU_SRT_CD
  kor_name      text not null,           -- ISU_ABBRV
  market        text not null,           -- MKT_NM
  listed_date   date not null,           -- LIST_DD
  face_value    numeric,                 -- (선택) PAR_VAL
  isin          text,                    -- STD_CD
  updated_at    timestamptz default now()
);

-- Create index for better query performance
create index if not exists idx_stocks_overview_market on public.stocks_overview(market);
create index if not exists idx_stocks_overview_listed_date on public.stocks_overview(listed_date);

-- Add RLS policies
alter table public.stocks_overview enable row level security;

-- Allow read access to all authenticated users
create policy "Allow read access to stocks_overview" on public.stocks_overview
  for select using (auth.role() = 'authenticated');

-- Allow insert/update/delete only to service role (for Edge Function)
create policy "Allow service role full access to stocks_overview" on public.stocks_overview
  for all using (auth.role() = 'service_role');
*/
