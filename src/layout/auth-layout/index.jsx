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
          "bg-authBackground w-full bg-cover  bg-no-repeat h-[calc(100vh-4rem)] flex justify-center items-center",
          childContainer
        )}
      >
        {children}
      </div>
    </div>
  );
}
