import { GithubIcon, LockIcon, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Separator } from "~/common/components/ui/separator";

export default function AuthButtons() {
  return (
    <div className="w-full flex flex-col items-center gap-10">
      <div className="w-full flex flex-col items-center gap-2">
        <Separator className="w-full" />
        <span className="text-xs text-muted-foreground uppercase font-medium">
          또는 아래 버튼으로 시작하기
        </span>
        <Separator className="w-full" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/social/kakao/start">
            <MessageCircleIcon className="w-4 h-4" />
            카카오톡 가입 및 로그인
          </Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/social/github/start">
            <GithubIcon className="w-4 h-4" />
            Github 가입 및 로그인
          </Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/auth/otp/start">
            <LockIcon className="w-4 h-4" />
            OTP 가입 및 로그인
          </Link>
        </Button>
      </div>
    </div>
  );
}
