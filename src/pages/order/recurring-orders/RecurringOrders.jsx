import AppSelect from "@/components/common/AppSelect";
import { timeOptions } from "@/components/create-order-forms/helpers";
import RecurringOrdersTable from "@/components/order/RecurringOrdersTable";
import { DatePicker } from "@/components/ui/DatePIcker";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

const RecurringOrders = () => {
  const [date, setDate] = useState(null);

  return (
    <div>
      <div className="flex items-center justify-between gap-5 w-full mb-10">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-bold text-nowrap border-r-2 border-black pr-4">Recurring Orders</h3>
          <h6 className="flex items-center gap-3">
            Order ID: <span className="text-gray-500 text-lg">#55424</span>
          </h6>
        </div>
        <div className="flex items-center gap-4">
          <DatePicker date={date} setDate={setDate} />
          <div className="relative">
            <AppSelect placeholder="00:00" items={timeOptions} isTime={true} />
          </div>
          <div className="relative">
            <Input placeholder="Search" className="w-60 h-10" />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
      <RecurringOrdersTable />
    </div>
  );
};

export default RecurringOrders;
