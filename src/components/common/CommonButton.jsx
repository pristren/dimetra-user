/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const CommonButton = forwardRef(({ children, className, disabled, ...props }, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        `bg-lime-300 font-semibold py-2 px-7 rounded-md text-black ${disabled && "bg-opacity-60 text-opacity-60"} ${!disabled && "cursor-pointer"}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

export default CommonButton;