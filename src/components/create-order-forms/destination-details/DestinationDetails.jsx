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
import toast from "react-hot-toast";
import moment from "moment";

const DestinationDetails = ({
  handleFormChange,
  setDestinationProgress,
  createOrderData,
  setCreateOrderData,
  returnDate,
  setReturnDate,
  dropDate,
  setDropDate,
  destinationProgress,
}) => {
  const {
    destinationDetailsData: {
      pick_up_name = "",
      pick_up_street = "",
      pick_up_postal_code,
      pick_up_city = "",
      pick_up_country = "",
      pick_up_employee_name = "",
      drop_off_pick_up_time = "",
      drop_off_name = "",
      drop_off_street,
      drop_off_postal_code,
      drop_off_city = "",
      drop_off_country = "",
      drop_off_phone = "",
      return_approx_time = "",
      return_floor = "",
    } = {},
  } = createOrderData;

  function timeStringToMinutes(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  }

  const handleNext = (e) => {
    e.preventDefault();
    const dropDateFormatted = moment(dropDate).format("YYYY-MM-DD");
    const returnDateFormatted = moment(returnDate).format("YYYY-MM-DD");
    if (dropDateFormatted === returnDateFormatted) {
      const dropOffMinutes = timeStringToMinutes(drop_off_pick_up_time);
      const returnMinutes = timeStringToMinutes(return_approx_time);

      if (returnMinutes <= dropOffMinutes) {
        toast(
          "Return time must be greater than drop-off time if the date is the same.",
          {
            icon: "⚠️",
          }
        );
        return;
      }
    }

    handleFormChange("billingDetails");
  };

  const form_schema = z.object({
    pick_up_name: z.string().min(1, "Name is required"),
    pick_up_street: z.string().min(1, "Street is required"),
    pick_up_postal_code: z.number().min(1, "Postal is required"),
    pick_up_city: z.string().min(1, "City is required"),
    pick_up_country: z.string().min(1, "Country is required"),
    pick_up_employee_name: z
      .string()
      .min(1, "Working Employee Name is required"),

    drop_off_date: z.string().min(1, "Date is required"),
    drop_off_pick_up_time: z.string().min(1, "Pick-Up Time is required"),
    drop_off_name: z.string().min(1, "Name is required"),
    drop_off_street: z.string().min(1, "Drop of street is required"),
    drop_off_postal_code: z.number().min(1, "Drop of postal code is required"),
    drop_off_city: z.string().min(1, "City is required"),
    drop_off_country: z.string().min(1, "Country is required"),
    drop_off_phone: z.string().min(1, "Phone is required"),

    return_date: z.string().min(1, "Date is required"),
    return_day_letter: z.string().min(1, "This field is required"),
    return_approx_time: z.string().min(1, "Approx. Time is required"),
    return_floor: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(form_schema),
    defaultValues: {
      pick_up_name,
      pick_up_street,
      pick_up_postal_code,
      pick_up_city,
      pick_up_country,
      pick_up_employee_name,
      dropDate,
      drop_off_pick_up_time,
      drop_off_name,
      drop_off_street,
      drop_off_postal_code,
      drop_off_city,
      drop_off_country,
      drop_off_phone,
      returnDate,
      return_approx_time,
      return_floor,
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
        [name]: name.includes("postal_code") ? Number(value) : value,
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
    pick_up_name,
    pick_up_street,
    pick_up_postal_code,
    pick_up_city,
    pick_up_country,
    pick_up_employee_name,
    drop_off_pick_up_time,
    drop_off_name,
    drop_off_street,
    drop_off_postal_code,
    drop_off_city,
    drop_off_country,
    drop_off_phone,
    dropDate,
  ];

  const fieldsFilledRecurring = [
    pick_up_name,
    pick_up_street,
    pick_up_postal_code,
    pick_up_city,
    pick_up_country,
    pick_up_employee_name,
    drop_off_name,
    drop_off_street,
    drop_off_postal_code,
    drop_off_city,
    drop_off_country,
    drop_off_phone,
  ];
  useEffect(() => {
    if (
      createOrderData?.transportationData?.type_of_transport !== "recurring"
    ) {
      setDestinationProgress(calculateFormProgress(fieldsFilled));
    } else {
      setDestinationProgress(calculateFormProgress(fieldsFilledRecurring));
    }
  }, [...fieldsFilled]);

  return (
    <Card className="w-[70%] px-5 py-5">
      <CardHeader>
        <CardTitle className="title">Destination Details</CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form>
            <div className="grid grid-cols-2 gap-5">
              <div className="pr-5">
                <h6 className="text-xl font-semibold mb-4">Pick-Up</h6>

                {/* Pick-Up Name */}
                <FormField
                  control={form.control}
                  name="pick_up_name"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2 font-normal">
                        Name / Institution <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pick_up_name ? "border-red-500" : ""
                          }
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

                {/* Pick-Up Street */}
                <FormField
                  control={form.control}
                  name="pick_up_street"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2 font-normal">
                        Street <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pick_up_street ? "border-red-500" : ""
                          }
                          placeholder="Type your street"
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
                {/* Pick-Up Postal Code */}
                <FormField
                  control={form.control}
                  name="pick_up_postal_code"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2 font-normal">
                        Postal Code <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pick_up_postal_code ? "border-red-500" : ""
                          }
                          placeholder="Type your postal code"
                          {...field}
                          type="number"
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
                  name="pick_up_city"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2 font-normal">
                        City <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pick_up_city ? "border-red-500" : ""
                          }
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
                  name="pick_up_country"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2 font-normal">
                        Country <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pick_up_country ? "border-red-500" : ""
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
                  name="pick_up_employee_name"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2 font-normal">
                        Working Employee Name{" "}
                        <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pick_up_employee_name ? "border-red-500" : ""
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
                <h6 className="text-xl font-semibold mb-4">Drop-Off</h6>

                {/* Drop-Off Date */}
                {createOrderData?.transportationData?.type_of_transport !==
                  "recurring" && (
                  <FormField
                    control={form.control}
                    name="drop_off_date"
                    render={({ field }) => (
                      <FormItem className="mb-7">
                        <FormLabel className="mb-2 font-normal">
                          Drop-Off Date <sup className="text-[13px]">*</sup>
                        </FormLabel>
                        <FormControl>
                          <DatePicker date={dropDate} setDate={setDropDate} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Drop-Off Pickup Time */}
                {createOrderData?.transportationData?.type_of_transport !==
                  "recurring" && (
                  <FormField
                    control={form.control}
                    name="drop_off_pick_up_time"
                    render={({ field }) => (
                      <FormItem className="mb-7">
                        <FormLabel className="mb-2 font-normal">
                          Pickup Time <sup className="text-[13px]">*</sup>
                        </FormLabel>
                        <FormControl>
                          <AppSelect
                            items={timeOptions}
                            placeholder="00:00"
                            onValueChange={(value) =>
                              updateDestinationData(
                                "drop_off_pick_up_time",
                                value
                              )
                            }
                            value={drop_off_pick_up_time}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Drop-Off Name */}
                <FormField
                  control={form.control}
                  name="drop_off_name"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2 font-normal">
                        Name / Institution <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.drop_off_name ? "border-red-500" : ""
                          }
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

                {/* Drop-Off street */}
                <FormField
                  control={form.control}
                  name="drop_off_street"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2 font-normal">
                        Street <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.drop_off_street ? "border-red-500" : ""
                          }
                          placeholder="Type Street"
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

                {/* drop off Postal Code */}
                <FormField
                  control={form.control}
                  name="drop_off_postal_code"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2 font-normal">
                        Postal Code <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.drop_off_postal_code ? "border-red-500" : ""
                          }
                          type="number"
                          placeholder="Type your postal code"
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
                  name="drop_off_city"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2 font-normal">
                        City <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.drop_off_city ? "border-red-500" : ""
                          }
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
                  name="drop_off_country"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2 font-normal">
                        Country <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.drop_off_country ? "border-red-500" : ""
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
                  name="drop_off_phone"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2 font-normal">
                        Phone <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.drop_off_phone ? "border-red-500" : ""
                          }
                          type="number"
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
                {createOrderData?.transportationData?.type_of_transport !==
                  "recurring" && (
                  <div className="mt-10">
                    <h6 className="text-xl font-semibold mb-4">
                      Return Journey
                    </h6>
                    <div>
                      <FormField
                        control={form.control}
                        name="return_date"
                        render={({ field }) => (
                          <FormItem className="mb-7">
                            <FormLabel className="mb-2 font-normal">
                              Return Date
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
                        name="return_approx_time"
                        render={({ field }) => (
                          <FormItem className="mb-7">
                            <FormLabel className="mb-2 font-normal">
                              Approx. Time
                            </FormLabel>
                            <FormControl>
                              <AppSelect
                                items={timeOptions}
                                placeholder="00:00"
                                isTime={true}
                                onValueChange={(value) =>
                                  updateDestinationData(
                                    "return_approx_time",
                                    value
                                  )
                                }
                                value={return_approx_time}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="return_floor"
                        render={({ field }) => (
                          <FormItem className="mb-7">
                            <FormLabel className="mb-2 font-normal">
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
                )}
              </div>
            </div>
            <BackAndNextBtn
              isFillForm={true}
              isDisabled={destinationProgress < 100}
              handleGoPrev={() => handleFormChange("patientDetails")}
              handleGoNext={handleNext}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DestinationDetails;
