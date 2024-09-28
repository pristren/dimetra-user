import { ArrowUpDown } from "@/assets/icons";
import { AppTable } from "@/components/common/AppTable";
import { Button } from "@/components/ui/button";
import { useLazyQuery } from "@apollo/client";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { GET_ALL_MESSAGE_REQUESTS } from "./graphql/queries/getAllMessageRequests.gql";

const SentRequests = () => {
  const [data, setData] = useState([]);

  const [getAllMessageRequests] = useLazyQuery(GET_ALL_MESSAGE_REQUESTS, {
    variables: {},
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    onCompleted: (response) => {
      setData(response.getMessageRequests);
    },
    onError: (error) => {
      console.error({ error });
    },
  });
  useEffect(() => {
    getAllMessageRequests();
  }, [getAllMessageRequests]);

  const columns = [
    {
      accessorKey: "title",
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
      accessorKey: "order_number",
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
          <span>Created At</span>
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
      cell: ({ row }) => {
        const status = row.getValue("status");
        let color =
          status === "pending"
            ? "bg-[#FEF1E0]"
            : status === "resolved"
            ? "bg-[#D1F8D5]"
            : "bg-[#DCF3FF]";
        let hoverColor =
          status === "pending"
            ? "hover:bg-[#FEEBD3]"
            : status === "resolved"
            ? "hover:bg-[#CFFFD4]"
            : "hover:bg-[#CDEBFF]";
        return (
          <Button
            className={` h-min rounded-md w-max text-black
            ${color} ${hoverColor} py-1 px-3 capitalize
            `}
          >
            {row.getValue("status")}
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      <AppTable
        rowClickable={true}
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

export default SentRequests;
