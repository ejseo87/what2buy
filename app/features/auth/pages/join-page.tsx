import { Form, Link, redirect, useNavigation } from "react-router";
import { Button } from "../../../common/components/ui/button";
import type { Route } from "./+types/join-page";
import InputPair from "~/common/components/input-pair";
import AuthButtons from "../components/auth-buttons";
import z from "zod";
import { checkUsernameExists } from "../queries";
import { makeSSRClient } from "~/supa-client";
import { LoaderCircle } from "lucide-react";
import LoadingButton from "~/common/components/loading-button";
import AlertMessage from "~/common/components/alert-message";
import { Checkbox } from "~/common/components/ui/checkbox";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Join | what2buy" },
    { name: "description", content: "Create a new what2buy account" },
  ];
};
const formSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, { message: "Name must be at least 3 characters long" }),
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
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
      formError: error.flatten().fieldErrors,
    };
  }
  const usernameExists = await checkUsernameExists(request, {
    username: data.username,
  });
  if (usernameExists) {
    return {
      formError: { username: ["Username already exists"] },
    };
  }
  const { client, headers } = makeSSRClient(request);
  const { error: signUpError } = await client.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        username: data.username,
      },
    },
  });
  if (signUpError) {
    return {
      signUpError: signUpError.message,
    };
  }
  return redirect("/", { headers });
};

export default function JoinPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  // 약관 동의 상태 관리
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  // 두 약관 모두 동의해야 가입 가능
  const canSubmit = termsAgreed && privacyAgreed && !isSubmitting;
  return (
    <div className="flex flex-col relative items-center justify-center h-full ps-5">
      <Button variant={"ghost"} asChild className="absolute right-8 top-8 ">
        <Link to="/auth/login">이미 계정이 있다면, 로그인하기</Link>
      </Button>
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">계정 만들기</h1>

        <Form className="w-full space-y-4" method="post">
          <InputPair
            label="이름"
            description="이름을 입력해주세요"
            name="name"
            id="name"
            required
            type="text"
            placeholder="예) 홍길동"
          />
          {actionData && "formError" in actionData && (
            <p className="text-sm text-red-500">
              {actionData?.formError?.name?.join(", ")}
            </p>
          )}
          <InputPair
            id="username"
            label="아이디"
            description="아이디를 입력해주세요"
            name="username"
            required
            type="text"
            placeholder="예) anonymous"
          />
          {actionData && "formError" in actionData && (
            <p className="text-sm text-red-500">
              {actionData?.formError?.username?.join(", ")}
            </p>
          )}
          <InputPair
            id="email"
            label="이메일"
            description="이메일을 입력해주세요"
            name="email"
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

          {/* 약관 동의 섹션 */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900">
              서비스 약관 동의
            </h3>

            {/* 이용약관 동의 */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms-agreement"
                checked={termsAgreed}
                onCheckedChange={(checked) => setTermsAgreed(checked === true)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="terms-agreement"
                  className="text-sm font-medium leading-relaxed cursor-pointer"
                >
                  이용약관에 동의합니다. (필수)
                </Label>
                <p className="text-xs text-muted-foreground">
                  <Link
                    to="/terms"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    이용약관 전문 보기
                  </Link>
                </p>
              </div>
            </div>

            {/* 개인정보처리방침 동의 */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="privacy-agreement"
                checked={privacyAgreed}
                onCheckedChange={(checked) =>
                  setPrivacyAgreed(checked === true)
                }
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="privacy-agreement"
                  className="text-sm font-medium leading-relaxed cursor-pointer"
                >
                  개인정보처리방침에 동의합니다. (필수)
                </Label>
                <p className="text-xs text-muted-foreground">
                  <Link
                    to="/privacy"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    개인정보처리방침 전문 보기
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <LoadingButton
            isLoading={isSubmitting}
            disabled={!canSubmit}
            className={!canSubmit ? "opacity-50 cursor-not-allowed" : ""}
          >
            {!termsAgreed || !privacyAgreed
              ? "약관에 동의하고 계정 생성"
              : isSubmitting
              ? "처리중..."
              : "계정 생성"}
          </LoadingButton>
          {actionData &&
            "signUpError" in actionData &&
            actionData.signUpError && (
              <AlertMessage
                content={actionData.signUpError}
                variant="destructive"
              />
            )}
        </Form>
        {!termsAgreed || !privacyAgreed ? null : <AuthButtons />}
      </div>
    </div>
  );
}
