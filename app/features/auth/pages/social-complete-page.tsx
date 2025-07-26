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
