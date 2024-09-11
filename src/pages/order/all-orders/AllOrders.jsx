import AppSelect from "@/components/common/AppSelect";
import AllOrdersTable from "@/components/order/AllOrdersTable";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/DatePIcker";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AllOrders = () => {
  const [date, setDate] = useState(null);
  const filters = ["rafi", "rami", "rayan"];
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-5 w-full mb-10">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-bold">History</h3>
          <DatePicker date={date} setDate={setDate} />
        </div>
        <div className="flex items-center gap-4 ">
          <AppSelect
            items={filters}
            placeholder="filters"
            className="max-w-sm"
          />
          <div className="relative">
            <Input placeholder="Search" className="w-60" />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2" />
          </div>
          <Link to="/create-order">
            <Button>Make an order</Button>
          </Link>
        </div>
      </div>
      <AllOrdersTable />
    </div>
  );
};

export default AllOrders;
