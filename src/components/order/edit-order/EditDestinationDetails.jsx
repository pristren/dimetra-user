/* eslint-disable react/prop-types */
import AppSelect from "@/components/common/AppSelect";
import { timeOptions } from "@/components/create-order-forms/helpers";
import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/DatePicker";
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EditDestinationDetails = ({
  editOrderData,
  setEditOrderData,
  dropDate,
  setDropDate,
  returnDate,
  setReturnDate,
}) => {
  const {
    destinationDetailsData: {
      pick_up_name = "",
      pick_up_address = "",
      pick_up_city = "",
      pick_up_country = "",
      pick_up_employee_name = "",
      drop_off_pick_up_time = "",
      drop_off_pick_up_date = "",
      drop_off_name = "",
      drop_off_address = "",
      drop_off_city = "",
      drop_off_country = "",
      drop_off_phone = "",
      return_day_letter = "",
      return_approx_time = "",
      return_floor = "",
    } = {},
  } = editOrderData;
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
    drop_off_pick_up_date: z.string().min(1, "Pick-Up Date is required"),
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
      drop_off_pick_up_date,
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
    setEditOrderData((prev) => ({
      ...prev,
      destinationDetailsData: {
        ...prev.destinationDetailsData,
        [name]: value,
      },
    }));
  };
  useEffect(() => {
    form.reset(editOrderData.destinationDetailsData);
  }, [editOrderData.destinationDetailsData, form]);
  const updateDestinationData = (key, value) => {
    setEditOrderData((prev) => ({
      ...prev,
      destinationDetailsData: {
        ...prev.destinationDetailsData,
        [key]: value,
      },
    }));
  };
  return (
    <Card className="p-6 border-none rounded-none">
      <h4 className="px-3">Destination Details</h4>
      <CardContent className="px-3 mt-4">
        <Form {...form}>
          <form>
            <div className="grid grid-cols-3 gap-5">
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
                          className={
                            errors.pick_up_address ? "border-red-500" : ""
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
                  name="pick_up_city"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
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
                      <FormLabel className="mb-2">
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
                      <FormLabel className="mb-2">
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

              <div className="pr-5">
                <h2 className="text-xl font-semibold mb-4">Drop-Off</h2>

                {/* Drop-Off Date */}
                <FormField
                  control={form.control}
                  name="drop_off_pick_up_date"
                  render={() => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
                        Drop-Off Date <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <DatePicker
                          mode="single"
                          date={dropDate}
                          setDate={setDropDate}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Drop-Off Pickup Time */}
                {console.log(drop_off_pick_up_time)}
                <FormField
                  control={form.control}
                  name="drop_off_pick_up_time"
                  render={() => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
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
                          isTimeSelected={true}
                          value={drop_off_pick_up_time}
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
                          className={
                            errors.drop_off_address ? "border-red-500" : ""
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
                  name="drop_off_city"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
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
                      <FormLabel className="mb-2">
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
                      <FormLabel className="mb-2">
                        Phone <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.drop_off_phone ? "border-red-500" : ""
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
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Return Journey</h2>
                <div>
                  <FormField
                    control={form.control}
                    name="return_date"
                    render={() => (
                      <FormItem className="mb-7">
                        <FormLabel className="mb-2">Return Date</FormLabel>
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
                    render={() => (
                      <FormItem className="mb-7">
                        <FormLabel className="mb-2">Approx. Time</FormLabel>
                        <FormControl>
                          <AppSelect
                            items={timeOptions}
                            placeholder="00:00"
                            isTime={true}
                            onValueChange={(value) =>
                              updateDestinationData("return_approx_time", value)
                            }
                            value={return_approx_time}
                            isTimeSelected={true}
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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditDestinationDetails;
