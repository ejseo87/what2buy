import type { Route } from "./+types/stock-detail-page";

export function loader({ request, params }: Route.LoaderArgs) {
  const { stockId } = params;
  return {
    stockId,
    // Add loader data here
  };
}

export function action({ request }: Route.ActionArgs) {
  return {
    // Add action data here
  };
}

export function meta() {
  return [
    { title: "Stock Detail - What2Buy" },
    { name: "description", content: "Stock detail and profit tracking" },
  ];
}

export default function StockDetailPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { stockId } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Stock Detail</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Stock ID: {stockId}</p>

          {/* Stock Information */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-3">Stock Information</h2>
            <p className="text-gray-600">Stock details loading...</p>
          </div>

          {/* Profit Tracking */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Profit Tracking</h2>
            <p className="text-gray-600">Profit tracking data loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
