import type { Route } from "./+types/support-page";

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
    { title: "Customer Support - What2Buy" },
    { name: "description", content: "Customer support and help" },
  ];
}

export default function SupportPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Customer Support</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select a subject</option>
                <option value="technical">Technical Issue</option>
                <option value="billing">Billing Question</option>
                <option value="feature">Feature Request</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your issue or question..."
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* FAQ and Resources */}
        <div className="space-y-6">
          {/* FAQ */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">
                  How do I request a stock recommendation?
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Navigate to the recommendation page and fill out the form with
                  your investment preferences.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  How long does it take to receive a recommendation?
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Recommendations are typically provided within 24-48 hours of
                  your request.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Can I cancel my subscription?
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Yes, you can cancel your subscription at any time from your
                  account settings.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Other Ways to Reach Us
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-gray-600">support@what2buy.com</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9 AM - 6 PM EST
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
