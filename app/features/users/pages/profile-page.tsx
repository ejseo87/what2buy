import { Form, Link, NavLink, Outlet } from "react-router";
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

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const username = params.username;
  console.log("profile-page username=", username);
  const { client } = makeSSRClient(request);
  const user = await getUserProfile(client as any, { username: username });
  return { user };
};

export default function ProfilePage({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <Avatar className="size-40">
          {user.avatar ? (
            <AvatarImage src={user.avatar} />
          ) : (
            <AvatarFallback className="text-2xl">{user.name[0]}</AvatarFallback>
          )}
        </Avatar>
        <div className="space-y-5">
          <div className="flex gap-2">
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <Button variant="outline" asChild>
              <Link to="/my/settings">Edit profile</Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2 justify-start items-start">
            <span className="text-sm text-muted-foreground px-2">
              @{user.username}
            </span>

            <Badge variant={"secondary"}>paid 3 tickets </Badge>
            <Badge variant={"secondary"}>5 recommendations</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
