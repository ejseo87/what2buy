import type { Route } from "./+types/stock-search-api";
import {
  KoreanStockDataService,
  StockDataService,
} from "../utils/stock-data-service";

export async function loader({ request, params }: Route.LoaderArgs) {
  try {
    const { query } = params;
    const url = new URL(request.url);
    const market = url.searchParams.get("market") || "all";
    const limit = parseInt(url.searchParams.get("limit") || "20");

    // 한국 주식 검색 서비스를 사용해서 종목 검색하기
    const searchResults = await KoreanStockDataService.searchKoreanStocks(
      query
    );

    return {
      success: true,
      data: searchResults,
      query,
      market,
      limit,
      totalResults: searchResults.length,
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

export function meta(): Route.MetaFunction {
  return () => [
    { title: "Stock Search API - What2Buy" },
    { name: "description", content: "Search stocks by name or symbol" },
  ];
}

export default function StockSearchApi({ loaderData }: Route.ComponentProps) {
  const {
    success,
    data,
    error,
    query,
    market,
    limit,
    totalResults,
    timestamp,
  } = loaderData;

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Search API</h1>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-purple-600">Search Query</p>
            <p className="font-semibold text-purple-800">{query}</p>
          </div>
          <div>
            <p className="text-sm text-purple-600">Market</p>
            <p className="font-semibold text-purple-800">{market}</p>
          </div>
          <div>
            <p className="text-sm text-purple-600">Results</p>
            <p className="font-semibold text-purple-800">{totalResults}</p>
          </div>
          <div>
            <p className="text-sm text-purple-600">Limit</p>
            <p className="font-semibold text-purple-800">{limit}</p>
          </div>
        </div>
        <div className="mt-4 text-sm text-purple-600">
          <p>Timestamp: {timestamp}</p>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">No stocks found matching "{query}"</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 border-b">Code</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Market</th>
                <th className="px-4 py-2 border-b">Sector</th>
                <th className="px-4 py-2 border-b">Industry</th>
                <th className="px-4 py-2 border-b">Market Cap</th>
                <th className="px-4 py-2 border-b">Foreign Ratio</th>
              </tr>
            </thead>
            <tbody>
              {data.map((stock: any) => (
                <tr key={stock.Code} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">
                    <a
                      href={`/api/stocks/${stock.Code}`}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {stock.Code}
                    </a>
                  </td>
                  <td className="px-4 py-2 border-b">{stock.Name}</td>
                  <td className="px-4 py-2 border-b">{stock.Market}</td>
                  <td className="px-4 py-2 border-b">{stock.Sector}</td>
                  <td className="px-4 py-2 border-b">{stock.Industry}</td>
                  <td className="px-4 py-2 border-b">
                    {stock.MarketCap.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {stock.ForeignRatio.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>
          Search completed successfully. Found {totalResults} matching stocks.
        </p>
      </div>
    </div>
  );
}
