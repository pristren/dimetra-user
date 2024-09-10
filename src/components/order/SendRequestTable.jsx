import { AppTable } from "../common/AppTable";
import { Button } from "../ui/button";

const data = [
  {
    subject: "I will go to Chittagong",
    orderNo: "123",
    createdAt: "23 september 2024",
    status: "Completed",
  },
];

const columns = [
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "orderNo",
    header: "Order No",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
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
];
const SendRequestTable = () => {
  return <AppTable columns={columns} data={data} />;
};

export default SendRequestTable;
