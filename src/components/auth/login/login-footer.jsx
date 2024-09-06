import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React from "react";

export default function LoginFooter() {
  return (
    <div className="flex justify-between mt-4 mb-8">
      <div className="flex items-center space-x-2">
        <Checkbox id="remember" />
        <Label
          className="text-[#6F767E] font-normal tracking-wide cursor-pointer"
          htmlFor="remember"
        >
          Remember me
        </Label>
      </div>
      <p className="text-destructive underline text-sm cursor-pointer">
        Forgot your password?
      </p>
    </div>
  );
}
