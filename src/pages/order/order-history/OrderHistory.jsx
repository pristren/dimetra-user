/* eslint-disable react/prop-types */
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DatePicker } from "@/components/ui/DatePicker";
import { format } from "date-fns";

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
      reactToPrintTriggerRef?.current.click();
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
          {t("date")}
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
      accessorKey: "destinationDetailsData.drop_off_pick_up_time",
      header: () => (
        <div
          onClick={() =>
            handleSort("destinationDetailsData.drop_off_pick_up_time")
          }
          className="flex items-center cursor-pointer"
        >
          {t("time")}
          <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
        </div>
      ),
    },
    {
      accessorKey: "destinationDetailsData.pick_up_name",
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
      accessorKey: "destinationDetailsData.drop_off_name",
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
                  <>
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
                  </>
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
        pageTitle={t("history")}
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
  //   console.log(order);

  //   // print the order with string
  //   const printOrder = JSON.stringify(order, null, 2);

  //   let content = <pre>{printOrder}</pre>;

  return (
    <div className="">
      {/* {content} */}
      <form className="max-w-4xl mx-auto p-6 space-y-2" ref={ref}>
        <div className="space-y-2">
          <div className="flex items-center gap-4 mb-4">
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
          <p className="text-2xl text-red-600">
            Order Form for Patient Transport
          </p>
          <div className="border border-red-500 w-full" />
        </div>

        <div className="grid gap-6 grid-cols-3">
          <div className="space-y-2">
            <p className=" border-b pb-2">{t("type_of_transport")} </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked
                  id={order?.transportationData?.type_of_transport}
                />
                <Label htmlFor={order?.transportationData?.type_of_transport}>
                  {t(order?.transportationData?.type_of_transport)}
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className=" border-b pb-2"> {t("mode_of_transportation")} </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={order?.transportationData?.mode_of_transportation}
                  checked
                />
                <Label
                  htmlFor={order?.transportationData?.mode_of_transportation}
                >
                  {t(order?.transportationData?.mode_of_transportation)}
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className=" border-b pb-2">{t("transport_with")} </p>
            <div className="space-y-2">
              {order?.transportationData?.transport_with?.map((option, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Checkbox checked id={option} />
                  <Label htmlFor={option} className="flex items-center gap-2">
                    {option === "oxygen_quantity" ? t("oxygen") : t(option)}
                    {option === "oxygen_quantity" && (
                      <p className="text-sm ">
                        : {t(order?.transportationData?.oxygen_quantity)}{" "}
                        (Liter/Min)
                      </p>
                    )}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {order?.transportationData?.type_of_transport === "recurring" && (
          <div>
            <h3 className="text-lg font-medium mb-1 mt-1">
              {t("select_recurring_type")}
            </h3>
            <div className="flex justify-start gap-2">
              <p>Recurring Type:</p>
              <p>{order?.recurringData?.recurring_type}</p>
            </div>

            {order?.recurringData?.recurring_type === "week" ? (
              <div>
                <h3 className="text-lg font-medium mt-2 mb-2">
                  {t("select_start_date_and_time")}
                </h3>
                <div className="mb-2 flex w-max gap-4 items-center">
                  {order?.recurringData?.start_date && (
                    <p>
                      {order?.recurringData?.start_date
                        ? moment(order?.recurringData?.start_date).format(
                            "DD/MM/YYYY"
                          )
                        : ""}
                    </p>
                  )}
                  {order?.recurringData?.start_time && (
                    <p>{order?.recurringData?.start_time}</p>
                  )}
                </div>
                {order?.recurringData?.return_time && (
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{t("select_return_time")}* :</p>
                    <p>{order?.recurringData?.return_time}</p>
                  </div>
                )}

                {order?.recurringData?.multiple_week_days?.length > 0 && (
                  <>
                    <h3 className="text-lg font-medium mb-2 mt-2">
                      {t("select_weekdays")}
                      <span className="highlight">
                        ({t("multiple_selection")})
                      </span>
                      :
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      {order?.recurringData?.multiple_week_days?.map(
                        (option) => (
                          <div key={option} className="flex items-center mb-2">
                            <Checkbox
                              disabled
                              id={option}
                              checked={order?.recurringData?.multiple_week_days?.includes(
                                option
                              )}
                            />
                            <Label className="ml-2 capitalize" htmlFor={option}>
                              {option}
                            </Label>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}

                {order?.recurringData?.ends && (
                  <div className="flex items-center gap-2 mt-2">
                    <h3 className="text-lg font-medium">{t("ends")}:</h3>
                    <p>{order?.recurringData?.ends}</p>
                  </div>
                )}
              </div>
            ) : order?.recurringData?.recurring_type === "free" ? (
              <div className="">
                <div className="mt-2 mb-2 ">
                  <h3 className="text-lg font-medium mt-2 mb-2">
                    {t("select_start_date_and_time_free")}
                  </h3>
                  <div className="flex w-max gap-4 items-center">
                    {order?.recurringData?.free_dates && (
                      <DatePicker
                        mode="multiple"
                        date={order?.recurringData?.free_dates}
                        disabled
                      />
                    )}
                    {order?.recurringData?.free_dates_start_time && (
                      <Input
                        disabled
                        value={order?.recurringData?.free_dates_start_time}
                      />
                    )}
                  </div>
                </div>
                {order?.recurringData?.free_dates_return_time && (
                  <div className="mt-2 mb-2 flex items-center gap-2">
                    <p className="font-medium">{t("select_return_time")}</p>
                    <p>{order?.recurringData?.free_dates_return_time}</p>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}

        <div className="w-full">
          <p className="border-b">{t("patient_details")}</p>

          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-end justify-start gap-3">
                <Label htmlFor="name" className="text-sm text-nowrap">
                  {order?.transportationData?.type_of_transport ===
                  "collection_order"
                    ? t("name_collection")
                    : t("name_institution")}
                </Label>
                <Input
                  id="name"
                  value={
                    order?.patientData?.name?.length > 20
                      ? order?.patientData?.name?.slice(0, 20)
                      : order?.patientData?.name
                  }
                  maxLength={20}
                  disabled
                  className="border-0 border-b border-black rounded-none h-6 pl-1"
                />
              </div>
              <div className="flex items-end justify-start gap-3">
                <Label htmlFor="birthdate" className="text-sm text-nowrap">
                  {t("date_of_birth")}
                </Label>
                <Input
                  id="birthdate"
                  value={moment(order?.patientData?.date_of_birth).format(
                    "DD.MM.YYYY"
                  )}
                  disabled
                  className="border-0 border-b border-black rounded-none h-6 pl-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-end justify-start gap-3">
                <Label htmlFor="caseNumber" className="text-sm text-nowrap">
                  {t("area_room")}
                </Label>
                <Input
                  id="caseNumber"
                  value={order?.patientData?.area_room}
                  disabled
                  className="border-0 border-b border-black rounded-none h-6 pl-1"
                />
              </div>
              <div className="flex items-end justify-start gap-3">
                <Label htmlFor="costCenter" className="text-sm text-nowrap">
                  {t("cost_center")}
                </Label>
                <Input
                  id="costCenter"
                  value={order?.patientData?.cost_center}
                  disabled
                  className="border-0 border-b border-black rounded-none h-6 pl-1"
                />
              </div>
            </div>

            {/* <div className="flex items-end justify-start gap-3">
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
            </div> */}

            <div className="flex justify-between">
              <div className="flex items-end gap-4">
                <Label className="text-sm">{t("patient_above_90kg")}</Label>
                <div className="flex items-end gap-2">
                  {order?.patientData?.patient_above_90kg ? (
                    <div className="flex items-end gap-2">
                      <Checkbox
                        id="over90"
                        className="rounded-none border-black h-4 w-4"
                        checked
                        // disabled
                      />
                      <Label htmlFor="over90" className="text-sm">
                        {t("yes")}
                      </Label>

                      <Input
                        id="over90"
                        value={order?.patientData?.how_much}
                        disabled
                        className="border-0 border-b border-black rounded-none w-10 h-6 px-0 pb-0 text-center"
                      />
                      <p>{t("kg")}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="over90"
                        checked={false}
                        disabled
                        className="rounded-none border-black h-4 w-4"
                      />
                      <Label htmlFor="over90" className="text-sm mb-0">
                        {t("no")}
                      </Label>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-end gap-4">
                <Label className="text-sm">{t("isolation")}</Label>
                <div className="flex items-end gap-2">
                  {order?.patientData?.isolation ? (
                    <div className="flex items-end gap-2">
                      <Checkbox
                        id="isolation"
                        className="rounded-none border-black h-4 w-4"
                        checked
                        // disabled
                      />
                      <Label htmlFor="over90" className="text-sm">
                        {t("yes")}
                      </Label>

                      <Input
                        id="isolation"
                        value={order?.patientData?.which}
                        disabled
                        className="border-0 border-b border-black rounded-none w-full h-6 pr-0 pl-1 pb-0"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="isolation"
                        checked={false}
                        disabled
                        className="rounded-none border-black h-4 w-4"
                      />
                      <Label htmlFor="isolation" className="text-sm mb-0">
                        {t("no")}
                      </Label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="space-y-2 w-1/2">
            <p className="border-b pb-2">PICK-UP</p>
            <div className="space-y-2">
              <div className="flex items-end justify-center gap-2">
                {console.log(order)}
                <Label className="text-nowrap" htmlFor="pickup-name">
                  Name / Institution
                </Label>
                <Input
                  className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                  id="pickup-name"
                  value={order?.destinationDetailsData?.pick_up_name}
                />
              </div>
              <div className="flex items-end justify-center gap-2">
                <Label className="text-nowrap" htmlFor="pickup-street">
                  Street
                </Label>
                <Input
                  className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                  id="pickup-street"
                  value={order?.destinationDetailsData?.pick_up_address}
                />
              </div>
              <div className="flex items-end justify-center gap-2">
                <Label className="text-nowrap" htmlFor="pickup-city">
                  City
                </Label>
                <Input
                  className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                  id="pickup-city"
                  value={order?.destinationDetailsData?.pick_up_city}
                />
              </div>
              <div className="flex items-end justify-center gap-2">
                <Label className="text-nowrap" htmlFor="pickup-country">
                  Country
                </Label>
                <Input
                  className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                  id="pickup-country"
                  value={order?.destinationDetailsData?.pick_up_country}
                />
              </div>
              <div className="flex items-end justify-center gap-2">
                <Label className="text-nowrap" htmlFor="pickup-employee">
                  Working employee name
                </Label>
                <Input
                  className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                  id="pickup-employee"
                  value={order?.destinationDetailsData?.pick_up_employee_name}
                />
              </div>
              <div className="flex items-end justify-center gap-2">
                <Label className="text-nowrap" htmlFor="pickup-phone">
                  Phone
                </Label>
                <Input
                  className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                  id="pickup-phone"
                  value={order?.destinationDetailsData?.pickup_phone}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 w-1/2">
            <p className="border-b pb-2">DROP OFF</p>
            <div className="space-y-2">
              <div className="flex items-end justify-center gap-2">
                <Label className="text-nowrap" htmlFor="dropoff-date">
                  Drop-Off Date
                </Label>
                <Input
                  className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                  id="dropoff-date"
                  value={order?.destinationDetailsData?.drop_off_pick_up_date}
                />
              </div>
              <div className="flex items-end justify-center gap-2">
                <Label className="text-nowrap" htmlFor="pickup-time">
                  Pickup Time
                </Label>
                <Input
                  className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                  id="pickup-time"
                  value={order?.destinationDetailsData?.drop_off_pick_up_time}
                />
              </div>
              <div className="flex items-end justify-center gap-2">
                <Label className="text-nowrap" htmlFor="dropoff-street">
                  Street / No.
                </Label>
                <Input
                  className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                  id="dropoff-street"
                  value={order?.destinationDetailsData?.drop_off_address}
                />
              </div>
              <div className="flex items-end justify-center gap-2">
                <Label className="text-nowrap" htmlFor="dropoff-zip-city">
                  ZIP / City
                </Label>
                <Input
                  className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                  id="dropoff-zip-city"
                  value={order?.destinationDetailsData?.drop_off_city}
                />
              </div>
              <div className="flex items-end justify-center gap-2">
                <Label className="text-nowrap" htmlFor="dropoff-phone">
                  Phone
                </Label>
                <Input
                  className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                  id="dropoff-phone"
                  value={order?.destinationDetailsData?.drop_off_phone}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          {order?.destinationDetailsData?.return_date && (
            <div className="space-y-2 w-1/2">
              <p className="border-b pb-2">Return Journey</p>
              <div className="space-y-2">
                <div className="flex items-end justify-center gap-2">
                  <Label className="text-nowrap" htmlFor="return-date">
                    Date
                  </Label>
                  <Input
                    className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                    id="return-date"
                    value={
                      order?.destinationDetailsData?.return_date
                        ? format(
                            new Date(order.destinationDetailsData.return_date),
                            "MMMM d, yyyy"
                          )
                        : ""
                    }
                  />
                </div>
                <div className="flex items-end justify-center gap-2">
                  <Label className="text-nowrap" htmlFor="return-time">
                    Time
                  </Label>
                  <Input
                    className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                    id="return-time"
                    value={order?.destinationDetailsData?.return_approx_time}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2 w-1/2">
            <p className="border-b pb-2">Billing Details</p>
            <div className="space-y-2">
              <div className="flex items-end justify-center gap-2">
                <Label
                  className="text-nowrap"
                  htmlFor="billing-institution-firstname"
                >
                  Institution / Firstname
                </Label>
                <Input
                  className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                  id="billing-institution-firstname"
                  value={order?.billingDetailsData?.pre_name}
                />
              </div>
              <div className="flex items-end justify-center gap-2">
                <Label
                  className="text-nowrap"
                  htmlFor="billing-institution-name"
                >
                  Institution / Name
                </Label>
                <Input
                  className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                  id="billing-institution-name"
                  value={order?.billingDetailsData?.name}
                />
              </div>
              <div className="flex items-end justify-center gap-2">
                <Label className="text-nowrap" htmlFor="billing-place">
                  Place
                </Label>
                <Input
                  className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                  id="billing-place"
                  value={order?.billingDetailsData?.place}
                />
              </div>
              <div className="flex items-end justify-center gap-2">
                <Label className="text-nowrap" htmlFor="billing-contact-phone">
                  Contact Phone
                </Label>
                <Input
                  className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                  id="billing-contact-phone"
                  value={order?.billingDetailsData?.contact_phone}
                />
              </div>
              <div className="flex items-end justify-center gap-2">
                <Label className="text-nowrap" htmlFor="billing-street">
                  Street
                </Label>
                <Input
                  className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                  id="billing-street"
                  value={order?.billingDetailsData?.street}
                />
              </div>
              <div className="flex items-end justify-center gap-2">
                <Label className="text-nowrap" htmlFor="billing-contact">
                  Contact
                </Label>
                <Input
                  className="border-0 border-b border-black rounded-none h-6 text-gray-500 w-full"
                  id="billing-contact"
                  value={order?.billingDetailsData?.contact}
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="w-full max-w-4xl border border-black p-4">
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
              <Label
                htmlFor="phone"
                className="text-sm font-normal text-nowrap"
              >
                Phone
              </Label>
              <Input
                id="phone"
                className="border-0 border-b border-black rounded-none w-full"
              />
            </div>

            <div className="flex items-end justify-center gap-2">
              <Label
                htmlFor="street"
                className="text-sm font-normal text-nowrap"
              >
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
        </div> */}

        {/* <div className="flex justify-end gap-2 mt-8">
          <Button>Print</Button>
          <Button>send via email</Button>
        </div> */}
      </form>
    </div>
  );
});

OrderPrint.displayName = "OrderPrint";

export default OrderHistory;
