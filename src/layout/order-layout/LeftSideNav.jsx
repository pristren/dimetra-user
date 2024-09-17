import { useLocation, Link } from "react-router-dom";
import { Logo } from "@/assets/icons";
import { CarFront, ClipboardList, MessageCircle, Settings } from "lucide-react";

const LeftSideNav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-60 h-screen border-r text-gray-500 p-4 pt-8 sticky top-0">
      <Link to="/">
        <Logo className="mx-auto" />
      </Link>
      <Link
        to="/orders/all-orders"
        className={`flex items-center gap-2  px-2 py-2 cursor-pointer mt-8 mb-4 ${
          isActive("/orders/all-orders")
            ? "bg-primary text-white  rounded-md"
            : ""
        }`}
      >
        <ClipboardList />
        <p>All Orders</p>
      </Link>
      <Link
        to="/orders/history"
        className={`flex items-center gap-2 mb-4 px-2 py-2 cursor-pointer ${
          isActive("/orders/history") ? "bg-primary text-white  rounded-md" : ""
        }`}
      >
        <CarFront />
        <p>History</p>
      </Link>
      <Link
        to="/orders/setting"
        className={`flex items-center gap-2 mb-4 px-2 py-2 cursor-pointer ${
          isActive("/orders/setting") ? "bg-primary text-white  rounded-md" : ""
        }`}
      >
        <Settings />
        <p>Settings</p>
      </Link>
      <Link
        to="/orders/all-chats"
        className={`flex items-center gap-2 mb-4 px-2 py-2 cursor-pointer ${
          isActive("/orders/all-chats")
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
