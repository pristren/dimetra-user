import { ArrowUpDown, Document, Pause, Pencil, Trash } from "@/assets/icons";
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
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_RECURRING_ORDERS } from "./graphql/queries/getAllRecurringOrders.gql";
import moment from "moment";

const RecurringOrders = () => {
  const { id } = useParams();
  //   const []
  const [data, setData] = useState([
    {
      id: "1",
      date: "2024-09-08",
      pickUp: "123 Main St.",
      destination: "456 Elm St.",
      vehicle: "Car",
      driver: "John Doe",
      status: "Completed",
      patientName: "Jane Doe",
      orderType: "Regular",
    },
    {
      id: "2",
      date: "2024-09-08",
      pickUp: "123 Main St.",
      destination: "456 Elm St.",
      vehicle: "Car",
      driver: "John Doe",
      status: "Rejected",
      patientName: "Jane Doe",
      orderType: "Something",
    },
    {
      id: "3",
      date: "2024-09-08",
      pickUp: "123 Main St.",
      destination: "456 Elm St.",
      vehicle: "Car",
      driver: "John Doe",
      status: "Confirmed",
      patientName: "Jane Doe",
      orderType: "Regular",
    },
    {
      id: "4",
      date: "2024-09-08",
      pickUp: "123 Main St.",
      destination: "456 Elm St.",
      vehicle: "Car",
      driver: "John Doe",
      status: "Paused",
      patientName: "Jane Doe",
      orderType: "Regular",
    },
  ]);
  //   const [data, setData] = useState([]);

  const [getAllRecurringOrders] = useLazyQuery(GET_ALL_RECURRING_ORDERS, {
    variables: {
      queryData: {
        id,
      },
    },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    onCompleted: (response) => {
      setData(
        response.getAllRecurringOrders?.map((order) => ({
          ...order,
          destinationDetailsData: {
            ...order.destinationDetailsData,
            drop_off_pick_up_date: moment(
              order.destinationDetailsData?.drop_off_pick_up_date
            ).format("DD MMMM YYYY"),
          },
        }))
      );
    },
    onError: (error) => {
      console.error({ error });
    },
  });
  useEffect(() => {
    getAllRecurringOrders();
  }, []);

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

  const handlePause = (id) => {
    setData((prevData) =>
      prevData.map((order) =>
        order.id === id ? { ...order, status: "Paused" } : order
      )
    );
  };
  const handleDeleteOrder = (orderId) => {
    setData((prevData) => prevData.filter((order) => order.id !== orderId));
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
      accessorKey: "vehicle",
      header: () => (
        <div className="flex items-center gap-2">
          Vehicle
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
      cell: (row) => <div className="">N/A</div>,
    },
    {
      accessorKey: "driver",
      header: () => (
        <div className="flex items-center gap-2">
          Driver
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
          Patient Name
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
          Actions
          <ArrowUpDown className="h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="h-4 w-4 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="-translate-x-5 p-4 w-60">
                <DropdownMenuItem className="flex items-center gap-3 text-[16px] mb-2 py-2">
                  <Pencil className="size-5 text-gray-600" />
                  <span className="text-gray-700 text-sm">Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-3 text-[16px] mb-2 py-2"
                  onClick={() => handleDeleteOrder(row.original.id)}
                >
                  <Trash className="size-5" />
                  <span className="text-gray-700 text-sm">Storno</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="py-2 mb-2">
                  <Link
                    to={`/orders/order-details/${row.original.id}`}
                    className="flex items-center gap-3 text-[16px]"
                  >
                    <Document className="size-5" />
                    <span className="text-gray-700 text-sm">View Details</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-3 text-[16px] mb-2 py-2"
                  onClick={() => handlePause(row.original.id)}
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
    <div>
      <AppTable
        columns={columns}
        data={data}
        pageTitle={"Recurring Orders"}
        isDateVisible={false}
        isRecurring={true}
        isFilterVisible={false}
      />
    </div>
  );
};

export default RecurringOrders;
