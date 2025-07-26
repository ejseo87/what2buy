import z from "zod";
import type { Route } from "./+types/social-complete-page";
import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";

const socialStartPageSchema = z.object({
  provider: z.enum(["github", "kakao"]),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { success, data } = socialStartPageSchema.safeParse(params);
  if (!success) {
    return redirect("/auth/login");
  }
  const { provider } = data;
  const url = new URL(request.url);
  //console.log("[social complete page] url=", url);
  const code = url.searchParams.get("code");
  //console.log("[social complete page] code=", code);
  if (!code) {
    return redirect("/auth/login");
  }
  const { client, headers } = makeSSRClient(request);
  const {
    data: { user, session },
    error,
  } = await client.auth.exchangeCodeForSession(code);
  if (error) {
    throw error;
  }
  //console.log("[social complete page] user=", user);
  //console.log("[social complete page] session=", session);
  return redirect("/", { headers });
};

/*
https://github.com/login/oauth/authorize
?client_id=What2Buy2025&redirect_to=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fsocial%2Fgithub%2Fcomplete

&redirect_uri=https%3A%2F%2Flxqslljpyseysytelrqx.supabase.co%2Fauth%2Fv1%2Fcallback

&response_type=code&scope=user%3Aemail

&state=eyJhbGciOiJIUzI1NiIsImtpZCI6IlRCVlMwcllZVEVIeXVWNVMiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3NTIyOTUxNzUsInNpdGVfdXJsIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJmdW5jdGlvbl9ob29rcyI6bnVsbCwicHJvdmlkZXIiOiJnaXRodWIiLCJyZWZlcnJlciI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTE3My9hdXRoL3NvY2lhbC9naXRodWIvY29tcGxldGUiLCJmbG93X3N0YXRlX2lkIjoiNjA0ODgxMzgtYWYxMC00NTlmLTljY2EtYTRhZTg0MGI2MWRkIn0.vxjjEMOX6_oW656pelj7TUEd7oQt6NhDFZxDPCkCT14 





social start page url= https://lxqslljpyseysytelrqx.supabase.co/auth/v1/authorize

?provider=github&redirect_to=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fsocial%2Fgithub%2Fcomplete

&code_challenge=xTZQI-MuL9s3dgk7j873pQda4EmTuobbhEg3izHJENg

&code_challenge_method=s256


social complete page url= URL {
  href: 'http://localhost:5173/auth/social/github/complete?error=server_error&error_code=unexpected_failure&error_description=Error+getting+user+profile+from+external+provider',
  origin: 'http://localhost:5173',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'localhost:5173',
  hostname: 'localhost',
  port: '5173',
  pathname: '/auth/social/github/complete',
  search: '?error=server_error&error_code=unexpected_failure&error_description=Error+getting+user+profile+from+external+provider',
  searchParams: URLSearchParams {
    'error' => 'server_error',
    'error_code' => 'unexpected_failure',
    'error_description' => 'Error getting user profile from external provider' },
  hash: ''
}
*/
