import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppTable } from "@/components/common/AppTable";
import Pencil from "@/assets/icons/Pencil";
import Trash from "@/assets/icons/Trash";
import Document from "@/assets/icons/Documents";
import ArrowUpDown from "@/assets/icons/ArrowUpDown";
import Pause from "@/assets/icons/Pause";

const AllOrders = () => {
  const [date, setDate] = useState(null);
  const filters = [
    "All Order",
    "Recurring",
    "Verlegungsart",
    "Sammelauftrag",
    "Privatfahrt",
  ];

  const [data, setData] = useState([
    {
      id: "",
      date: "",
      pickUp: "",
      destination: "",
      driver: "",
      patientName: "",
      orderType: "",
      status: "",
    },
  ]);

  useEffect(() => {
    // wait for 2 seconds before setting the data
    setTimeout(() => {
      setData([
        {
          id: "1",
          date: "2024-10-08",
          pickUp: "Universität Spital, 4056 Basel something something",
          destination: "St. Clara Spital, 4058 Basel",
          driver: "JohnDoe JohnDoe",
          patientName: "Sedan",
          orderType: "Recurring",
          status: "Pending",
        },
        {
          id: "2",
          date: "2024-12-08",
          pickUp: "Universität Spital, 4056 Basel",
          destination: "St. Clara Spital, 4058 Basel",
          driver: "John Doe",
          patientName: "Sedan Elon",
          orderType: "Verlegungsart",
          status: "On Ride",
        },
        {
          id: "3",
          date: "2024-06-08",
          pickUp: "123 Main St.",
          destination: "456 Elm St. Germain",
          driver: "John Doe",
          patientName: "Sedan",
          orderType: "Sammelauftrag",
          status: "Confirmed",
        },
        {
          id: "4",
          date: "2024-07-08",
          pickUp: "123 Main St.",
          destination: "456 Elm St.",
          driver: "John Doe",
          patientName: "Sedan",
          orderType: "Privatfahrt",
          status: "Paused",
        },
        {
          id: "5",
          date: "2024-09-08",
          pickUp: "Universität Spital, 4056 Basel",
          destination: "St. Clara Spital, 4058 Basel",
          driver: "John Doe",
          patientName: "Sedan Elon",
          orderType: "Verlegungsart",
          status: "On Ride",
        },
      ]);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "On Ride":
        return "#FEF1E0";
      case "Confirmed":
        return "#D1F8D5";
      case "Paused":
        return "#DCF3FF";
      case "Pending":
        return "#DCF3FF";
      default:
        return "#FFFFFF"; // Default color if status is unknown
    }
  };

  const columns = [
    {
      accessorKey: "date",
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          Date & Time
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
    },
    {
      accessorKey: "pickUp",
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          Pick Up
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
    },
    {
      accessorKey: "destination",
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          Destination
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
    },
    {
      accessorKey: "driver",
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          Driver
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
    },
    {
      accessorKey: "patientName",
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          Patient Name
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
    },
    {
      accessorKey: "orderType",
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          Order Type
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
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
      accessorKey: "action",
      header: () => (
        <div className="text-center flex items-center justify-center">
          Action
          <ArrowUpDown className="h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        const orderType = row.getValue("orderType");
        return (
          <div className="flex justify-center items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {row.original.id && (
                  <EllipsisVertical className="h-4 w-4 cursor-pointer" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="-translate-x-5 p-4 w-60">
                <DropdownMenuItem className="flex items-center gap-3 text-[16px] mb-2 py-2">
                  <Pencil className="size-5 text-gray-600" />
                  <span className="text-gray-700 text-sm">Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 text-[16px] mb-2 py-2">
                  <Trash className="size-5" />

                  <span className="text-gray-700 text-sm">Storno</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2 mb-2">
                  <Link
                    to={`${
                      orderType === "Recurring"
                        ? `/orders/recurring-orders/${row.original.id}`
                        : `/orders/order-details/${row.original.id}`
                    }`}
                    className="flex items-center gap-3 text-[16px]"
                  >
                    <Document className="size-5" />
                    <span className="text-gray-700 text-sm">View Details</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 text-[16px] mb-2 py-2">
                  <Pause className="size-5" />
                  <span className="text-gray-700 text-sm">Pause</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <AppTable
        columns={columns}
        data={data}
        pageTitle={"All Orders"}
        addButton={{
          visibility: true,
          name: "Make an order",
          url: "/create-order",
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

export default AllOrders;
