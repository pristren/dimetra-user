import { useLocation, Link, useNavigate } from "react-router-dom";
import { Logout } from "@/assets/icons";
import {
  CarFront,
  ClipboardList,
  Menu,
  MessageCircle,
  Settings,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DimetraMobileLogo from "@/assets/icons/DimetraMobileLogo";

const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle />
          <div className="flex items-center justify-between">
            <Link to="/">
              <DimetraMobileLogo className="mx-auto" />
            </Link>
          </div>
        </SheetHeader>

        <nav className="mt-4 text-gray-500">
          <Link
            to="/orders/all-orders"
            className={`flex items-center gap-2 px-2 py-2 cursor-pointer mb-4 ${
              isActive("/orders/all-orders")
                ? "bg-primary text-white rounded-md"
                : ""
            }`}
          >
            <ClipboardList />
            <p>All Orders</p>
          </Link>

          <Link
            to="/orders/history"
            className={`flex items-center gap-2 px-2 py-2 cursor-pointer mb-4 ${
              isActive("/orders/history")
                ? "bg-primary text-white rounded-md"
                : ""
            }`}
          >
            <CarFront />
            <p>History</p>
          </Link>

          <Link
            to="/orders/setting"
            className={`flex items-center gap-2 px-2 py-2 cursor-pointer mb-4 ${
              isActive("/orders/setting")
                ? "bg-primary text-white rounded-md"
                : ""
            }`}
          >
            <Settings />
            <p>Settings</p>
          </Link>

          <Link
            to="/orders/sent-requests"
            className={`flex items-center gap-2 px-2 py-2 cursor-pointer mb-4 ${
              isActive("/orders/sent-requests")
                ? "bg-primary text-white rounded-md"
                : ""
            }`}
          >
            <MessageCircle />
            <p>Sent Request</p>
          </Link>
        </nav>

        <div
          onClick={handleLogout}
          className="flex justify-center text-lg items-center gap-2 absolute bottom-5 cursor-pointer px-2 py-2"
        >
          <Logout />
          <span>Logout</span>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
