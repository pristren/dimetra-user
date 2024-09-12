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
  const filters = ["All Order", "Recurring"];
  const [selectedFilter, setSelectedFilter] = useState(null);
  const handleFilterChange = (value) => {
    setSelectedFilter(value);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-5 w-full mb-10">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl font-bold text-nowrap">All Orders</h3>
          <DatePicker date={date} setDate={setDate} />
        </div>
        <div className="flex items-center gap-4">
          <AppSelect
            items={filters}
            placeholder="Filters"
            className="max-w-sm"
            onValueChange={handleFilterChange}
          />
          <div className="relative">
            <Input placeholder="Search" className="w-60 h-10" />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2" />
          </div>
          <Link to="/create-order">
            <Button>Make an order</Button>
          </Link>
        </div>
      </div>
      <AllOrdersTable filter={selectedFilter} selectedFilter={selectedFilter}/>
    </div>
  );
};

export default AllOrders;
