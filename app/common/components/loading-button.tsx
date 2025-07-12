import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingContent?: React.ReactNode;
  children: React.ReactNode;
}

export default function LoadingButton({
  isLoading = false,
  loadingContent,
  children,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={isLoading || disabled} {...props}>
      {isLoading
        ? loadingContent || <LoaderCircle className="animate-spin" />
        : children}
    </Button>
  );
}
