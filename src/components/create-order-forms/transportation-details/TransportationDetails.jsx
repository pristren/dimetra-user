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

const TransportationDetails = ({
  handleFormChange,
  createOrderData,
  setCreateOrderData,
  setTransportationProgress,
  endDate,
  startDate,
  setEndDate,
  setStartDate,
  selectedWeekdays,
  setSelectedWeekdays,
  transportationProgress,
  freeDates,
  setFreeDates,
}) => {
  const { transportationData } = createOrderData;

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
      duration: transportationData?.ends || "",
      start_date: startDate || null,
      return_date: endDate || null,
      multiple_week_days: transportationData?.multiple_week_days || [],
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
    setSelectedWeekdays((prev) =>
      prev.includes(value)
        ? prev.filter((day) => day !== value)
        : [...prev, value]
    );

    updateCreateOrderData(
      "multiple_week_days",
      selectedWeekdays.includes(value)
        ? selectedWeekdays.filter((day) => day !== value)
        : [...selectedWeekdays, value]
    );
  };

  useEffect(() => {
    const fieldsFilled =
      transportationData?.type_of_transport === "recurring" &&
      transportationData?.recurring_type === "Week"
        ? [
            transportationData?.type_of_transport,
            transportationData?.mode_of_transportation.length > 0,
            transportationData?.transport_with.length > 0,
            transportationData?.multiple_week_days.length > 0,
            transportationData?.start_date,
            transportationData?.ends,
          ]
        : transportationData?.type_of_transport === "recurring" &&
          transportationData?.recurring_type === "Free"
        ? [
            transportationData?.type_of_transport,
            transportationData?.mode_of_transportation.length > 0,
            transportationData?.transport_with.length > 0,
            transportationData?.free_dates?.length > 0,
          ]
        : [
            transportationData?.type_of_transport,
            transportationData?.mode_of_transportation.length > 0,
            transportationData?.transport_with.length > 0,
          ];
    setTransportationProgress(calculateFormProgress(fieldsFilled));
  }, [transportationData]);

  useEffect(() => {
    setCreateOrderData((prev) => ({
      ...prev,
      transportationData: {
        ...prev.transportationData,
        start_date: startDate,
        end_date: endDate,
        free_dates: freeDates,
      },
    }));
  }, [startDate, endDate, freeDates]);

  return (
    <Card className="w-[70%] px-5 py-5">
      <CardHeader>
        <CardTitle className="title">Transportation details</CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form>
            <div className="grid grid-cols-3 gap-5">
              <div className="pr-5">
                <h6 className="mb-6">
                  Type of transport
                  <span className="highlight">(simple selection)</span>
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

              <div className="pr-5">
                <h6 className="mb-6">
                  Mode of transportation{" "}
                  <span className="highlight">(multiple selection)</span>
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
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>

              <div>
                <h6 className="mb-6">
                  Transport with{" "}
                  <span className="highlight">(multiple selection)</span>
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
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            {transportationData?.type_of_transport === "recurring" && (
              <div>
                <h3 className="text-lg font-medium mb-3 mt-5">
                  Select Recurring Type:
                </h3>
                <AppSelect
                  items={["Week", "Free"]}
                  defaultValue={transportationData.recurring_type}
                  onValueChange={(value) =>
                    updateCreateOrderData("recurring_type", value)
                  }
                  placeholder="Select a type"
                />

                {transportationData.recurring_type === "Week" ? (
                  <div className="">
                    <h3 className="text-lg font-medium mt-10 mb-5">
                      Select Start Date and Time*:
                    </h3>
                    <div className="mb-5 flex w-max gap-4 items-center">
                      <DatePicker date={startDate} setDate={setStartDate} />
                      <AppSelect
                        items={timeOptions}
                        placeholder="00:00"
                        isTime={true}
                        onValueChange={(value) =>
                          updateCreateOrderData("start_time", value)
                        }
                        defaultValue={transportationData.start_time}
                      />
                    </div>

                    <h3 className="text-lg font-medium mt-10 mb-5">
                      Select Return Date Time{" "}
                      <span className="highlight">(optional)</span>:
                    </h3>
                    <div className="mb-5 flex w-max gap-4 items-center">
                      <DatePicker date={endDate} setDate={setEndDate} />
                      <AppSelect
                        items={timeOptions}
                        placeholder="00:00"
                        defaultValue={transportationData.return_time}
                        isTime={true}
                        onValueChange={(value) =>
                          updateCreateOrderData("return_time", value)
                        }
                      />
                    </div>

                    <h3 className="text-lg font-medium mb-3 mt-5">
                      Select Weekdays{" "}
                      <span className="highlight">(multiple selection)</span>:
                    </h3>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      {weekdaysOptions.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center mb-2"
                        >
                          <Checkbox
                            id={option.value}
                            checked={transportationData?.multiple_week_days?.includes(
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

                    <h3 className="text-lg font-medium mb-3 mt-5">Ends:</h3>
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => {
                                field.onChange(value);
                                updateCreateOrderData("ends", value);
                              }}
                              value={transportationData.ends}
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
                      Summary: Monthly on day{" "}
                      {calculateMonthlyOccurrences(selectedWeekdays)}
                    </h2>
                  </div>
                ) : transportationData.recurring_type === "Free" ? (
                  <div className="">
                    <div className="mt-5 mb-5 ">
                      <h3 className="text-lg font-medium mt-10 mb-5">
                        Select Start Date and Time* (max 60):
                      </h3>
                      <div className="flex w-max gap-4 items-center">
                        <DatePicker
                          mode="multiple"
                          date={freeDates}
                          setDate={setFreeDates}
                        />
                        <AppSelect
                          items={timeOptions}
                          placeholder="Select a time"
                          isTime={true}
                          onValueChange={(value) =>
                            updateCreateOrderData(
                              "free_dates_start_time",
                              value
                            )
                          }
                          defaultValue={
                            transportationData.free_dates_start_time
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-5 mb-5 ">
                      <h3 className="text-lg font-medium mt-10 mb-5">
                        Select Return Date and Time:
                      </h3>
                      <div className="flex w-max gap-4 items-center">
                        <DatePicker
                          mode="multiple"
                          date={freeDates}
                          setDate={setFreeDates}
                          disabled
                        />
                        <AppSelect
                          items={timeOptions}
                          placeholder="Select a time"
                          isTime={true}
                          onValueChange={(value) =>
                            updateCreateOrderData(
                              "free_dates_return_time",
                              value
                            )
                          }
                          defaultValue={
                            transportationData.free_dates_return_time
                          }
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
                Next
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TransportationDetails;
