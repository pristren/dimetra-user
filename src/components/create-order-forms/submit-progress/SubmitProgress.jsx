import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SubmitProgress({ loading, setShowProgress }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev < 99) {
            return Math.min(prev + 1, 99);
          } else {
            clearInterval(timer);
            return prev;
          }
        });
      }, 200);
      return () => clearInterval(timer);
    } else {
      setProgress(100);
      setShowProgress(false);
    }
  }, [loading]);

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Creating Order
        </CardTitle>
        <CardDescription className="text-center">
          Please wait while we create your order
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={progress} className="w-full h-3" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Progress
            </span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
