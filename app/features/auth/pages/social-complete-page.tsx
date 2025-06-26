import type { Route } from "./+types/social-complete-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Complete Social Login | What2Buy" },
    { name: "description", content: "Complete your social authentication" },
  ];
};

export default function SocialCompletePage() {
  return <div></div>;
}
