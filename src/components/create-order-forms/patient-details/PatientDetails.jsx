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
import { DatePicker } from "@/components/ui/DatePicker";

const PatientDetails = ({
  handleFormChange,
  setPatientProgress,
  createOrderData,
  setCreateOrderData,
  patientProgress,
  dateOfBirth,
  setDateOfBirth,
}) => {
  const { patientData } = createOrderData;

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
    setCreateOrderData((prev) => ({
      ...prev,
      patientData: {
        ...prev.patientData,
        date_of_birth: dateOfBirth,
      },
    }));
  }, [patientData.date_of_birth, dateOfBirth, setCreateOrderData]);

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
      patientData.date_of_birth,
      patientData.area_room,
      patientData.cost_center,
    ];

    setPatientProgress(calculateFormProgress(fieldsFilled));
  }, [patientData, setPatientProgress]);

  return (
    <Card className="w-[70%] px-5 py-5">
      <CardHeader>
        <CardTitle className="title">Patient Details</CardTitle>
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
                    <FormLabel className="font-normal">
                      {createOrderData.transportationData?.type_of_transport ===
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
                    <FormLabel className="font-normal">
                      {createOrderData.transportationData?.type_of_transport ===
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
              {createOrderData.transportationData?.type_of_transport !==
                "collection_order" && (
                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2">
                        Date of Birth<sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <DatePicker
                          date={dateOfBirth}
                          setDate={setDateOfBirth}
                          className="py-6"
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
                    <FormLabel className="font-normal">
                      {createOrderData.transportationData?.type_of_transport ===
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
                    <FormLabel className="font-normal">
                      {createOrderData.transportationData?.type_of_transport ===
                      "collectionOrder"
                        ? "How much"
                        : "Cost Center"}
                      {createOrderData.transportationData?.type_of_transport !==
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
                    <FormLabel className="font-normal">How Much</FormLabel>
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
                    <FormLabel className="block mb-5 font-normal">
                      Isolation
                    </FormLabel>
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
                name="patient_above_90kg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-5 font-normal">
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
                  <FormItem className="col-span-2">
                    <FormLabel className="font-normal">Special</FormLabel>
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

            <BackAndNextBtn
              isFillForm={true}
              isDisabled={patientProgress < 100}
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
