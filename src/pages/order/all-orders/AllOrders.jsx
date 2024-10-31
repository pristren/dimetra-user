/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Copy, EllipsisVertical, List } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppTable } from "@/components/common/AppTable";
import { ArrowUpDown, Document, Pause, Pencil, Trash } from "@/assets/icons";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ALL_ORDERS } from "../order-details/graphql/queries/getAllOrders.gql";
import moment from "moment";
import { UPDATE_ORDER_STATUS } from "./graphql/mutations/updateOrderStatus.gql";
import { transportOptions } from "@/components/create-order-forms/helpers";
import { t } from "i18next";
import { ResumeIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

const AllOrders = () => {
  const [queryData, setQueryData] = useState({
    filter_by: "all_order",
    page: 1,
  });
  const [totalPage, setTotalPage] = useState(null);
  const [data, setData] = useState([]);

  const [getAllOrders, { loading }] = useLazyQuery(GET_ALL_ORDERS, {
    variables: { queryData },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    onCompleted: (response) => {
      setTotalPage(response.getAllOrders?.totalPages);
      setData(response.getAllOrders?.data);
    },
    onError: (error) => {
      console.error({ error });
      toast.error(error.message || "There was an error fetching orders");
    },
  });
  useEffect(() => {
    getAllOrders();
  }, []);

  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS, {
    onCompleted: (data) => {
      getAllOrders();
    },
    onError: (err) => {
      console.error("Error updating order status:", err);
    },
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "on_ride":
        return "#FEF1E0";
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

  const updateAnOrderStatus = (orderId, status) => {
    updateOrderStatus({
      variables: {
        queryData: { id: orderId },
        inputData: { status },
      },
    });
  };

  useEffect(() => {
    data.forEach((order) => {
      if (order.status === "deleting") {
        const updatedAtDate = parseInt(order.updatedAt, 10);
        const deletingDate = moment(updatedAtDate);
        const oneDayAgo = moment().subtract(1, "day");

        if (deletingDate.isBefore(oneDayAgo)) {
          updateOrderStatus({
            variables: {
              queryData: { id: order.id },
              inputData: { status: "deleted" },
            },
          });
        }
      }
    });
  }, [data]);

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
            {moment(date).format("DD MMMM YYYY")}-
            {moment(date).format("dddd").slice(0, 3)}
          </p>
        );
      },
    },
    {
      accessorKey: "destinationDetailsData.drop_off_pick_up_time",
      header: ({ column }) => (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          {t("time")}
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
    },
    {
      accessorKey: "destinationDetailsData.pick_up_name",
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
      accessorKey: "destinationDetailsData.drop_off_name",
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
      cell: ({ row }) => {
        const patientName =
          row?.original?.patientData?.name +
          " " +
          row?.original?.patientData?.surname;
        return <p className="capitalize">{patientName}</p>;
      },
    },
    {
      accessorKey: "transportationData.type_of_transport",
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          {t("order_type")}
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        const type = row.original.transportationData?.type_of_transport;
        let item = transportOptions.find((item) => item.value === type);
        return <p className="capitalize">{t(item?.label)}</p>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          {t("status")}
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        const statusColor = getStatusColor(status);

        return (
          <Button
            className="py-1.5 h-min px-2 rounded-md w-max text-black text-xs capitalize"
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
        const isRecurring =
          row.original.transportationData?.type_of_transport === "recurring";
        return (
          <div className="flex justify-center items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {orderId && (
                  <EllipsisVertical className="h-4 w-4 cursor-pointer" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="-translate-x-5 p-4 w-60">
                <DropdownMenuItem className="py-2 mb-2 cursor-pointer">
                  <Link
                    to={`/orders/edit-order/${orderId}`}
                    className="flex items-center gap-3 text-[16px] cursor-pointer w-full"
                  >
                    <Pencil className="size-5" />
                    <span className="text-gray-700 text-sm">{t("edit")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-3 text-[16px] mb-2 py-2 cursor-pointer"
                  onClick={() => updateAnOrderStatus(orderId, "deleting")}
                >
                  <Trash className="size-5" />
                  <span className="text-gray-700 text-sm">{t("storno")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="mb-2 py-2">
                  <Link
                    to={`/copy-order/${orderId}`}
                    className="flex items-center gap-3 text-[16px] cursor-pointer"
                  >
                    <Copy className="size-5" />
                    <span className="text-gray-700 text-sm">Copy</span>
                  </Link>
                </DropdownMenuItem>

                {isRecurring ? (
                  <DropdownMenuItem className="py-2 mb-2 cursor-pointer">
                    <Link
                      to={`/orders/recurring-orders/${orderId}`}
                      className="flex items-center gap-3 text-[16px] w-full"
                    >
                      <List className="size-5" />
                      <span className="text-gray-700 text-sm">
                        {t("view_order_lists")}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem className="py-2 mb-2 cursor-pointer">
                    <Link
                      to={`/orders/order-details/${orderId}`}
                      className="flex items-center gap-3 text-[16px] w-full"
                    >
                      <Document className="size-5" />
                      <span className="text-gray-700 text-sm">
                        {t("view_details")}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                )}

                {row.original.status !== "paused" ? (
                  <DropdownMenuItem
                    className="flex items-center gap-3 text-[16px] mb-2 py-2 cursor-pointer"
                    onClick={() => updateAnOrderStatus(orderId, "paused")}
                    disabled={row.original.status !== "pending"}
                  >
                    <Pause className="size-5" />
                    <span className="text-gray-700 text-sm">Pause</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className="flex items-center gap-3 text-[16px] mb-2 py-2 cursor-pointer"
                    onClick={() => updateAnOrderStatus(orderId, "pending")}
                  >
                    <ResumeIcon className="size-5" />
                    <span className="text-gray-700 text-sm">Resume</span>
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
    <div className="w-full">
      <AppTable
        columns={columns}
        data={data}
        pageTitle={t("all_orders")}
        addButton={{
          visibility: true,
          name: t("make_an_order"),
          url: "/create-order",
        }}
        isDateVisible={true}
        isFilterVisible={true}
        queryData={queryData}
        setQueryData={setQueryData}
        filters={[
          { value: "all_order", label: t("all_orders") },
          ...transportOptions,
        ]}
        isSearchVisible={true}
        isRecurring={false}
        totalPage={totalPage}
        isLoading={loading}
      />
    </div>
  );
};

export default AllOrders;
