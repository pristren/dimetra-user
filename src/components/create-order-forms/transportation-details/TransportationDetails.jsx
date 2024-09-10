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

const TransportationDetails = ({
  handleFormChange,
  setTransportationProgress,
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

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
  };

  const transportOptions = [
    { value: "transferTrip", label: "Transfer trip" },
    { value: "investigationTrip", label: "Investigation trip" },
    { value: "privatTrips", label: "Private trips" },
    { value: "collectionOrder", label: "Collection order" },
    { value: "reccurring", label: "Recurring" },
  ];

  const transportModesOptions = [
    { value: "relocation", label: "Relocation" },
    { value: "wheelchairMts", label: "Wheelchair (MTS)" },
    { value: "ownWheelchair", label: "In Own Wheelchair" },
    { value: "lyingDown", label: "Lying Down" },
    { value: "pedestrian", label: "Pedestrian" },
    { value: "secondTransportHelper", label: "Second Transport Helper" },
    { value: "carryingChair", label: "Carrying Chair" },
  ];

  const transportWithOptions = [
    { value: "noneOfThat", label: "None of That" },
    { value: "infusion", label: "Infusion" },
    { value: "infusomat", label: "Infusomat" },
    { value: "accompanyingReason", label: "Accompanying Reason" },
    { value: "oxygenLitersPerMin", label: "Oxygen (Liters/Min)" },
  ];

  const weekdaysOptions = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  const durationOptions = [
    { value: "1month", label: "1 Month" },
    { value: "3months", label: "3 Months" },
    { value: "6months", label: "6 Months" },
    { value: "1year", label: "After 1 Year" },
  ];

  const timeOptions = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

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

  const calculateProgress = () => {
    const fieldsFilled = [
      form.watch("transportType"),
      form.watch("transportModes").length > 0,
      form.watch("transportWith").length > 0,
      form.watch("duration"),
      selectedWeekdays.length > 0,
      startDate,
      endDate,
    ];
    const progressPercentage =
      (fieldsFilled.filter(Boolean).length / fieldsFilled.length) * 100;
    setTransportationProgress(progressPercentage);
  };

  useEffect(() => {
    calculateProgress();
  }, [
    form.watch("transportType"),
    form.watch("transportModes"),
    form.watch("transportWith"),
    selectedWeekdays,
    startDate,
    endDate,
    form.watch("duration"),
  ]);

  return (
    <Card className="w-[65%] px-5 py-5">
      <CardHeader>
        <CardTitle>Transportation</CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                          onValueChange={field.onChange}
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
                    <input
                      type="checkbox"
                      id={option.value}
                      checked={form
                        .watch("transportModes")
                        .includes(option.value)}
                      onChange={(e) => {
                        const { checked } = e.target;
                        const newModes = checked
                          ? [...form.watch("transportModes"), option.value]
                          : form
                              .watch("transportModes")
                              .filter((v) => v !== option.value);
                        form.setValue("transportModes", newModes);
                      }}
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
                    <input
                      type="checkbox"
                      id={option.value}
                      checked={form
                        .watch("transportWith")
                        .includes(option.value)}
                      onChange={(e) => {
                        const { checked } = e.target;
                        const newWith = checked
                          ? [...form.watch("transportWith"), option.value]
                          : form
                              .watch("transportWith")
                              .filter((v) => v !== option.value);
                        form.setValue("transportWith", newWith);
                      }}
                    />
                    <Label className="ml-2" htmlFor={option.value}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-lg font-medium mb-3 mt-5">Select Weekdays:</h3>
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
                          <Label htmlFor={option.value}>{option.label}</Label>
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

            <div className="flex items-center justify-center w-full">
              <Button
                type="submit"
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
