import type { Route } from "./+types/logout-page";

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
    { title: "Logout - What2Buy" },
    { name: "description", content: "User logout" },
  ];
}

export default function LogoutPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { userId } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Logout</h1>

          <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>

          <div className="flex gap-4">
            <button className="flex-1 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Yes, Logout
            </button>
            <a
              href={`/users/${userId}`}
              className="flex-1 px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-center"
            >
              Cancel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
