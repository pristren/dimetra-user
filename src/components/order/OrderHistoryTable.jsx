import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppTable } from "@/components/common/AppTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "@/assets/icons";

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
    action: "View",
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
    action: "View",
  },
];

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
    header: () => (
      <div className="flex items-center gap-2">
        <span>Status</span>
        <ArrowUpDown
          className="ml-2 h-4 w-4 cursor-pointer"
          aria-label="Sort by Status"
        />
      </div>
    ),
    cell: ({ row }) => (
      <Button className="py-2 px-2 bg-lime-200 hover:bg-lime-300 rounded-md w-max text-black">
        {row.getValue("status")}
      </Button>
    ),
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
    cell: ({ row }) => (
      <Button className="py-2 px-4 bg-lime-500 hover:bg-lime-600 rounded-md w-max text-black">
        {row.getValue("rateToDriver")}
      </Button>
    ),
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
];

const OrderHistoryTable = () => {
  return <AppTable columns={columns} data={data} />;
};

export default OrderHistoryTable;
