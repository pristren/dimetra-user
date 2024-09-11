import DefaultAvatar from "@/assets/icons/default-avatar";
import Logo from "@/assets/icons/logo";
import Language from "@/components/helper-ui/language";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Navbar() {
  const url = window.location.pathname;
  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("accessToken")
  }
  return (
    <nav
      className={`
        ${url === "/create-order" ? "" : "md:justify-end"}
        flex justify-between items-center border-b px-8 py-2.5 sticky top-0 bg-white z-20
      `}
    >
      <Logo className={url === "/create-order" ? "" : "md:hidden"} />
      <div className="flex items-center gap-3">
        <Language />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3">
            <DefaultAvatar />
            <p className="text-sm">Mahmud</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
