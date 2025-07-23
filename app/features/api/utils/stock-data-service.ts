// TypeScript로 주식 데이터를 가져오는 서비스
// 실제 API 호출을 통해 데이터를 가져옵니다

export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

export interface StockHistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockInfo {
  symbol: string;
  name: string;
  sector: string;
  industry: string;
  marketCap: number;
  peRatio: number;
  dividendYield: number;
  beta: number;
}

// Earnings 데이터 인터페이스 추가
export interface EarningsData {
  symbol: string;
  quarterly: Array<{
    date: string;
    actual: number;
    estimate: number;
    surprise: number;
    surprisePercent: number;
  }>;
  yearly: Array<{
    year: number;
    revenue: number;
    earnings: number;
  }>;
  nextAnnouncements: Array<{
    start: string;
    end: string;
  }>;
  summary: {
    lastQuarter: {
      date: string;
      actual: number;
      estimate: number;
      surprise: number;
    };
    nextEarnings: string;
    averageSurprise: number;
  };
}

/**
 * Ensures that the stock code is always 6 digits with leading zeros
 * @param stockCode - The stock code to pad
 * @returns The stock code padded to 6 digits with leading zeros
 */
export function padStockCodeToSixDigits(stockCode: string): string {
  if (!stockCode) return "000000";
  return stockCode.padStart(6, "0");
}

/**
 * Transforms stock data to ensure isu_srt_cd is properly formatted
 * @param stockData - The stock data object
 * @returns The stock data with isu_srt_cd properly formatted
 */
export function transformStockData(stockData: {
  isu_srt_cd: string;
  [key: string]: any;
}) {
  return {
    ...stockData,
    isu_srt_cd: padStockCodeToSixDigits(stockData.isu_srt_cd),
  };
}

// Yahoo Finance API를 사용한 주식 데이터 가져오기
export class StockDataService {
  private static readonly YAHOO_FINANCE_BASE_URL =
    "https://query1.finance.yahoo.com/v8/finance/chart";

