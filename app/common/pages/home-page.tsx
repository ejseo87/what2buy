import type { Route } from "./+types/home-page";

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
    { title: "What2Buy - Home" },
    { name: "description", content: "Stock recommendation platform home page" },
  ];
}

export default function HomePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to What2Buy</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Recent Stock Recommendations */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Recommendations</h2>
          <div className="space-y-3">
            {/* Add recent recommendations here */}
            <p className="text-gray-600">No recent recommendations</p>
          </div>
        </div>

        {/* Stock Performance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Performance</h2>
          <div className="space-y-3">
            {/* Add performance metrics here */}
            <p className="text-gray-600">Performance data loading...</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a
              href="/recommendation"
              className="block text-blue-600 hover:text-blue-800"
            >
              Request Recommendation
            </a>
            <a
              href="/histories"
              className="block text-blue-600 hover:text-blue-800"
            >
              View History
            </a>
            <a
              href="/stocks"
              className="block text-blue-600 hover:text-blue-800"
            >
              Browse Stocks
            </a>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="space-y-3">
            <a href="/stat" className="block text-blue-600 hover:text-blue-800">
              View Statistics
            </a>
            <a
              href="/manual"
              className="block text-blue-600 hover:text-blue-800"
            >
              Help & Manual
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
