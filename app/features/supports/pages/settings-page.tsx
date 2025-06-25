import type { Route } from "./+types/settings-page";

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
    { title: "Settings - What2Buy" },
    { name: "description", content: "Service settings" },
  ];
}

export default function SettingsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-6">
          {/* Notification Settings */}
          <section>
            <h2 className="text-xl font-semibold mb-4">
              Notification Settings
            </h2>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" className="mr-3" defaultChecked />
                <span>Email notifications for new recommendations</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-3" defaultChecked />
                <span>Stock price alerts</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <span>Weekly performance reports</span>
              </label>
            </div>
          </section>

          {/* Privacy Settings */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <span>Share my investment preferences with other users</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-3" defaultChecked />
                <span>Allow analytics and performance tracking</span>
              </label>
            </div>
          </section>

          {/* Display Settings */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Display Settings</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Currency
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="KRW">KRW (₩)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
