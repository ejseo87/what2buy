import { Resend } from "resend";
import { render } from "@react-email/components";
import type { Route } from "./+types/welcome-page";
import { WelcomeUser } from "@/react-email-starter/emails/welcom-user";
import { adminClient } from "~/supa-client";
import { getEmailByUserId, getUserProfile } from "../queries";

const resend = new Resend(process.env.RESEND_API_KEY);

export const loader = async ({ params }: Route.LoaderArgs) => {
  const username = params.username;
  console.log("welcome-page username=", username);

  const user = await getUserProfile(adminClient, { username: username });
  console.log("welcome-page user=", user);

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const email = await getEmailByUserId(adminClient, {
    userId: user.profile_id,
  });
  console.log("welcome-page email=", email);

  const { data, error } = await resend.emails.send({
    from: "eva <eva@mail.what2buy.cool>",
    to: email!,
    subject: "Welcome to What2Buy",
    react: <WelcomeUser username={username} />,
  });

  return Response.json({ data, error });
};
