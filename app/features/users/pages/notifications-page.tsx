import { NotificationCard } from "../components/notification-card";
import type { Route } from "./+types/notifications-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Notifications | wemake" }];
};

export default function NotificationsPage() {
  return (
    <div className="space-y-20">
      <h1 className="text-4xl font-bold">Notifications</h1>
      <div className="flex flex-col items-start gap-5">
        <NotificationCard
          avatarUrl="https://github.com/shadcn.png"
          avatarFallback="S"
          userName="System"
          message="You have no ticket to use. Please buy a ticket."
          timestamp="10 days ago"
          seen={true}
        />
        <NotificationCard
          avatarUrl="https://github.com/shadcn.png"
          avatarFallback="S"
          userName="System"
          message="You baught 5 tickets. You can use them now."
          timestamp="2 days ago"
          seen={false}
        />
      </div>
    </div>
  );
}
