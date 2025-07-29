import type { Route } from "./+types/otp-complete-page";
import { Form, redirect, useNavigation, useSearchParams } from "react-router";
import z from "zod";
import InputPair from "~/common/components/input-pair";
import LoadingButton from "~/common/components/loading-button";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Verify OTP | what2buy" }];
};

const formSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6).max(6),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors };
  }
  const { email, otp } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: verifyError } = await client.auth.verifyOtp({
    type: "email",
    email: email,
    token: otp,
  });
  if (verifyError) {
    return { verifyError: verifyError.message };
  }
  return redirect("/", { headers });
};

export default function OtpPage({ actionData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">OTP 확인하기</h1>
          <p className="text-sm text-muted-foreground">
            이메일로 보내드린 6자리 OTP 코드를 입력해주세요. <br />
            OTP는 3분 후에 만료됩니다.
          </p>
        </div>
        <Form className="w-full space-y-4" method="post">
          <InputPair
            label="Email"
            description="이메일 주소를 입력해주세요."
            name="email"
            defaultValue={email || ""}
            id="email"
            required
            type="email"
            placeholder="예) example@example.com"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors?.email?.join(", ")}
            </p>
          )}
          <InputPair
            label="OTP"
            description="이메일로 보내드린 6자리 OTP 코드를 입력해주세요."
            name="otp"
            id="otp"
            required
            type="number"
            placeholder="예) 123456"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors?.otp?.join(", ")}
            </p>
          )}
          <LoadingButton
            className="w-full"
            type="submit"
            isLoading={isSubmitting}
          >
            OTP가 맞는지 확인하기
          </LoadingButton>
          {actionData && "verifyError" in actionData && (
            <p className="text-red-500">{actionData.verifyError}</p>
          )}
        </Form>
      </div>
    </div>
  );
}
