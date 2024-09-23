import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useLazyQuery } from "@apollo/client";
import { GET_AN_ORDER } from "./graphql/queries/getAnOrder.gql";
import { useEffect } from "react";

function OrderDetails() {

  const [getAnOrder] = useLazyQuery(GET_AN_ORDER, {
    variables: {queryData:{
      id: "66eaffa95fee990676e7a5aa"
    }},
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log({ error });
    },
  });
  useEffect(() => {
    getAnOrder();
  }, []);
  
  return (
    <div>
      <h5>Order Details</h5>
      <div className="my-14 bg-white p-5">
        <h5>Transportation details</h5>
        <div className="grid grid-cols-3 mt-10">
          <div>
            <p className="highlight mb-4">Type of transport</p>
            <p>Private trips</p>
          </div>
          <div>
            <p className="highlight mb-4">Mode of transportation</p>
            <p>Lying down</p>
            <p>Second transport helper</p>
          </div>
          <div>
            <p className="highlight mb-4">Transport with</p>
            <p>Infusion</p>
            <p>Oxygen (liters/min)</p>
          </div>
        </div>
        <Separator />
        <div className="my-14">
          <h5>Selected Weekdays and Months</h5>
          <div className="w-[60%] grid grid-cols-3 gap-6 mt-10 mb-10">
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <Label>Tuesday</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <Label>Tuesday</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <Label>Tuesday</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <Label>Tuesday</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <Label>Tuesday</Label>
            </div>
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
          <h5>Patient details</h5>
          <div className="grid grid-cols-2 gap-6 text-nowrap mt-10">
            <div className="flex items-center gap-10">
              <p>First Name: </p>
              <p>Sandeep</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Dispatcher: </p>
              <p>Kenneth Allen</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Pick up: </p>
              <p>Universität Spital, 4056 Basel</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Order Type:</p>
              <p>Reccuring</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Destination :</p>
              <p>St. Clara Spital, 4058 Basel</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Date & time :</p>
              <p>Select Date and time</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Vehicle:</p>
              <p>Car</p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="my-14">
          <h5>Destination details</h5>
          <div className="grid grid-cols-3 gap-6 text-nowrap mt-10">
            <div>
              <p className="highlight mb-5">Pick up</p>
              <div className="flex items-center gap-10 mb-8">
                <p>Name / Institution : </p>
                <p>Sandeep</p>
              </div>
              <div className="flex items-center gap-10 mb-8">
                <p>Address : </p>
                <p>Universität Spital, 4056 Basel</p>
              </div>
              <div className="flex items-center gap-10 mb-8">
                <p>City :</p>
                <p>St. Clara Spital, 4058 Basel</p>
              </div>
              <div className="flex items-center gap-10 mb-8">
                <p>Country :</p>
                <p>Car</p>
              </div>
              <div className="flex items-center gap-10 mb-8">
                <p>Working Employee Name :</p>
                <p>Employee Name</p>
              </div>
            </div>
            <div>
              <p className="highlight mb-5">Drop-Off</p>
              <div className="flex items-center gap-10 mb-8">
                <p>Date :</p>
                <p>Select Date</p>
              </div>
              <div className="flex items-center gap-10 mb-8">
                <p>Pickup time :</p>
                <p>Sep 21, 2024</p>
              </div>
              <div className="flex items-center gap-10 mb-8">
                <p>Name/ Institution :</p>
                <p>Adresse Email</p>
              </div>
              <div className="flex items-center gap-10 mb-8">
                <p>Address :</p>
                <p>Adresse Email</p>
              </div>
              <div className="flex items-center gap-10 mb-8">
                <p>city :</p>
                <p>Enter City Name</p>
              </div>
              <div className="flex items-center gap-10 mb-8">
                <p>Country :</p>
                <p>Enter Country </p>
              </div>
              <div className="flex items-center gap-10 mb-8">
                <p>Phone :</p>
                <p>+91 6658774637</p>
              </div>
            </div>
            <div>
              <p className="highlight mb-5">Return journey</p>
              <div className="flex items-center gap-10 mb-8">
                <p>Date :</p>
                <p>Sep 21, 2024</p>
              </div>
              <div className="flex items-center gap-10 mb-8">
                <p>Time :</p>
                <p>12:07</p>
              </div>
              <div className="flex items-center gap-10 mb-8">
                <p>Floor/Department :</p>
                <p>Here Stock</p>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="my-14 w-[60%]">
          <h5>Billing details</h5>
          <div className="grid grid-cols-2 gap-6 text-nowrap mt-10">
            <div className="flex items-center gap-10">
              <p>Prename / Institution : </p>
              <p>Add Prename / Institution</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Dispatcher:</p>
              <p>Kenneth Allen</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Name :</p>
              <p>Here Is Name</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Order Type:</p>
              <p>Reccuring</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Street :</p>
              <p>Here Street</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Date & time :</p>
              <p>Select Date and time</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Place :</p>
              <p>Here Place</p>
            </div>
            <div className="flex items-center gap-10">
              <p>Contact :</p>
              <p>+91 986754534</p>
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
};

export default OrderDetails;
