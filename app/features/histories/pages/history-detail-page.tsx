import type { Route } from "./+types/history-detail-page";

export function loader({ request, params }: Route.LoaderArgs) {
  const { recommendationId } = params;
  return {
    recommendationId,
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
    { title: "Recommendation Detail - What2Buy" },
    { name: "description", content: "Stock recommendation detail" },
  ];
}

export default function HistoryDetailPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { recommendationId } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Recommendation Detail</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Recommendation ID: {recommendationId}
          </p>
          {/* Add recommendation detail content here */}
          <p className="text-gray-600">Recommendation details loading...</p>
        </div>
      </div>
    </div>
  );
}
