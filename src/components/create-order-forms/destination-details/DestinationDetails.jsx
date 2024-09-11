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

const DestinationDetails = ({ handleFormChange, setDestinationProgress }) => {
  const [dropDate, setDropDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const formSchema = z.object({
    // Pick-Up fields
    pickUpName: z.string().min(1, "Name is required"),
    pickUpAddress: z.string().min(1, "Address is required"),
    pickUpCity: z.string().min(1, "City is required"),
    pickUpCountry: z.string().min(1, "Country is required"),
    pickUpEmployeeName: z.string().min(1, "Working Employee Name is required"),

    // Drop-Off fields
    dropOffDate: z.string().min(1, "Date is required"),
    dropOffPickUpTime: z.string().min(1, "Pick-Up Time is required"),
    dropOffName: z.string().min(1, "Name is required"),
    dropOffAddress: z.string().min(1, "Address is required"),
    dropOffCity: z.string().min(1, "City is required"),
    dropOffCountry: z.string().min(1, "Country is required"),
    dropOffPhone: z.string().min(1, "Phone is required"),

    // Return Journey fields
    returnDate: z.string().min(1, "Date is required"),
    today: z.string().min(1, "This field is required"),
    time: z.string().min(1, "Approx. Time is required"),
    floor: z.string().optional(), // Assuming floor is optional
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Pick-Up fields
      pickUpName: "",
      pickUpAddress: "",
      pickUpCity: "",
      pickUpCountry: "",
      pickUpEmployeeName: "",

      // Drop-Off fields
      dropOffDate: "",
      dropOffPickUpTime: "",
      dropOffName: "",
      dropOffAddress: "",
      dropOffCity: "",
      dropOffCountry: "",
      dropOffPhone: "",

      // Return Journey fields
      returnDate: "",
      today: "",
      time: "",
      floor: "",
    },
  });

  const timeOptions = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  const fieldsFilled = [
    form.watch("pickUpName"),
    form.watch("pickUpAddress"),
    form.watch("pickUpCity"),
    form.watch("pickUpCountry"),
    form.watch("pickUpEmployeeName"),
    form.watch("dropOffPickUpTime"),
    form.watch("dropOffName"),
    form.watch("dropOffAddress"),
    form.watch("dropOffCity"),
    form.watch("dropOffCountry"),
    form.watch("dropOffPhone"),
    dropDate,
    returnDate,
    form.watch("floor"),
  ];

  useEffect(() => {
    setDestinationProgress(calculateFormProgress(fieldsFilled));
  }, [...fieldsFilled]);

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <Card className="w-[65%] px-5 py-5">
      <CardHeader>
        <CardTitle>Destination Details</CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-5">
              <div className="pr-5">
                <h2 className="text-xl font-semibold mb-4">Pick-Up</h2>
                <FormField
                  control={form.control}
                  name="pickUpName"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Name / Institution <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.pickUpName
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Pre filled"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pickUpAddress"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Address <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.pickUpAddress
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Pre filled"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pickUpCity"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        City <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.pickUpCity
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Enter City Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pickUpCountry"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Country <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.pickUpCountry
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Enter Country "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pickUpEmployeeName"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Working Employee Name{" "}
                        <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.pickUpEmployeeName
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Type the working employee's name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pl-5">
                <h2 className="text-xl font-semibold mb-4">Drop-Off</h2>
                <FormField
                  control={form.control}
                  name="dropOffDate"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Date <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <DatePicker date={dropDate} setDate={setDropDate} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dropOffPickUpTime"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Abholzeit <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.dropOffPickUpTime
                              ? "border-red-500"
                              : ""
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dropOffName"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Name / Institution <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.dropOffName
                              ? "border-red-500"
                              : ""
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dropOffAddress"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Address <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.dropOffAddress
                              ? "border-red-500"
                              : ""
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dropOffCity"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        City <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.dropOffCity
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Enter City Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dropOffCountry"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Country <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.dropOffCountry
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Enter Country "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dropOffPhone"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.dropOffPhone
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Type the phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <h2 className="text-xl font-semibold mt-8 mb-4">
                  Return journey
                </h2>
                <FormField
                  control={form.control}
                  name="returnDate"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Date <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <DatePicker date={returnDate} setDate={setReturnDate} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="today"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>Today</FormLabel>
                      <FormControl>
                        <AppSelect
                          items={[
                            "1 day letter",
                            "2 day letter",
                            "3 day letter",
                          ]}
                          placeholder="1 day letter"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>Approx. Time</FormLabel>
                      <FormControl>
                        <AppSelect
                          items={timeOptions}
                          placeholder="00:00"
                          isTime={true}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="floor"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>Floor/Department</FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.floor ? "border-red-500" : ""
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <BackAndNextBtn
              isFillForm={true}
              back="patient"
              next="billing"
              handleFormChange={handleFormChange}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DestinationDetails;
