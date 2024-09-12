import { Link } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const AllOrdersTable = () => {
  const allOrdersData = [
    {
      date: "2024-09-08",
      pickUp: "123 Main St.",
      destination: "456 Elm St.",
      driver: "John Doe",
      patientName: "Sedan",
      orderType: "Jane Smith",
      status: "Completed",
    },
    {
      date: "2024-09-08",
      pickUp: "123 Main St.",
      destination: "456 Elm St.",
      driver: "John Doe",
      patientName: "Sedan",
      orderType: "Jane Smith",
      status: "Rejected",
    },
    {
      date: "2024-09-08",
      pickUp: "123 Main St.",
      destination: "456 Elm St.",
      driver: "John Doe",
      patientName: "Sedan",
      orderType: "Jane Smith",
      status: "Confirmed",
    },
    {
      date: "2024-09-08",
      pickUp: "123 Main St.",
      destination: "456 Elm St.",
      driver: "John Doe",
      patientName: "Sedan",
      orderType: "Jane Smith",
      status: "Paused",
    },
  ];

  // Function to determine the button color based on the status
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
      header: () => (
        <div className="flex items-center gap-2">
          Order Type
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
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
            className="py-2 px-2 rounded-md w-max text-black"
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
          <ArrowUpDown className="h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
      cell: () => (
        <div className="flex justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical className="h-4 w-4 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="-translate-x-5">
              <DropdownMenuItem className="flex items-center gap-3 text-[16px] mb-3">
                <Pencil className="size-6" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3 text-[16px] mb-3">
                <Trash className="size-6" />
                Storno
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  to="/order/recurring-orders/123" // Use a dynamic ID if available
                  className="flex items-center gap-3 text-[16px] mb-3"
                >
                  <Document className="size-6" />
                  View Details
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return <AppTable columns={columns} data={allOrdersData} />;
};

export default AllOrdersTable;
