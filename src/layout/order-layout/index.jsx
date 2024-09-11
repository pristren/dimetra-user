import { Outlet } from "react-router-dom";
import LeftSideNav from "./LeftSideNav";
import Navbar from "@/components/common/navbar";

const OrderLayout = () => {
  return (
    <div className="flex items-start justify-start w-full">
      <LeftSideNav />
      <div className="w-full h-screen overflow-hidden overflow-y-auto">
        <Navbar />
        <div className="px-5 bg-[#F9FCFF] py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OrderLayout;
