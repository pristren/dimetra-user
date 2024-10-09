/* eslint-disable react/prop-types */
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const EditPatientDetails = ({
  editOrderData,
  setEditOrderData,
  dateOfBirth,
  setDateOfBirth,
}) => {
  const { patientData } = editOrderData;
  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    surname: z.string().min(1, "Surname is required"),
    date_of_birth: z.string().min(1, "Date of Birth is required"),
    area_room: z.string().min(1, "Area/Room is required"),
    cost_center: z.string().min(1, "Cost center is required"),
    how_much: z.string().optional(),
    special_note: z.string().optional(),
    isolation: z.boolean().optional(),
    patient_above_90kg: z.boolean().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: patientData,
  });
  useEffect(() => {
    form.reset(patientData);
  }, [patientData, form]);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditOrderData((prev) => ({
      ...prev,
      patientData: {
        ...prev.patientData,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };
  return (
    <Card className="p-6 border-none rounded-none">
      <h4 className="px-3">Patient Details</h4>

      <CardContent className="px-3 mt-3">
        <Form {...form}>
          <form>
            <div className="grid grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {editOrderData.transportationData?.type_of_transport ===
                      "collection_order"
                        ? "Name Collection"
                        : "Name"}
                      <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.name ? "border-red-500" : ""
                        }
                        placeholder={
                          editOrderData.transportationData
                            ?.type_of_transport === "collection_order"
                            ? "Enter name collection"
                            : "Enter patient's name"
                        }
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
                      {editOrderData.transportationData?.type_of_transport ===
                      "collectionOrder"
                        ? "Number Patients"
                        : "Surname"}
                      <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.surname ? "border-red-500" : ""
                        }
                        placeholder={
                          editOrderData.transportationData
                            ?.type_of_transport === "collection_order"
                            ? "Enter number of patients"
                            : "Enter patient's surname"
                        }
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
              <div></div>
              {editOrderData.transportationData?.type_of_transport !==
                "collection_order" && (
                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={() => (
                    <FormItem className="mb-7">
                      <FormLabel className="mb-2">
                        Date of Birth<sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <DatePicker
                          date={dateOfBirth}
                          setDate={setDateOfBirth}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="area_room"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {editOrderData.transportationData?.type_of_transport ===
                      "collectionOrder"
                        ? "Cost Center"
                        : "Area/Room"}
                      <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.area_room
                            ? "border-red-500"
                            : ""
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
                name="cost_center"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {editOrderData.transportationData?.type_of_transport ===
                      "collectionOrder"
                        ? "How much"
                        : "Cost Center"}
                      {editOrderData.transportationData?.type_of_transport !==
                        "collectionOrder" && (
                        <sup className="text-[13px]">*</sup>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.cost_center
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

              <FormField
                control={form.control}
                name="how_much"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How Much</FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.how_much ? "border-red-500" : ""
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
                          checked={patientData?.isolation}
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
                name="patient_above_90kg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-3">
                      Patient Above 90 kg
                    </FormLabel>
                    <div className="flex items-center">
                      <FormControl>
                        <Checkbox
                          className={
                            form.formState.errors.patient_above_90kg
                              ? "border-red-500"
                              : ""
                          }
                          id="patient_above_90kg"
                          checked={patientData?.patient_above_90kg}
                          {...field}
                          onCheckedChange={(checked) =>
                            handleInputChange({
                              target: {
                                name: "patient_above_90kg",
                                type: "checkbox",
                                checked,
                              },
                            })
                          }
                        />
                      </FormControl>
                      <Label
                        htmlFor="patient_above_90kg"
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
                name="special_note"
                render={({ field }) => (
                  <FormItem className={"col-span-3"}>
                    <FormLabel>Special</FormLabel>
                    <FormControl>
                      <Input
                        className={`${
                          form.formState.errors.special_note
                            ? "border-red-500"
                            : ""
                        }`}
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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditPatientDetails;
