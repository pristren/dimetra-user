import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLazyQuery } from "@apollo/client";
import { GET_AN_ORDER } from "./graphql/queries/getAnOrder.gql";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function OrderDetails() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [getAnOrder] = useLazyQuery(GET_AN_ORDER, {
    variables: { queryData: { id: id } },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    onCompleted: (response) => {
      setData(response.getAnOrder);
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  useEffect(() => {
    getAnOrder();
  }, [getAnOrder]);

  return (
    <div>
      <h5>Order Details</h5>
      <div className="my-14 bg-white p-5">
        <h5>Transportation Details</h5>
        <div className="grid grid-cols-3 mt-10 mb-20">
          <div>
            <p className="highlight mb-4">Type of Transport</p>
            <p>{data?.transportationData?.type_of_transport}</p>
          </div>
          <div>
            <p className="highlight mb-4">Mode of Transportation</p>
            {data?.transportationData?.mode_of_transportation?.map(
              (mode, index) => (
                <p key={index}>{mode}</p>
              )
            )}
          </div>
          <div>
            <p className="highlight mb-4">Transport With</p>
            {data?.transportationData?.transport_with?.map((person, index) => (
              <p key={index}>{person}</p>
            ))}
          </div>
        </div>

        <Separator />

        <div className="my-14 w-[60%]">
          <h5>Patient Details</h5>
          <div className="grid grid-cols-2 gap-6 text-nowrap mt-10">
            <div className="flex items-center gap-6">
              <p>First Name: </p>
              <p>{data?.patientData?.name}</p>
            </div>
            {data?.patientData?.dispatcher && (
              <div className="flex items-center gap-6">
                <p>Dispatcher: </p>
                <p>{data?.patientData?.dispatcher}</p>
              </div>
            )}
            <div className="flex items-center gap-6">
              <p>Pick up: </p>
              <p>{data?.destinationDetailsData?.pick_up_street}</p>
            </div>
            <div className="flex items-center gap-6">
              <p>Order Type: </p>
              <p>{data?.transportationData?.type_of_transport}</p>
            </div>
            <div className="flex items-center gap-6">
              <p>Destination : </p>
              <p>{data?.destinationDetailsData?.drop_off_street}</p>
            </div>
            {data?.transportationData?.start_date && (
              <div className="flex items-center gap-6">
                <p>Date & time : </p>
                <p>{data?.transportationData?.start_date}</p>
              </div>
            )}
            <div className="flex items-center gap-6">
              <p>Vehicle: </p>
              <p>{data?.transportationData?.transport_with}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="my-14">
          <h5>Destination Details</h5>
          <div className="grid grid-cols-3 gap-6 text-nowrap mt-10">
            <div>
              <p className="highlight mb-5">Pick up</p>
              <div className="flex items-center gap-6 mb-8">
                <p>Name / Institution: </p>
                <p>{data?.destinationDetailsData?.pick_up_name}</p>
              </div>
              <div className="flex items-center gap-6 mb-8">
                <p>Street: </p>
                <p>{data?.destinationDetailsData?.pick_up_street}</p>
              </div>
              <div className="flex items-center gap-6 mb-8">
                <p>City :</p>
                <p>{data?.destinationDetailsData?.pick_up_city}</p>
              </div>
              <div className="flex items-center gap-6 mb-8">
                <p>Country :</p>
                <p>{data?.destinationDetailsData?.pick_up_country}</p>
              </div>
              <div className="flex items-center gap-6 mb-8">
                <p>Working Employee Name :</p>
                <p>{data?.destinationDetailsData?.pick_up_employee_name}</p>
              </div>
            </div>
            <div>
              <p className="highlight mb-5">Drop-Off</p>
              <div className="flex items-center gap-6 mb-8">
                <p>Date :</p>
                <p>{data?.destinationDetailsData?.drop_off_pick_up_date}</p>
              </div>
              <div className="flex items-center gap-6 mb-8">
                <p>Pickup time :</p>
                <p>{data?.destinationDetailsData?.pick_up_time || "not yet"}</p>
              </div>
              <div className="flex items-center gap-6 mb-8">
                <p>Name/ Institution :</p>
                <p>{data?.destinationDetailsData?.pick_up_name}</p>
              </div>
              <div className="flex items-center gap-6 mb-8">
                <p>Street :</p>
                <p>{data?.destinationDetailsData?.pick_up_street}</p>
              </div>
              <div className="flex items-center gap-6 mb-8">
                <p>city :</p>
                <p>{data?.destinationDetailsData?.pick_up_city}</p>
              </div>
              <div className="flex items-center gap-6 mb-8">
                <p>Country :</p>
                <p>{data?.destinationDetailsData?.pick_up_country} </p>
              </div>
              <div className="flex items-center gap-6 mb-8">
                <p>Phone :</p>
                <p>
                  {data?.destinationDetailsData?.pick_up_country || "not yet"}
                </p>
              </div>
            </div>
            <div>
              <p className="highlight mb-5">Return journey</p>
              <div className="flex items-center gap-6 mb-8">
                <p>Date :</p>
                <p>{data?.destinationDetailsData?.return_date || "not yet"}</p>
              </div>
              <div className="flex items-center gap-6 mb-8">
                <p>Time :</p>
                <p>{data?.destinationDetailsData?.return_approx_time}</p>
              </div>
              <div className="flex items-center gap-6 mb-8">
                <p>Floor/Department :</p>
                <p>{data?.destinationDetailsData?.return_floor}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="my-14 w-[60%]">
          <h5>Billing Details</h5>
          <div className="grid grid-cols-2 gap-6 text-nowrap mt-10">
            <div className="flex items-center gap-10">
              <p>Prename / Institution : </p>
              <p>{data?.billingDetailsData?.pre_name}</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Dispatcher:</p>
              <p>{data?.billingDetailsData?.dispatcher || "not yet"}</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Name :</p>
              <p>{data?.billingDetailsData?.name}</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Street :</p>
              <p>{data?.billingDetailsData?.street}</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Date & time :</p>
              <p>Select Date and time</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Place :</p>
              <p>{data?.billingDetailsData?.place}</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Contact :</p>
              <p>{data?.billingDetailsData?.contact}</p>
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
          <Button className="bg-secondary text-black px-14">Back</Button>
          <Link to={`/orders/edit-order/${id}`}>
            <Button className="px-14">Edit</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
