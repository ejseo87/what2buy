import { Form, Link, NavLink, Outlet, useOutletContext } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button, buttonVariants } from "~/common/components/ui/button";
import type { Route } from "./+types/profile-page";
import { makeSSRClient } from "~/supa-client";
import { getUserProfile } from "../queries";
import { getTicketCount } from "~/features/tickets/queries";
import { getRecommendationCount } from "~/features/histories/queries";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Profile | what2buy" }];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const username = params.username;
  console.log("profile-page username=", username);
  const { client } = makeSSRClient(request);
  const user = await getUserProfile(client as any, { username: username });
  const unusedTicketCount = await getTicketCount(client as any, {
    profile_id: user.profile_id,
    status: "not_used",
  });
  const recommendationCount = await getRecommendationCount(client as any, {
    profile_id: user.profile_id,
  });
  return { user, unusedTicketCount, recommendationCount };
};

export default function ProfilePage({
  loaderData,
  params,
}: Route.ComponentProps) {
  const { isLoggedIn, username } = useOutletContext<{
    isLoggedIn: boolean;
    username: string;
  }>();

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <Avatar className="size-40">
          {loaderData.user.avatar ? (
            <AvatarImage src={loaderData.user.avatar} />
          ) : (
            <AvatarFallback className="text-2xl">
              {loaderData.user.name[0]}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="space-y-5">
          <div className="flex gap-2">
            <h1 className="text-2xl font-semibold">{loaderData.user.name}</h1>
            {isLoggedIn && username === params.username ? (
              <Button variant="outline" asChild>
                <Link to="/my/settings">Edit profile</Link>
              </Button>
            ) : null}
          </div>
          <div className="flex flex-col gap-2 justify-start items-start">
            <span className="text-sm text-muted-foreground px-2">
              @{loaderData.user.username}
            </span>
            {isLoggedIn && username === params.username ? (
              <>
                <Badge variant={"secondary"}>
                  {loaderData.unusedTicketCount ?? 0}개의 사용권
                </Badge>
                <Badge variant={"secondary"}>
                  {loaderData.recommendationCount ?? 0}번의 추천 기록
                </Badge>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
