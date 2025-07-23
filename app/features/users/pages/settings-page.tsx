import { Form, useNavigation } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import { useState } from "react";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import SelectPair from "~/common/components/select-pair";
import { Separator } from "~/common/components/ui/separator";
import { makeSSRClient } from "~/supa-client";
import { checkUsername, getLoggedInUserId, getUserById } from "../queries";
import LoadingButton from "~/common/components/loading-button";
import z from "zod";
import AlertMessage from "~/common/components/alert-message";
import { updateUser, updateUserAvatar } from "../mutations";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Edit profile | What2Buy" }];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userID = await getLoggedInUserId(client as any);
  const user = await getUserById(client as any, { id: userID });
  return { user };
};

const formSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userID = await getLoggedInUserId(client as any);
  console.log("settings page userID=", userID);
  const formData = await request.formData();
  const avatar = formData.get("avatar");
  console.log("settings page avatar=", avatar);
  if (avatar && avatar instanceof File) {
    if (
      avatar.size <= 1048576 && // 1MB = 1024 * 1024
      (avatar.type === "image/png" || avatar.type === "image/jpeg")
    ) {
      const { data, error } = await client.storage
        .from("avatars")
        .upload(`${userID}/${Date.now()}`, avatar, {
          contentType: avatar.type,
          upsert: false,
        });
      if (error) {
        console.log("avatar upload error=", error);
        // error.message를 반환
        return {
          formErrors: { avatar: error.message || "Failed to upload avatar" },
        };
      }
      const {
        data: { publicUrl },
      } = await client.storage.from("avatars").getPublicUrl(data.path);
      await updateUserAvatar(client as any, {
        profile_id: userID,
        avatarUrl: publicUrl,
      });
    } else {
      return { formErrors: { avatar: "Invalid file size or type" } };
    }
  } else {
    const { success, data, error } = formSchema.safeParse(
      Object.fromEntries(formData)
    );
    if (!success) {
      return { formErrors: error.flatten().fieldErrors };
    }
    const usernameCount = await checkUsername(client as any, {
      username: data.username,
    });
    if (usernameCount && usernameCount > 0) {
      return { formErrors: { username: "Username already exists" } };
    }
    const userID = await getLoggedInUserId(client as any);
    await updateUser(client as any, {
      profile_id: userID,
      name: data.name,
      username: data.username,
    });
    return {
      ok: true,
    };
  }
};

export default function SettingsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [avatar, setAvatar] = useState<string | null>(loaderData.user.avatar);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="space-y-20 ">
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-10 sm:gap-40">
        <div className="col-span-1 sm:col-span-3 flex flex-col gap-10">
          {actionData?.ok ? (
            <AlertMessage content="프로파일 변경사항이 저장되었습니다." />
          ) : null}
          <h2 className="text-2xl font-semibold">프로필 변경</h2>
          <Form className="flex flex-col  gap-5" method="post">
            <InputPair
              label="이름"
              description="공개될 이름"
              required
              defaultValue={loaderData.user.name}
              id="name"
              name="name"
              placeholder="홍길동"
              type="text"
            />
            {actionData?.formErrors && "name" in actionData?.formErrors ? (
              <p className="text-red-500">
                {actionData.formErrors?.name?.join(", ")}
              </p>
            ) : null}
            <InputPair
              label="Username"
              description="공개될 username으로 사용자를 식별할 수 있습니다."
              required
              defaultValue={loaderData.user.username}
              id="username"
              name="username"
              placeholder="username"
              type="text"
            />
            {actionData?.formErrors && "username" in actionData?.formErrors ? (
              <p className="text-red-500">
                {Array.isArray(actionData.formErrors?.username)
                  ? actionData.formErrors?.username?.join(", ")
                  : actionData.formErrors?.username}
              </p>
            ) : null}
            {/*             <Separator />
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
            /> */}
            <LoadingButton
              className="w-full fill-primary"
              type="submit"
              isLoading={isSubmitting}
            >
              프로필 변경
            </LoadingButton>
          </Form>
        </div>
        <Form
          className="col-span-1 sm:col-span-3 p-6 rounded-lg border shadow-md"
          method="post"
          encType="multipart/form-data"
        >
          <Label className="flex flex-col gap-1 pb-5">
            아바타
            <small className="text-muted-foreground">
              공개될 아바타 이미지입니다.
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
              name="avatar"
            />
            {actionData?.formErrors && "avatar" in actionData?.formErrors ? (
              <p className="text-red-500">
                {Array.isArray(actionData.formErrors?.avatar)
                  ? actionData.formErrors?.avatar?.join(", ")
                  : actionData.formErrors?.avatar}
              </p>
            ) : null}
            <div className="flex flex-col text-xs">
              <span className=" text-muted-foreground">
                권장 크기: 128x128px
              </span>
              <span className=" text-muted-foreground">
                허용되는 이미지 포맷: PNG, JPEG
              </span>
              <span className=" text-muted-foreground">
                최대 파일 크기: 1MB
              </span>
            </div>
            <LoadingButton
              className="w-full fill-primary"
              type="submit"
              isLoading={isSubmitting}
            >
              아바타 변경
            </LoadingButton>
          </div>
        </Form>
      </div>
    </div>
  );
}
