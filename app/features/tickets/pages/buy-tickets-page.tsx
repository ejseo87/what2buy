import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/common/components/ui/select";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { Button } from "~/common/components/ui/button";
import { Separator } from "~/common/components/ui/separator";
import { Form, Link, useActionData, useNavigation } from "react-router";
import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/buy-tickets-page";
import { useState } from "react";
import { TICKET_PLANS } from "../constants";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { createTickets } from "../mutation";
import LoadingButton from "~/common/components/loading-button";
import AlertMessage from "~/common/components/alert-message";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Buy Tickets | what2buy" },
    { name: "description", content: "Complete your ticket purchase" },
  ];
};

export async function action({ request }: Route.ActionArgs) {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const ticketId = formData.get("ticketId") as string;
  const quantity = Number(formData.get("quantity"));

  const selectedPlan = TICKET_PLANS.find((plan) => plan.id === ticketId);

  if (!selectedPlan || !userId || quantity <= 0) {
    return {
      success: false,
      error: "Invalid purchase request.",
    };
  }

  try {
    await createTickets(client, {
      userId,
      ticketType: selectedPlan.type,
      quantity,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred.",
    };
  }
}

export default function BuyTicketsPage() {
  const [selectedTicketId, setSelectedTicketId] = useState<string>(
    TICKET_PLANS[0].id
  );
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  const selectedTicket =
    TICKET_PLANS.find((p) => p.id === selectedTicketId) || TICKET_PLANS[0];

  const subtotal = selectedTicket.price * quantity;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <Form method="post" className="space-y-10">
      <Hero
        title="추천권 구매하기"
        subtitle="결제 정보를 입력해 추천권을 구매하세요."
      />

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>주문 요약</CardTitle>
              <CardDescription>구매할 추천권을 선택하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ticket-type">추천권 종류</Label>
                <Select
                  name="ticketId"
                  value={selectedTicketId}
                  onValueChange={setSelectedTicketId}
                >
                  <SelectTrigger id="ticket-type">
                    <SelectValue placeholder="추천권 종류를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {TICKET_PLANS.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.title} - {plan.price}원
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {selectedTicket.description}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">수량</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value)))
                  }
                  className="w-24"
                />
              </div>

              <Separator />

              <div className="space-y-2 font-medium">
                <div className="flex justify-between">
                  <span>소계</span>
                  <span>{subtotal}원</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>부가세 (10%)</span>
                  <span>{tax}원</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>총 결제금액</span>
                  <span>{total}원</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>결제 정보 입력</CardTitle>
              <CardDescription>
                결제 방법을 선택하고 정보를 입력하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-muted-foreground py-8">
                이 모의 결제는 실제로 처리되지 않습니다.
                <br />
                ‘결제하기’ 버튼 클릭 시 추천권이 발급됩니다.
              </p>

              {actionData?.error && (
                <AlertMessage
                  variant="destructive"
                  content={actionData.error}
                />
              )}
              {actionData?.success && (
                <AlertMessage
                  variant="default"
                  content="성공적으로 티켓을 구매했습니다! 티켓 목록 페이지로 이동합니다."
                />
              )}

              <div className="flex gap-4 pt-4">
                <Button variant="outline" asChild className="flex-1">
                  <Link to="/tickets">이전으로</Link>
                </Button>
                <LoadingButton
                  type="submit"
                  className="flex-1"
                  isLoading={navigation.state === "submitting"}
                >
                  {total}원 결제하기
                </LoadingButton>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Form>
  );
}
