/* eslint-disable no-unsafe-optional-chaining */
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
} from "@/components/create-order-forms/helpers";
import { useEffect, useState } from "react";
import { calculateFormProgress, formatTimeInput } from "@/utils";
import { t } from "i18next";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { useTimescape } from "timescape/react";

const ReopenTransportationDetails = ({
  handleFormChange,
  reopenOrderData,
  setReopenOrderData,
  setTransportationProgress,
  transportationProgress,
}) => {
  const { transportationData, recurringData } = reopenOrderData;
  const [returnJourney, setReturnJourney] = useState(
    recurringData?.free_dates_return_time ? true : false
  );

  const form_schema = z.object({
    type_of_transport: z.string().min(1, "Transport type is required"),
    mode_of_transportation: z
      .string()
      .min(1, "At least one mode must be selected"),
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
      mode_of_transportation: transportationData?.mode_of_transportation || "",
      transport_with: transportationData?.transport_with || [],
      duration: recurringData?.ends || "",
      start_date: recurringData?.start_date || null,
      return_date: recurringData?.return_date || null,
      multiple_week_days: recurringData?.multiple_week_days || [],
    },
  });

  const updateCreateOrderData = (key, value) => {
    setReopenOrderData((prev) => ({
      ...prev,
      transportationData: {
        ...prev.transportationData,
        [key]: value,
      },
    }));
    if (key === "type_of_transport" && value !== "recurring") {
      setReopenOrderData((prev) => ({
        ...prev,
        recurringData: {
          ...prev.recurringData,
          recurring_type: "",
          start_date: null,
          return_date: null,
          start_time: "",
          return_time: "",
          multiple_week_days: [],
          ends: "",
          free_dates: [new Date()],
          free_dates_start_time: "",
          free_dates_return_time: "",
        },
      }));
    }
  };

  const updateCreateRecurringOrderData = (key, value) => {
    if (key === "recurring_type" && value === "free") {
      setReopenOrderData((prev) => ({
        ...prev,
        recurringData: {
          ...prev.recurringData,
          [key]: value,
          start_date: null,
          return_date: null,
          start_time: "",
          return_time: "",
          multiple_week_days: [],
          ends: "",
        },
      }));
    } else if (key === "recurring_type" && value === "week") {
      setReopenOrderData((prev) => ({
        ...prev,
        recurringData: {
          ...prev.recurringData,
          [key]: value,
          free_dates: [new Date()],
          free_dates_start_time: "",
          free_dates_return_time: "",
        },
      }));
    } else {
      setReopenOrderData((prev) => ({
        ...prev,
        recurringData: {
          ...prev.recurringData,
          [key]: value,
        },
      }));
    }
  };

  const handleCheckBox = (type, value) => {
    setReopenOrderData((prev) => {
      const isNoneOfThatSelected = value === "none_of_that";
      const isValueAlreadySelected =
        prev.transportationData?.[type]?.includes(value);

      let updatedTransportWith;

      if (isNoneOfThatSelected) {
        updatedTransportWith = isValueAlreadySelected ? [] : [value];
      } else {
        updatedTransportWith = isValueAlreadySelected
          ? prev.transportationData[type].filter((item) => item !== value)
          : [
              ...(prev.transportationData?.[type]?.filter(
                (item) => item !== "none_of_that"
              ) || []),
              value,
            ];
      }

      return {
        ...prev,
        transportationData: {
          ...prev.transportationData,
          [type]: updatedTransportWith,
        },
      };
    });
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
            transportationData?.mode_of_transportation,
            transportationData?.transport_with?.length > 0
              ? transportationData?.transport_with.includes("oxygen_quantity")
                ? transportationData?.oxygen_quantity > 0
                : true
              : false,
            recurringData?.multiple_week_days?.length > 0,
            recurringData?.start_date,
            recurringData?.ends,
          ]
        : transportationData?.type_of_transport === "recurring" &&
          recurringData?.recurring_type === "free"
        ? [
            transportationData?.type_of_transport,
            transportationData?.mode_of_transportation,
            transportationData?.transport_with?.length > 0
              ? transportationData?.transport_with.includes("oxygen_quantity")
                ? transportationData?.oxygen_quantity > 0
                : true
              : false,
            recurringData?.free_dates?.length > 0,
            recurringData?.free_dates_start_time,
          ]
        : [
            transportationData?.type_of_transport,
            transportationData?.mode_of_transportation,
            transportationData?.transport_with?.length > 0
              ? transportationData?.transport_with.includes("oxygen_quantity")
                ? transportationData?.oxygen_quantity > 0
                : true
              : false,
          ];
    setTransportationProgress(calculateFormProgress(fieldsFilled));
  }, [transportationData, recurringData, setTransportationProgress]);

  const handleDateChange = (key, value) => {
    setReopenOrderData((prev) => ({
      ...prev,
      recurringData: {
        ...prev.recurringData,
        [key]: value,
      },
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (recurringData?.recurring_type === "free") {
      const startTime = new Date(
        new Date().setHours(
          recurringData?.free_dates_start_time.split(":")[0],
          recurringData?.free_dates_start_time.split(":")[1]
        )
      );
      const returnTime = new Date(
        new Date().setHours(
          recurringData?.free_dates_return_time.split(":")[0],
          recurringData?.free_dates_return_time.split(":")[1]
        )
      );
      if (startTime >= returnTime) {
        toast.error("Return time should be after start time");
        return;
      }
    } else if (recurringData?.recurring_type === "week") {
      const startTime = new Date(
        new Date().setHours(
          recurringData?.start_time.split(":")[0],
          recurringData?.start_time.split(":")[1]
        )
      );
      const returnTime = new Date(
        new Date().setHours(
          recurringData?.return_time.split(":")[0],
          recurringData?.return_time.split(":")[1]
        )
      );
      if (startTime >= returnTime) {
        toast.error("Return time should be after start time");
        return;
      }
    }
    handleFormChange("patientDetails");
  };

  const { getInputProps: recurringStartTimeInput } = useTimescape({
    date: new Date(reopenOrderData?.recurringData?.start_time),
    onChangeDate: (nextDate) =>
      formatTimeInput(
        nextDate,
        setReopenOrderData,
        "recurringData",
        "start_time"
      ),
  });

  const { getInputProps: recurringReturnTimeInput } = useTimescape({
    date: new Date(reopenOrderData?.recurringData?.return_time),
    onChangeDate: (nextDate) =>
      formatTimeInput(
        nextDate,
        setReopenOrderData,
        "recurringData",
        "return_time"
      ),
  });

  const { getInputProps: recurringFreeDateStartTimeInput } = useTimescape({
    date: new Date(reopenOrderData?.recurringData?.free_dates_start_time),
    onChangeDate: (nextDate) =>
      formatTimeInput(
        nextDate,
        setReopenOrderData,
        "recurringData",
        "free_dates_start_time"
      ),
  });

  const { getInputProps: recurringFreeDateEndTimeInput } = useTimescape({
    date: new Date(reopenOrderData?.recurringData?.free_dates_return_time),
    onChangeDate: (nextDate) =>
      formatTimeInput(
        nextDate,
        setReopenOrderData,
        "recurringData",
        "free_dates_return_time"
      ),
  });

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
                  {t("type_of_transport")}{" "}
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
                  {t("mode_of_transportation")}{" "}
                  <span className="highlight">({t("single_selection")})</span>
                </h6>
                <FormField
                  control={form.control}
                  name="mode_of_transportation"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          value={transportationData?.mode_of_transportation}
                          onValueChange={(value) => {
                            field.onChange(value);
                            updateCreateOrderData(
                              "mode_of_transportation",
                              value
                            );
                          }}
                        >
                          {transportModesOptions.map((option) => (
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

              <div>
                <h6 className="mb-6">
                  {t("transport_with")}{" "}
                  <span className="highlight">({t("multiple_selection")})</span>
                </h6>
                {transportWithOptions.map((option) => {
                  const isNoneOfThatSelected =
                    transportationData.transport_with?.includes("none_of_that");
                  const isOptionDisabled =
                    isNoneOfThatSelected && option.value !== "none_of_that";

                  return (
                    <div
                      key={option.value}
                      className={`${
                        option.value !== "oxygen_quantity"
                          ? "flex items-center"
                          : ""
                      } mb-4`}
                    >
                      <Checkbox
                        id={option.value}
                        checked={transportationData.transport_with?.includes(
                          option.value
                        )}
                        onClick={() =>
                          handleCheckBox("transport_with", option.value)
                        }
                        disabled={isOptionDisabled}
                      />
                      <Label
                        className={`font-normal text-[16px] ml-2 text-nowrap ${
                          isOptionDisabled ? "text-gray-400" : ""
                        }`}
                        htmlFor={option.value}
                      >
                        {t(option.label)}
                      </Label>

                      {option.value === "oxygen_quantity" &&
                        transportationData.transport_with?.includes(
                          "oxygen_quantity"
                        ) && (
                          <div className="w-full mt-2">
                            <Input
                              placeholder="Enter oxygen quantity"
                              className="h-10"
                              type="number"
                              onChange={(e) =>
                                updateCreateOrderData(
                                  "oxygen_quantity",
                                  Number(e.target.value)
                                )
                              }
                              value={transportationData?.oxygen_quantity || ""}
                              disabled={isNoneOfThatSelected}
                            />
                          </div>
                        )}
                    </div>
                  );
                })}
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
                    updateCreateRecurringOrderData("recurring_type", val)
                  }
                  placeholder="Select a type"
                />
                {recurringData?.recurring_type === "week" ? (
                  <div className="">
                    <h3 className="text-lg font-medium mt-10 mb-5">
                      {t("select_start_date_and_time")} *
                    </h3>
                    <div className="mb-5 flex w-max gap-4 items-center">
                      <DatePicker
                        date={recurringData?.start_date}
                        setDate={(value) =>
                          handleDateChange("start_date", value)
                        }
                        startMonth={new Date()}
                        disabled={{
                          before: new Date(),
                        }}
                      />
                      <div
                        className={`timescape py-2 px-2 focus-within:outline-ring flex items-center gap-0.5 rounded-md bg-white cursor-pointer  focus-within:border-ring
                            `}
                      >
                        <Input
                          className="timescape-input !w-6"
                          {...recurringStartTimeInput("hours")}
                          placeholder="hh"
                        />
                        <span className="separator">:</span>
                        <Input
                          className="timescape-input !w-6"
                          {...recurringStartTimeInput("minutes")}
                          placeholder="mm"
                          steop={5}
                        />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium  mb-5">
                      {t("select_return_date_time")}{" "}
                      <span className="highlight">({t("optional")})</span>
                    </h3>
                    <div className="mb-5 flex w-max gap-4 items-center">
                      {/* commented because qudrati vai said it's not need */}
                      {/* <DatePicker
                        date={recurringData?.return_date || null}
                        setDate={(value) =>
                          handleDateChange("return_date", value)
                        }
                        disabled={{
                          before: new Date(recurringData?.start_date),
                          after: new Date(recurringData?.start_date),
                        }}
                      /> */}
                      <div
                        className={`timescape py-2 px-2 focus-within:outline-ring flex items-center gap-0.5 rounded-md bg-white cursor-pointer  focus-within:border-ring
                            `}
                      >
                        <Input
                          className="timescape-input !w-6"
                          {...recurringReturnTimeInput("hours")}
                          placeholder="hh"
                        />
                        <span className="separator">:</span>
                        <Input
                          className="timescape-input !w-6"
                          {...recurringReturnTimeInput("minutes")}
                          placeholder="mm"
                          steop={5}
                        />
                      </div>
                    </div>

                    <h3 className="text-lg font-medium mb-3 mt-5">
                      {t("select_weekdays")}{" "}
                      <span className="highlight">
                        ({t("multiple_selection")})
                      </span>
                      :
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-2">
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
                            className="size-6 capitalize"
                            onClick={() => handleWeekdayChange(option)}
                          />
                          <Label
                            className="ml-2 text-lg"
                            htmlFor={option.value}
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-lg font-medium mb-3 mt-5">
                      {t("ends")}{" "}
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
                              className="flex items-center gap-3"
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
                  </div>
                ) : recurringData?.recurring_type === "free" ? (
                  <div className="">
                    <div className="mt-5 mb-5 ">
                      <h3 className="text-lg font-medium mt-10 mb-5">
                        {t("select_start_date_and_time")} *
                        <span className="text-sm text-gray-500"> (max 60)</span>
                      </h3>
                      <div className="flex w-max gap-4 items-center">
                        <DatePicker
                          mode="multiple"
                          date={
                            recurringData?.free_dates
                              ? recurringData?.free_dates.map(
                                  (date) => new Date(date)
                                )
                              : []
                          }
                          setDate={(value) =>
                            handleDateChange("free_dates", value)
                          }
                          disabled={{
                            before: new Date(),
                          }}
                          max={60}
                        />
                        <div
                          className={`timescape py-2 px-2 focus-within:outline-ring flex items-center gap-0.5 rounded-md bg-white cursor-pointer  focus-within:border-ring
                            `}
                        >
                          <Input
                            className="timescape-input !w-6"
                            {...recurringFreeDateStartTimeInput("hours")}
                            placeholder="hh"
                          />
                          <span className="separator">:</span>
                          <Input
                            className="timescape-input !w-6"
                            {...recurringFreeDateStartTimeInput("minutes")}
                            placeholder="mm"
                            steop={5}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 flex items-center gap-2">
                      <Checkbox
                        id="return_journey"
                        checked={returnJourney}
                        onClick={() => {
                          setReturnJourney(!returnJourney);
                          updateCreateRecurringOrderData(
                            "free_dates_return_time",
                            ""
                          );
                        }}
                      />
                      <Label
                        className="text-base font-medium"
                        htmlFor="return_journey"
                      >
                        {t("return_journey")} ? ({t("optional")})
                      </Label>
                    </div>
                    {returnJourney && (
                      <div className=" mb-5 ">
                        <h3 className="text-lg font-medium mt-10 mb-5">
                          {t("select_return_date_and_time")}{" "}
                          <span className="text-sm text-gray-600">
                            {t("(optional)")}
                          </span>
                        </h3>
                        <div className="flex w-max gap-4 items-center">
                          {/* <DatePicker
                            mode="multiple"
                            date={recurringData?.free_dates}
                            setDate={(value) =>
                              handleDateChange("free_dates", value)
                            }
                            disabled
                          /> */}
                          <div
                            className={`timescape py-2 px-2 focus-within:outline-ring flex items-center gap-0.5 rounded-md bg-white cursor-pointer  focus-within:border-ring
                            `}
                          >
                            <Input
                              className="timescape-input !w-6"
                              {...recurringFreeDateEndTimeInput("hours")}
                              placeholder="hh"
                            />
                            <span className="separator">:</span>
                            <Input
                              className="timescape-input !w-6"
                              {...recurringFreeDateEndTimeInput("minutes")}
                              placeholder="mm"
                              steop={5}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            )}

            <div className="flex items-center justify-center w-full">
              <Button
                type="submit"
                disabled={transportationProgress < 100}
                className="mt-5 bg-secondary text-black hover:text-white px-12"
                onClick={(e) => handleNext(e)}
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

export default ReopenTransportationDetails;
