import ArrowUpDown from "@/assets/icons/ArrowUpDown";
import { AppTable } from "@/components/common/AppTable";
import { Button } from "@/components/ui/button";

const data = [
  {
    subject: "I will go to Chittagong",
    orderNo: "123",
    createdAt: "23 September 2024",
    status: "Completed",
  },
];

const columns = [
  {
    accessorKey: "subject",
    header: () => (
      <div className="flex items-center gap-2">
        <span>Subject</span>
        <ArrowUpDown
          className="ml-2 h-4 w-4 cursor-pointer"
          aria-label="Sort by Subject"
        />
      </div>
    ),
  },
  {
    accessorKey: "orderNo",
    header: () => (
      <div className="flex items-center gap-2">
        <span>Order No</span>
        <ArrowUpDown
          className="ml-2 h-4 w-4 cursor-pointer"
          aria-label="Sort by Order No"
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="flex items-center gap-2">
        <span>Created</span>
        <ArrowUpDown
          className="ml-2 h-4 w-4 cursor-pointer"
          aria-label="Sort by Created"
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
];

const SendRequestTable = () => {
  return <AppTable columns={columns} data={data} />;
};

export default SendRequestTable;
