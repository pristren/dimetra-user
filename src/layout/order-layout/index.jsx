import { Outlet } from "react-router-dom";
import LeftSideNav from "./LeftSideNav";
import Navbar from "@/components/common/Navbar";

const OrderLayout = () => {
  return (
    <div className="flex w-full min-h-screen">
      <LeftSideNav />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 px-5 bg-[#F9FCFF] py-8 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OrderLayout;
