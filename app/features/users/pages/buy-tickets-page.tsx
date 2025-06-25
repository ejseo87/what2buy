import type { Route } from "./+types/buy-tickets-page";

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
    { title: "Buy Tickets - What2Buy" },
    { name: "description", content: "Purchase tickets" },
  ];
}

export default function BuyTicketsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { userId } = loaderData;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Buy Tickets</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <div className="text-sm text-gray-500">User ID: {userId}</div>

          {/* Ticket Packages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Basic</h3>
              <p className="text-3xl font-bold text-blue-600 mb-2">$9.99</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>5 Recommendations</li>
                <li>30 days validity</li>
                <li>Basic support</li>
              </ul>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Select Basic
              </button>
            </div>

            <div className="border-2 border-blue-500 rounded-lg p-6 text-center bg-blue-50">
              <h3 className="text-xl font-semibold mb-2">Premium</h3>
              <p className="text-3xl font-bold text-blue-600 mb-2">$19.99</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>15 Recommendations</li>
                <li>60 days validity</li>
                <li>Priority support</li>
              </ul>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Select Premium
              </button>
            </div>

            <div className="border rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-3xl font-bold text-blue-600 mb-2">$39.99</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>Unlimited Recommendations</li>
                <li>90 days validity</li>
                <li>Premium support</li>
              </ul>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Select Pro
              </button>
            </div>
          </div>

          {/* Payment Form */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Complete Purchase
                </button>
                <a
                  href={`/users/${userId}/tickets`}
                  className="px-8 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Cancel
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
