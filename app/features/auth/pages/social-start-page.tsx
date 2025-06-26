import type { Route } from "./+types/social-start-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Social Authentication | What2Buy" },
    { name: "description", content: "Sign in with social provider" },
  ];
};

export default function SocialStartPage() {
  return (
    <div>
      <h1>Social Start Page</h1>
    </div>
  );
}