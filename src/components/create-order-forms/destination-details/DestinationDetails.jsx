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
import { calculateFormProgress } from "@/utils";
import toast from "react-hot-toast";
import moment from "moment";
import { t } from "i18next";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const DestinationDetails = ({
  handleFormChange,
  createOrderData,
  setCreateOrderData,
  destinationProgress,
}) => {
  const {
    destinationDetailsData: {
      drop_off_pick_up_time = "",
      return_approx_time = "",
      drop_off_pick_up_date,
      return_date,
    } = {},
  } = createOrderData;
  const checkTrueFalse =
    createOrderData?.transportationData?.type_of_transport ===
      "transfer_trip" ||
    createOrderData?.transportationData?.type_of_transport === "relocation";
  const [isReturnJourneyHide, setIsReturnJourneyHide] =
    useState(checkTrueFalse);
  function timeStringToMinutes(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  }

  const handleNext = (e) => {
    e.preventDefault();
    const dropDateFormatted = moment(drop_off_pick_up_date).format(
      "YYYY-MM-DD"
    );
    const returnDateFormatted = moment(return_date).format("YYYY-MM-DD");
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
    } else if (dropDateFormatted > returnDateFormatted) {
      toast("Return date must be greater than drop-off date.", {
        icon: "⚠️",
      });
      return;
    }

    if (return_approx_time && !return_date) {
      toast("Return date is required if return approx time is provided.", {
        icon: "⚠️",
      });
      return;
    } else if (return_date && !return_approx_time) {
      toast("Return approx time is required if return date is provided.", {
        icon: "⚠️",
      });
      return;
    }

    handleFormChange("billingDetails");
  };

  const form_schema = z.object({
    pick_up_name: z.string().min(1, t("name_is_required")),
    pick_up_address: z.string().min(1, t("street_is_required")),
    pick_up_postal_code: z.number().min(1, t("postal_is_required")),
    pick_up_city: z.string().min(1, t("city_is_required")),
    pickup_phone: z.string().min(1, t("phone_is_required")),
    pick_up_employee_name: z
      .string()
      .min(1, t("working_employee_name_is_required")),

    drop_off_date: z.string().min(1, t("date_is_required")),
    drop_off_pick_up_time: z.string().min(1, t("pick_up_time_is_required")),
    drop_off_name: z.string().min(1, t("name_is_required")),
    drop_off_address: z.string().min(1, t("drop_off_street_is_required")),
    drop_off_postal_code: z
      .number()
      .min(1, t("drop_off_postal_code_is_required")),
    drop_off_city: z.string().min(1, t("city_is_required")),

    return_date: z.string().min(1, t("date_is_required")),
    return_day_letter: z.string().min(1, t("this_field_is_required")),
    return_approx_time: z.string().min(1, t("approx_time_is_required")),
  });

  const form = useForm({
    resolver: zodResolver(form_schema),
    defaultValues: createOrderData.destinationDetailsData,
  });

  const { formState } = form;
  const { errors } = formState;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCreateOrderData((prev) => ({
      ...prev,
      destinationDetailsData: {
        ...prev.destinationDetailsData,
        [name]: name.includes("postal_code") ? Number(value) : value,
      },
    }));
  };
  const formatTimeInput = (value) => {
    const sanitizedValue = value.replace(/\D/g, "").slice(0, 4);

    let formattedValue = sanitizedValue;
    if (sanitizedValue.length > 2) {
      formattedValue =
        sanitizedValue.slice(0, 2) + ":" + sanitizedValue.slice(2);
    }

    if (sanitizedValue.length === 4) {
      const hours = Math.min(parseInt(sanitizedValue.slice(0, 2), 10), 23);
      const minutes = Math.min(parseInt(sanitizedValue.slice(2), 10), 59);
      formattedValue = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    }

    return formattedValue;
  };


  return (
    <Card className="lg:px-5 lg:py-5">
      <CardHeader>
        <CardTitle className="title">{t("destination_details")}</CardTitle>
      </CardHeader>
      <CardContent className="lg:px-10">
        <Form {...form}>
          <form>
            <div className="flex items-center justify-start gap-10">
              {/* Drop-Off Date */}
              {createOrderData?.transportationData?.type_of_transport !==
                "recurring" && (
                <FormField
                  control={form.control}
                  name="drop_off_date"
                  render={({ field }) => (
                    <FormItem className="mb-7 w-full">
                      <FormLabel className="mb-2 font-normal">
                        {t("dropoff_date")} <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <DatePicker
                          date={
                            drop_off_pick_up_date
                              ? new Date(drop_off_pick_up_date)
                              : null
                          }
                          setDate={(value) =>
                            setCreateOrderData((prev) => ({
                              ...prev,
                              destinationDetailsData: {
                                ...prev.destinationDetailsData,
                                drop_off_pick_up_date: value,
                              },
                            }))
                          }
                          disabled={{
                            before: new Date(),
                            after: new Date(return_date),
                          }}
                        />
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
                    <FormItem className="mb-7 w-full">
                      <FormLabel className="mb-2 font-normal">
                        {t("pickup_time")} <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          maxLength={5}
                          onChange={(e) => {
                            const rawValue = e.target.value;
                            const formattedValue = formatTimeInput(rawValue);
                            field.onChange(formattedValue);
                            handleInputChange(e);
                          }}
                          placeholder="HH:MM"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {createOrderData?.transportationData?.type_of_transport !==
                "recurring" && (
                <FormField
                  control={form.control}
                  name="pickup_appointment_time"
                  render={({ field }) => (
                    <FormItem className="mb-7 w-full">
                      <FormLabel className="mb-2 font-normal">
                        {t("appointment_time")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          maxLength={5}
                          onChange={(e) => {
                            const rawValue = e.target.value;
                            const formattedValue = formatTimeInput(rawValue);
                            field.onChange(formattedValue);
                            handleInputChange(e);
                          }}
                          placeholder="HH:MM"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="pr-5">
                <h6 className="text-xl font-semibold mb-4">{t("pickup")}</h6>
                {/* Pick-Up Name */}
                <FormField
                  control={form.control}
                  name="pick_up_name"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2 font-normal">
                        {t("name_institution")}{" "}
                        <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pick_up_name ? "border-red-500" : ""
                          }
                          placeholder={t("type_your_name_or_institution")}
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
                  name="pick_up_address"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2 font-normal">
                        {t("street")} <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pick_up_address ? "border-red-500" : ""
                          }
                          placeholder={t("type_your_street")}
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
                        {t("postal_code")} <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pick_up_postal_code ? "border-red-500" : ""
                          }
                          placeholder={t("type_your_postal_code")}
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
                        {t("city")} <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pick_up_city ? "border-red-500" : ""
                          }
                          placeholder={t("type_your_city")}
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
                        {t("country")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pick_up_country ? "border-red-500" : ""
                          }
                          placeholder={t("type_your_country")}
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
                        {t("working_employee_name")}{" "}
                        <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pick_up_employee_name ? "border-red-500" : ""
                          }
                          placeholder={t("type_the_employees_name")}
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

                {/* Pick-up Phone */}
                <FormField
                  control={form.control}
                  name="pickup_phone"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2 font-normal">
                        {t("dropoff_phone")}{" "}
                        <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pickup_phone ? "border-red-500" : ""
                          }
                          type="number"
                          placeholder={t("type_phone")}
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
                {checkTrueFalse && (
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="returnJourneyCheckbox"
                      checked={!isReturnJourneyHide}
                      onClick={() =>
                        setIsReturnJourneyHide(!isReturnJourneyHide)
                      }
                    />
                    <Label htmlFor="returnJourneyCheckbox">
                      Show Return Journey
                    </Label>
                  </div>
                )}

                {/* Return Journey Section */}
                {createOrderData?.transportationData?.type_of_transport !==
                  "recurring" && (
                  <div
                    className={`mt-10 ${isReturnJourneyHide ? "hidden" : ""}`}
                  >
                    <h6 className="text-xl font-semibold mb-4">
                      {t("return_journey")}
                    </h6>
                    <div>
                      <FormField
                        control={form.control}
                        name="return_date"
                        render={({ field }) => (
                          <FormItem className="mb-7">
                            <FormLabel className="mb-2 font-normal">
                              {t("return_date")}
                            </FormLabel>
                            <FormControl>
                              <DatePicker
                                date={return_date}
                                setDate={(value) =>
                                  setCreateOrderData((prev) => ({
                                    ...prev,
                                    destinationDetailsData: {
                                      ...prev.destinationDetailsData,
                                      return_date: value,
                                    },
                                  }))
                                }
                                disabled={{
                                  before: drop_off_pick_up_date
                                    ? new Date(drop_off_pick_up_date)
                                    : new Date(),
                                }}
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
                              {t("return_approx_time")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                maxLength={5}
                                onChange={(e) => {
                                  const rawValue = e.target.value;
                                  const formattedValue =
                                    formatTimeInput(rawValue);
                                  field.onChange(formattedValue);
                                  handleInputChange(e);
                                }}
                                placeholder="HH:MM"
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

              <div className="pl-5">
                <h6 className="text-xl font-semibold mb-4">{t("dropoff")}</h6>

                {/* Drop-Off Name */}
                <FormField
                  control={form.control}
                  name="drop_off_name"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2 font-normal">
                        {t("dropoff_name")} <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.drop_off_name ? "border-red-500" : ""
                          }
                          placeholder={t("type_name")}
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
                  name="drop_off_address"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2 font-normal">
                        {t("dropoff_street")}{" "}
                        <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.drop_off_address ? "border-red-500" : ""
                          }
                          placeholder={t("type_street")}
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
                        {t("dropoff_postal_code")}{" "}
                        <sup className="text-[13px]">*</sup>
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
                        {t("dropoff_city")} <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.drop_off_city ? "border-red-500" : ""
                          }
                          placeholder={t("type_city")}
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
                        {t("dropoff_country")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.drop_off_country ? "border-red-500" : ""
                          }
                          placeholder={t("type_country")}
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
                        {t("dropoff_phone")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.drop_off_phone ? "border-red-500" : ""
                          }
                          type="number"
                          placeholder={t("type_phone")}
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
