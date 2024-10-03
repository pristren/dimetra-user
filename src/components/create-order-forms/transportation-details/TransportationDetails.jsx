/* eslint-disable react/prop-types */
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AppSelect from "@/components/common/AppSelect";
import { DatePicker } from "@/components/ui/DatePicker";
import {
  transportModesOptions,
  transportOptions,
  transportWithOptions,
  weekdaysOptions,
  durationOptions,
  timeOptions,
} from "@/components/create-order-forms/helpers";
import { useEffect } from "react";
import { calculateFormProgress } from "@/utils";
import { t } from "i18next";
import { size } from "lodash";

const TransportationDetails = ({
  handleFormChange,
  createOrderData,
  setCreateOrderData,
  setTransportationProgress,
  transportationProgress,
}) => {
  const { transportationData, recurringData } = createOrderData;

  const form_schema = z.object({
    type_of_transport: z.string().min(1, "Transport type is required"),
    mode_of_transportation: z
      .array(z.string())
      .nonempty("At least one mode must be selected"),
    transport_with: z
      .array(z.string())
      .nonempty("At least one transport with option must be selected"),
    duration: z.string().min(1, "Duration is required"),
    start_date: z.date().nullable(),
    return_date: z.date().nullable(),
    multiple_week_days: z
      .array(z.string())
      .nonempty("Select at least one weekday"),
  });

  const form = useForm({
    resolver: zodResolver(form_schema),
    defaultValues: {
      type_of_transport: transportationData?.type_of_transport || "",
      mode_of_transportation: transportationData?.mode_of_transportation || [],
      transport_with: transportationData?.transport_with || [],
      duration: recurringData?.ends || "",
      start_date: recurringData?.start_date || null,
      return_date: recurringData?.return_date || null,
      multiple_week_days: recurringData?.multiple_week_days || [],
    },
  });

  const updateCreateOrderData = (key, value) => {
    setCreateOrderData((prev) => ({
      ...prev,
      transportationData: {
        ...prev.transportationData,
        [key]: value,
      },
    }));
  };

  const updateCreateRecurringOrderData = (key, value) => {
    setCreateOrderData((prev) => ({
      ...prev,
      recurringData: {
        ...prev.recurringData,
        [key]: value,
      },
    }));
  };

  const handleCheckBox = (type, value) => {
    setCreateOrderData((prev) => ({
      ...prev,
      transportationData: {
        ...prev.transportationData,
        [type]: prev.transportationData?.[type]?.includes(value)
          ? prev.transportationData[type].filter((item) => item !== value)
          : [...(prev.transportationData?.[type] || []), value],
      },
    }));
  };

  const calculateMonthlyOccurrences = (weekdays) => {
    return weekdays.length * 4;
  };

  const handleWeekdayChange = (option) => {
    const { value } = option;
    updateCreateRecurringOrderData(
      "multiple_week_days",
      recurringData?.multiple_week_days.includes(value)
        ? recurringData?.multiple_week_days.filter((day) => day !== value)
        : [...recurringData?.multiple_week_days, value]
    );
  };

  useEffect(() => {
    const fieldsFilled =
      transportationData?.type_of_transport === "recurring" &&
      recurringData?.recurring_type === "week"
        ? [
            transportationData?.type_of_transport,
            transportationData?.mode_of_transportation.length > 0,
            transportationData?.transport_with?.length > 0,
            recurringData?.multiple_week_days?.length > 0,
            recurringData?.start_date,
            recurringData?.ends,
          ]
        : transportationData?.type_of_transport === "recurring" &&
          recurringData?.recurring_type === "free"
        ? [
            transportationData?.type_of_transport,
            transportationData?.mode_of_transportation?.length > 0,
            transportationData?.transport_with?.length > 0,
            recurringData?.free_dates?.length > 0,
          ]
        : [
            transportationData?.type_of_transport,
            transportationData?.mode_of_transportation?.length > 0,
            transportationData?.transport_with.length > 0,
          ];
    setTransportationProgress(calculateFormProgress(fieldsFilled));
  }, [transportationData]);

  const handleDateChange = (key, value) => {
    setCreateOrderData((prev) => ({
      ...prev,
      recurringData: {
        ...prev.recurringData,
        [key]: value,
      },
    }));
  };

  return (
    <Card className="lg:px-5 lg:py-5">
      <CardHeader>
        <CardTitle className="title">{t("transportation_details")}</CardTitle>
      </CardHeader>
      <CardContent className="lg:px-10">
        <Form {...form}>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="pr-5">
                <h6 className="mb-6">
                  {t("type_of_transport")}
                  <span className="highlight">({t("simple_selection")})</span>
                </h6>
                <FormField
                  control={form.control}
                  name="type_of_transport"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          value={transportationData?.type_of_transport}
                          onValueChange={(value) => {
                            field.onChange(value);
                            updateCreateOrderData("type_of_transport", value);
                          }}
                        >
                          {transportOptions.map((option) => (
                            <div
                              key={option.value}
                              className="flex items-center space-x-2 mb-2"
                            >
                              <RadioGroupItem
                                value={option.value}
                                id={option.value}
                              />
                              <Label
                                htmlFor={option.value}
                                className="font-normal text-[16px]"
                              >
                                {t(option.label)}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pr-5">
                <h6 className="mb-6">
                  {t("mode_of_transportation")}
                  <span className="highlight">({t("multiple_selection")})</span>
                </h6>
                {transportModesOptions.map((option) => (
                  <div key={option.value} className="flex items-center mb-4">
                    <Checkbox
                      id={option.value}
                      checked={transportationData.mode_of_transportation?.includes(
                        option.value
                      )}
                      onClick={() =>
                        handleCheckBox("mode_of_transportation", option.value)
                      }
                    />
                    <Label
                      className="font-normal text-[16px] ml-2"
                      htmlFor={option.value}
                    >
                      {t(option.label)}
                    </Label>
                  </div>
                ))}
              </div>

              <div>
                <h6 className="mb-6">
                  {t("transport_with")}
                  <span className="highlight">({t("multiple_selection")})</span>
                </h6>
                {transportWithOptions.map((option) => (
                  <div key={option.value} className="flex items-center mb-4">
                    <Checkbox
                      id={option.value}
                      checked={transportationData.transport_with?.includes(
                        option.value
                      )}
                      onClick={() =>
                        handleCheckBox("transport_with", option.value)
                      }
                    />
                    <Label
                      className="font-normal text-[16px] ml-2"
                      htmlFor={option.value}
                    >
                      {t(option.label)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            {transportationData?.type_of_transport === "recurring" && (
              <div>
                <h3 className="text-lg font-medium mb-3 mt-5">
                  {t("select_recurring_type")}:
                </h3>
                <AppSelect
                  items={[
                    { value: "week", label: "Week" },
                    { value: "free", label: "Free" },
                  ]}
                  value={recurringData?.recurring_type}
                  onValueChange={(val) =>
                    updateCreateRecurringOrderData("recurring_type", val?.value)
                  }
                  placeholder="Select a type"
                />

                {recurringData?.recurring_type === "week" ? (
                  <div className="">
                    <h3 className="text-lg font-medium mt-10 mb-5">
                      {t("select_start_date_and_time")}*:
                    </h3>
                    <div className="mb-5 flex w-max gap-4 items-center">
                      <DatePicker
                        date={recurringData?.start_date}
                        setDate={(value) =>
                          handleDateChange("start_date", value)
                        }
                        startMonth={new Date()}
                      />
                      <AppSelect
                        items={timeOptions}
                        placeholder="00:00"
                        isTime={true}
                        onValueChange={(val) =>
                          updateCreateRecurringOrderData(
                            "start_time",
                            val?.value
                          )
                        }
                        defaultValue={recurringData?.start_time}
                      />
                    </div>

                    <h3 className="text-lg font-medium mt-10 mb-5">
                      {t("select_return_date_time")}
                      <span className="highlight">({t("optional")})</span>:
                    </h3>
                    <div className="mb-5 flex w-max gap-4 items-center">
                      <DatePicker
                        date={recurringData?.return_date}
                        setDate={(value) =>
                          handleDateChange("return_date", value)
                        }
                      />
                      <AppSelect
                        items={timeOptions}
                        placeholder="00:00"
                        defaultValue={recurringData?.return_time}
                        isTime={true}
                        onValueChange={(val) =>
                          updateCreateRecurringOrderData(
                            "return_time",
                            val?.value
                          )
                        }
                      />
                    </div>

                    <h3 className="text-lg font-medium mb-3 mt-5">
                      {t("select_weekdays")}
                      <span className="highlight">
                        ({t("multiple_selection")})
                      </span>
                      :
                    </h3>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      {weekdaysOptions.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center mb-2"
                        >
                          <Checkbox
                            id={option.value}
                            checked={recurringData?.multiple_week_days?.includes(
                              option.value
                            )}
                            onClick={() => handleWeekdayChange(option)}
                          />
                          <Label className="ml-2" htmlFor={option.value}>
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-lg font-medium mb-3 mt-5">
                      {t("ends")}:
                    </h3>
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => {
                                field.onChange(value);
                                updateCreateRecurringOrderData("ends", value);
                              }}
                              value={recurringData?.ends}
                            >
                              {durationOptions.map((option) => (
                                <div
                                  key={option.value}
                                  className="flex items-center space-x-2 mb-2"
                                >
                                  <RadioGroupItem
                                    value={option.value}
                                    id={option.value}
                                  />
                                  <Label htmlFor={option.value}>
                                    {option.label}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <h2 className="text-lg font-semibold mt-5">
                      {t("summary_monthly_on_day")}
                      {calculateMonthlyOccurrences(
                        recurringData?.multiple_week_days
                      )}
                    </h2>
                  </div>
                ) : recurringData?.recurring_type === "free" ? (
                  <div className="">
                    <div className="mt-5 mb-5 ">
                      <h3 className="text-lg font-medium mt-10 mb-5">
                        {t("select_start_date_and_time")}* (max 60):
                      </h3>
                      <div className="flex w-max gap-4 items-center">
                        <DatePicker
                          mode="multiple"
                          date={recurringData?.free_dates}
                          setDate={(value) =>
                            handleDateChange("free_dates", value)
                          }
                        />
                        <AppSelect
                          items={timeOptions}
                          placeholder="Select a time"
                          isTime={true}
                          onValueChange={(val) =>
                            updateCreateRecurringOrderData(
                              "free_dates_start_time",
                              val?.value
                            )
                          }
                          defaultValue={recurringData?.free_dates_start_time}
                        />
                      </div>
                    </div>
                    <div className="mt-5 mb-5 ">
                      <h3 className="text-lg font-medium mt-10 mb-5">
                        {t("select_return_date_and_time")}:
                      </h3>
                      <div className="flex w-max gap-4 items-center">
                        <DatePicker
                          mode="multiple"
                          date={recurringData?.free_dates}
                          setDate={(value) =>
                            handleDateChange("free_dates", value)
                          }
                          disabled
                        />
                        <AppSelect
                          items={timeOptions}
                          placeholder="Select a time"
                          isTime={true}
                          onValueChange={(val) =>
                            updateCreateRecurringOrderData(
                              "free_dates_return_time",
                              val?.value
                            )
                          }
                          defaultValue={recurringData?.free_dates_return_time}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            <div className="flex items-center justify-center w-full">
              <Button
                type="submit"
                disabled={transportationProgress < 100}
                className="mt-5 bg-secondary text-black hover:text-white px-12"
                onClick={() => handleFormChange("patientDetails")}
              >
                {t("next")}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TransportationDetails;
