import type { Route } from "./+types/change-password-page";

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
    { title: "Change Password - What2Buy" },
    { name: "description", content: "Change user password" },
  ];
}

export default function ChangePasswordPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { userId } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Change Password</h1>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <form className="space-y-6">
          <div className="text-sm text-gray-500">User ID: {userId}</div>

          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Change Password
            </button>
            <a
              href={`/users/${userId}`}
              className="flex-1 px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-center"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
