import { BookText, EllipsisVertical } from "lucide-react";
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

const data = [
  {
    date: "2024-09-08",
    time: "14:30",
    pickUp: "123 Main St.",
    destination: "456 Elm St.",
    driver: "John Doe",
    patientName: "Sedan",
    orderType: "Jane Smith",
    status: "Completed",
    action: "View",
  },
  {
    date: "2024-09-08",
    time: "14:30",
    pickUp: "123 Main St.",
    destination: "456 Elm St.",
    driver: "John Doe",
    patientName: "Sedan",
    orderType: "Jane Smith",
    status: "Completed",
    action: "View",
  },
  {
    date: "2024-09-08",
    time: "14:30",
    pickUp: "123 Main St.",
    destination: "456 Elm St.",
    driver: "John Doe",
    patientName: "Sedan",
    orderType: "Jane Smith",
    status: "Completed",
    action: "View",
  },
  {
    date: "2024-09-08",
    time: "14:30",
    pickUp: "123 Main St.",
    destination: "456 Elm St.",
    driver: "John Doe",
    patientName: "Sedan",
    orderType: "Jane Smith",
    status: "Completed",
    action: "View",
  },
  {
    date: "2024-09-08",
    time: "14:30",
    pickUp: "123 Main St.",
    destination: "456 Elm St.",
    driver: "John Doe",
    patientName: "Sedan",
    orderType: "Jane Smith",
    status: "Completed",
    action: "View",
  },
  {
    date: "2024-09-08",
    time: "14:30",
    pickUp: "123 Main St.",
    destination: "456 Elm St.",
    driver: "John Doe",
    patientName: "Sedan",
    orderType: "Jane Smith",
    status: "Completed",
    action: "View",
  },
  {
    date: "2024-09-08",
    time: "14:30",
    pickUp: "123 Main St.",
    destination: "456 Elm St.",
    driver: "John Doe",
    patientName: "Sedan",
    orderType: "Jane Smith",
    status: "Completed",
    action: "View",
  },
  {
    date: "2024-09-08",
    time: "14:30",
    pickUp: "123 Main St.",
    destination: "456 Elm St.",
    driver: "John Doe",
    patientName: "Sedan",
    orderType: "Jane Smith",
    status: "Completed",
    action: "View",
  },
  {
    date: "2024-09-08",
    time: "14:30",
    pickUp: "123 Main St.",
    destination: "456 Elm St.",
    driver: "John Doe",
    patientName: "Sedan",
    orderType: "Jane Smith",
    status: "Completed",
    action: "View",
  },
  {
    date: "2024-09-08",
    time: "14:30",
    pickUp: "123 Main St.",
    destination: "456 Elm St.",
    driver: "John Doe",
    patientName: "Sedan",
    orderType: "Jane Smith",
    status: "Completed",
    action: "View",
  },
  {
    date: "2024-09-08",
    time: "14:30",
    pickUp: "123 Main St.",
    destination: "456 Elm St.",
    driver: "John Doe",
    patientName: "Sedan",
    orderType: "Jane Smith",
    status: "Completed",
    action: "View",
  },
];

const columns = [
  {
    accessorKey: "date",
    header: "Date & Time",
  },
  {
    accessorKey: "pickUp",
    header: "Pick Up",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "driver",
    header: "Driver",
  },
  {
    accessorKey: "patientName",
    header: "Patient Name",
  },
  {
    accessorKey: "orderType",
    header: "Order Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Button className="py-2 px-2 bg-lime-200 hover:bg-lime-300 rounded-md w-max text-black">
        {row.getValue("status")}
      </Button>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical className="h-4 w-4 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="flex items-center gap-3">
            <Pencil /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3">
            <Trash />
            Storno
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3">
            <BookText />
            View Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
const AllOrdersTable = () => {
  return <AppTable columns={columns} data={data} />;
};

export default AllOrdersTable;
