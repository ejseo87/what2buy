import type { Route } from "./+types/stock-detail-api";
import {
  StockDataService,
  KoreanStockDataService,
} from "../utils/stock-data-service";

export async function loader({ request, params }: Route.LoaderArgs) {
  try {
    const { symbol } = params;
    const url = new URL(request.url);
    const startDate = url.searchParams.get("start") || "2020-01-01";
    const endDate =
      url.searchParams.get("end") || new Date().toISOString().split("T")[0];

    // 한국 주식인지 확인하고 적절한 서비스 사용
    const isKoreanStock = symbol.length === 6 && /^\d{6}$/.test(symbol);

    let stockData;

    if (isKoreanStock) {
      // 한국 주식인 경우
      const koreanSymbol = `${symbol}.KS`;
      const quote = await StockDataService.getStockQuote(koreanSymbol);
      const historicalData = await StockDataService.getStockHistoricalData(
        koreanSymbol,
        startDate,
        endDate
      );

      stockData = {
        symbol,
        name: quote.name,
        market: "KOSPI",
        sector: "전기전자",
        industry: "전자부품",
        listingDate: "1975-06-11",
        marketCap: quote.marketCap,
        shares: 5969782550,
        foreignShares: 3000000000,
        foreignRatio: 50.25,
        priceData: historicalData,
      };
    } else {
      // 미국 주식인 경우
      const quote = await StockDataService.getStockQuote(symbol);
      const historicalData = await StockDataService.getStockHistoricalData(
        symbol,
        startDate,
        endDate
      );

      stockData = {
        symbol,
        name: quote.name,
        market: "NASDAQ",
        sector: "Technology",
        industry: "Software",
        listingDate: "1980-12-12",
        marketCap: quote.marketCap,
        shares: 1000000000,
        foreignShares: 500000000,
        foreignRatio: 50.0,
        priceData: historicalData,
      };
    }

    return {
      success: true,
      data: stockData,
      symbol,
      startDate,
      endDate,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    };
  }
}

export const meta: Route.MetaFunction = () => [
  { title: "Stock Detail API - what2buy" },
  {
    name: "description",
    content: "Get detailed stock information and price data",
  },
];

export default function StockDetailApi({ loaderData }: Route.ComponentProps) {
  const { success, data, error, symbol, startDate, endDate, timestamp } =
    loaderData;

  if (!success) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">API Error</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <p className="text-sm text-red-600 mt-2">Timestamp: {timestamp}</p>
        </div>
      </div>
    );
  }

  const { name, market, sector, industry, marketCap, foreignRatio, priceData } =
    data;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Detail API</h1>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-blue-600">Symbol</p>
            <p className="font-semibold text-blue-800">{symbol}</p>
          </div>
          <div>
            <p className="text-sm text-blue-600">Name</p>
            <p className="font-semibold text-blue-800">{name}</p>
          </div>
          <div>
            <p className="text-sm text-blue-600">Market</p>
            <p className="font-semibold text-blue-800">{market}</p>
          </div>
          <div>
            <p className="text-sm text-blue-600">Sector</p>
            <p className="font-semibold text-blue-800">{sector}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-blue-600">Industry</p>
            <p className="font-semibold text-blue-800">{industry}</p>
          </div>
          <div>
            <p className="text-sm text-blue-600">Market Cap</p>
            <p className="font-semibold text-blue-800">
              {marketCap.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-blue-600">Foreign Ratio</p>
            <p className="font-semibold text-blue-800">
              {foreignRatio.toFixed(2)}%
            </p>
          </div>
        </div>
        <div className="mt-4 text-sm text-blue-600">
          <p>
            Period: {startDate} ~ {endDate}
          </p>
          <p>Data Points: {priceData.length}</p>
          <p>Timestamp: {timestamp}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Open</th>
              <th className="px-4 py-2 border-b">High</th>
              <th className="px-4 py-2 border-b">Low</th>
              <th className="px-4 py-2 border-b">Close</th>
              <th className="px-4 py-2 border-b">Volume</th>
            </tr>
          </thead>
          <tbody>
            {priceData.slice(-20).map((price: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{price.date}</td>
                <td className="px-4 py-2 border-b">
                  {price.open.toLocaleString()}
                </td>
                <td className="px-4 py-2 border-b">
                  {price.high.toLocaleString()}
                </td>
                <td className="px-4 py-2 border-b">
                  {price.low.toLocaleString()}
                </td>
                <td className="px-4 py-2 border-b">
                  {price.close.toLocaleString()}
                </td>
                <td className="px-4 py-2 border-b">
                  {price.volume.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Showing last 20 data points. Total: {priceData.length} records.</p>
      </div>
    </div>
  );
}
