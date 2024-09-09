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
import { Input } from "@/components/ui/input";

const TransportationDetails = ({ handleFormChange }) => {
  const formSchema = z.object({
    transportType: z.string().min(1, "Transport type is required"),
    transportModes: z
      .array(z.string())
      .nonempty("At least one mode must be selected"),
    transportWith: z
      .array(z.string())
      .nonempty("At least one transport with option must be selected"),
    duration: z.string().min(1, "Duration is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transportType: "",
      transportModes: [],
      transportWith: [],
      duration: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
  };

  const transportOptions = [
    { value: "ambulance", label: "Ambulance" },
    { value: "helicopter", label: "Helicopter" },
    { value: "privateCar", label: "Private Car" },
  ];

  const transportModesOptions = [
    { value: "bus", label: "Bus" },
    { value: "train", label: "Train" },
    { value: "car", label: "Car" },
    { value: "bike", label: "Bike" },
  ];

  const transportWithOptions = [
    { value: "driver", label: "Driver" },
    { value: "guide", label: "Guide" },
    { value: "assistant", label: "Assistant" },
    { value: "accompanied", label: "Accompanied" },
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

  return (
    <Card className="w-[65%] px-5 py-5">
      <CardHeader>
        <CardTitle>Transportation</CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-5">
              <div className="border-r pr-5">
                <h2 className="text-lg font-medium mb-4">
                  Transportart (einfach Auswahl)
                </h2>
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
                              className="flex items-center space-x-2"
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

              <div className="border-r pr-5">
                <h2 className="text-lg font-medium mb-4">
                  Beförderungsart (mehrfach Auswahl)
                </h2>
                {transportModesOptions.map((option) => (
                  <div key={option.value} className="flex items-center mb-2">
                    <Checkbox id={option.value} />
                    <Label className="ml-2" htmlFor={option.value}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-lg font-medium mb-4">
                  Transport MIT (mehrfach Auswahl)
                </h2>
                {transportWithOptions.map((option) => (
                  <div key={option.value} className="flex items-center mb-2">
                    <Checkbox id={option.value} />
                    <Label className="ml-2" htmlFor={option.value}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-lg font-medium mb-3 mt-5">Select Weekdays:</h3>
            <AppSelect
              items={["Week 1", "Week 2", "Week 3"]}
              placeholder="Week 1"
            />

            <h3 className="text-lg font-medium mb-3 mt-5">
              Select Start Date and Time:
            </h3>
            <div className="mb-5 flex w-max gap-4 items-center">
              <DatePicker />
              <Input placeholder="00:00" />
            </div>

            <h3 className="text-lg font-medium mb-3">
              Select Weekdays (mehrfach Auswahl):
            </h3>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {weekdaysOptions.map((option) => (
                <div key={option.value} className="flex items-center mb-2">
                  <Checkbox id={option.value} />
                  <Label className="ml-2" htmlFor={option.value}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-medium mb-3 mt-5">Ends:</h3>
            <RadioGroup>
              {durationOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 mb-2"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
            <h2 className="text-lg font-semibold mt-5">
              Summary: Monthly on day 4
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
