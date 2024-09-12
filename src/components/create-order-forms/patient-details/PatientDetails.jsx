/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { z } from "zod";
import BackAndNextBtn from "@/components/common/BackAndNextBtn";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { calculateFormProgress } from "@/utils";

const PatientDetails = ({
  handleFormChange,
  setPatientProgress,
  transportationData,
  patientData,
  setPatientData,
}) => {
  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    surname: z.string().min(1, "Surname is required"),
    dateOfBirth: z.string().min(1, "Date of Birth is required"),
    areaRoom: z.string().min(1, "Area/Room is required"),
    kostenstelle: z.string().min(1, "Kostenstelle is required"),
    howMuch: z.string().min(1, "How much is required"),
    special: z.string().optional(),
    isolation: z.boolean().optional(),
    patientAbove90kg: z.boolean().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: patientData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name, checked) => {
    setPatientData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  useEffect(() => {
    const fieldsFilled = [
      patientData.name,
      patientData.surname,
      patientData.dateOfBirth,
      patientData.areaRoom,
      patientData.kostenstelle,
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
                      {transportationData?.typeOfTransport === "collectionOrder"
                        ? "Name Collection"
                        : "Name"}
                      <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={form.getValues("name")}
                        className={
                          form.formState.errors.name ? "border-red-500" : ""
                        }
                        placeholder="Type your name"
                        {...field}
                        onChange={handleChange}
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
                      {transportationData?.typeOfTransport === "collectionOrder"
                        ? "Number Patients"
                        : "Surname"}
                      <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={form.getValues("surname")}
                        className={
                          form.formState.errors.surname ? "border-red-500" : ""
                        }
                        placeholder="Type your surname"
                        {...field}
                        onChange={handleChange}
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
                      {transportationData?.typeOfTransport === "collectionOrder"
                        ? "Area/Room"
                        : "Date of Birth"}
                      <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={form.getValues("dateOfBirth")}
                        className={
                          form.formState.errors.dateOfBirth
                            ? "border-red-500"
                            : ""
                        }
                        placeholder="Type your date of birth"
                        {...field}
                        onChange={handleChange}
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
                      {transportationData?.typeOfTransport === "collectionOrder"
                        ? "Cost center"
                        : "Area/Room"}
                      <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={form.getValues("areaRoom")}
                        className={
                          form.formState.errors.areaRoom ? "border-red-500" : ""
                        }
                        placeholder="Type your area or room"
                        {...field}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kostenstelle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {transportationData?.typeOfTransport === "collectionOrder"
                        ? "How much"
                        : "Kostenstelle"}
                      {transportationData?.typeOfTransport !==
                        "collectionOrder" && (
                        <sup className="text-[13px]">*</sup>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        value={form.getValues("kostenstelle")}
                        className={
                          form.formState.errors.kostenstelle
                            ? "border-red-500"
                            : ""
                        }
                        placeholder="Type your kostenstelle"
                        {...field}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {transportationData?.typeOfTransport !== "collectionOrder" && (
                <FormField
                  control={form.control}
                  name="howMuch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How Much</FormLabel>
                      <FormControl>
                        <Input
                          value={form.getValues("howMuch")}
                          className={
                            form.formState.errors.howMuch
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Type how much"
                          {...field}
                          onChange={handleChange}
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
                    <p className="block mb-2 font-medium">Isolation</p>
                    <div className="flex items-center">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          className={
                            form.formState.errors.isolation
                              ? "border-red-500"
                              : ""
                          }
                          {...field}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("isolation", checked)
                          }
                        />
                      </FormControl>
                      <FormLabel className="text-gray-500 font-medium text-[15px] cursor-pointer ml-2">
                        Yes
                      </FormLabel>
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
                    <p className="block mb-2 font-medium">
                      Patient Above 90 kg
                    </p>
                    <div className="flex items-center">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          className={
                            form.formState.errors.patientAbove90kg
                              ? "border-red-500"
                              : ""
                          }
                          {...field}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange("patientAbove90kg", checked)
                          }
                        />
                      </FormControl>
                      <FormLabel className="text-gray-500 font-medium text-[15px] cursor-pointer ml-2">
                        Yes
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="special"
                render={({ field }) => (
                  <FormItem
                    className={`${
                      transportationData?.typeOfTransport ===
                        "collectionOrder" && "col-span-2"
                    }`}
                  >
                    <FormLabel>Special</FormLabel>
                    <FormControl>
                      <Input
                        value={form.getValues("special")}
                        className={
                          form.formState.errors.special ? "border-red-500" : ""
                        }
                        placeholder="Type any special requirements"
                        {...field}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <BackAndNextBtn
              isFillForm={true}
              back="transport"
              next="review"
              onClick={() => handleFormChange("patientDetails")}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PatientDetails;
