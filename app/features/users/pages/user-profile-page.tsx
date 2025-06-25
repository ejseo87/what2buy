import type { Route } from "./+types/user-profile-page";

export function loader({ request, params }: Route.LoaderArgs) {
  const { userId } = params;
  return {
    userId,
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
    { title: "User Profile - What2Buy" },
    { name: "description", content: "User profile information" },
  ];
}

export default function UserProfilePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { userId } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <div className="text-sm text-gray-500">User ID: {userId}</div>

          {/* Profile Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <p className="text-gray-900">Loading...</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="text-gray-900">Loading...</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Join Date
                </label>
                <p className="text-gray-900">Loading...</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <p className="text-gray-900">Loading...</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex gap-4">
              <a
                href={`/users/${userId}/edit`}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit Profile
              </a>
              <a
                href={`/users/${userId}/tickets`}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                View Tickets
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
