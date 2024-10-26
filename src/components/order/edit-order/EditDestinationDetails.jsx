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
import { t } from "i18next";
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
      pick_up_postal_code = "",
      pick_up_city = "",
      pick_up_country = "",
      pick_up_employee_name = "",
      drop_off_pick_up_time = "",
      drop_off_pick_up_date = "",
      drop_off_name = "",
      drop_off_address = "",
      drop_off_postal_code = "",
      drop_off_city = "",
      drop_off_country = "",
      drop_off_phone = "",
      return_day_letter = "",
      return_approx_time = "",
    } = {},
  } = editOrderData;
  const form_schema = z.object({
    pick_up_name: z.string().min(1, t("name_required")),
    pick_up_address: z.string().min(1, t("address_required")),
    pick_up_postal_code: z.number().min(1, t("postal_code_required")),
    pick_up_city: z.string().min(1, t("city_required")),
    pick_up_country: z.string().min(1, t("country_required")),
    pick_up_employee_name: z
      .string()
      .min(1, t("employee_name_required")),

    drop_off_date: z.string().min(1, t("drop_off_date_required")),
    drop_off_pick_up_time: z.string().min(1, t("pick_up_time_required")),
    drop_off_pick_up_date: z.string().min(1, t("pick_up_date_required")),
    drop_off_name: z.string().min(1, t("drop_off_name_required")),
    drop_off_address: z.string().min(1, t("drop_off_address_required")),
    drop_off_city: z.string().min(1, t("drop_off_city_required")),
    drop_off_country: z.string().min(1, t("drop_off_country_required")),
    drop_off_phone: z.string().min(1, t("drop_off_phone_required")),
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
      dropDate,
      drop_off_pick_up_time,
      drop_off_pick_up_date,
      drop_off_name,
      drop_off_address,
      drop_off_postal_code: Number(drop_off_postal_code), // Convert to number
      drop_off_city,
      drop_off_country,
      drop_off_phone,
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
                      <FormLabel className="mb-2">
                        {t("country")} <sup className="text-[13px]">*</sup>
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
                          className="cursor-pointer"
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
                      <FormLabel className="mb-2">
                        {t("phone")} <sup className="text-[13px]">*</sup>
                      </FormLabel>
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
