import type { Route } from "./+types/home-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Home | What2Buy" },
    { name: "description", content: "Stock recommendation platform home page" },
  ];
};

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to What2Buy
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Your trusted platform for stock recommendations and investment insights
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Latest Recommendations</h2>
          <p className="text-gray-600 mb-4">
            Discover the most recent stock recommendations from our experts
          </p>
          <a
            href="/histories/latests"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View Latest →
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">All Histories</h2>
          <p className="text-gray-600 mb-4">
            Browse through our complete collection of stock recommendations
          </p>
          <a
            href="/histories/all"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Browse All →
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Get Recommendation</h2>
          <p className="text-gray-600 mb-4">
            Request a personalized stock recommendation based on your criteria
          </p>
          <a
            href="/recommendation"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Request Now →
          </a>
        </div>
      </div>
    </div>
  );
}
