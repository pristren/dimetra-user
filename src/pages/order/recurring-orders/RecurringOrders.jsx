import { ArrowUpDown, Document, Pause, Pencil } from "@/assets/icons";
import { AppTable } from "@/components/common/AppTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ALL_RECURRING_ORDERS } from "./graphql/queries/getAllRecurringOrders.gql";
import { UPDATE_RECCURING_ORDER_STATUS } from "./graphql/mutations/updateAnRecurringOrderStatus.gql";
import { ResumeIcon } from "@radix-ui/react-icons";
import moment from "moment";
import { t } from "i18next";

const RecurringOrders = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [queryData, setQueryData] = useState({
    filter_by: "all_order",
    page: 1,
    orderId: id,
  });
  const [totalPage, setTotalPage] = useState(null);

  const [getAllRecurringOrders, { loading }] = useLazyQuery(
    GET_ALL_RECURRING_ORDERS,
    {
      variables: {
        queryData,
      },
      errorPolicy: "all",
      fetchPolicy: "no-cache",
      onCompleted: (response) => {
        setTotalPage(response.getAllRecurringOrders?.totalPages);
        setData(response.getAllRecurringOrders?.data);
      },
      onError: (error) => {
        console.error({ error });
      },
    }
  );
  useEffect(() => {
    getAllRecurringOrders();
  }, []);
  const [updateRecurringOrderStatus] = useMutation(
    UPDATE_RECCURING_ORDER_STATUS,
    {
      onCompleted: () => {
        getAllRecurringOrders();
      },
      onError: (err) => {
        console.error("Error updating order status:", err);
      },
    }
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#F0F8D1";
      case "rejected":
        return "#F9D1D1";
      case "confirmed":
        return "#D1F8D5";
      case "paused":
        return "#DCF3FF";
      case "pending":
        return "#DCF3FF";

      default:
        return "#FFFFFF";
    }
  };

  const updateARecurringOrderStatus = (orderId, status) => {
    updateRecurringOrderStatus({
      variables: {
        queryData: { id: orderId },
        inputData: { status },
      },
    });
  };

  const columns = [
    {
      accessorKey: "destinationDetailsData.drop_off_pick_up_date",
      header: ({ column }) => (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          {t("date_time")}
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        const date =
          row.original?.destinationDetailsData?.drop_off_pick_up_date;
        return (
          <p>
            {moment(date).format("DD MMMM YYYY")}{" "}
            <span className="text-gray-700 text-xs">
              ({moment(date).format("dddd")})
            </span>
          </p>
        );
      },
    },
    {
      accessorKey: "destinationDetailsData.pick_up_address",
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          {t("pick_up")}
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
    },
    {
      accessorKey: "destinationDetailsData.drop_off_address",
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          {t("destination")}
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
    },
    {
      accessorKey: "vehicle",
      header: () => (
        <div className="flex items-center gap-2">
          {t("vehicle")}
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
      cell: (row) => <div className="">N/A</div>,
    },
    {
      accessorKey: "driver",
      header: () => (
        <div className="flex items-center gap-2">
          {t("driver")}
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
      cell: (row) => <div className="">N/A</div>,
    },
    {
      accessorKey: "patientData.name",
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          {t("patient_name")}
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
          {t("status")}
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
          {t("action")}
          <ArrowUpDown className="h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        const orderId = row.original.id;
        return (
          <div className="flex justify-center items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="h-4 w-4 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="-translate-x-5 p-4 w-60">
                <DropdownMenuItem className="flex items-center gap-3 text-[16px] mb-2 py-2 cursor-pointer">
                  <Link
                    to={`/orders/edit-recurring-order/${orderId}`}
                    className="flex items-center gap-3 text-[16px] w-full"
                  >
                    <Pencil className="size-5 text-gray-600" />
                    <span className="text-gray-700 text-sm">{t("edit")}</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="py-2 mb-2">
                  <Link
                    to={`/orders/recurring-orders/order-details/${orderId}`}
                    className="flex items-center gap-3 text-[16px] w-full"
                  >
                    <Document className="size-5" />
                    <span className="text-gray-700 text-sm">
                      {t("view_details")}
                    </span>
                  </Link>
                </DropdownMenuItem>
                {row.original.status !== "paused" ? (
                  <DropdownMenuItem
                    className="flex items-center gap-3 text-[16px] mb-2 py-2 cursor-pointer"
                    onClick={() =>
                      updateARecurringOrderStatus(orderId, "paused")
                    }
                    disabled={row.original.status !== "pending"}
                  >
                    <Pause className="size-5" />
                    <span className="text-gray-700 text-sm">{t("pause")}</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className="flex items-center gap-3 text-[16px] mb-2 py-2 cursor-pointer"
                    onClick={() =>
                      updateARecurringOrderStatus(orderId, "pending")
                    }
                  >
                    <ResumeIcon className="size-5" />
                    <span className="text-gray-700 text-sm">{t("resume")}</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <AppTable
        columns={columns}
        data={data}
        pageTitle={"recurring_orders"}
        isDateVisible={false}
        isRecurring={id}
        isFilterVisible={false}
        totalPage={totalPage}
        queryData={queryData}
        setQueryData={setQueryData}
        isLoading={loading}
      />
    </div>
  );
};

export default RecurringOrders;
