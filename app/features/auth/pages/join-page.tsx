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
  return (
    <div className="flex flex-col relative items-center justify-center h-full ps-5">
      <Button variant={"ghost"} asChild className="absolute right-8 top-8 ">
        <Link to="/auth/login">로그인</Link>
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
            placeholder="예) kdh2000"
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
            placeholder="예) kdh2000@gmail.com"
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
          <LoadingButton isLoading={isSubmitting}>
            {isSubmitting ? "처리중..." : "계정 생성"}
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
        <AuthButtons />
      </div>
    </div>
  );
}
