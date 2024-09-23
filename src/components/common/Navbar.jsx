import { DefaultAvatar, Logo } from "@/assets/icons";
import Language from "@/components/helper-ui/Language";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const url = window.location.pathname;
  const { userInfo } = useSelector((state) => state.user);
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
        <div className="flex items-center gap-3">
          <DefaultAvatar />
          <p className="text-sm">{userInfo?.first_name}</p>
        </div>
      </div>
    </nav>
  );
}
