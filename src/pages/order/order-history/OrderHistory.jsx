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
import moment from "moment";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const OrderHistory = () => {
  const [queryData, setQueryData] = useState({
    filter_by: "all_order",
    page: 1,
    sort_by: "destinationDetailsData.drop_off_pick_up_date",
    sort_order: "asc",
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
        toast.error(error.message || "There was an error fetching orders");
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

  const handleSort = (field) => {
    const isAsc = queryData.sort_by === field && queryData.sort_order === "asc";
    setQueryData({
      ...queryData,
      sort_by: field,
      sort_order: isAsc ? "desc" : "asc",
    });
  };

  const columns = [
    {
      accessorKey: "destinationDetailsData.drop_off_pick_up_date",
      header: () => (
        <div
          onClick={() =>
            handleSort("destinationDetailsData.drop_off_pick_up_date")
          }
          className="flex items-center cursor-pointer"
        >
          {t("date_time")}
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        const date =
          row.original?.destinationDetailsData?.drop_off_pick_up_date;
        return <p>{moment(date).format("DD MMMM YYYY")}</p>;
      },
    },
    {
      accessorKey: "destinationDetailsData.pick_up_address",
      header: () => (
        <div
          onClick={() => handleSort("destinationDetailsData.pick_up_address")}
          className="flex items-center cursor-pointer"
        >
          {t("pick_up")}
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
    },
    {
      accessorKey: "destinationDetailsData.drop_off_address",
      header: () => (
        <div
          onClick={() => handleSort("destinationDetailsData.drop_off_address")}
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
      accessorKey: `driver`,
      header: ({ column: { toggleSorting, getIsSorted } }) => (
        <div
          onClick={() => toggleSorting(getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          {t("driver")}
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
      cell: ({ row }) => {
        const driver = row.original?.driver || "N/A";
        return <p className="text-center">{driver}</p>;
      },
    },
    {
      accessorKey: "dispatcher",
      header: () => (
        <div className="flex items-center gap-2">
          {t("dispatcher")}
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
          onClick={() => handleSort("status")}
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
      accessorKey: "rateToDriver",
      header: () => (
        <div className="flex items-center gap-2">
          {t("rate_to_driver")}
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
          <Button
            disabled={
              row.getValue("status") === "rejected" ||
              row.getValue("status") === "deleted"
            }
            className="py-1.5 h-min px-2 rounded-md w-max text-black text-xs bg-[#D0EF0F] hover:bg-[#D0EF0F]"
          >
            <Link to={`/orders/review/${row.original?.id}`}>{content}</Link>
          </Button>
        );
      },
    },
    {
      accessorKey: "action",
      header: () => (
        <p className="text-center flex justify-center items-center">
          {t("action")}
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
                {isRecurring ? (
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
                ) : (
                  <>
                    <DropdownMenuItem
                      className="py-2 cursor-pointer px-3"
                      onClick={() => {
                        handlePrintOrder(row.original);
                      }}
                    >
                      <span className="text-gray-700 text-sm">
                        {t("print")}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="py-2 cursor-pointer px-3">
                      <Link to={`/reopen-order/${orderId}`}>
                        <span className="text-gray-700 text-sm">Reopen</span>
                      </Link>
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
                  </>
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
    <form className="max-w-4xl mx-auto p-6 space-y-8" ref={ref}>
      <div className="space-y-2">
        <div className="flex items-center gap-4 mb-10">
          <img
            src="https://i.ibb.co.com/w7my6KG/Screenshot-18.png"
            alt="MTS Logo"
            className="h-12 w-12"
          />
          <div className="flex items-center justify-between w-full">
            <div>
              <p className="text-2xl  text-blue-500">MTS</p>
              <p className="text-red-600">Patient Transport</p>
            </div>
            <div className="text-sm">
              <p>Tel.: 061 691 06 06</p>
              <p>Fax: 061 691 05 05</p>
              <p>Email: info@mts-patiententransport.ch</p>
              <p>www.mts-patiententransport.ch</p>
            </div>
          </div>
        </div>
        <p className="text-blue-600">YOUR HEALTH IS OUR PRIORITY!</p>
        <p className="text-3xl text-red-600">
          Order Form for Patient Transport
        </p>
        <div className="border border-red-500 w-full" />
      </div>

      <div className="grid gap-6 grid-cols-3">
        <div className="space-y-4">
          <p className=" border-b pb-2">TRANSPORT TYPE</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="transfer" />
              <Label htmlFor="transfer">Transfer</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="examination" />
              <Label htmlFor="examination">Examination</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="private" />
              <Label htmlFor="private">Private</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="standing-order" />
              <Label htmlFor="standing-order">Standing Order</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="return" />
              <Label htmlFor="return">Return</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className=" border-b pb-2">TRANSPORTATION TYPE</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="wheelchair" />
              <Label htmlFor="wheelchair">Wheelchair (MTS)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="own-wheelchair" />
              <Label htmlFor="own-wheelchair">In Own Wheelchair</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="lying" />
              <Label htmlFor="lying">Lying Down</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="walker" />
              <Label htmlFor="walker">Walker</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="second-helper" />
              <Label htmlFor="second-helper">Second Transport Helper</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="stretcher" />
              <Label htmlFor="stretcher">Stretcher</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className=" border-b pb-2">TRANSPORT WITH</p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="infusion" />
              <Label htmlFor="infusion">Infusion</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="infusomat" />
              <Label htmlFor="infusomat">Infusomat</Label>
            </div>
            <div className="flex items-end space-x-2">
              <Checkbox id="oxygen" />
              <Label htmlFor="oxygen">Oxygen</Label>
              <Input className="border-0 border-b border-black rounded-none" />
              <p>l/min</p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="companion" />
              <Label htmlFor="companion">Companion</Label>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <p className="border-b mb-5">PATIENT DETAILS</p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex items-end justify-start gap-3">
              <Label htmlFor="name" className="text-sm text-nowrap">
                Name / First Name
              </Label>
              <Input
                id="name"
                className="border-0 border-b border-black rounded-none"
              />
            </div>
            <div className="flex items-end justify-start gap-3">
              <Label htmlFor="birthdate" className="text-sm text-nowrap">
                Date of Birth
              </Label>
              <Input
                id="birthdate"
                className="border-0 border-b border-black rounded-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="flex items-end justify-start gap-3">
              <Label htmlFor="caseNumber" className="text-sm text-nowrap">
                Patient / Case Number
              </Label>
              <Input
                id="caseNumber"
                className="border-0 border-b border-black rounded-none"
              />
            </div>
            <div className="flex items-end justify-start gap-3">
              <Label htmlFor="costCenter" className="text-sm text-nowrap">
                Cost Center
              </Label>
              <Input
                id="costCenter"
                className="border-0 border-b border-black rounded-none"
              />
            </div>
          </div>

          <div className="flex items-end justify-start gap-3">
            <Label
              htmlFor="specialConsiderations"
              className="text-sm text-nowrap"
            >
              Special Considerations
            </Label>
            <Input
              id="specialConsiderations"
              className="border-0 border-b border-black rounded-none w-full"
            />
          </div>

          <div className="flex justify-between">
            <div className="flex items-end gap-4">
              <Label className="text-sm">Patient over 90 Kg:</Label>
              <div className="flex items-end gap-2">
                <Checkbox
                  id="over90"
                  className="rounded-none border-black h-4 w-4"
                />
                <Label htmlFor="over90" className="text-sm">
                  Yes
                </Label>
                <Input className="border-0 border-b border-black rounded-none w-16" />
                <p>kg</p>
              </div>
            </div>

            <div className="flex items-end gap-4">
              <Label className="text-sm">Isolation:</Label>
              <div className="flex items-end gap-2">
                <Checkbox
                  id="isolation"
                  className="rounded-none border-black h-4 w-4"
                />
                <Label htmlFor="isolation" className="text-sm">
                  Yes
                </Label>
                <Input className="border-0 border-b border-black rounded-none w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <div className="space-y-4 w-1/2">
          <p className="border-b pb-2">PICK-UP ADDRESS</p>
          <div className="space-y-2">
            <div className="flex items-end justify-center gap-2">
              <Label className="text-nowrap" htmlFor="pickup-name">
                Name / Institution
              </Label>
              <Input
                className="border-0 border-b border-black rounded-none w-full"
                id="pickup-name"
              />
            </div>
            <div className="flex items-end justify-center gap-2">
              <Label className="text-nowrap" htmlFor="pickup-department">
                Department / Room
              </Label>
              <Input
                className="border-0 border-b border-black rounded-none w-full"
                id="pickup-department"
              />
            </div>
            <div className="flex items-end justify-center gap-2">
              <Label className="text-nowrap" htmlFor="pickup-street">
                Street / No.
              </Label>
              <Input
                className="border-0 border-b border-black rounded-none w-full"
                id="pickup-street"
              />
            </div>
            <div className="flex items-end justify-center gap-2">
              <Label className="text-nowrap" htmlFor="pickup-zip">
                ZIP / City
              </Label>
              <Input
                className="border-0 border-b border-black rounded-none w-full"
                id="pickup-zip"
              />
            </div>
            <div className="flex items-end justify-center gap-2">
              <Label className="text-nowrap" htmlFor="pickup-contact">
                Contact Person / Phone
              </Label>
              <Input
                className="border-0 border-b border-black rounded-none w-full"
                id="pickup-contact"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 w-1/2">
          <p className=" border-b pb-2">BILLING ADDRESS</p>
          <div className="space-y-2">
            <div className="flex items-end justify-center gap-2">
              <Label className="text-nowrap" htmlFor="billing-name">
                (First) Name / Institution
              </Label>
              <Input
                className="border-0 border-b border-black rounded-none w-full"
                id="billing-name"
              />
            </div>
            <div className="flex items-end justify-center gap-2">
              <Label className="text-nowrap" htmlFor="billing-attention">
                Attention
              </Label>
              <Input
                className="border-0 border-b border-black rounded-none w-full"
                id="billing-attention"
              />
            </div>
            <div className="flex items-end justify-center gap-2">
              <Label className="text-nowrap" htmlFor="billing-street">
                Street / No.
              </Label>
              <Input
                className="border-0 border-b border-black rounded-none w-full"
                id="billing-street"
              />
            </div>
            <div className="flex items-end justify-center gap-2">
              <Label className="text-nowrap" htmlFor="billing-zip">
                ZIP / City
              </Label>
              <Input
                className="border-0 border-b border-black rounded-none w-full"
                id="billing-zip"
              />
            </div>
            <div className="flex items-end justify-center gap-2">
              <Label className="text-nowrap" htmlFor="billing-phone">
                Phone
              </Label>
              <Input
                className="border-0 border-b border-black rounded-none w-full"
                id="billing-phone"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl border border-black p-4">
        <div className="flex items-center gap-4 mb-6">
          <Label className="text-sm font-normal text-nowrap">WEEKDAY:</Label>
          <div className="flex gap-4">
            {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((day) => (
              <div key={day} className="flex items-center gap-1">
                <Checkbox
                  id={day}
                  className="rounded-none border-black h-4 w-4 data-[state=checked]:bg-black data-[state=checked]:text-white"
                />
                <Label
                  htmlFor={day}
                  className="text-sm font-normal text-nowrap"
                >
                  {day}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-5">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-end justify-center gap-2">
              <Label
                htmlFor="departure-date"
                className="text-sm font-normal text-nowrap"
              >
                Departure Date
              </Label>
              <Input
                id="departure-date"
                className="border-0 border-b border-black rounded-none w-full"
              />
            </div>
            <div className="flex items-end justify-center gap-2">
              <Label
                htmlFor="appointment-time"
                className="text-sm font-normal text-nowrap"
              >
                Appointment Time
              </Label>
              <Input
                id="appointment-time"
                className="border-0 border-b border-black rounded-none w-full"
              />
            </div>
          </div>

          <div className="flex items-end justify-center gap-2">
            <Label
              htmlFor="pickup-time"
              className="text-sm font-normal text-nowrap"
            >
              Pickup Time
            </Label>
            <Input
              id="pickup-time"
              className="border-0 border-b border-black rounded-none w-full"
            />
          </div>

          <div className="flex items-end justify-center gap-2">
            <Label
              htmlFor="department"
              className="text-sm font-normal text-nowrap"
            >
              Department
            </Label>
            <Input
              id="department"
              className="border-0 border-b border-black rounded-none w-full"
            />
          </div>

          <div className="flex items-end justify-center gap-2">
            <Label
              htmlFor="destination"
              className="text-sm font-normal text-nowrap"
            >
              Destination
            </Label>
            <Input
              id="destination"
              className="border-0 border-b border-black rounded-none w-full"
            />
          </div>

          <div className="flex items-end justify-center gap-2">
            <Label htmlFor="phone" className="text-sm font-normal text-nowrap">
              Phone
            </Label>
            <Input
              id="phone"
              className="border-0 border-b border-black rounded-none w-full"
            />
          </div>

          <div className="flex items-end justify-center gap-2">
            <Label htmlFor="street" className="text-sm font-normal text-nowrap">
              Street
            </Label>
            <Input
              id="street"
              className="border-0 border-b border-black rounded-none w-full"
            />
          </div>

          <div className="flex items-end justify-center gap-2">
            <Label
              htmlFor="return-date"
              className="text-sm font-normal text-nowrap"
            >
              Return Date
            </Label>
            <Input
              id="return-date"
              className="border-0 border-b border-black rounded-none w-full"
            />
          </div>

          <div className="flex items-end justify-center gap-2">
            <Label
              htmlFor="zip-city"
              className="text-sm font-normal text-nowrap"
            >
              ZIP / City
            </Label>
            <Input
              id="zip-city"
              className="border-0 border-b border-black rounded-none w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-8">
        <Button>Print</Button>
        <Button>send via email</Button>
      </div>
    </form>
  );
});

OrderPrint.displayName = "OrderPrint";

export default OrderHistory;
