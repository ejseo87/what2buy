import type { Route } from "./+types/users-page";

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
    { title: "Users - What2Buy" },
    { name: "description", content: "List of registered users" },
  ];
}

export default function UsersPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          {/* Search/Filter */}
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search users..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Search
            </button>
          </div>

          {/* Users List */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
            <div className="space-y-3">
              <p className="text-gray-600">No users found</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
