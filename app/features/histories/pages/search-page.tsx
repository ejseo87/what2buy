import type { Route } from "./+types/search-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Search |What2Buy" },
    {
      name: "description",
      content: "Search recommendation history and stocks",
    },
  ];
}

export default function SearchPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Search Form */}
        <div className="mb-6">
          <form className="flex gap-4">
            <input
              type="text"
              placeholder="Search recommendations or stocks..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Search
            </button>
          </form>
        </div>

        {/* Search Results */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Search Results</h2>
          <p className="text-gray-600">No search results to display</p>
        </div>
      </div>
    </div>
  );
}
