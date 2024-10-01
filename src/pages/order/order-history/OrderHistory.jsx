import React, { useState, useRef, useEffect } from "react";
import { AppTable } from "@/components/common/AppTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "@/assets/icons";
import { EllipsisVertical } from "lucide-react";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_ORDERS } from "../order-details/graphql/queries/getAllOrders.gql";
import moment from "moment";

const OrderHistory = () => {
  const [queryData, setQueryData] = useState({
    filter_by: "all_order",
    page: 1,
  });
  const [totalPage, setTotalPage] = useState(null);
  const [date, setDate] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const printRef = useRef();
  const reactToPrintTriggerRef = useRef();

  const filters = [
    "All Order",
    "Recurring",
    "Transfer trip",
    "Investigation trip",
    "Private trips",
    "Collection order",
  ];

  const [data, setData] = useState([]);

  const [getAllOrders] = useLazyQuery(GET_ALL_ORDERS, {
    variables: {
      queryData,
    },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    onCompleted: (response) => {
      setTotalPage(response.getAllOrders?.totalPages);

      setData(
        response.getAllOrders?.data
          ?.filter(
            (order) =>
              order.status === "completed" ||
              order.status === "rejected" ||
              order.status === "deleted"
          )
          .map((order) => ({
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
  }, [getAllOrders]);

  const getStatusColor = (status) => {
    switch (status) {
      case "rejected":
        return "#FEF1E0";
      case "completed":
        return "#D1F8D5";
      case "deleted":
        return "#F9D1D1";
      default:
        return "#FFFFFF";
    }
  };

  const handlePrintOrder = (order) => {
    setSelectedOrder(order);
    setTimeout(() => {
      reactToPrintTriggerRef.current.click();
    }, 100);
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
          <span>Vehicle</span>
          <ArrowUpDown
            className="ml-2 h-4 w-4 cursor-pointer"
            aria-label="Sort by Vehicle"
          />
        </div>
      ),
      cell: ({ row }) => {
        const vehicle = row.getValue("vehicle") || "N/A";
        return <p className="text-center">{vehicle}</p>;
      },
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
      accessorKey: "dispatcher",
      header: () => (
        <div className="flex items-center gap-2">
          <span>Dispatcher</span>
          <ArrowUpDown
            className="ml-2 h-4 w-4 cursor-pointer"
            aria-label="Sort by Dispatcher"
          />
        </div>
      ),
      cell: ({ row }) => {
        const dispatcher = row.getValue("dispatcher") || "N/A";
        return <p className="text-center">{dispatcher}</p>;
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
      accessorKey: "rateToDriver",
      header: () => (
        <div className="flex items-center gap-2">
          <span>Rate to Driver</span>
          <ArrowUpDown
            className="ml-2 h-4 w-4 cursor-pointer"
            aria-label="Sort by Rate to Driver"
          />
        </div>
      ),
      cell: ({ row }) => {
        return (
          <Link to="/orders/review/:id">
            <Button
              disabled={
                row.getValue("status") === "rejected" ||
                row.getValue("status") === "deleted"
              }
              className="py-1.5 h-min px-2 rounded-md w-max text-black text-xs bg-[#D0EF0F] hover:bg-[#D0EF0F]"
            >
              Rate the driver
            </Button>
          </Link>
        );
      },
    },
    {
      accessorKey: "action",
      header: () => (
        <p className="text-center flex justify-center items-center">
          Action
          <ArrowUpDown
            className="ml-2 h-4 w-4 cursor-pointer"
            aria-label="Sort by Action"
          />
        </p>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical
                className="h-4 w-4 cursor-pointer"
                aria-label="More options"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handlePrintOrder(row.original)}>
                Print Order
              </DropdownMenuItem>
              <DropdownMenuItem>View Details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
    {
      accessorKey: "orderType",
      header: () => null,
      cell: () => null,
    },
  ];

  return (
    <div className="w-full">
      <AppTable
        columns={columns}
        data={data}
        pageTitle="History"
        addButton={{
          visibility: false,
        }}
        isDateVisible={true}
        isFilterVisible={true}
        date={date}
        setDate={setDate}
        filters={filters}
        isSearchVisible={true}
        isRecurring={false}
        totalPage={totalPage}
        queryData={queryData}
        setQueryData={setQueryData}
      />

      <ReactToPrint
        trigger={() => (
          <button ref={reactToPrintTriggerRef} style={{ display: "none" }}>
            Print
          </button>
        )}
        content={() => printRef.current}
      />
      {selectedOrder && (
        <div style={{ display: "none" }}>
          <OrderPrint ref={printRef} order={selectedOrder} />
        </div>
      )}
    </div>
  );
};

const OrderPrint = React.forwardRef(({ order }, ref) => (
  <div className="px-2" ref={ref}>
    <h4 className="text-center mt-5 mb-10">Order History</h4>
    <table className="w-full mx-auto">
      <tr className="border gap-4 p-2">
        <th className="border text-center">Date</th>
        <th className="border text-center">Time</th>
        <th className="border text-center">Pick Up</th>
        <th className="border text-center">Destination</th>
        <th className="border text-center">Vehicle</th>
        <th className="border text-center">Driver</th>
        <th className="border text-center">Dispatcher</th>
        <th className="border text-center">Status</th>
      </tr>
      <tr className="border gap-4 p-10">
        <td className="border text-center">{order.date}</td>
        <td className="border text-center">{order.time}</td>
        <td className="border text-center">{order.pickUp}</td>
        <td className="border text-center">{order.destination}</td>
        <td className="border text-center">{order.vehicle}</td>
        <td className="border text-center">{order.driver}</td>
        <td className="border text-center">{order.dispatcher}</td>
        <td className="border text-center">{order.status}</td>
      </tr>
    </table>
  </div>
));

export default OrderHistory;