  // Yahoo Finance API를 사용한 실시간 주가 데이터 가져오기
  static async getStockQuote(symbol: string): Promise<StockQuote> {
    try {
      const response = await fetch(
        `${this.YAHOO_FINANCE_BASE_URL}/${symbol}?interval=1d&range=1d`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch stock data for ${symbol}`);
      }

      const data = await response.json();
      const result = data.chart.result[0];
      const quote = result.indicators.quote[0];
      const meta = result.meta;

      return {
        symbol: symbol,
        name: meta.symbol,
        price: meta.regularMarketPrice,
        change: meta.regularMarketPrice - meta.previousClose,
        changePercent:
          ((meta.regularMarketPrice - meta.previousClose) /
            meta.previousClose) *
          100,
        marketCap: meta.marketCap || 0,
        volume: quote.volume[0] || 0,
        high: quote.high[0] || 0,
        low: quote.low[0] || 0,
        open: quote.open[0] || 0,
        previousClose: meta.previousClose,
      };
    } catch (error) {
      console.error(`Error fetching stock quote for ${symbol}:`, error);
      throw new Error(`Failed to fetch stock quote for ${symbol}`);
    }
  }

  // Yahoo Finance API를 사용한 과거 주가 데이터 가져오기
  static async getStockHistoricalData(
    symbol: string,
    startDate: string,
    endDate: string
  ): Promise<StockHistoricalData[]> {
    try {
      const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
      const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);

      const response = await fetch(
        `${this.YAHOO_FINANCE_BASE_URL}/${symbol}?interval=1d&period1=${startTimestamp}&period2=${endTimestamp}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch historical data for ${symbol}`);
      }

      const data = await response.json();

      // Check if the response has the expected structure
      if (!data.chart || !data.chart.result || !data.chart.result[0]) {
        console.warn(`No chart data available for ${symbol}`);
        return [];
      }

      const result = data.chart.result[0];

      // Check if timestamps and indicators exist
      if (
        !result.timestamp ||
        !result.indicators ||
        !result.indicators.quote ||
        !result.indicators.quote[0]
      ) {
        //console.warn(`Missing timestamp or quote data for ${symbol}`);
        return [];
      }

      const timestamps = result.timestamp;
      const quote = result.indicators.quote[0];

      const historicalData: StockHistoricalData[] = [];

      for (let i = 0; i < timestamps.length; i++) {
        if (quote.open[i] && quote.high[i] && quote.low[i] && quote.close[i]) {
          historicalData.push({
            date: new Date(timestamps[i] * 1000).toISOString().split("T")[0],
            open: quote.open[i],
            high: quote.high[i],
            low: quote.low[i],
            close: quote.close[i],
            volume: quote.volume[i] || 0,
          });
        }
      }

      return historicalData;
    } catch (error) {
      console.error(
        `Error fetching historical data for ${symbol}:`,
        error instanceof Error ? error.message : String(error)
      );
      return [];
    }
  }

  // Yahoo Finance API를 사용한 종목 검색
  static async searchStocks(
    query: string,
    limit: number = 20
  ): Promise<StockInfo[]> {
    try {
      // Yahoo Finance 검색 API 사용
      const response = await fetch(
        `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(
          query
        )}&quotesCount=${limit}`
      );

      if (!response.ok) {
        throw new Error("Failed to search stocks");
      }

      const data = await response.json();
      const quotes = data.quotes || [];

      return quotes.map((quote: any) => ({
        symbol: quote.symbol,
        name: quote.longname || quote.shortname,
        sector: quote.sector || "Unknown",
        industry: quote.industry || "Unknown",
        marketCap: quote.marketCap || 0,
        peRatio: quote.trailingPE || 0,
        dividendYield: quote.trailingAnnualDividendYield || 0,
        beta: quote.beta || 0,
      }));
    } catch (error) {
      console.error("Error searching stocks:", error);
      throw new Error("Failed to search stocks");
    }
  }

  // Yahoo Finance API를 사용한 한국 주식 심볼 변환 (예: 005930 -> 005930.KS)
  static formatKoreanSymbol(symbol: string): string {
    if (symbol.includes(".")) {
      return symbol;
    }
    return `${symbol}.KS`;
  }

  // Yahoo Finance API를 사용한 여러 종목의 실시간 데이터 가져오기
  static async getMultipleStockQuotes(
    symbols: string[]
  ): Promise<StockQuote[]> {
    const quotes: StockQuote[] = [];

    for (const symbol of symbols) {
      try {
        const formattedSymbol = this.formatKoreanSymbol(symbol);
        const quote = await this.getStockQuote(formattedSymbol);
        quotes.push(quote);
      } catch (error) {
        console.error(`Failed to fetch quote for ${symbol}:`, error);
      }
    }

    return quotes;
  }

 
}

// 한국 주식 데이터를 위한 특별한 서비스
export class KoreanStockDataService {
  // private static readonly KRX_API_BASE_URL =
  //   "https://api.krx.co.kr/comm/bldAttendant/getJsonData.cmd";

  // 한국 주식 목록 가져오기 (확장된 예시 데이터)
  static async getKoreanStockList(): Promise<any[]> {
    try {
      // 실제 운영에서는 KRX API를 사용하지만, 개발 환경에서는 예시 데이터 사용
      // KRX API는 CORS 정책으로 인해 브라우저에서 직접 호출이 제한됨
      console.log("한국 주식 데이터를 가져오는 중... (예시 데이터 사용)");

      // 실제 KRX API 호출 시도 (서버 사이드에서만 가능)
      // const response = await fetch(this.KRX_API_BASE_URL, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      //   body: new URLSearchParams({
      //     bld: "dbms/MDC/STAT/standard/MDCSTAT01501",
      //     mktId: "ALL",
      //     share: "1",
      //     money: "1",
      //   }),
      // });

      // 현재는 확장된 예시 데이터 반환
      return [
        {
          Code: "005930",
          Name: "삼성전자",
          Market: "KOSPI",
          Sector: "전기전자",
          Industry: "전자부품",
          MarketCap: 400000000000000,
          Shares: 5969782550,
          ForeignShares: 3000000000,
          ForeignRatio: 50.25,
          ListingDate: "1975-06-11",
          Price: 70000,
          Change: 1000,
          ChangePercent: 1.45,
          Volume: 10000000,
        },
        {
          Code: "000660",
          Name: "SK하이닉스",
          Market: "KOSPI",
          Sector: "전기전자",
          Industry: "반도체",
          MarketCap: 80000000000000,
          Shares: 728002365,
          ForeignShares: 400000000,
          ForeignRatio: 54.95,
          ListingDate: "1996-10-04",
          Price: 120000,
          Change: -2000,
          ChangePercent: -1.64,
          Volume: 5000000,
        },
        {
          Code: "035420",
          Name: "NAVER",
          Market: "KOSPI",
          Sector: "서비스업",
          Industry: "소프트웨어",
          MarketCap: 30000000000000,
          Shares: 164000000,
          ForeignShares: 80000000,
          ForeignRatio: 48.78,
          ListingDate: "2002-09-27",
          Price: 200000,
          Change: 3000,
          ChangePercent: 1.52,
          Volume: 3000000,
        },
        {
          Code: "051910",
          Name: "LG화학",
          Market: "KOSPI",
          Sector: "화학",
          Industry: "화학",
          MarketCap: 50000000000000,
          Shares: 70000000,
          ForeignShares: 30000000,
          ForeignRatio: 45.32,
          ListingDate: "2001-10-25",
          Price: 500000,
          Change: -5000,
          ChangePercent: -0.99,
          Volume: 2000000,
        },
        {
          Code: "006400",
          Name: "삼성SDI",
          Market: "KOSPI",
          Sector: "전기전자",
          Industry: "전자부품",
          MarketCap: 20000000000000,
          Shares: 30000000,
          ForeignShares: 12000000,
          ForeignRatio: 42.18,
          ListingDate: "1999-07-12",
          Price: 400000,
          Change: 8000,
          ChangePercent: 2.04,
          Volume: 1500000,
        },
        {
          Code: "035720",
          Name: "카카오",
          Market: "KOSPI",
          Sector: "서비스업",
          Industry: "소프트웨어",
          MarketCap: 25000000000000,
          Shares: 400000000,
          ForeignShares: 150000000,
          ForeignRatio: 38.45,
          ListingDate: "2017-10-06",
          Price: 45000,
          Change: 500,
          ChangePercent: 1.12,
          Volume: 8000000,
        },
        {
          Code: "207940",
          Name: "삼성바이오로직스",
          Market: "KOSPI",
          Sector: "의료정밀",
          Industry: "바이오",
          MarketCap: 15000000000000,
          Shares: 100000000,
          ForeignShares: 35000000,
          ForeignRatio: 35.67,
          ListingDate: "2016-11-02",
          Price: 800000,
          Change: -10000,
          ChangePercent: -1.23,
          Volume: 500000,
        },
        {
          Code: "068270",
          Name: "셀트리온",
          Market: "KOSPI",
          Sector: "의료정밀",
          Industry: "바이오",
          MarketCap: 12000000000000,
          Shares: 80000000,
          ForeignShares: 25000000,
          ForeignRatio: 33.89,
          ListingDate: "2004-02-27",
          Price: 150000,
          Change: 2000,
          ChangePercent: 1.35,
          Volume: 1000000,
        },
        {
          Code: "051915",
          Name: "LG에너지솔루션",
          Market: "KOSPI",
          Sector: "전기전자",
          Industry: "전자부품",
          MarketCap: 100000000000000,
          Shares: 200000000,
          ForeignShares: 80000000,
          ForeignRatio: 40.0,
          ListingDate: "2022-01-27",
          Price: 500000,
          Change: 15000,
          ChangePercent: 3.09,
          Volume: 3000000,
        },
        {
          Code: "373220",
          Name: "LG에너지솔루션",
          Market: "KOSPI",
          Sector: "전기전자",
          Industry: "전자부품",
          MarketCap: 100000000000000,
          Shares: 200000000,
          ForeignShares: 80000000,
          ForeignRatio: 40.0,
          ListingDate: "2022-01-27",
          Price: 500000,
          Change: 15000,
          ChangePercent: 3.09,
          Volume: 3000000,
        },
      ];
    } catch (error) {
      console.error("한국 주식 데이터 가져오기 오류:", error);
      return [];
    }
  }

  // 한국 주식 검색 (향상된 기능)
  static async searchKoreanStocks(
    query: string,
    market: string = "all"
  ): Promise<any[]> {
    try {
      const allStocks = await this.getKoreanStockList();

      // 검색 필터링
      let filteredStocks = allStocks.filter((stock) => {
        const matchesQuery =
          stock.Name.toLowerCase().includes(query.toLowerCase()) ||
          stock.Code.includes(query);
        const matchesMarket = market === "all" || stock.Market === market;
        return matchesQuery && matchesMarket;
      });

      // 시가총액 순으로 정렬
      filteredStocks.sort((a, b) => b.MarketCap - a.MarketCap);

      return filteredStocks;
    } catch (error) {
      console.error("한국 주식 검색 중 오류:", error);
      return [];
    }
  }

  // 특정 종목의 상세 정보 가져오기
  static async getKoreanStockDetail(symbol: string): Promise<any> {
    try {
      const allStocks = await this.getKoreanStockList();
      const stock = allStocks.find((s) => s.Code === symbol);

      if (!stock) {
        throw new Error(`종목 ${symbol}을 찾을 수 없습니다.`);
      }

      return stock;
    } catch (error) {
      console.error(`종목 상세 정보 가져오기 오류 (${symbol}):`, error);
      throw error;
    }
  }

  // 시장별 종목 목록 가져오기
  static async getStocksByMarket(market: "KOSPI" | "KOSDAQ"): Promise<any[]> {
    try {
      const allStocks = await this.getKoreanStockList();
      return allStocks.filter((stock) => stock.Market === market);
    } catch (error) {
      console.error(`시장별 종목 목록 가져오기 오류 (${market}):`, error);
      return [];
    }
  }

  // 섹터별 종목 목록 가져오기
  static async getStocksBySector(sector: string): Promise<any[]> {
    try {
      const allStocks = await this.getKoreanStockList();
      return allStocks.filter((stock) =>
        stock.Sector.toLowerCase().includes(sector.toLowerCase())
      );
    } catch (error) {
      console.error(`섹터별 종목 목록 가져오기 오류 (${sector}):`, error);
      return [];
    }
  }
}

// 사용 예시
export async function getStockDataExample() {
  try {
    // 미국 주식 예시
    const appleQuote = await StockDataService.getStockQuote("AAPL");
    console.log("Apple stock price:", appleQuote.price);

    // 한국 주식 예시
    const samsungQuote = await StockDataService.getStockQuote("005930.KS");
    console.log("Samsung stock price:", samsungQuote.price);

    // 과거 데이터 예시
    const historicalData = await StockDataService.getStockHistoricalData(
      "AAPL",
      "2023-01-01",
      "2023-12-31"
    );
    console.log("Historical data points:", historicalData.length);

    // 종목 검색 예시
    const searchResults = await StockDataService.searchStocks("Apple");
    console.log("Search results:", searchResults);
  } catch (error) {
    console.error("Error in stock data example:", error);
  }
}
