/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
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
import { DatePicker } from "@/components/ui/DatePIcker";
import { calculateFormProgress } from "@/utils";
import {
  transportModesOptions,
  transportOptions,
  transportWithOptions,
  weekdaysOptions,
  durationOptions,
  timeOptions,
} from "@/components/create-order-forms/helpers";

const TransportationDetails = ({
  handleFormChange,
  setTransportationProgress,
  transportationProgress,
  setOrderData,
  orderData,
}) => {
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const formSchema = z.object({
    transportType: z.string().min(1, "Transport type is required"),
    transportModes: z
      .array(z.string())
      .nonempty("At least one mode must be selected"),
    transportWith: z
      .array(z.string())
      .nonempty("At least one transport with option must be selected"),
    duration: z.string().min(1, "Duration is required"),
    startDate: z.date().nullable(),
    returnDate: z.date().nullable(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transportType: "",
      transportModes: [],
      transportWith: [],
      duration: "",
      startDate: null,
      returnDate: null,
    },
  });

  const handleModeOfTransportationChange = (value) => {
    setOrderData((prevData) => {
      const newModes = prevData.modeOfTransportation.includes(value)
        ? prevData.modeOfTransportation.filter((mode) => mode !== value)
        : [...prevData.modeOfTransportation, value];
      return {
        ...prevData,
        modeOfTransportation: newModes,
      };
    });
  };

  const handleTransportWithChange = (value) => {
    setOrderData((prevData) => {
      const newWithOptions = prevData.transportWith.includes(value)
        ? prevData.transportWith.filter((option) => option !== value)
        : [...prevData.transportWith, value];
      return {
        ...prevData,
        transportWith: newWithOptions,
      };
    });
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
  };
  let fieldsFilled;
  if (orderData?.typeOfTransport === "reccurring") {
    fieldsFilled = [
      form.watch("transportType"),
      form.watch("duration"),
      orderData?.modeOfTransportation.length > 0,
      orderData?.transportWith.length > 0,
      selectedWeekdays.length > 0,
      startDate,
      endDate,
    ];
  } else {
    fieldsFilled = [
      orderData?.typeOfTransport,
      orderData?.modeOfTransportation.length > 0,
      orderData?.transportWith.length > 0,
    ];
  }

  useEffect(() => {
    setTransportationProgress(calculateFormProgress(fieldsFilled));
  }, [...fieldsFilled, setTransportationProgress, orderData]);

  return (
    <Card className="w-[65%] px-5 py-5">
      <CardHeader>
        <CardTitle>Transportation</CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form>
            <div className="grid grid-cols-3 gap-5">
              <div className="pr-5">
                <h6 className="mb-4">
                  Type of transport{" "}
                  <span className="text-[15px]">(simple selection)</span>
                </h6>
                <FormField
                  control={form.control}
                  name="transportType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            setOrderData((prev) => ({
                              ...prev,
                              typeOfTransport: value,
                            }));
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

              <div className="pr-5">
                <h6 className="mb-4">
                  Mode of transportation
                  <span className="text-[15px]">(multiple selection)</span>
                </h6>
                {transportModesOptions.map((option) => (
                  <div key={option.value} className="flex items-center mb-4">
                    <Checkbox
                      id={option.value}
                      checked={orderData.modeOfTransportation.includes(
                        option.value
                      )}
                      onClick={() =>
                        handleModeOfTransportationChange(option.value)
                      }
                    />
                    <Label className="ml-2" htmlFor={option.value}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>

              <div>
                <h6 className="mb-4">
                  Transport with
                  <span className="text-[15px]">(multiple selection)</span>
                </h6>
                {transportWithOptions.map((option) => (
                  <div key={option.value} className="flex items-center mb-4">
                    <Checkbox
                      id={option.value}
                      checked={orderData.transportWith.includes(option.value)}
                      onClick={() => handleTransportWithChange(option.value)}
                    />
                    <Label className="ml-2" htmlFor={option.value}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            {orderData?.typeOfTransport === "reccurring" && (
              <div>
                <h3 className="text-lg font-medium mb-3 mt-5">
                  Select Weekdays:
                </h3>
                <AppSelect items={["Week", "Month"]} placeholder="Week" />

                <h3 className="text-lg font-medium mt-10 mb-5">
                  Select Start Date and Time*:
                </h3>
                <div className="mb-5 flex w-max gap-4 items-center">
                  <DatePicker date={startDate} setDate={setStartDate} />
                  <AppSelect
                    items={timeOptions}
                    placeholder="00:00"
                    isTime={true}
                  />
                </div>

                <h3 className="text-lg font-medium mt-10 mb-5">
                  Select Return Time* :
                </h3>
                <div className="mb-5 flex w-max gap-4 items-center">
                  <DatePicker date={endDate} setDate={setEndDate} />
                  <AppSelect
                    items={timeOptions}
                    placeholder="00:00"
                    isTime={true}
                  />
                </div>

                <h3 className="text-lg font-medium mb-3 mt-5">
                  Select Weekdays{" "}
                  <span className="text-[15px]">(multiple selection)</span>:
                </h3>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {weekdaysOptions.map((option) => (
                    <div key={option.value} className="flex items-center mb-2">
                      <Checkbox
                        id={option.value}
                        checked={selectedWeekdays.includes(option.value)}
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
                          value={field.value}
                          onValueChange={(value) =>
                            form.setValue("duration", value)
                          }
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
            )}

            <div className="flex items-center justify-center w-full">
              <Button
                type="submit"
                disabled={transportationProgress < 100}
                className="mt-5 bg-secondary text-black hover:text-white px-12"
                onClick={() => handleFormChange("patient")}
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
