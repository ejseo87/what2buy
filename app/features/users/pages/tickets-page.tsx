import type { Route } from "./+types/tickets-page";

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
    { title: "Tickets - What2Buy" },
    { name: "description", content: "User ticket status" },
  ];
}

export default function TicketsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { userId } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tickets</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <div className="text-sm text-gray-500">User ID: {userId}</div>

          {/* Ticket Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Active Tickets</h3>
              <p className="text-2xl font-bold text-blue-600">0</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Used Tickets</h3>
              <p className="text-2xl font-bold text-green-600">0</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800">Expired Tickets</h3>
              <p className="text-2xl font-bold text-yellow-600">0</p>
            </div>
          </div>

          {/* Ticket List */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Ticket History</h2>
            <div className="space-y-3">
              <p className="text-gray-600">No tickets found</p>
            </div>
          </div>

          {/* Buy Tickets Button */}
          <div className="flex justify-end">
            <a
              href={`/users/${userId}/tickets/buy`}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Buy Tickets
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
