import AppSelect from "@/components/common/AppSelect";
import OrderHistoryTable from "@/components/order/OrderHistoryTable";
import { DatePicker } from "@/components/ui/DatePIcker";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const OrderHistory = () => {
  const [date, setDate] = useState(null);
  const filters = ["rafi", "rami", "rayan"]
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-5 w-full mb-10">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-bold">History</h3>
          <DatePicker date={date} setDate={setDate} />
        </div>
        <div className="flex items-center gap-4 ">
          <AppSelect items={filters} placeholder="filters" className="gap-10" />
          <div className="relative">
            <Input placeholder="Search" className="w-60" />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
      <OrderHistoryTable />
    </div>
  );
};

export default OrderHistory;
