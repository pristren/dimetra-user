/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";
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
import { DELETE_AN_ORDER } from "./graphql/mutations/deleteOrder.gql";
import moment from "moment";
import { UPDATE_ORDER_STATUS } from "./graphql/mutations/updateOrderStatus.gql";
import { transportOptions } from "@/components/create-order-forms/helpers";

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
      setData(
        response.getAllOrders?.data
          ?.filter(
            (order) =>
              order.status !== "completed" && order.status !== "deleted"
          )
          ?.map((order) => ({
            ...order,
            destinationDetailsData: {
              ...order.destinationDetailsData,
              drop_off_pick_up_date:
                order.transportationData?.type_of_transport === "recurring"
                  ? moment(order.transportationData?.free_dates[0]).format(
                      "DD MMMM YYYY"
                    )
                  : moment(
                      order.destinationDetailsData?.drop_off_pick_up_date
                    ).format("DD MMMM YYYY"),
            },
            transportationData: {
              ...order.transportationData,
              type_of_transport:
                order.transportationData?.type_of_transport?.includes("_")
                  ? order.transportationData?.type_of_transport
                      .split("_")
                      .join(" ")
                  : order.transportationData?.type_of_transport,
            },
          }))
      );
    },
    onError: (error) => {
      console.error({ error });
    },
  });
  useEffect(() => {
    getAllOrders();
  }, []);

  //   const [deleteAnOrder] = useMutation(DELETE_AN_ORDER, {
  //     onCompleted: (data) => {
  //       console.log("Order deleted:", data);
  //       getAllOrders();
  //     },
  //     onError: (err) => {
  //       console.error("Error deleting order:", err);
  //     },
  //   }); // this will be removed with backend as well

  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS, {
    onCompleted: (data) => {
      console.log("Order status updated:", data);
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

  //   const handleDeleteOrder = (orderId) => {
  //     deleteAnOrder({
  //       variables: { queryData: { id: orderId } },
  //     });
  //   };

  const updateAnOrderStatus = (orderId, status) => {
    updateOrderStatus({
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
          Date & Time
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        const date =
          row.original?.destinationDetailsData?.drop_off_pick_up_date;
        return <p>{date}</p>;
      },
    },
    {
      accessorKey: "destinationDetailsData.pick_up_address",
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          Pick Up
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
          Destination
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
    },
    {
      accessorKey: `driver`,
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          Driver
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        return <p className="capitalize">N/A</p>;
      },
    },
    {
      accessorKey: "patientData.name",
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          Patient Name
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
    },
    {
      accessorKey: "transportationData.type_of_transport",
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          Order Type
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        const type = row.original.transportationData?.type_of_transport;
        return <p className="capitalize">{type}</p>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          Status
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
          Action
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
                    className="flex items-center gap-3 text-[16px] cursor-pointer"
                  >
                    <Pencil className="size-5" />
                    <span className="text-gray-700 text-sm">Edit</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-3 text-[16px] mb-2 py-2 cursor-pointer"
                  onClick={() => updateAnOrderStatus(orderId, "deleted")}
                >
                  <Trash className="size-5" />
                  <span className="text-gray-700 text-sm">Storno</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2 mb-2 cursor-pointer">
                  <Link
                    to={
                      isRecurring
                        ? `/orders/recurring-orders/${orderId}`
                        : `/orders/order-details/${orderId}`
                    }
                    className="flex items-center gap-3 text-[16px]"
                  >
                    <Document className="size-5" />
                    <span className="text-gray-700 text-sm">View Details</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-3 text-[16px] mb-2 py-2 cursor-pointer"
                  onClick={() => updateAnOrderStatus(orderId, "paused")}
                >
                  <Pause className="size-5" />
                  <span className="text-gray-700 text-sm">Pause</span>
                </DropdownMenuItem>
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
        pageTitle={"All Orders"}
        addButton={{
          visibility: true,
          name: "Make an order",
          url: "/create-order",
        }}
        isDateVisible={true}
        isFilterVisible={true}
        queryData={queryData}
        setQueryData={setQueryData}
        filters={[
          { value: "all_order", label: "All order" },
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
