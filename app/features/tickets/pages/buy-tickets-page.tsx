import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { Separator } from "~/common/components/ui/separator";
import { Form, Link, useLocation } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import type { Route } from "./+types/buy-tickets-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Buy Tickets | What2Buy" },
    { name: "description", content: "Complete your ticket purchase" },
  ];
};

export function loader({ request }: Route.LoaderArgs) {
  // TODO: Fetch ticket details and user payment methods
  return {
    paymentMethods: [
      { id: "card", name: "Credit/Debit Card" },
      { id: "paypal", name: "PayPal" },
      { id: "bank", name: "Bank Transfer" },
    ],
    selectedTicket: {
      id: 1,
      title: "Premium Stock Analysis Package",
      description:
        "Get detailed analysis for up to 10 stocks with expert recommendations",
      price: 29.99,
      duration: "1 month",
    },
  };
}

export function action({ request }: Route.ActionArgs) {
  // TODO: Process ticket purchase
  return {};
}

interface BuyTicketsPageProps {
  loaderData: {
    paymentMethods: Array<{
      id: string;
      name: string;
    }>;
    selectedTicket: {
      id: number;
      title: string;
      description: string;
      price: number;
      duration: string;
    };
  };
}

export default function BuyTicketsPage({ loaderData }: BuyTicketsPageProps) {
  const { paymentMethods, selectedTicket } = loaderData;
  const location = useLocation();
  const ticketId = location.state?.ticketId || 1;

  return (
    <div className="space-y-10">
      <Hero
        title="티켓 구매"
        subtitle="결제 정보를 입력하고 티켓을 구매하세요."
      />

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>주문 요약</CardTitle>
              <CardDescription>구매하려는 티켓 정보</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">{selectedTicket.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedTicket.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm">이용 기간:</span>
                  <span className="font-medium">{selectedTicket.duration}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>상품 가격:</span>
                  <span>${selectedTicket.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>부가세:</span>
                  <span>${(selectedTicket.price * 0.1).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>총 결제금액:</span>
                  <span>${(selectedTicket.price * 1.1).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle>결제 정보</CardTitle>
              <CardDescription>
                결제 방법을 선택하고 정보를 입력하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form className="space-y-6">
                {/* Payment Method Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">결제 방법</Label>
                  <div className="space-y-2">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          id={method.id}
                          name="paymentMethod"
                          value={method.id}
                          defaultChecked={method.id === "card"}
                          className="w-4 h-4"
                        />
                        <Label htmlFor={method.id} className="text-sm">
                          {method.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Card Details */}
                <div className="space-y-4">
                  <InputPair
                    label="카드 번호"
                    description="16자리 카드 번호를 입력하세요"
                    name="cardNumber"
                    id="cardNumber"
                    required
                    type="text"
                    placeholder="1234 5678 9012 3456"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <InputPair
                      label="만료일"
                      description="MM/YY"
                      name="expiryDate"
                      id="expiryDate"
                      required
                      type="text"
                      placeholder="12/25"
                    />

                    <InputPair
                      label="CVV"
                      description="카드 뒷면 3자리"
                      name="cvv"
                      id="cvv"
                      required
                      type="text"
                      placeholder="123"
                    />
                  </div>

                  <InputPair
                    label="카드 소유자명"
                    description="카드에 표시된 이름"
                    name="cardHolder"
                    id="cardHolder"
                    required
                    type="text"
                    placeholder="홍길동"
                  />
                </div>

                <Separator />

                {/* Billing Address */}
                <div className="space-y-4">
                  <h3 className="font-medium">청구 주소</h3>

                  <InputPair
                    label="이메일"
                    description="영수증을 받을 이메일 주소"
                    name="email"
                    id="email"
                    required
                    type="email"
                    placeholder="user@example.com"
                  />

                  <InputPair
                    label="전화번호"
                    description="연락 가능한 전화번호"
                    name="phone"
                    id="phone"
                    required
                    type="tel"
                    placeholder="010-1234-5678"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" asChild className="flex-1">
                    <Link to="/tickets">이전으로</Link>
                  </Button>
                  <Button type="submit" className="flex-1">
                    ${(selectedTicket.price * 1.1).toFixed(2)} 결제하기
                  </Button>
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
