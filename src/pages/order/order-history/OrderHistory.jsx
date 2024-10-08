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
import { GET_ALL_ORDERS_FOR_HISTORY } from "./graphql/queries/getAllOrdersForHistory.gql";
import { transportOptions } from "@/components/create-order-forms/helpers";
import { t } from "i18next";

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

  const [data, setData] = useState([]);

  const [getOrdersForHistory, { loading }] = useLazyQuery(
    GET_ALL_ORDERS_FOR_HISTORY,
    {
      variables: {
        queryData,
      },
      errorPolicy: "all",
      fetchPolicy: "no-cache",
      onCompleted: (response) => {
        setTotalPage(response.getOrdersForHistory?.totalPages);
        setData(response.getOrdersForHistory?.data);
      },
      onError: (error) => {
        console.error({ error });
      },
    }
  );
  useEffect(() => {
    getOrdersForHistory();
  }, []);

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
        const isReviewGiven = row.original?.isReviewGiven;
        let content = "Rate the driver";
        if (isReviewGiven) {
          content = "See the Review";
        }

        return (
          <Link to={`/orders/review/${row.original?.id}`}>
            <Button
              disabled={
                row.getValue("status") === "rejected" ||
                row.getValue("status") === "deleted"
              }
              className="py-1.5 h-min px-2 rounded-md w-max text-black text-xs bg-[#D0EF0F] hover:bg-[#D0EF0F]"
            >
              {content}
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
      cell: ({ row }) => {
        const orderId = row.original.id;
        const isRecurring =
          row.original.transportationData?.type_of_transport === "recurring";
        return (
          <div className="flex justify-center items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="h-4 w-4 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="-translate-x-5 py-3 px-2 w-48">
                <DropdownMenuItem
                  className="py-2 cursor-pointer px-3"
                  onClick={() => {
                    handlePrintOrder(row.original);
                  }}
                >
                  <span className="text-gray-700 text-sm">Print</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="py-2 px-3 cursor-pointer">
                  <Link
                    to={`/orders/order-details/${orderId}`}
                    className="flex items-center gap-3 text-[16px] w-full"
                  >
                    <span className="text-gray-700 text-sm">
                      {t("view_details")}
                    </span>
                  </Link>
                </DropdownMenuItem>
                {isRecurring && (
                  <DropdownMenuItem className="py-2 px-3 cursor-pointer">
                    <Link
                      to={`/orders/recurring-orders/${orderId}`}
                      className="flex items-center gap-3 text-[16px] w-full"
                    >
                      <span className="text-gray-700 text-sm">
                        {t("view_order_lists")}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
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
        filters={[
          { value: "all_order", label: t("all_order") },
          ...transportOptions,
        ]}
        date={date}
        setDate={setDate}
        isSearchVisible={true}
        isRecurring={false}
        totalPage={totalPage}
        queryData={queryData}
        setQueryData={setQueryData}
        isLoading={loading}
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

const OrderPrint = React.forwardRef(({ order }, ref) => {
  return (
    <div className="px-2" ref={ref}>
      <h4 className="text-center mt-5 mb-10">Order Details</h4>
      <table className="w-full mx-auto">
        <thead>
          <tr className="border gap-4 p-2">
            <th className="border text-center">Date</th>
            <th className="border text-center">Pick Up</th>
            <th className="border text-center">Destination</th>
            <th className="border text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border gap-4 p-10">
            <td className="border text-center">
              {order?.destinationDetailsData?.drop_off_pick_up_date}
            </td>
            <td className="border text-center">
              {order.destinationDetailsData.drop_off_address}
            </td>
            <td className="border text-center">
              {order.destinationDetailsData.drop_off_address}
            </td>
            <td className="border text-center">{order.status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

OrderPrint.displayName = "OrderPrint";

export default OrderHistory;
