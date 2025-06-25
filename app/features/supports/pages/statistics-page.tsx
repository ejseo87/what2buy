import type { Route } from "./+types/statistics-page";

export function loader({ request }: Route.LoaderArgs) {
  return {
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
    { title: "Statistics - What2Buy" },
    { name: "description", content: "Recommendation and purchase statistics" },
  ];
}

export default function StatisticsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recommendation Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recommendation Statistics
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Recommendations:</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span>Successful Recommendations:</span>
              <span className="font-medium text-green-600">0</span>
            </div>
            <div className="flex justify-between">
              <span>Success Rate:</span>
              <span className="font-medium">0%</span>
            </div>
          </div>
        </div>

        {/* Purchase Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Purchase Statistics</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Purchases:</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span>Total Investment:</span>
              <span className="font-medium">$0</span>
            </div>
            <div className="flex justify-between">
              <span>Total Return:</span>
              <span className="font-medium">$0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
