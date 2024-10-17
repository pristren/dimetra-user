import { ArrowUpDown } from "@/assets/icons";
import { AppTable } from "@/components/common/AppTable";
import { Button } from "@/components/ui/button";
import { useLazyQuery } from "@apollo/client";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { GET_ALL_MESSAGE_REQUESTS } from "./graphql/queries/getAllMessageRequests.gql";
import { t } from "i18next";
import moment from "moment";

const SentRequests = () => {
  const [data, setData] = useState([]);
  const [queryData, setQueryData] = useState({
    page: 1,
  });
  const [totalPage, setTotalPage] = useState(null);

  const [getAllMessageRequests, { loading }] = useLazyQuery(
    GET_ALL_MESSAGE_REQUESTS,
    {
      variables: {
        queryData,
      },
      errorPolicy: "all",
      fetchPolicy: "no-cache",
      onCompleted: (response) => {
        setTotalPage(response.getMessageRequests?.totalPages);
        setData(response.getMessageRequests.data);
      },
      onError: (error) => {
        console.error({ error });
      },
    }
  );
  useEffect(() => {
    getAllMessageRequests();
  }, []);

  const columns = [
    {
      accessorKey: "title",
      header: () => (
        <div className="flex items-center gap-2">
          <span>{t("subject")}</span>
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
          <span>{t("order_number")}</span>
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
          <span>{t("created_at")}</span>
          <ArrowUpDown
            className="ml-2 h-4 w-4 cursor-pointer"
            aria-label="Sort by Created"
          />
        </div>
      ),
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt");
        return <span>{moment(createdAt).format("DD MMM YYYY")}</span>;
      },
    },
    {
      accessorKey: "status",
      header: () => (
        <div className="flex items-center gap-2">
          <span>{t("status")}</span>
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
        pageTitle={"sent_requests"}
        showModal={{
          name: "add_request",
          icon: <Plus />,
        }}
        columns={columns}
        data={data}
        isSearchVisible={false}
        isRecurring={false}
        isDateVisible={false}
        isFilterVisible={false}
        getData={getAllMessageRequests}
        totalPage={totalPage}
        queryData={queryData}
        setQueryData={setQueryData}
        isLoading={loading}
      />
    </div>
  );
};

export default SentRequests;
