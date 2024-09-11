import { useLocation, Link } from "react-router-dom";
import Logo from "@/assets/icons/logo";
import { CarFront, ClipboardList, MessageCircle, Settings } from "lucide-react";

const LeftSideNav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-72 h-screen border-r text-gray-500 p-4 pt-8">
      <Link to="/">
        <Logo className="mx-auto" />
      </Link>
      <Link
        to="/order/all-orders"
        className={`flex items-center gap-2  px-2 py-2 cursor-pointer mt-8 mb-4 ${
          isActive("/order/all-orders")
            ? "bg-primary text-white  rounded-md"
            : ""
        }`}
      >
        <ClipboardList />
        <p>All Orders</p>
      </Link>
      <Link
        to="/order/history"
        className={`flex items-center gap-2 mb-4 px-2 py-2 cursor-pointer ${
          isActive("/order/history") ? "bg-primary text-white  rounded-md" : ""
        }`}
      >
        <CarFront />
        <p>History</p>
      </Link>
      <Link
        to="/order/setting"
        className={`flex items-center gap-2 mb-4 px-2 py-2 cursor-pointer ${
          isActive("/order/setting") ? "bg-primary text-white  rounded-md" : ""
        }`}
      >
        <Settings />
        <p>Settings</p>
      </Link>
      <Link
        to="/order/send-request"
        className={`flex items-center gap-2 mb-4 px-2 py-2 cursor-pointer ${
          isActive("/order/send-request")
            ? "bg-primary text-white  rounded-md"
            : ""
        }`}
      >
        <MessageCircle />
        <p>Chat</p>
      </Link>
    </div>
  );
};

export default LeftSideNav;
