/* eslint-disable react/prop-types */
import { Logo } from "@/assets/icons";
import Language from "@/components/helper-ui/Language";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function AuthLayout({ children, childContainer, ...props }) {
  return (
    <div className="h-screen" {...props}>
      <nav className="flex justify-between items-center  px-4 border-b h-16">
        <Link to="/">
          <Logo />
        </Link>
        <Language />
      </nav>
      <div
        className={cn(
          "bg-authBackground w-full bg-cover  bg-no-repeat h-[calc(100vh-4rem)] flex flex-col justify-center items-center",
          childContainer
        )}
      >
        {children}
      <div className="mt-20 flex flex-col items-center justify-center">
        <p className="text-lg mb-5 text-center">Powered by</p>
        <Logo />
      </div>
      </div>
    </div>
  );
}
