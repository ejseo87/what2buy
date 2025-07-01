import type { Route } from "./+types/tickets-page";
import { Hero } from "~/common/components/hero";
import { TicketCard } from "../components/ticket-card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Tickets | What2Buy" },
    { name: "description", content: "Available tickets for purchase" },
  ];
};


export default function TicketsPage() {
  return (
    <div className="space-y-10">
      <Hero title="티켓 목록" subtitle="티켓 목록을 확인해보세요." />

      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
          <TicketCard
            title={`티켓 ${index + 1}`}
            type={index< 3? "무료" : "유료"}
            duration="2025.06.01 ~ 2025.08.31"
            status={index <5 ? "사용함" : "미사용"}
            usedDate="2025.06.14"
          />
          ))}
        </div>
      </div>
    </div>
  );
}
