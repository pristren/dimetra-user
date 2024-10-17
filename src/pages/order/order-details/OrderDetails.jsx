import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_AN_ORDER } from "./graphql/queries/getAnOrder.gql";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import moment from "moment";
import { GET_A_RECURRING_ORDER } from "../recurring-orders/graphql/queries/getARecurringOrder.gql";
import { t } from "i18next";

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
      <h5>{t("order_details")}</h5>
      {singleOrderLoading || singleRecurringOrderLoading ? (
        <Card className="h-[calc(100vh-11rem)] mt-6 flex justify-center items-center">
          <p className="text-primary">{t("loading")}...</p>
        </Card>
      ) : (
        <Card className="mt-6 bg-white p-6 border-opacity-50 ">
          <h5>{t("transportation_details")}</h5>
          <div className="grid grid-cols-3 mt-6 mb-20">
            <div>
              <p className="font-medium  mb-3">{t("type_of_transport")}</p>
              <p>
                {data?.transportationData?.type_of_transport?.includes("_")
                  ? t(data?.transportationData?.type_of_transport)
                      ?.split("_")
                      .join(" ")
                  : t(data?.transportationData?.type_of_transport)}
              </p>
            </div>
            <div>
              <p className="font-medium mb-2 last:mb-0">
                {t("mode_of_transportation")}
              </p>
              {data?.transportationData?.mode_of_transportation?.map(
                (mode, index) => (
                  <p key={index} className="space-y-2">
                    {mode?.includes("_")
                      ? t(mode?.split("_").join(" "))
                      : t(mode)}
                  </p>
                )
              )}
            </div>
            <div>
              <p className="font-medium  mb-3">{t("transport_with")}</p>
              {data?.transportationData?.transport_with?.map((value, index) => (
                <p key={index} className="mb-2 last:mb-0">
                  {value === "oxygen_quantity"
                    ? `Oxygen Quantity: (${data?.transportationData?.oxygen_quantity} L)`
                    : value?.includes("_")
                    ? t(value?.split("_").join(" "))
                    : t(value)}
                </p>
              ))}
            </div>
          </div>

          <Separator />

          <div className="my-14">
            <h5>{t("patient_details")}</h5>
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="flex items-center gap-6">
                {data?.transportationData?.type_of_transport ===
                "collection_order" ? (
                  <p>{t("name_collection")}: </p>
                ) : (
                  <p>{t("name")}: </p>
                )}
                <p>{data?.patientData?.name}</p>
              </div>
              {data?.patientData?.dispatcher && (
                <div className="flex items-center gap-6">
                  <p>{t("dispatcher")}: </p>
                  <p>{data?.patientData?.dispatcher}</p>
                </div>
              )}
              <div className="flex items-center gap-6">
                {data?.transportationData?.type_of_transport ===
                "collection_order" ? (
                  <p>{t("number_of_patients")}: </p>
                ) : (
                  <p>{t("surname")}: </p>
                )}
                <p>{data?.patientData?.surname}</p>
              </div>
              <div className="flex items-center gap-6">
                <p>{t("pick_up")}: </p>
                <p>{data?.destinationDetailsData?.pick_up_address}</p>
              </div>
              <div className="flex items-center gap-6">
                <p>{t("order_type")}: </p>
                <p>
                  {data?.transportationData?.type_of_transport?.includes("_")
                    ? t(data?.transportationData?.type_of_transport)
                        ?.split("_")
                        .join(" ")
                    : t(data?.transportationData?.type_of_transport)}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <p>{t("destination")} : </p>
                <p>{data?.destinationDetailsData?.drop_off_address}</p>
              </div>
              {data?.transportationData?.start_date && (
                <div className="flex items-center gap-6">
                  <p>{t("date_time")} : </p>
                  <p>{data?.transportationData?.start_date}</p>
                </div>
              )}
              <div className="flex items-start gap-6">
                <p>{t("vehicle")}: </p>
                <div className="flex items-start gap-2">
                  {data?.transportationData?.transport_with?.map(
                    (person, index) => (
                      <p key={index}>
                        {person?.includes("_")
                          ? t(person?.split("_").join(" "))
                          : t(person)}{" "}
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
            <h5>{t("destination_details")}</h5>
            <div
              className={`grid  gap-3  mt-10 ${
                data?.order_type === "return"
                  ? "grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 "
              }`}
            >
              <div>
                <p className="font-medium text-lg mb-5">{t("pick_up")}</p>
                <div className="flex items-center gap-3 mb-8">
                  <p>{t("pick_up_name_institution")}: </p>
                  <p>{data?.destinationDetailsData?.pick_up_name}</p>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <p>{t("street")}: </p>
                  <p>{data?.destinationDetailsData?.pick_up_address}</p>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <p>{t("city")} :</p>
                  <p>{data?.destinationDetailsData?.pick_up_city}</p>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <p>{t("country")} :</p>
                  <p>{data?.destinationDetailsData?.pick_up_country}</p>
                </div>
                <div className="flex items-start gap-3 mb-8">
                  <p className="text-nowrap">{t("working_employee_name")} :</p>
                  <p>{data?.destinationDetailsData?.pick_up_employee_name}</p>
                </div>
              </div>
              <div className="">
                <p className="font-medium text-lg mb-5">{t("drop_off")}</p>
                <div className="flex items-center gap-3 mb-8">
                  <p>{t("drop_off_date")} :</p>
                  <p>
                    {data?.destinationDetailsData?.drop_off_pick_up_date
                      ? moment(
                          data?.destinationDetailsData?.drop_off_pick_up_date
                        ).format("DD MMMM YYYY")
                      : "not yet"}
                  </p>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <p>{t("pickup_time")} :</p>
                  <p>
                    {data?.destinationDetailsData?.drop_off_pick_up_time ||
                      "not yet"}
                  </p>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <p>{t("name_institution")} :</p>
                  <p>{data?.destinationDetailsData?.pick_up_name}</p>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <p>{t("street")} :</p>
                  <p>{data?.destinationDetailsData?.pick_up_address}</p>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <p>{t("city")} :</p>
                  <p>{data?.destinationDetailsData?.pick_up_city}</p>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <p>{t("country")} :</p>
                  <p>{data?.destinationDetailsData?.pick_up_country} </p>
                </div>
                <div className="flex items-center gap-3 mb-8">
                  <p>{t("phone")} :</p>
                  <p>
                    {data?.destinationDetailsData?.pick_up_country || "not yet"}
                  </p>
                </div>
              </div>
              {/* kamruzzaman bhai? should we keep it? return journey here? */}
              {data?.order_type === "normal" && (
                <div className="">
                  <p className="font-medium text-lg mb-5">
                    {t("return_journey")}
                  </p>
                  <div className="flex items-center gap-3 mb-8">
                    <p>{t("date")} :</p>
                    <p>
                      {data?.destinationDetailsData?.return_date
                        ? moment(
                            data?.destinationDetailsData?.return_date
                          ).format("DD MMMM YYYY")
                        : "not yet"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mb-8">
                    <p>{t("time")} :</p>
                    <p>{data?.destinationDetailsData?.return_approx_time}</p>
                  </div>
                  <div className="flex items-center gap-3 mb-8">
                    <p>{t("floor_department")} :</p>
                    <p>{data?.destinationDetailsData?.return_floor}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="my-14 ">
            <h5>{t("billing_details")}</h5>
            <div className="grid grid-cols-2 gap-6 text-nowrap mt-10">
              <div className="flex items-center gap-10">
                <p>{t("prename_institution")} : </p>
                <p>{data?.billingDetailsData?.pre_name || "N/A"}</p>
              </div>
              <div className="flex items-center gap-10">
                <p>{t("dispatcher_billing")}:</p>
                <p>{data?.billingDetailsData?.dispatcher || "N/A"}</p>
              </div>
              <div className="flex items-center gap-10">
                <p>{t("name")} :</p>
                <p>{data?.billingDetailsData?.name || "N/A"}</p>
              </div>
              <div className="flex items-center gap-10">
                <p>{t("street")} :</p>
                <p>{data?.billingDetailsData?.street || "N/A"}</p>
              </div>
              <div className="flex items-center gap-10">
                <p>{t("place")} :</p>
                <p>{data?.billingDetailsData?.place || "N/A"}</p>
              </div>
              <div className="flex items-center gap-10">
                <p>{t("contact")} :</p>
                <p>{data?.billingDetailsData?.contact || "N/A"}</p>
              </div>
            </div>
          </div>

          <Separator />
          <div className="my-14">
            <h5>{t("mts_detail")}</h5>
            <div className="flex items-center gap-6 mb-6 mt-10">
              <p>{t("additionally")}:</p>
              <p>{t("here_is_name")}</p>
            </div>
            <div className="flex items-center gap-6 mb-6">
              <p>{t("driver_1")} :</p>
              <p>Smith</p>
            </div>
            <div className="flex items-center gap-6 mb-6">
              <p>{t("driver_2")} :</p>
              <p>Mayur</p>
            </div>
            <div className="flex items-center gap-6 mb-6">
              <p>{t("vehicle_number")} :</p>
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
              {t("back")}
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
                  <Button className="px-14">{t("edit")}</Button>
                </Link>
              )}
          </div>
        </Card>
      )}
    </div>
  );
}

export default OrderDetails;
