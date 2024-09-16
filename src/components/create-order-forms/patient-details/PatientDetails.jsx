/* eslint-disable react/prop-types */
import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import BackAndNextBtn from "@/components/common/BackAndNextBtn";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateFormProgress } from "@/utils";
import { Label } from "@/components/ui/label";

const PatientDetails = ({
  handleFormChange,
  setPatientProgress,
  createOrderData,
  setCreateOrderData,
}) => {
  const { patientData } = createOrderData;

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    surname: z.string().min(1, "Surname is required"),
    dateOfBirth: z.string().min(1, "Date of Birth is required"),
    areaRoom: z.string().min(1, "Area/Room is required"),
    costCenter: z.string().min(1, "Cost center is required"),
    howMuch: z.string().optional(),
    special: z.string().optional(),
    isolation: z.boolean().optional(),
    patientAbove90kg: z.boolean().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: patientData,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreateOrderData((prev) => ({
      ...prev,
      patientData: {
        ...prev.patientData,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  useEffect(() => {
    const fieldsFilled = [
      patientData.name,
      patientData.surname,
      patientData.dateOfBirth,
      patientData.areaRoom,
      patientData.costCenter,
    ];

    setPatientProgress(calculateFormProgress(fieldsFilled));
  }, [patientData, setPatientProgress]);

  return (
    <Card className="w-[65%] px-5 py-5">
      <CardHeader>
        <CardTitle>Patient Details</CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form>
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {createOrderData.transportationData?.typeOfTransport === "collectionOrder"
                        ? "Name Collection"
                        : "Name"}
                      <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.name ? "border-red-500" : ""
                        }
                        placeholder="Enter patient's name"
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

              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {createOrderData.transportationData?.typeOfTransport === "collectionOrder"
                        ? "Number Patients"
                        : "Surname"}
                      <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.surname ? "border-red-500" : ""
                        }
                        placeholder="Enter patient's surname"
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

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {createOrderData.transportationData?.typeOfTransport === "collectionOrder"
                        ? "Area/Room"
                        : "Date of Birth"}
                      <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.dateOfBirth
                            ? "border-red-500"
                            : ""
                        }
                        placeholder="Enter patient's date of birth"
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

              <FormField
                control={form.control}
                name="areaRoom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {createOrderData.transportationData?.typeOfTransport === "collectionOrder"
                        ? "Cost Center"
                        : "Area/Room"}
                      <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.areaRoom ? "border-red-500" : ""
                        }
                        placeholder="Enter patient's area/room"
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

              <FormField
                control={form.control}
                name="costCenter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {createOrderData.transportationData?.typeOfTransport === "collectionOrder"
                        ? "How much"
                        : "Cost Center"}
                      {createOrderData.transportationData?.typeOfTransport !== "collectionOrder" && (
                        <sup className="text-[13px]">*</sup>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.costCenter
                            ? "border-red-500"
                            : ""
                        }
                        placeholder="Enter cost center"
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

              {createOrderData.transportationData?.typeOfTransport !== "collectionOrder" && (
                <FormField
                  control={form.control}
                  name="howMuch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How Much</FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.howMuch
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Enter amount"
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
              )}

              <FormField
                control={form.control}
                name="isolation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-3">Isolation</FormLabel>
                    <div className="flex items-center">
                      <FormControl>
                        <Checkbox
                          className={
                            form.formState.errors.isolation
                              ? "border-red-500"
                              : ""
                          }
                          id="isolation"
                          {...field}
                          onCheckedChange={(checked) =>
                            handleInputChange({
                              target: {
                                name: "isolation",
                                type: "checkbox",
                                checked,
                              },
                            })
                          }
                        />
                      </FormControl>
                      <Label
                        htmlFor="isolation"
                        className="text-gray-500 font-medium text-[15px] cursor-pointer ml-2"
                      >
                        Yes
                      </Label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="patientAbove90kg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-3">
                      Patient Above 90 kg
                    </FormLabel>
                    <div className="flex items-center">
                      <FormControl>
                        <Checkbox
                          className={
                            form.formState.errors.patientAbove90kg
                              ? "border-red-500"
                              : ""
                          }
                          id="patientAbove90kg"
                          {...field}
                          onCheckedChange={(checked) =>
                            handleInputChange({
                              target: {
                                name: "patientAbove90kg",
                                type: "checkbox",
                                checked,
                              },
                            })
                          }
                        />
                      </FormControl>
                      <Label
                        htmlFor="patientAbove90kg"
                        className="text-gray-500 font-medium text-[15px] cursor-pointer ml-2"
                      >
                        Yes
                      </Label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="special"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special</FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.special ? "border-red-500" : ""
                        }
                        placeholder="Enter special notes"
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

            <BackAndNextBtn
              isFillForm={true}
              handleGoPrev={() => handleFormChange("transportDetails")}
              handleGoNext={() => handleFormChange("destinationDetails")}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PatientDetails;
