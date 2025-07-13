import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/common/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

interface AlertMessageProps {
  content: string | undefined;
  variant?: "default" | "destructive";
  className?: string;
}

export default function AlertMessage({
  content,
  variant = "destructive",
  className = "flex flex-row items-center gap-2",
}: AlertMessageProps) {
  if (!content) return null;

  return (
    <Alert variant={variant} className={className}>
      <AlertCircleIcon className="w-4 h-4" />
      <AlertDescription className="text-sm font-light">
        {content}
      </AlertDescription>
    </Alert>
  );
}
