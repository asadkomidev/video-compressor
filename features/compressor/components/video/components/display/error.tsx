import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { FC } from "react";

interface ErrorProps {
  error: string;
}

export const Error: FC<ErrorProps> = ({ error }) => {
  return (
    <Alert variant="destructive" className="mt-2">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        {error} - Please try again or use a different video file.
      </AlertDescription>
    </Alert>
  );
};
