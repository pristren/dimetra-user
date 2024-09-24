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

const AllOrders = () => {
  const [date, setDate] = useState(null);
  const filters = [
    "All Order",
    "Recurring",
    "Verlegungsart",
    "Sammelauftrag",
    "Privatfahrt",
  ];

  const [data, setData] = useState([]);

  const [getAllOrders] = useLazyQuery(GET_ALL_ORDERS, {
    variables: {},
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    onCompleted: (response) => {
      setData(response.getAllOrders);
    },
    onError: (error) => {
      console.error({ error });
    },
  });
  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const [deleteAnOrder] = useMutation(DELETE_AN_ORDER, {
    onCompleted: (data) => {
      console.log("Order deleted:", data);
      getAllOrders();
    },
    onError: (err) => {
      console.error("Error deleting order:", err);
    },
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "On Ride":
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

  const handlePauseOrder = (orderId) => {
    setData((prevData) =>
      prevData.map((order) =>
        order.id === orderId ? { ...order, status: "Paused" } : order
      )
    );
  };

  const handleDeleteOrder = (orderId) => {
    deleteAnOrder({
      variables: { queryData: { id: orderId } },
    });
  };

  const columns = [
    {
      accessorKey: "createdAt",
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          Date & Time
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
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
      accessorKey: `user.first_name`,
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          Driver
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
          Action
          <ArrowUpDown className="h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        const orderId = row.original.id;
        return (
          <div className="flex justify-center items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {orderId && (
                  <EllipsisVertical className="h-4 w-4 cursor-pointer" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="-translate-x-5 p-4 w-60">
                <DropdownMenuItem >
                  <Link to={`/edit-order/${orderId}`} className="flex items-center gap-3 text-[16px] mb-2 py-2 cursor-pointer">
                  <Pencil className="size-5 text-gray-600" />
                  <span className="text-gray-700 text-sm">Edit</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-3 text-[16px] mb-2 py-2 cursor-pointer"
                  onClick={() => handleDeleteOrder(orderId)}
                >
                  <Trash className="size-5" />
                  <span className="text-gray-700 text-sm">Storno</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2 mb-2 cursor-pointer">
                  <Link
                    to={`/orders/order-details/${orderId}`}
                    className="flex items-center gap-3 text-[16px]"
                  >
                    <Document className="size-5" />
                    <span className="text-gray-700 text-sm">View Details</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-3 text-[16px] mb-2 py-2 cursor-pointer"
                  onClick={() => handlePauseOrder(orderId)}
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
        date={date}
        setDate={setDate}
        filters={filters}
        isSearchVisible={true}
        isRecurring={false}
      />
    </div>
  );
};

export default AllOrders;
