import { useLocation, Link } from "react-router-dom";
import Logo from "@/assets/icons/logo";
import { CarFront, ClipboardList, MessageCircle, Settings } from "lucide-react";

const LeftSideNav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-60 border-r border-gray-300 shadow-xl text-gray-500 min-h-screen p-4">
      <Logo className="mx-auto" />
      <Link
        to="/order"
        className={`flex items-center gap-2 mb-8 cursor-pointer mt-10 ${
          isActive("/order") ? "bg-primary text-white px-2 py-2 rounded-md" : ""
        }`}
      >
        <ClipboardList />
        <p>All Orders</p>
      </Link>
      <Link
        to="/order/history"
        className={`flex items-center gap-2 mb-8 cursor-pointer ${
          isActive("/order/history") ? "bg-primary text-white px-2 py-2 rounded-md" : ""
        }`}
      >
        <CarFront />
        <p>History</p>
      </Link>
      <Link
        to="/order/settings"
        className={`flex items-center gap-2 mb-8 cursor-pointer ${
          isActive("/order/settings") ? "bg-primary text-white px-2 py-2 rounded-md" : ""
        }`}
      >
        <Settings />
        <p>Settings</p>
      </Link>
      <Link
        to="/order/Chat"
        className={`flex items-center gap-2 mb-8 cursor-pointer ${
          isActive("/order/Chat") ? "bg-primary text-white px-2 py-2 rounded-md" : ""
        }`}
      >
        <MessageCircle />
        <p>Chat</p>
      </Link>
    </div>
  );
};

export default LeftSideNav;
