/* eslint-disable react/prop-types */
import { z } from "zod";
import {
  transportModesOptions,
  transportOptions,
  transportWithOptions,
} from "@/components/create-order-forms/helpers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { t } from "i18next";

const EditTransportationDetails = ({
  editOrderData,
  startDate,
  endDate,
  setEditOrderData,
}) => {
  const { transportationData } = editOrderData;
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

  const updateEditOrderData = (key, value) => {
    setEditOrderData((prev) => ({
      ...prev,
      transportationData: {
        ...prev.transportationData,
        [key]: value,
      },
    }));
  };

  const handleCheckBox = (type, value) => {
    setEditOrderData((prev) => ({
      ...prev,
      transportationData: {
        ...prev.transportationData,
        [type]: prev.transportationData?.[type]?.includes(value)
          ? prev.transportationData[type].filter((item) => item !== value)
          : [...(prev.transportationData?.[type] || []), value],
      },
    }));
  };

  return (
    <Card className="mt-2 bg-white p-6 border-none">
      <h4 className="px-3">Transportation Details</h4>
      <CardContent className="px-3 mt-4">
        <Form {...form}>
          <form>
            <div className="grid grid-cols-3 gap-5">
              <div className="pr-5">
                <p className="mb-4  font-semibold">
                  Type of transport{" "}
                  <span className="text-[15px]">(simple selection)</span>
                </p>
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
                            updateEditOrderData("type_of_transport", value);
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
                <p className="mb-4 font-semibold">
                  Mode of transportation{" "}
                  <span className="text-[15px]">(multiple selection)</span>
                </p>
                {transportModesOptions.map((option) => (
                  <div key={option.value} className="flex items-center mb-4">
                    <Checkbox
                      id={option.value}
                      checked={transportationData?.mode_of_transportation?.includes(
                        option.value
                      )}
                      onClick={() =>
                        handleCheckBox("mode_of_transportation", option.value)
                      }
                    />
                    <Label className="ml-2" htmlFor={option.value}>
                      {t(option.label)}
                    </Label>
                  </div>
                ))}
              </div>

              <div>
                <p className="mb-4 font-semibold">
                  Transport with{" "}
                  <span className="text-[15px]">(multiple selection)</span>
                </p>
                {transportWithOptions.map((option) => (
                  <div key={option.value} className="flex items-center mb-4">
                    <Checkbox
                      id={option.value}
                      checked={transportationData?.transport_with?.includes(
                        option.value
                      )}
                      onClick={() =>
                        handleCheckBox("transport_with", option.value)
                      }
                    />
                    <Label className="ml-2" htmlFor={option.value}>
                      {t(option.label)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditTransportationDetails;
