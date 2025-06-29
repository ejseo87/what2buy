import { Form } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import { useState } from "react";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import SelectPair from "~/common/components/select-pair";
import { Separator } from "~/common/components/ui/separator";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Settings | wemake" }];
};

export default function SettingsPage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };
  return (
    <div className="space-y-20 ">
      <div className="grid grid-cols-6 gap-40">
        <div className="col-span-4 flex flex-col gap-10">
          <h2 className="text-2xl font-semibold">Edit profile</h2>
          <Form className="flex flex-col w-1/2 gap-5">
            <InputPair
              label="Name"
              description="Your public name"
              required
              id="name"
              name="name"
              placeholder="John Doe"
              type="text"
            />
            <InputPair
              label="Email"
              description="Your public email address"
              required
              id="email"
              name="email"
              placeholder="example@example.com"
              type="email"
            />
            <Separator />
            <h4>Change Password</h4>
            <p className="text-sm text-muted-foreground">
              If you want to change your password, please enter your current
              password and new password.
            </p>
            <InputPair
              label="Current Password"
              description="Your current password"
              id="password"
              name="password"
              type="password"
            />
            <InputPair
              label="New Password"
              description="Your new password"
              id="newPassword"
              name="newPassword"
              type="password"
            />
            <InputPair
              label="Confirm New Password"
              description="Confirm your new password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
            />
            <Button className="w-full fill-primary">Update profile</Button>
          </Form>
        </div>
        <aside className="col-span-2 p-6 rounded-lg border shadow-md">
          <Label className="flex flex-col gap-1 pb-5">
            Avatar
            <small className="text-muted-foreground">
              This is your public avatar.
            </small>
          </Label>
          <div className="space-y-5">
            <div className="size-40 rounded-full shadow-xl overflow-hidden ">
              {avatar ? (
                <img src={avatar} className="object-cover w-full h-full" />
              ) : null}
            </div>
            <Input
              type="file"
              className="w-1/2"
              onChange={onChange}
              required
              name="icon"
            />
            <div className="flex flex-col text-xs">
              <span className=" text-muted-foreground">
                Recommended size: 128x128px
              </span>
              <span className=" text-muted-foreground">
                Allowed formats: PNG, JPEG
              </span>
              <span className=" text-muted-foreground">Max file size: 1MB</span>
            </div>
            <Button className="w-full">Update avatar</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
