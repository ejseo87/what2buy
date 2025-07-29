import type { Route } from "./+types/otp-complete-page";
import {
  Form,
  redirect,
  useNavigation,
  useSearchParams,
  Link,
} from "react-router";
import { useEffect, useState } from "react";
import z from "zod";
import AlertMessage from "~/common/components/alert-message";
import InputPair from "~/common/components/input-pair";
import LoadingButton from "~/common/components/loading-button";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Verify OTP | what2buy" }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const error = url.searchParams.get("error");
  const errorCode = url.searchParams.get("error_code");
  const errorDescription = url.searchParams.get("error_description");

  // URL에서 에러 파라미터 확인 (쿼리 파라미터와 fragment 모두 확인)
  if (error && errorCode) {
    let userFriendlyMessage = "인증 중 오류가 발생했습니다.";

    if (errorCode === "otp_expired") {
      userFriendlyMessage =
        "Magic Link가 만료되었습니다. 새로운 OTP를 요청하거나 이메일에서 받은 6자리 코드를 직접 입력해주세요.";
    } else if (errorCode === "access_denied") {
      userFriendlyMessage = "인증이 거부되었습니다. 다시 시도해주세요.";
    }

    return {
      urlError: {
        code: errorCode,
        message: userFriendlyMessage,
        description: errorDescription,
      },
    };
  }

  // Magic Link의 code 파라미터 확인 및 자동 로그인 처리
  const code = url.searchParams.get("code");
  if (code) {
    console.log("Magic Link code received:", code);
    const { client, headers } = makeSSRClient(request);

    try {
      const { data, error: exchangeError } =
        await client.auth.exchangeCodeForSession(code);

      if (!exchangeError && data.session) {
        console.log("Magic Link login successful");
        return redirect("/", { headers });
      } else {
        console.error("Magic Link exchange error:", exchangeError);
        return {
          urlError: {
            code: "exchange_failed",
            message:
              "Magic Link 인증에 실패했습니다. 아래에 이메일에서 받은 6자리 OTP 코드를 직접 입력해주세요.",
            description: exchangeError?.message || "Code exchange failed",
          },
        };
      }
    } catch (error) {
      console.error("Magic Link processing error:", error);
      return {
        urlError: {
          code: "processing_error",
          message:
            "Magic Link 처리 중 오류가 발생했습니다. 아래에 이메일에서 받은 6자리 OTP 코드를 직접 입력해주세요.",
          description: error instanceof Error ? error.message : "Unknown error",
        },
      };
    }
  }

  // 성공적인 토큰이 있는지 확인 (fallback)
  const accessToken = url.searchParams.get("access_token");
  const refreshToken = url.searchParams.get("refresh_token");

  if (accessToken && refreshToken) {
    // 토큰이 있으면 자동으로 로그인 처리
    const { client, headers } = makeSSRClient(request);
    const { error: sessionError } = await client.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (!sessionError) {
      return redirect("/", { headers });
    }
  }

  return { urlError: null };
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
    console.error("OTP form validation error:", error.flatten().fieldErrors);
    return { fieldErrors: error.flatten().fieldErrors };
  }
  const { email, otp } = data;
  console.log("OTP verification attempt for email:", email);

  const { client, headers } = makeSSRClient(request);
  const { error: verifyError } = await client.auth.verifyOtp({
    type: "email",
    email: email,
    token: otp,
  });

  if (verifyError) {
    return { verifyError: verifyError.message };
  }

  console.log("OTP verification successful for email:", email);
  return redirect("/", { headers });
};

export default function OtpPage({
  actionData,
  loaderData,
}: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  // Fragment에서 온 에러를 위한 상태
  const [fragmentError, setFragmentError] = useState<{
    code: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    const handleMagicLink = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        console.log("Client-side Magic Link code processing:", code);
        try {
          const { browserClient } = await import("~/supa-client");
          const { data, error } =
            await browserClient.auth.exchangeCodeForSession(code);

          if (!error && data.session) {
            console.log("Magic Link login successful on client");
            window.location.href = "/";
            return;
          } else {
            console.error("Client-side Magic Link error:", error);
            setFragmentError({
              code: "client_exchange_failed",
              message:
                "Magic Link 인증에 실패했습니다. 아래에 이메일에서 받은 6자리 OTP 코드를 직접 입력해주세요.",
            });
          }
        } catch (error) {
          console.error("Client-side Magic Link processing error:", error);
          setFragmentError({
            code: "client_processing_error",
            message:
              "Magic Link 처리 중 오류가 발생했습니다. 아래에 이메일에서 받은 6자리 OTP 코드를 직접 입력해주세요.",
          });
        }
      }
    };

    const fragment = window.location.hash.substring(1);
    if (fragment) {
      const params = new URLSearchParams(fragment);
      const error = params.get("error");
      const errorCode = params.get("error_code");

      if (error && errorCode) {
        let userFriendlyMessage = "인증 중 오류가 발생했습니다.";

        if (errorCode === "otp_expired") {
          userFriendlyMessage =
            "Magic Link가 만료되었습니다. 새로운 OTP를 요청하거나 이메일에서 받은 6자리 코드를 직접 입력해주세요.";
        } else if (errorCode === "access_denied") {
          userFriendlyMessage = "인증이 거부되었습니다. 다시 시도해주세요.";
        }

        setFragmentError({
          code: errorCode,
          message: userFriendlyMessage,
        });
      }
    } else {
      // fragment가 없으면 query parameter 확인
      handleMagicLink();
    }
  }, []);

  // 서버사이드 에러 또는 클라이언트사이드 에러
  const displayError = loaderData?.urlError || fragmentError;

  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Confirm OTP</h1>
          <p className="text-sm text-muted-foreground">
            Enter the OTP code sent to your email address.
          </p>
        </div>

        {/* URL 에러 표시 */}
        {displayError && (
          <div className="w-full space-y-4">
            <AlertMessage
              content={displayError.message}
              variant="destructive"
            />
            <div className="text-center">
              <Link to="/auth/otp/start">
                <Button variant="outline" className="w-full">
                  새로운 OTP 요청하기
                </Button>
              </Link>
            </div>
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 text-center mb-4">
                또는 아래에 직접 OTP 코드를 입력하세요
              </p>
            </div>
          </div>
        )}

        <Form className="w-full space-y-4" method="post">
          <InputPair
            label="Email"
            description="Enter your email address"
            name="email"
            defaultValue={email || ""}
            id="email"
            required
            type="email"
            placeholder="i.e wemake@example.com"
          />
          {actionData && "fieldErrors" in actionData && (
            <p className="text-red-500">
              {actionData.fieldErrors?.email?.join(", ")}
            </p>
          )}
          <InputPair
            label="OTP"
            description="Enter the OTP code sent to your email address"
            name="otp"
            id="otp"
            required
            type="text"
            placeholder="예: 123456"
            maxLength={6}
            inputMode="numeric"
            pattern="[0-9]*"
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
            Verify OTP
          </LoadingButton>
          {actionData && "verifyError" in actionData && (
            <AlertMessage
              content={actionData.verifyError}
              variant="destructive"
            />
          )}
        </Form>

        {/* 추가 도움말 */}
        <div className="text-center text-sm text-gray-600">
          <p>OTP를 받지 못하셨나요?</p>
          <Link to="/auth/otp/start" className="text-blue-600 hover:underline">
            새로운 OTP 요청하기
          </Link>
        </div>
      </div>
    </div>
  );
}
