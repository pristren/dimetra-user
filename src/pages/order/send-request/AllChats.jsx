import { ArrowUpDown } from "@/assets/icons";
import { AppTable } from "@/components/common/AppTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AllMessages = () => {
  const data = [
    {
      id: "1",
      subject: "This is a subject of a request for an order.",
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
        <Button className="py-1 h-min px-2 bg-lime-200 hover:bg-lime-300 rounded-md w-max text-black">
          {row.getValue("status")}
        </Button>
      ),
    },
  ];
  return (
    <div>
      <AppTable
        link="/orders/message/:id"
        pageTitle={"Send Request"}
        showModal={{
          name: "Add Request",
          icon: <Plus />,
        }}
        columns={columns}
        data={data}
        isSearchVisible={false}
        isRecurring={false}
        isDateVisible={false}
        isFilterVisible={false}
      />
    </div>
  );
};

export default AllMessages;