import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppTable } from "@/components/common/AppTable";
import { ArrowUpDown, Document, Pencil, Pause, Trash } from "@/assets/icons";
import { Link } from "react-router-dom";

const RecurringOrdersTable = () => {
  const recurringOrdersData = [
    {
      date: "2024-09-08",
      pickUp: "123 Main St.",
      destination: "456 Elm St.",
      vehicle: "Car",
      driver: "John Doe",
      status: "Completed",
      patientName: "Jane Doe",
      orderType: "Regular",
    },
    {
      date: "2024-09-08",
      pickUp: "123 Main St.",
      destination: "456 Elm St.",
      vehicle: "Car",
      driver: "John Doe",
      status: "Rejected",
      patientName: "Jane Doe",
      orderType: "Something",
    },
    {
      date: "2024-09-08",
      pickUp: "123 Main St.",
      destination: "456 Elm St.",
      vehicle: "Car",
      driver: "John Doe",
      status: "Confirmed",
      patientName: "Jane Doe",
      orderType: "Regular",
    },
    {
      date: "2024-09-08",
      pickUp: "123 Main St.",
      destination: "456 Elm St.",
      vehicle: "Car",
      driver: "John Doe",
      status: "Paused",
      patientName: "Jane Doe",
      orderType: "Regular",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#F0F8D1";
      case "Rejected":
        return "#F9D1D1";
      case "Confirmed":
        return "#D1F8D5";
      case "Paused":
        return "#DCF3FF";
      default:
        return "#FFFFFF"; // Default color if status is unknown
    }
  };

  const columns = [
    {
      accessorKey: "date",
      header: () => (
        <div className="flex items-center gap-2">
          Date & Time
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
    },
    {
      accessorKey: "pickUp",
      header: () => (
        <div className="flex items-center gap-2">
          Pick Up
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
    },
    {
      accessorKey: "destination",
      header: () => (
        <div className="flex items-center gap-2">
          Destination
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
    },
    {
      accessorKey: "vehicle",
      header: () => (
        <div className="flex items-center gap-2">
          Vehicle
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
    },
    {
      accessorKey: "driver",
      header: () => (
        <div className="flex items-center gap-2">
          Driver
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
    },
    {
      accessorKey: "patientName",
      header: () => (
        <div className="flex items-center gap-2">
          Patient Name
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
    },
    {
      accessorKey: "orderType",
      cell: () => null,
      header: () => null,
    },
    {
      accessorKey: "status",
      header: () => (
        <div className="flex items-center gap-2">
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
          Actions
          <ArrowUpDown className="h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="h-4 w-4 cursor-pointer" />
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
                    to={`/orders/order-details/${row.original.id}   `}
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

  return <AppTable columns={columns} data={recurringOrdersData} />;
};

export default RecurringOrdersTable;
