import { useState } from "react";
import type { Route } from "./+types/tickets-page";
import { Hero } from "~/common/components/hero";
import { TicketCard } from "../components/ticket-card";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { getTickets } from "../queries";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Tickets | what2buy" },
    { name: "description", content: "Available tickets for purchase" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client as any);
  const tickets = await getTickets(client as any, {
    userId,
    status: "all",
  });
  return { tickets };
};

export default function TicketsPage({ loaderData }: Route.ComponentProps) {
  const { tickets } = loaderData;
  console.log("tickets page tickets=", tickets);
  return (
    <div className="space-y-10">
      <Hero
        title="보유중인 추천권 목록"
        subtitle="보우중인 추천권의 사용여부와 유효기간을 확인해보세요."
      />
      <Link to="/tickets/buy">
        <Button>추천권 구매</Button>
      </Link>
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          {tickets.map((ticket: any) => (
            <TicketCard
              key={ticket.ticket_id}
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
