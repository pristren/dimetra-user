import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useLazyQuery } from "@apollo/client";
import { GET_AN_ORDER } from "./graphql/queries/getAnOrder.gql";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

        <div className="my-14">
          <h5>Selected Weekdays</h5>
          <div className="w-[60%] grid grid-cols-3 gap-6 mt-10 mb-10">
            {data?.transportationData?.multiple_weekdays?.map((day, index) => (
              <div className="flex items-center gap-2" key={index}>
                <Checkbox checked />
                <Label>{day}</Label>
              </div>
            ))}
          </div>
          <RadioGroup value="1 month">
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="1 month" id="1 month" />
              <Label htmlFor="1 month">1 month</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        <div className="my-14 w-[60%]">
          <h5>Patient Details</h5>
          <div className="grid grid-cols-2 gap-6 text-nowrap mt-10">
            <div className="flex items-center gap-10">
              <p>First Name: </p>
              <p>{data?.patientData?.name}</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Surname: </p>
              <p>{data?.patientData?.surname}</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Date of Birth: </p>
              <p>
                {new Date(
                  Number(data?.patientData?.date_of_birth)
                ).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-10">
              <p>Area Room: </p>
              <p>{data?.patientData?.area_room}</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Special: </p>
              <p>{data?.patientData?.special}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="my-14">
          <h5>Destination Details</h5>
          <div className="grid grid-cols-3 gap-6 text-nowrap mt-10">
            <div>
              <p className="highlight mb-5">Pick up</p>
              <div className="flex items-center gap-10 mb-8">
                <p>Name / Institution: </p>
                <p>{data?.destinationDetailsData?.pick_up_name}</p>
              </div>
              <div className="flex items-center gap-10 mb-8">
                <p>Address: </p>
                <p>{data?.destinationDetailsData?.pick_up_address}</p>
              </div>
            </div>
            <div>
              <p className="highlight mb-5">Drop-Off</p>
              <div className="flex items-center gap-10 mb-8">
                <p>Name / Institution: </p>
                <p>{data?.destinationDetailsData?.drop_off_name}</p>
              </div>
              <div className="flex items-center gap-10 mb-8">
                <p>Address: </p>
                <p>{data?.destinationDetailsData?.drop_off_address}</p>
              </div>
            </div>
            <div>
              <p className="highlight mb-5">Return Journey</p>
              <div className="flex items-center gap-10 mb-8">
                <p>Date: </p>
                <p>{data?.destinationDetailsData?.return_day_letter}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="my-14 w-[60%]">
          <h5>Billing Details</h5>
          <div className="grid grid-cols-2 gap-6 text-nowrap mt-10">
            <div className="flex items-center gap-10">
              <p>Prename / Institution: </p>
              <p>{data?.billingDetailsData?.pre_name}</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Street: </p>
              <p>{data?.billingDetailsData?.street}</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Place: </p>
              <p>{data?.billingDetailsData?.place}</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Contact: </p>
              <p>{data?.billingDetailsData?.contact}</p>
            </div>
          </div>
        </div>

        <Separator />
        <div className="my-14">
          <h5>MTS Detail</h5>
          <div className="flex items-center gap-10 mb-6 mt-10">
            <p>Additionally:</p>
            <p>Here Is Name</p>
          </div>
          <div className="flex items-center gap-10 mb-6">
            <p>Driver 1 :</p>
            <p>Smith</p>
          </div>
          <div className="flex items-center gap-10 mb-6">
            <p>Driver 2 :</p>
            <p>Mayur</p>
          </div>
          <div className="flex items-center gap-10 mb-6">
            <p>Verhicle :</p>
            <p>17</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <Button className="bg-secondary text-black px-14">Back</Button>
          <Button className="px-14">Edit</Button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
