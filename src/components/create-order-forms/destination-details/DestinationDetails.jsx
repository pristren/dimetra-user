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
import { drop } from "lodash";

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
      pick_up_name = "",
      pick_up_address = "",
      pick_up_city = "",
      pick_up_country = "",
      pick_up_employee_name = "",
      drop_off_pick_up_time = "",
      drop_off_name = "",
      drop_off_address = "",
      drop_off_city = "",
      drop_off_country = "",
      drop_off_phone = "",
      return_day_letter = "",
      return_approx_time = "",
      return_floor = "",
    } = {},
  } = createOrderData;

  const form_schema = z.object({
    pick_up_name: z.string().min(1, "Name is required"),
    pick_up_address: z.string().min(1, "Address is required"),
    pick_up_city: z.string().min(1, "City is required"),
    pick_up_country: z.string().min(1, "Country is required"),
    pick_up_employee_name: z
      .string()
      .min(1, "Working Employee Name is required"),

    drop_off_date: z.string().min(1, "Date is required"),
    drop_off_pick_up_time: z.string().min(1, "Pick-Up Time is required"),
    drop_off_name: z.string().min(1, "Name is required"),
    drop_off_address: z.string().min(1, "Address is required"),
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
      pick_up_address,
      pick_up_city,
      pick_up_country,
      pick_up_employee_name,
      dropDate,
      drop_off_pick_up_time,
      drop_off_name,
      drop_off_address,
      drop_off_city,
      drop_off_country,
      drop_off_phone,
      returnDate,
      return_day_letter,
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
    pick_up_name,
    pick_up_address,
    pick_up_city,
    pick_up_country,
    pick_up_employee_name,
    drop_off_pick_up_time,
    drop_off_name,
    drop_off_address,
    drop_off_city,
    drop_off_country,
    drop_off_phone,
    drop,
    returnDate,
    return_floor,
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
      name="pick_up_name"
      render={({ field }) => (
        <FormItem className="mb-7">
          <FormLabel className="mb-2">
            Name / Institution <sup className="text-[13px]">*</sup>
          </FormLabel>
          <FormControl>
            <Input
              className={errors.pick_up_name ? "border-red-500" : ""}
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
      name="pick_up_address"
      render={({ field }) => (
        <FormItem className="mb-7">
          <FormLabel className="mb-2">
            Address <sup className="text-[13px]">*</sup>
          </FormLabel>
          <FormControl>
            <Input
              className={errors.pick_up_address ? "border-red-500" : ""}
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
      name="pick_up_city"
      render={({ field }) => (
        <FormItem className="mb-7">
          <FormLabel className="mb-2">
            City <sup className="text-[13px]">*</sup>
          </FormLabel>
          <FormControl>
            <Input
              className={errors.pick_up_city ? "border-red-500" : ""}
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
          <FormLabel className="mb-2">
            Country <sup className="text-[13px]">*</sup>
          </FormLabel>
          <FormControl>
            <Input
              className={errors.pick_up_country ? "border-red-500" : ""}
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
          <FormLabel className="mb-2">
            Working Employee Name{" "}
            <sup className="text-[13px]">*</sup>
          </FormLabel>
          <FormControl>
            <Input
              className={errors.pick_up_employee_name ? "border-red-500" : ""}
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
      name="drop_off_date"
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
      name="drop_off_pick_up_time"
      render={({ field }) => (
        <FormItem className="mb-7">
          <FormLabel className="mb-2">
            Pickup Time <sup className="text-[13px]">*</sup>
          </FormLabel>
          <FormControl>
            <Input
              className={errors.drop_off_pick_up_time ? "border-red-500" : ""}
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
      name="drop_off_name"
      render={({ field }) => (
        <FormItem className="mb-7">
          <FormLabel className="mb-2">
            Name / Institution <sup className="text-[13px]">*</sup>
          </FormLabel>
          <FormControl>
            <Input
              className={errors.drop_off_name ? "border-red-500" : ""}
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
      name="drop_off_address"
      render={({ field }) => (
        <FormItem className="mb-7">
          <FormLabel className="mb-2">
            Address <sup className="text-[13px]">*</sup>
          </FormLabel>
          <FormControl>
            <Input
              className={errors.drop_off_address ? "border-red-500" : ""}
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
      name="drop_off_city"
      render={({ field }) => (
        <FormItem className="mb-7">
          <FormLabel className="mb-2">
            City <sup className="text-[13px]">*</sup>
          </FormLabel>
          <FormControl>
            <Input
              className={errors.drop_off_city ? "border-red-500" : ""}
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
          <FormLabel className="mb-2">
            Country <sup className="text-[13px]">*</sup>
          </FormLabel>
          <FormControl>
            <Input
              className={errors.drop_off_country ? "border-red-500" : ""}
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
          <FormLabel className="mb-2">
            Phone <sup className="text-[13px]">*</sup>
          </FormLabel>
          <FormControl>
            <Input
              className={errors.drop_off_phone ? "border-red-500" : ""}
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
          name="return_date"
          render={({ field }) => (
            <FormItem className="mb-7">
              <FormLabel className="mb-2">
                Return Date <sup className="text-[13px]">*</sup>
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
          name="return_day_letter"
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
                    updateDestinationData("return_day_letter", value)
                  }
                  value={return_day_letter}
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
              <FormLabel className="mb-2">
                Approx. Time <sup className="text-[13px]">*</sup>
              </FormLabel>
              <FormControl>
                <AppSelect
                  items={timeOptions}
                  placeholder="00:00"
                  isTime={true}
                  onValueChange={(value) =>
                    updateDestinationData("return_approx_time", value)
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
