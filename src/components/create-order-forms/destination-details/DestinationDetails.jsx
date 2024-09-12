/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { z } from "zod";
import BackAndNextBtn from "@/components/common/BackAndNextBtn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DatePicker } from "@/components/ui/DatePIcker";
import AppSelect from "@/components/common/AppSelect";
import { useEffect, useState } from "react";
import { calculateFormProgress } from "@/utils";
import { timeOptions } from "../helpers";

const DestinationDetails = ({
  handleFormChange,
  setDestinationProgress,
  destinationDetailsData,
  setDestinationDetailsData,
}) => {
  const {
    pickUpName = "",
    pickUpAddress = "",
    pickUpCity = "",
    pickUpCountry = "",
    pickUpEmployeeName = "",
    dropOffDate = "",
    dropOffPickUpTime = "",
    dropOffName = "",
    dropOffAddress = "",
    dropOffCity = "",
    dropOffCountry = "",
    dropOffPhone = "",
    returnDayLetter = "",
    returnApproxTime = "",
    returnFloor = "",
  } = destinationDetailsData;
  const [dropDate, setDropDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const formSchema = z.object({
    pickUpName: z.string().min(1, "Name is required"),
    pickUpAddress: z.string().min(1, "Address is required"),
    pickUpCity: z.string().min(1, "City is required"),
    pickUpCountry: z.string().min(1, "Country is required"),
    pickUpEmployeeName: z.string().min(1, "Working Employee Name is required"),

    dropOffDate: z.string().min(1, "Date is required"),
    dropOffPickUpTime: z.string().min(1, "Pick-Up Time is required"),
    dropOffName: z.string().min(1, "Name is required"),
    dropOffAddress: z.string().min(1, "Address is required"),
    dropOffCity: z.string().min(1, "City is required"),
    dropOffCountry: z.string().min(1, "Country is required"),
    dropOffPhone: z.string().min(1, "Phone is required"),

    returnDate: z.string().min(1, "Date is required"),
    today: z.string().min(1, "This field is required"),
    time: z.string().min(1, "Approx. Time is required"),
    floor: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickUpName: "",
      pickUpAddress: "",
      pickUpCity: "",
      pickUpCountry: "",
      pickUpEmployeeName: "",
      dropOffDate: "",
      dropOffPickUpTime: "",
      dropOffName: "",
      dropOffAddress: "",
      dropOffCity: "",
      dropOffCountry: "",
      dropOffPhone: "",
      returnDate: "",
      today: "",
      time: "",
      floor: "",
    },
  });

  const { register, formState } = form;
  const { errors } = formState;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDestinationDetailsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fieldsFilled = [
    pickUpName,
    pickUpAddress,
    pickUpCity,
    pickUpCountry,
    pickUpEmployeeName,
    dropOffPickUpTime,
    dropOffName,
    dropOffAddress,
    dropOffCity,
    dropOffCountry,
    dropOffPhone,
    dropDate,
    // returnDayLetter,
    // returnApproxTime,
    returnFloor,
    returnDate,
  ];

  useEffect(() => {
    setDestinationProgress(calculateFormProgress(fieldsFilled));
  }, [fieldsFilled]);

  return (
    <Card className="w-[65%] px-5 py-5">
      <CardHeader>
        <CardTitle>Destination Details</CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form>
            <div className="grid grid-cols-2 gap-5">
              <div className="pr-5">
                <h2 className="text-xl font-semibold mb-4">Pick-Up</h2>

                <div className="mb-7">
                  <FormLabel className="text-[15px] tracking-wide">
                    Name / Institution <sup className="text-[13px]">*</sup>
                  </FormLabel>
                  <FormControl className="mt-2">
                    <Input
                      className={`${
                        errors.pickUpName ? "border-red-500" : ""
                      }`}
                      {...register("pickUpName")}
                      onChange={handleInputChange}
                      value={pickUpName}
                    />
                  </FormControl>
                  <FormMessage />
                </div>

                <div className="mb-7">
                  <FormLabel className="text-[15px] tracking-wide">
                    Address <sup className="text-[13px]">*</sup>
                  </FormLabel>
                  <FormControl className="mt-2">
                    <Input
                      className={`${
                        errors.pickUpAddress ? "border-red-500" : ""
                      }`}
                      {...register("pickUpAddress")}
                      onChange={handleInputChange}
                      value={pickUpAddress}
                    />
                  </FormControl>
                  <FormMessage />
                </div>

                <div className="mb-7">
                  <FormLabel className="text-[15px] tracking-wide">
                    City <sup className="text-[13px]">*</sup>
                  </FormLabel>
                  <FormControl className="mt-2">
                    <Input
                      className={`${
                        errors.pickUpCity ? "border-red-500" : ""
                      }`}
                      {...register("pickUpCity")}
                      onChange={handleInputChange}
                      value={pickUpCity}
                    />
                  </FormControl>
                  <FormMessage />
                </div>

                <div className="mb-7">
                  <FormLabel className="text-[15px] tracking-wide">
                    Country <sup className="text-[13px]">*</sup>
                  </FormLabel>
                  <FormControl className="mt-2">
                    <Input
                      className={`${
                        errors.pickUpCountry ? "border-red-500" : ""
                      }`}
                      {...register("pickUpCountry")}
                      onChange={handleInputChange}
                      value={pickUpCountry}
                    />
                  </FormControl>
                  <FormMessage />
                </div>

                <div className="mb-7">
                  <FormLabel className="text-[15px] tracking-wide">
                    Working Employee Name <sup className="text-[13px]">*</sup>
                  </FormLabel>
                  <FormControl className="mt-2">
                    <Input
                      className={`${
                        errors.pickUpEmployeeName ? "border-red-500" : ""
                      }`}
                      {...register("pickUpEmployeeName")}
                      onChange={handleInputChange}
                      value={pickUpEmployeeName}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>

              <div className="pl-5">
                <h2 className="text-xl font-semibold mb-4">Drop-Off</h2>

                <div className="mb-7">
                  <FormLabel className="text-[15px] tracking-wide">
                    Date <sup className="text-[13px]">*</sup>
                  </FormLabel>
                  <FormControl className="mt-2">
                    <DatePicker date={dropDate} setDate={setDropDate} className="py-6 mt-2" />
                  </FormControl>
                  <FormMessage />
                </div>

                <div className="mb-7">
                  <FormLabel className="text-[15px] tracking-wide">
                    Pickup time* <sup className="text-[13px]">*</sup>
                  </FormLabel>
                  <FormControl className="mt-2">
                    <Input
                      className={`${
                        errors.dropOffPickUpTime ? "border-red-500" : ""
                      }`}
                      {...register("dropOffPickUpTime")}
                      onChange={handleInputChange}
                      value={dropOffPickUpTime}
                    />
                  </FormControl>
                  <FormMessage />
                </div>

                <div className="mb-7">
                  <FormLabel className="text-[15px] tracking-wide">
                    Name / Institution <sup className="text-[13px]">*</sup>
                  </FormLabel>
                  <FormControl className="mt-2">
                    <Input
                      className={`${
                        errors.dropOffName ? "border-red-500" : ""
                      }`}
                      {...register("dropOffName")}
                      onChange={handleInputChange}
                      value={dropOffName}
                    />
                  </FormControl>
                  <FormMessage />
                </div>

                <div className="mb-7">
                  <FormLabel className="text-[15px] tracking-wide">
                    Address <sup className="text-[13px]">*</sup>
                  </FormLabel>
                  <FormControl className="mt-2">
                    <Input
                      className={`${
                        errors.dropOffAddress ? "border-red-500" : ""
                      }`}
                      {...register("dropOffAddress")}
                      onChange={handleInputChange}
                      value={dropOffAddress}
                    />
                  </FormControl>
                  <FormMessage />
                </div>

                <div className="mb-7">
                  <FormLabel className="text-[15px] tracking-wide">
                    City <sup className="text-[13px]">*</sup>
                  </FormLabel>
                  <FormControl className="mt-2">
                    <Input
                      className={`${
                        errors.dropOffCity ? "border-red-500" : ""
                      }`}
                      {...register("dropOffCity")}
                      onChange={handleInputChange}
                      value={dropOffCity}
                    />
                  </FormControl>
                  <FormMessage />
                </div>

                <div className="mb-7">
                  <FormLabel className="text-[15px] tracking-wide">
                    Country <sup className="text-[13px]">*</sup>
                  </FormLabel>
                  <FormControl className="mt-2">
                    <Input
                      className={`${
                        errors.dropOffCountry ? "border-red-500" : ""
                      }`}
                      {...register("dropOffCountry")}
                      onChange={handleInputChange}
                      value={dropOffCountry}
                    />
                  </FormControl>
                  <FormMessage />
                </div>

                <div className="mb-7">
                  <FormLabel className="text-[15px] tracking-wide">
                    Phone
                  </FormLabel>
                  <FormControl className="mt-2">
                    <Input
                      className={`${
                        errors.dropOffPhone ? "border-red-500" : ""
                      }`}
                      {...register("dropOffPhone")}
                      onChange={handleInputChange}
                      value={dropOffPhone}
                    />
                  </FormControl>
                  <FormMessage />
                </div>

                <h2 className="text-xl font-semibold mt-8 mb-4">
                  Return Journey
                </h2>

                <div className="mb-7">
                  <FormLabel className="text-[15px] tracking-wide">
                    Date <sup className="text-[13px]">*</sup>
                  </FormLabel>
                  <FormControl className="mt-2">
                    <DatePicker date={returnDate} setDate={setReturnDate} className="py-6 mt-2" />
                  </FormControl>
                  <FormMessage />
                </div>

                <div className="mb-7">
                  <FormLabel className="text-[15px] tracking-wide">
                    Today
                  </FormLabel>
                  <FormControl className="mt-2">
                    <AppSelect
                      items={["1 day letter", "2 day letter", "3 day letter"]}
                      placeholder="1 day letter"
                      {...register("today")}
                      onChange={handleInputChange}
                      value={returnDayLetter}
                    />
                  </FormControl>
                  <FormMessage />
                </div>

                <div className="mb-7">
                  <FormLabel className="text-[15px] tracking-wide">
                    Approx. Time
                  </FormLabel>
                  <FormControl className="mt-2">
                    <AppSelect
                      items={timeOptions}
                      placeholder="00:00"
                      isTime={true}
                      {...register("time")}
                      onChange={handleInputChange}
                      value={returnApproxTime}
                    />
                  </FormControl>
                  <FormMessage />
                </div>

                <div className="mb-7">
                  <FormLabel className="text-[15px] tracking-wide">
                    Floor/Department
                  </FormLabel>
                  <FormControl className="mt-2">
                    <Input
                      className={`${errors.floor ? "border-red-500" : ""}`}
                      {...register("returnFloor")}
                      onChange={handleInputChange}
                      value={returnFloor}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </div>
            <BackAndNextBtn
              isFillForm={true}
              handleGoPrev={() => handleFormChange("patientDetails")}
              handleGoNext={() => handleFormChange("billingDetails")}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DestinationDetails;
