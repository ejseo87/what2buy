import type { Route } from "./+types/manual-page";

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
    { title: "Help & Manual - What2Buy" },
    { name: "description", content: "Help and user manual" },
  ];
}

export default function ManualPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Help & Manual</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
            <p className="text-gray-700 mb-4">
              Welcome to What2Buy! This platform helps you make informed stock
              investment decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How to Use</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium">Request Recommendations</h3>
                <p className="text-gray-600">
                  Use the recommendation feature to get personalized stock
                  suggestions.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Track Performance</h3>
                <p className="text-gray-600">
                  Monitor the performance of recommended stocks over time.
                </p>
              </div>
              <div>
                <h3 className="font-medium">View History</h3>
                <p className="text-gray-600">
                  Review your past recommendations and their outcomes.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Need More Help?</h2>
            <p className="text-gray-700">
              If you need additional assistance, please visit our{" "}
              <a href="/support" className="text-blue-600 hover:text-blue-800">
                support page
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
