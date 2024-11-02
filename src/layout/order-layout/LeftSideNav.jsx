import { useLocation, Link, useNavigate } from "react-router-dom";
import { Logo, Logout, NewsIcon } from "@/assets/icons";
import { CarFront, ClipboardList, MessageCircle, Settings } from "lucide-react";
import { t } from "i18next";

const LeftSideNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div className="hidden lg:block w-60 h-screen border-r text-gray-500 p-4 pt-8 sticky top-0 text-wrap">
      <Link to="/orders/all-orders">
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
        <p>{t("all_orders")}</p>
      </Link>
      <Link
        to="/orders/history"
        className={`flex items-center gap-2 mb-4 px-2 py-2 cursor-pointer ${
          isActive("/orders/history") ? "bg-primary text-white  rounded-md" : ""
        }`}
      >
        <CarFront />
        <p>{t("history")}</p>
      </Link>
      <Link
        to="/orders/setting"
        className={`flex items-center gap-2 mb-4 px-2 py-2 cursor-pointer ${
          isActive("/orders/setting") ? "bg-primary text-white  rounded-md" : ""
        }`}
      >
        <Settings />
        <p>{t("settings")}</p>
      </Link>
      <Link
        to="/orders/sent-requests"
        className={`flex items-center gap-2 mb-4 px-2 py-2 cursor-pointer ${
          isActive("/orders/sent-requests")
            ? "bg-primary text-white  rounded-md"
            : ""
        }`}
      >
        <MessageCircle />
        <p>{t("sent_requests")}</p>
      </Link>
      <Link
        to="/orders/news"
        className={`flex items-center gap-2 mb-4 px-2 py-2 cursor-pointer ${
          isActive("/orders/news")
            ? "bg-primary text-white  rounded-md"
            : ""
        }`}
      >
        <NewsIcon />
        <p>{t("news")}</p>
      </Link>
      <div
        onClick={handleLogout}
        className="flex justify-center text-lg items-center gap-2 absolute bottom-5 cursor-pointer px-2 py-2"
      >
        <Logout />
        <p>{t("logout")}</p>
      </div>
    </div>
  );
};

export default LeftSideNav;
