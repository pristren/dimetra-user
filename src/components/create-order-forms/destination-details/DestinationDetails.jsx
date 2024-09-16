/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { DatePicker } from "@/components/ui/DatePicker";
import AppSelect from "@/components/common/AppSelect";
import { calculateFormProgress } from "@/utils";
import { timeOptions } from "@/components/create-order-forms/helpers";

const DestinationDetails = ({
  handleFormChange,
  setDestinationProgress,
  createOrderData,
  setCreateOrderData,
  returnDate,
  setReturnDate,
  dropDate,
  setDropDate,
}) => {
  const {
    destinationDetailsData: {
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
    } = {},
  } = createOrderData;

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
    returnDayLetter: z.string().min(1, "This field is required"),
    returnApproxTime: z.string().min(1, "Approx. Time is required"),
    returnFloor: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickUpName,
      pickUpAddress,
      pickUpCity,
      pickUpCountry,
      pickUpEmployeeName,
      dropOffDate,
      dropOffPickUpTime,
      dropOffName,
      dropOffAddress,
      dropOffCity,
      dropOffCountry,
      dropOffPhone,
      returnDate,
      returnDayLetter,
      returnApproxTime,
      returnFloor,
    },
  });

  const { formState } = form;
  const { errors } = formState;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateOrderData((prev) => ({
      ...prev,
      destinationDetailsData: {
        ...prev.destinationDetailsData,
        [name]: value,
      },
    }));
  };

  const updateDestinationData = (key, value) => {
    setCreateOrderData((prev) => ({
      ...prev,
      destinationDetailsData: {
        ...prev.destinationDetailsData,
        [key]: value,
      },
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
    returnDate,
    returnFloor,
    returnDate,
  ];

  useEffect(() => {
    setDestinationProgress(calculateFormProgress(fieldsFilled));
  }, [...fieldsFilled]);

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

                {/* Pick-Up Name */}
                <FormField
                  control={form.control}
                  name="pickUpName"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
                        Name / Institution <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={errors.pickUpName ? "border-red-500" : ""}
                          placeholder="Type your name or institution"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Pick-Up Address */}
                <FormField
                  control={form.control}
                  name="pickUpAddress"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
                        Address <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pickUpAddress ? "border-red-500" : ""
                          }
                          placeholder="Type your address"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Pick-Up City */}
                <FormField
                  control={form.control}
                  name="pickUpCity"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
                        City <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={errors.pickUpCity ? "border-red-500" : ""}
                          placeholder="Type your city"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Pick-Up Country */}
                <FormField
                  control={form.control}
                  name="pickUpCountry"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
                        Country <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pickUpCountry ? "border-red-500" : ""
                          }
                          placeholder="Type your country"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Pick-Up Employee Name */}
                <FormField
                  control={form.control}
                  name="pickUpEmployeeName"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
                        Working Employee Name{" "}
                        <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pickUpEmployeeName ? "border-red-500" : ""
                          }
                          placeholder="Type the employee's name"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pl-5">
                <h2 className="text-xl font-semibold mb-4">Drop-Off</h2>

                {/* Drop-Off Date */}
                <FormField
                  control={form.control}
                  name="dropOffDate"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
                        Drop-Off Date <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <DatePicker date={dropDate} setDate={setDropDate} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Drop-Off Pickup Time */}
                <FormField
                  control={form.control}
                  name="dropOffPickUpTime"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
                        Pickup time <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.dropOffPickUpTime ? "border-red-500" : ""
                          }
                          placeholder="Type pickup time"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Drop-Off Name */}
                <FormField
                  control={form.control}
                  name="dropOffName"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
                        Name / Institution <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={errors.dropOffName ? "border-red-500" : ""}
                          placeholder="Type name"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Drop-Off Address */}
                <FormField
                  control={form.control}
                  name="dropOffAddress"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
                        Address <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.dropOffAddress ? "border-red-500" : ""
                          }
                          placeholder="Type address"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Drop-Off City */}
                <FormField
                  control={form.control}
                  name="dropOffCity"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
                        City <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={errors.dropOffCity ? "border-red-500" : ""}
                          placeholder="Type city"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Drop-Off Country */}
                <FormField
                  control={form.control}
                  name="dropOffCountry"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
                        Country <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.dropOffCountry ? "border-red-500" : ""
                          }
                          placeholder="Type country"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Drop-Off Phone */}
                <FormField
                  control={form.control}
                  name="dropOffPhone"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
                        Phone <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.dropOffPhone ? "border-red-500" : ""
                          }
                          placeholder="Type phone"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleInputChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Return Journey Section */}
                <div className="mt-10">
                  <h2 className="text-xl font-semibold mb-4">Return Journey</h2>
                  <div>
                    <FormField
                      control={form.control}
                      name="returnDate"
                      render={({ field }) => (
                        <FormItem className="mb-7">
                          <FormLabel className="mb-2">
                            Return Date <sup className="text-[13px]">*</sup>
                          </FormLabel>
                          <FormControl>
                            <DatePicker
                              date={returnDate}
                              setDate={setReturnDate}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="returnDayLetter"
                      render={({ field }) => (
                        <FormItem className="mb-7">
                          <FormLabel className="mb-2">
                            Day Letter <sup className="text-[13px]">*</sup>
                          </FormLabel>
                          <FormControl>
                            <AppSelect
                              items={[
                                "1 day letter",
                                "2 day letter",
                                "3 day letter",
                              ]}
                              placeholder="1 day letter"
                              onValueChange={(value) =>
                                updateDestinationData("returnDayLetter", value)
                              }
                              value={returnDayLetter}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="returnApproxTime"
                      render={({ field }) => (
                        <FormItem className="mb-7">
                          <FormLabel className="mb-2">
                            Approx. Time <sup className="text-[13px]">*</sup>
                          </FormLabel>
                          <FormControl>
                            <AppSelect
                              items={timeOptions}
                              placeholder="00:00"
                              isTime={true}
                              onValueChange={(value) =>
                                updateDestinationData("returnApproxTime", value)
                              }
                              value={returnApproxTime}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="returnFloor"
                      render={({ field }) => (
                        <FormItem className="mb-7">
                          <FormLabel className="mb-2">
                            Floor / Department
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Floor number (optional)"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleInputChange(e);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
