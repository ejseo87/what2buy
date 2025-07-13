import type { Route } from "./+types/tickets-page";
import { Hero } from "~/common/components/hero";
import { TicketCard } from "../components/ticket-card";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { getTickets } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Tickets | What2Buy" },
    { name: "description", content: "Available tickets for purchase" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client as any);
  const tickets = await getTickets(client as any, { userId });
  return { tickets };
};

export default function TicketsPage({ loaderData }: Route.ComponentProps) {
  const { tickets } = loaderData;
  console.log("tickets page tickets=", tickets);
  return (
    <div className="space-y-10">
      <Hero title="티켓 목록" subtitle="티켓 목록을 확인해보세요." />

      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          {tickets.map((ticket) => (
            <TicketCard
              title={ticket.ticket_id}
              type={ticket.ticket_type}
              duration_start={ticket.ticket_duration_start}
              duration_end={ticket.ticket_duration_end}
              status={ticket.status}
              usedDate={ticket.used_date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
