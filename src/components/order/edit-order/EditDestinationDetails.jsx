/* eslint-disable react/prop-types */
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
import { formatTimeInput } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTimescape } from "timescape/react";
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
      pick_up_postal_code = 0,
      pick_up_city = "",
      pick_up_country = "",
      pick_up_employee_name = "",
      pickup_phone = "",
      drop_off_pick_up_time = "",
      drop_off_pick_up_date = "",
      drop_off_name = "",
      drop_off_address = "",
      drop_off_postal_code = "",
      drop_off_city = "",
      drop_off_country = "",
      return_day_letter = "",
      return_approx_time = "",
    } = {},
  } = editOrderData;
  const form_schema = z.object({
    pick_up_name: z.string().min(1, t("name_required")),
    pick_up_address: z.string().min(1, t("address_required")),
    pick_up_postal_code: z.number().min(1, t("postal_code_required")),
    pick_up_city: z.string().min(1, t("city_required")),
    pick_up_employee_name: z.string().min(1, t("employee_name_required")),
    pickup_phone: z.string().min(1, t("pickup_phone")),

    drop_off_date: z.string().min(1, t("drop_off_date_required")),
    drop_off_pick_up_time: z.string().min(1, t("pick_up_time_required")),
    drop_off_pick_up_date: z.string().min(1, t("pick_up_date_required")),
    drop_off_name: z.string().min(1, t("drop_off_name_required")),
    drop_off_address: z.string().min(1, t("drop_off_address_required")),
    drop_off_city: z.string().min(1, t("drop_off_city_required")),
    drop_off_country: z.string().min(1, t("drop_off_country_required")),
    drop_off_postal_code: z.number().min(1, t("drop_off_postal_code_required")),
    return_date: z.string().min(1, t("return_date_required")),
    return_day_letter: z.string().min(1, t("day_letter_required")),
    return_approx_time: z.string().min(1, t("approx_time_required")),
  });

  const form = useForm({
    resolver: zodResolver(form_schema),
    defaultValues: {
      pick_up_name,
      pick_up_address,
      pick_up_postal_code: Number(pick_up_postal_code), // Convert to number
      pick_up_city,
      pick_up_country,
      pick_up_employee_name,
      pickup_phone,
      dropDate,
      drop_off_pick_up_time,
      drop_off_pick_up_date,
      drop_off_name,
      drop_off_address,
      drop_off_postal_code: Number(drop_off_postal_code), // Convert to number
      drop_off_city,
      drop_off_country,
      returnDate,
      return_day_letter,
      return_approx_time,
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
        [name]: name.includes("postal_code") ? Number(value) : value, // Convert postal codes to numbers
      },
    }));
  };

  useEffect(() => {
    form.reset(editOrderData.destinationDetailsData);
  }, [editOrderData.destinationDetailsData, form]);

  // Drop-off time
  const { getInputProps: getDropOffInputProps } = useTimescape({
    date: new Date(
      editOrderData?.destinationDetailsData?.drop_off_pick_up_time
    ),
    onChangeDate: (nextDate) =>
      formatTimeInput(
        nextDate,
        setEditOrderData,
        "destinationDetailsData",
        "drop_off_pick_up_time"
      ),
  });

  // Pickup time
  const { getInputProps: getPickupInputProps } = useTimescape({
    date: new Date(
      editOrderData?.destinationDetailsData?.pickup_appointment_time
    ),
    onChangeDate: (nextDate) =>
      formatTimeInput(
        nextDate,
        setEditOrderData,
        "destinationDetailsData",
        "pickup_appointment_time"
      ),
  });

  // Return approximate time, conditionally applied
  const { getInputProps: getReturnInputProps } = useTimescape({
    date: new Date(editOrderData?.destinationDetailsData?.return_approx_time),
    onChangeDate: (nextDate) => {
      formatTimeInput(
        nextDate,
        setEditOrderData,
        "destinationDetailsData",
        "return_approx_time"
      );
    },
  });

  return (
    <Card className="p-6 border-none rounded-none">
      <h4 className="px-3">{t("destination_details")}</h4>
      <CardContent className="px-3 mt-4">
        <Form {...form}>
          <form>
            <div className="grid grid-cols-3 gap-5">
              <div className="pr-5">
                <h2 className="text-xl font-semibold mb-4">{t("pick_up")}</h2>

                {/* Pick-Up Name */}
                <FormField
                  control={form.control}
                  name="pick_up_name"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
                        {t("name_institution")}{" "}
                        <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pick_up_name ? "border-red-500" : ""
                          }
                          placeholder={t("type_your_name_institution")}
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
                        {t("address")} <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pick_up_address ? "border-red-500" : ""
                          }
                          placeholder={t("type_your_address")}
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
                      <FormLabel className="mb-2">
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
                      <FormLabel className="mb-2">{t("country")}</FormLabel>
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
                      <FormLabel className="mb-2">
                        {t("working_employee_name")}{" "}
                        <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.pick_up_employee_name ? "border-red-500" : ""
                          }
                          placeholder={t("type_employee_name")}
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
                <h2 className="text-xl font-semibold mb-4">{t("drop_off")}</h2>

                {/* Drop-Off Date */}
                <FormField
                  control={form.control}
                  name="drop_off_pick_up_date"
                  render={() => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
                        {t("drop_off_date")}{" "}
                        <sup className="text-[13px]">*</sup>
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

                <FormField
                  control={form.control}
                  name="drop_off_pick_up_time"
                  render={() => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
                        {t("pickup_time")} <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <div className="timescape py-2 px-2 focus-within:outline-ring flex items-center gap-0.5 rounded-md bg-white cursor-pointer  focus-within:border-ring">
                          <Input
                            className="timescape-input !w-6"
                            {...getDropOffInputProps("hours")}
                            placeholder="hh"
                          />
                          <span className="separator">:</span>
                          <Input
                            className="timescape-input !w-6"
                            {...getDropOffInputProps("minutes")}
                            placeholder="mm"
                            steop={5}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pickup_appointment_time"
                  render={() => (
                    <FormItem className="mb-7 w-full">
                      <FormLabel className="mb-2 font-normal">
                        {t("appointment_time")}
                      </FormLabel>
                      <FormControl>
                        <div className="timescape py-2 px-2 focus-within:outline-ring flex items-center gap-0.5 rounded-md bg-white cursor-pointer  focus-within:border-ring">
                          <Input
                            className="timescape-input !w-6"
                            {...getPickupInputProps("hours")}
                            placeholder="hh"
                          />
                          <span className="separator">:</span>
                          <Input
                            className="timescape-input !w-6"
                            {...getPickupInputProps("minutes")}
                            placeholder="mm"
                            steop={5}
                          />
                        </div>
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
                        {t("name_institution")}{" "}
                        <sup className="text-[13px]">*</sup>
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

                {/* Drop-Off Address */}
                <FormField
                  control={form.control}
                  name="drop_off_address"
                  render={({ field }) => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
                        {t("address")} <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.drop_off_address ? "border-red-500" : ""
                          }
                          placeholder={t("type_address")}
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
                      <FormLabel className="mb-2">
                        {t("city")} <sup className="text-[13px]">*</sup>
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
                      <FormLabel className="mb-2">
                        {t("country")} <sup className="text-[13px]">*</sup>
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
                      <FormLabel className="mb-2">{t("phone")}</FormLabel>
                      <FormControl>
                        <Input
                          className={
                            errors.drop_off_phone ? "border-red-500" : ""
                          }
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
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  {t("return_journey")}
                </h2>
                <div>
                  <FormField
                    control={form.control}
                    name="return_date"
                    render={() => (
                      <FormItem className="mb-7">
                        <FormLabel className="mb-2">
                          {t("return_date")}
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
                    render={() => (
                      <FormItem className="mb-7">
                        <FormLabel className="mb-2">
                          {t("approx_time")}
                        </FormLabel>
                        <FormControl>
                          <div className="timescape py-2 px-2 focus-within:outline-ring flex items-center gap-0.5 rounded-md bg-white cursor-pointer  focus-within:border-ring">
                            <Input
                              className="timescape-input !w-6"
                              {...getReturnInputProps("hours")}
                              placeholder="hh"
                            />
                            <span className="separator">:</span>
                            <Input
                              className="timescape-input !w-6"
                              {...getReturnInputProps("minutes")}
                              placeholder="mm"
                              steop={5}
                            />
                          </div>
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
