import { Button } from "~/common/components/ui/button";

import type { Route } from "./+types/login-page";
import { Form, Link, redirect, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import LoadingButton from "~/common/components/loading-button";
import z from "zod";
import { makeSSRClient } from "~/supa-client";
import AuthButtons from "../components/auth-buttons";
import AlertMessage from "~/common/components/alert-message";
import ServiceIntroMessage from "~/common/components/service-intro-message";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Login | what2buy" }];
};
const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return {
      loginError: null,
      formError: error.flatten().fieldErrors,
    };
  }

  const { email, password } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: loginError } = await client.auth.signInWithPassword({
    email,
    password,
  });
  if (loginError) {
    return {
      formError: null,
      loginError: loginError.message,
    };
  }
  return redirect("/", { headers });
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-5">
      <Button variant={"ghost"} asChild className="absolute right-8 top-8 ">
        <Link to="/auth/join">아직 회원이 아니신가요? 가입하기</Link>
      </Button>
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10 space-y-5">
        <h1 className="text-2xl font-semibold">로그인</h1>
        <ServiceIntroMessage addedClassName="w-full mx-auto" />
        <Form className="w-full space-y-4" method="post">
          <InputPair
            label="이메일"
            description="이메일을 입력해주세요"
            name="email"
            id="email"
            required
            type="email"
            placeholder="예) example@example.com"
          />
          {actionData && "formError" in actionData && (
            <p className="text-sm text-red-500">
              {actionData?.formError?.email?.join(", ")}
            </p>
          )}
          <InputPair
            id="password"
            label="비밀번호"
            description="비밀번호를 입력해주세요"
            name="password"
            required
            type="password"
            placeholder="8자리 이상의 숫자, 영어문자, 특수문자 조합"
          />
          {actionData && "formError" in actionData && (
            <p className="text-sm text-red-500">
              {actionData?.formError?.password?.join(", ")}
            </p>
          )}
          <LoadingButton
            className="w-full"
            type="submit"
            isLoading={isSubmitting}
          >
            {isSubmitting ? "처리중..." : "로그인"}
          </LoadingButton>
          {actionData && "loginError" in actionData && (
            <AlertMessage
              content={actionData.loginError || undefined}
              variant="destructive"
            />
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
