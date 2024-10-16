import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_AN_ORDER } from "./graphql/queries/getAnOrder.gql";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import moment from "moment";
import { GET_A_RECURRING_ORDER } from "../recurring-orders/graphql/queries/getARecurringOrder.gql";

function OrderDetails({ singleRecurring = false }) {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [getAnOrder, { loading: singleOrderLoading }] = useLazyQuery(
    GET_AN_ORDER,
    {
      variables: { queryData: { id: id } },
      errorPolicy: "all",
      fetchPolicy: "no-cache",
      onCompleted: (response) => {
        setData(response.getAnOrder);
      },
      onError: (error) => {
        console.error({ error });
      },
    }
  );

  const [getARecurringOrder, { loading: singleRecurringOrderLoading }] =
    useLazyQuery(GET_A_RECURRING_ORDER, {
      variables: { queryData: { id: id } },
      errorPolicy: "all",
      fetchPolicy: "no-cache",
      onCompleted: (response) => {
        setData(response.getARecurringOrder);
      },
      onError: (error) => {
        console.error({ error });
      },
    });

  useEffect(() => {
    if (singleRecurring) {
      getARecurringOrder();
    } else {
      getAnOrder();
    }
  }, [singleRecurring]);

  return (
    <div className="capitalize">
      <h5>Order Details</h5>
      {singleOrderLoading || singleRecurringOrderLoading ? (
        <Card className="h-[calc(100vh-11rem)] mt-6 flex justify-center items-center">
          <p className="text-primary">Loading...</p>
        </Card>
      ) : (
        <Card className="mt-6 bg-white p-6 border-opacity-50 ">
          <h5>Transportation Details</h5>
          <div className="grid grid-cols-3 mt-6 mb-20">
            <div>
              <p className="font-medium  mb-3">Type of Transport</p>
              <p>
                {data?.transportationData?.type_of_transport?.includes("_")
                  ? data?.transportationData?.type_of_transport
                      ?.split("_")
                      .join(" ")
                  : data?.transportationData?.type_of_transport}
              </p>
            </div>
            <div>
              <p className="font-medium mb-2 last:mb-0">
                Mode of Transportation
              </p>
              {data?.transportationData?.mode_of_transportation?.map(
                (mode, index) => (
                  <p key={index} className="space-y-2">
                    {mode?.includes("_") ? mode?.split("_").join(" ") : mode}
                  </p>
                )
              )}
            </div>
            <div>
              <p className="font-medium  mb-3">Transport With</p>
              {data?.transportationData?.transport_with?.map((value, index) => (
                <p key={index} className="mb-2 last:mb-0">
                  {value === "oxygen_quantity"
                    ? `Oxygen Quantity: (${data?.transportationData?.oxygen_quantity} L)`
                    : value?.includes("_")
                    ? value?.split("_").join(" ")
                    : value}
                </p>
              ))}
            </div>
          </div>

          <Separator />

          <div className="my-14">
            <h5>Patient Details</h5>
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="flex items-center gap-6">
                {data?.transportationData?.type_of_transport ===
                "collection_order" ? (
                  <p>Name Collection: </p>
                ) : (
                  <p>Name: </p>
                )}
                <p>{data?.patientData?.name}</p>
              </div>
              {data?.patientData?.dispatcher && (
                <div className="flex items-center gap-6">
                  <p>Dispatcher: </p>
                  <p>{data?.patientData?.dispatcher}</p>
                </div>
              )}
              <div className="flex items-center gap-6">
                {data?.transportationData?.type_of_transport ===
                "collection_order" ? (
                  <p>Number of patients: </p>
                ) : (
                  <p>Surname: </p>
                )}
                <p>{data?.patientData?.surname}</p>
              </div>
              <div className="flex items-center gap-6">
                <p>Pick up: </p>
                <p>{data?.destinationDetailsData?.pick_up_address}</p>
              </div>
              <div className="flex items-center gap-6">
                <p>Order Type: </p>
                <p>
                  {data?.transportationData?.type_of_transport?.includes("_")
                    ? data?.transportationData?.type_of_transport
                        ?.split("_")
                        .join(" ")
                    : data?.transportationData?.type_of_transport}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <p>Destination : </p>
                <p>{data?.destinationDetailsData?.drop_off_address}</p>
              </div>
              {data?.transportationData?.start_date && (
                <div className="flex items-center gap-6">
                  <p>Date & time : </p>
                  <p>{data?.transportationData?.start_date}</p>
                </div>
              )}
              <div className="flex items-start gap-6">
                <p>Vehicle: </p>
                <div className="flex items-start gap-2">
                  {data?.transportationData?.transport_with?.map(
                    (person, index) => (
                      <p key={index}>
                        {person?.includes("_")
                          ? person?.split("_").join(" ")
                          : person}{" "}
                        {index !==
                        data?.transportationData?.transport_with?.length - 1
                          ? ","
                          : ""}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="my-14">
            <h5>Destination Details</h5>
            <div
              className={`grid  gap-3  mt-10 ${
                data?.order_type === "return"
                  ? "grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 "
              }`}
            >
              <div>
                <p className="font-medium text-lg mb-5">Pick up</p>
                <div className="flex items-center gap-3 mb-8">
                  <p>Name / Institution: </p>
                  <p>{data?.destinationDetailsData?.pick_up_name}</p>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <p>Street: </p>
                  <p>{data?.destinationDetailsData?.pick_up_address}</p>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <p>City :</p>
                  <p>{data?.destinationDetailsData?.pick_up_city}</p>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <p>Country :</p>
                  <p>{data?.destinationDetailsData?.pick_up_country}</p>
                </div>
                <div className="flex items-start gap-3 mb-8">
                  <p className="text-nowrap">Working Employee Name :</p>
                  <p>{data?.destinationDetailsData?.pick_up_employee_name}</p>
                </div>
              </div>
              <div className="">
                <p className="font-medium text-lg mb-5">Drop-Off</p>
                <div className="flex items-center gap-3 mb-8">
                  <p>Date :</p>
                  <p>
                    {data?.destinationDetailsData?.drop_off_pick_up_date
                      ? moment(
                          data?.destinationDetailsData?.drop_off_pick_up_date
                        ).format("DD MMMM YYYY")
                      : "not yet"}
                  </p>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <p>Pickup time :</p>
                  <p>
                    {data?.destinationDetailsData?.drop_off_pick_up_time ||
                      "not yet"}
                  </p>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <p>Name/ Institution :</p>
                  <p>{data?.destinationDetailsData?.pick_up_name}</p>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <p>Street :</p>
                  <p>{data?.destinationDetailsData?.pick_up_address}</p>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <p>city :</p>
                  <p>{data?.destinationDetailsData?.pick_up_city}</p>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <p>Country :</p>
                  <p>{data?.destinationDetailsData?.pick_up_country} </p>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <p>Phone :</p>
                  <p>
                    {data?.destinationDetailsData?.pick_up_country || "not yet"}
                  </p>
                </div>
              </div>
              {/* kamruzzaman bhai? should we keep it? return journey here? */}
              {data?.order_type === "normal" && (
                <div className="">
                  <p className="font-medium text-lg mb-5">Return journey</p>
                  <div className="flex items-center gap-3 mb-8">
                    <p>Date :</p>
                    <p>
                      {data?.destinationDetailsData?.return_date
                        ? moment(
                            data?.destinationDetailsData?.return_date
                          ).format("DD MMMM YYYY")
                        : "not yet"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mb-8">
                    <p>Time :</p>
                    <p>{data?.destinationDetailsData?.return_approx_time}</p>
                  </div>
                  <div className="flex items-center gap-3 mb-8">
                    <p>Floor/Department :</p>
                    <p>{data?.destinationDetailsData?.return_floor}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="my-14 ">
            <h5>Billing Details</h5>
            <div className="grid grid-cols-2 gap-6 text-nowrap mt-10">
              <div className="flex items-center gap-10">
                <p>Prename / Institution : </p>
                <p>{data?.billingDetailsData?.pre_name || "N/A"}</p>
              </div>
              <div className="flex items-center gap-10">
                <p>Dispatcher:</p>
                <p>{data?.billingDetailsData?.dispatcher || "N/A"}</p>
              </div>
              <div className="flex items-center gap-10">
                <p>Name :</p>
                <p>{data?.billingDetailsData?.name || "N/A"}</p>
              </div>
              <div className="flex items-center gap-10">
                <p>Street :</p>
                <p>{data?.billingDetailsData?.street || "N/A"}</p>
              </div>
              <div className="flex items-center gap-10">
                <p>Place :</p>
                <p>{data?.billingDetailsData?.place || "N/A"}</p>
              </div>
              <div className="flex items-center gap-10">
                <p>Contact :</p>
                <p>{data?.billingDetailsData?.contact || "N/A"}</p>
              </div>
            </div>
          </div>

          <Separator />
          <div className="my-14">
            <h5>MTS Detail</h5>
            <div className="flex items-center gap-6 mb-6 mt-10">
              <p>Additionally:</p>
              <p>Here Is Name</p>
            </div>
            <div className="flex items-center gap-6 mb-6">
              <p>Driver 1 :</p>
              <p>Smith</p>
            </div>
            <div className="flex items-center gap-6 mb-6">
              <p>Driver 2 :</p>
              <p>Mayur</p>
            </div>
            <div className="flex items-center gap-6 mb-6">
              <p>Verhicle :</p>
              <p>17</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <Button
              onClick={() => {
                window.history.back();
              }}
              className="px-14"
              variant="secondary"
            >
              Back
            </Button>
            {data?.status !== "completed" &&
              data?.status !== "rejected" &&
              data?.status !== "deleted" && (
                <Link
                  disabled={
                    data?.transportationData?.type_of_transport ===
                    "collection_order"
                  }
                  to={
                    singleRecurring
                      ? `/orders/edit-recurring-order/${id}`
                      : `/orders/edit-order/${id}`
                  }
                >
                  <Button className="px-14">Edit</Button>
                </Link>
              )}
          </div>
        </Card>
      )}
    </div>
  );
}

export default OrderDetails;
