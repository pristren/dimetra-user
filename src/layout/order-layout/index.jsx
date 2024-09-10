import { Outlet } from "react-router-dom";
import LeftSideNav from "./LeftSideNav";

const OrderLayout = () => {
    return (
        <div className="flex items-start justify-start w-full">
            <LeftSideNav />
            <div className="bg-[#F9FCFF] px-5 w-full py-8 min-h-screen">
            <Outlet />
            </div>
        </div>
    );
};

export default OrderLayout;