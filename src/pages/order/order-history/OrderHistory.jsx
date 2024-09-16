import { AppTable } from "@/components/common/AppTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "@/assets/icons";

import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

const OrderHistory = () => {
  const [date, setDate] = useState(null);
  const filters = [
    "All Order",
    "Recurring",
    "Verlegungsart",
    "Sammelauftrag",
    "Privatfahrt",
  ];

  const data = [
    {
      date: "2024-09-08",
      time: "14:30",
      pickUp: "123 Main St.",
      destination: "456 Elm St.",
      vehicle: "Sedan",
      driver: "John Doe",
      dispatcher: "Jane Smith",
      status: "Completed",
      rateToDriver: "Rate the driver",
      action: "View",
      orderType: "Recurring",
    },
    {
      date: "2024-09-08",
      time: "14:30",
      pickUp: "123 Main St.",
      destination: "456 Elm St.",
      vehicle: "Sedan",
      driver: "John Doe",
      dispatcher: "Jane Smith",
      status: "Rejected",
      rateToDriver: "Rate the driver",
      orderType: "Verlegungsart",
    },
    {
      date: "2024-09-08",
      time: "14:30",
      pickUp: "123 Main St.",
      destination: "456 Elm St.",
      vehicle: "Sedan",
      driver: "John Doe",
      dispatcher: "Jane Smith",
      status: "Completed",
      rateToDriver: "Rate the driver",
      orderType: "Sammelauftrag",
    },
    {
      date: "2024-09-08",
      time: "14:30",
      pickUp: "123 Main St.",
      destination: "456 Elm St.",
      vehicle: "Sedan",
      driver: "John Doe",
      dispatcher: "Jane Smith",
      status: "Rejected",
      rateToDriver: "Rate the driver",
      orderType: "Privatfahrt",
    },
  ];
  const getStatusColor = (status) => {
    switch (status) {
      case "Rejected":
        return "#FEF1E0";
      case "Completed":
        return "#D1F8D5";
      default:
        return "#FFFFFF"; // Default color if status is unknown
    }
  };

  const columns = [
    {
      accessorKey: "date",
      header: () => (
        <div className="flex items-center gap-2">
          <span>Date & Time</span>
          <ArrowUpDown
            className="ml-2 h-4 w-4 cursor-pointer"
            aria-label="Sort by Date & Time"
          />
        </div>
      ),
    },
    {
      accessorKey: "pickUp",
      header: () => (
        <div className="flex items-center gap-2">
          <span>Pick Up</span>
          <ArrowUpDown
            className="ml-2 h-4 w-4 cursor-pointer"
            aria-label="Sort by Pick Up"
          />
        </div>
      ),
    },
    {
      accessorKey: "destination",
      header: () => (
        <div className="flex items-center gap-2">
          <span>Destination</span>
          <ArrowUpDown
            className="ml-2 h-4 w-4 cursor-pointer"
            aria-label="Sort by Destination"
          />
        </div>
      ),
    },
    {
      accessorKey: "vehicle",
      header: () => (
        <div className="flex items-center gap-2">
          <span>Vehicle</span>
          <ArrowUpDown
            className="ml-2 h-4 w-4 cursor-pointer"
            aria-label="Sort by Vehicle"
          />
        </div>
      ),
    },
    {
      accessorKey: "driver",
      header: () => (
        <div className="flex items-center gap-2">
          <span>Driver</span>
          <ArrowUpDown
            className="ml-2 h-4 w-4 cursor-pointer"
            aria-label="Sort by Driver"
          />
        </div>
      ),
    },
    {
      accessorKey: "dispatcher",
      header: () => (
        <div className="flex items-center gap-2">
          <span>Dispatcher</span>
          <ArrowUpDown
            className="ml-2 h-4 w-4 cursor-pointer"
            aria-label="Sort by Dispatcher"
          />
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        const statusColor = getStatusColor(status);

        return (
          <Button
            className="py-1.5 h-min px-2 rounded-md w-max text-black text-xs"
            style={{ backgroundColor: statusColor }}
          >
            {status}
          </Button>
        );
      },
    },
    {
      accessorKey: "rateToDriver",
      header: () => (
        <div className="flex items-center gap-2">
          <span>Rate to Driver</span>
          <ArrowUpDown
            className="ml-2 h-4 w-4 cursor-pointer"
            aria-label="Sort by Rate to Driver"
          />
        </div>
      ),
      cell: ({ row }) => {
        if (row.getValue("status") === "Completed") {
          return (
            <Button
              className="py-1.5 h-min px-2 rounded-md w-max text-black text-xs"
              style={{ backgroundColor: "#D1F8D5" }}
            >
              Rate the driver
            </Button>
          );
        }
      },
    },
    {
      accessorKey: "action",
      header: () => (
        <p className="text-center flex justify-center items-center">
          Action
          <ArrowUpDown
            className="ml-2 h-4 w-4 cursor-pointer"
            aria-label="Sort by Action"
          />
        </p>
      ),
      cell: () => (
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical
                className="h-4 w-4 cursor-pointer"
                aria-label="More options"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Print Order</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
    {
      // because we want to filter by type of order but not show it in the table
      accessorKey: "orderType",
      header: () => null,
      cell: () => null,
    },
  ];
  return (
    <div className="w-full">
      <AppTable
        columns={columns}
        data={data}
        pageTitle="History"
        addButton={{
          visibility: false,
        }}
        isDateVisible={true}
        isFilterVisible={true}
        date={date}
        setDate={setDate}
        filters={filters}
        isSearchVisible={true}
        isRecurring={false}
      />
    </div>
  );
};

export default OrderHistory;
