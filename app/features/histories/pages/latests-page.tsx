import type { Route } from "./+types/latests-page";

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
    { title: "Latest Recommendations - What2Buy" },
    { name: "description", content: "Latest stock recommendations" },
  ];
}

export default function LatestsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest Recommendations</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          {/* Add latest recommendations list here */}
          <p className="text-gray-600">No latest recommendations available</p>
        </div>
      </div>
    </div>
  );
}
