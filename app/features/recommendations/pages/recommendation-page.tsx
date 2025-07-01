import type { Route } from "./+types/recommendation-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Request Recommendation - What2Buy" },
    { name: "description", content: "Request stock recommendations" },
  ];
};

export default function RecommendationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Request Stock Recommendation</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form className="space-y-6">
          {/* Investment Preferences */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Investment Preferences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount
                </label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk Tolerance
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select risk level</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sector Preferences */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Sector Preferences</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "Technology",
                "Healthcare",
                "Finance",
                "Energy",
                "Consumer",
                "Industrial",
                "Materials",
                "Utilities",
              ].map((sector) => (
                <label key={sector} className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">{sector}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              rows={4}
              placeholder="Any specific requirements or preferences..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Request Recommendation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
