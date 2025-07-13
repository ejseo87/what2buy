import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/recommendation-page";
import { getLoggedInUserId } from "~/features/users/queries";
import { getTickets } from "~/features/tickets/queries";
import { Hero } from "~/common/components/hero";
import { Form, redirect, useNavigation } from "react-router";
import SelectPair from "~/common/components/select-pair";
import LoadingButton from "~/common/components/loading-button";
import { createRecommendation } from "~/features/recommendations/mutations";
import { Alert } from "~/common/components/ui/alert";
import AlertMessage from "~/common/components/alert-message";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Request Recommendation - What2Buy" },
    { name: "description", content: "Request stock recommendations" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client as any);

  const tickets = await getTickets(client as any, {
    userId: userId,
    status: "not_used",
  });
  return { tickets };
};

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client as any);
  const formData = await request.formData();
  const ticketId = formData.get("ticket_id");
  console.log("ticketId=", ticketId);
  const { recommendation_id } = await createRecommendation(client as any, {
    ticketId: Number(ticketId),
    userId: userId,
  });
  console.log(`redirect to /histories/${recommendation_id}`);
  return redirect(`/histories/${recommendation_id}`);
};

export default function RecommendationPage({
  loaderData,
}: Route.ComponentProps) {
  const { tickets } = loaderData as {
    tickets: { ticket_id: number; ticket_type: string }[];
  };
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="space-y-10">
      <Hero
        title="주식 추천 요청"
        subtitle="주식 추천 요청에는 사용권이 필요합니다."
      />

      <Form className="flex flex-col gap-10 w-1/2 mx-auto " method="post">
        <SelectPair
          label="사용권"
          description="사용권을 선택해주세요."
          name="ticket_id"
          required
          placeholder="사용권을 선택해주세요."
          options={tickets.map((ticket) => ({
            label: `#${ticket.ticket_id} ${
              ticket.ticket_type == "free" ? "무료 사용권" : "유료 사용권"
            }`,
            value: ticket.ticket_id.toString(),
          }))}
        />

        <LoadingButton type="submit" isLoading={isSubmitting}>
          추천 요청
        </LoadingButton>
      </Form>
    </div>
  );
}
