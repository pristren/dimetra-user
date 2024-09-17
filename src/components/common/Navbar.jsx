import { DefaultAvatar, Logo } from "@/assets/icons";
import Language from "@/components/helper-ui/Language";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export default function Navbar() {
  const url = window.location.pathname;
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };
  return (
    <nav
      className={`
        ${url === "/create-order" ? "" : "md:justify-end"}
        flex justify-between items-center border-b px-8 py-2.5 sticky top-0 bg-white z-20
      `}
    >
      <Link to="/">
        <Logo className={url === "/create-order" ? "" : "md:hidden"} />
      </Link>
      <div className="flex items-center gap-3">
        <Language />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3">
            <DefaultAvatar />
            <p className="text-sm">Mahmud</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}