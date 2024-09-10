import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import { AppTable } from "../common/AppTable";

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
    accessorKey: "vehicle",
    header: "Vehicle",
  },
  {
    accessorKey: "driver",
    header: "Driver",
  },
  {
    accessorKey: "dispatcher",
    header: "Dispatcher",
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
    accessorKey: "rateToDriver",
    header: "Rate to driver",
    cell: ({ row }) => (
      <Button className="py-2 px-4 bg-lime-500 hover:bg-lime-600 rounded-md w-max text-black">
        {row.getValue("rateToDriver")}
      </Button>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => <EllipsisVertical className="h-4 w-4 cursor-pointer" />,
  },
];

const OrderHistoryTable = () => {
  return <AppTable columns={columns} data={data} />;
};

export default OrderHistoryTable;
