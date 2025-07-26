import { redirect } from "react-router";
import type { Route } from "./+types/social-start-page";
import z from "zod";
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
  const redirectTo = `https://what2buy.cool/auth/social/${provider}/complete`;
  //console.log("[social start page] redirectTo=", redirectTo);
  const { client, headers } = makeSSRClient(request);
  const {
    data: { url },
    error,
  } = await client.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo,
    },
  });

  if (url) {
    //console.log("[social start page] url=", url);
    return redirect(url, { headers });
  }
  if (error) {
    throw error;
  }
};
