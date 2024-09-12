/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { z } from "zod";
import BackAndNextBtn from "@/components/common/BackAndNextBtn";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { calculateFormProgress } from "@/utils";
import { Label } from "@/components/ui/label";

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
    costCenter: z.string().min(1, "Cost center is required"),
    howMuch: z.string().min(1, "How much is required"),
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

    setPatientData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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

  const { register } = form;

  return (
    <Card className="w-[65%] px-5 py-5">
      <CardHeader>
        <CardTitle>Patient Details</CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <FormLabel className="text-[15px] tracking-wide">
                  {transportationData?.typeOfTransport === "collectionOrder"
                    ? "Name Collection"
                    : "Name"}
                  <sup className="text-[13px]">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    className={
                      `${form.formState.errors.name ? "border-red-500" : ""} mt-2`
                    }
                    {...register("name")}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormMessage />
              </div>

              <div>
                <FormLabel className="text-[15px] tracking-wide">
                  {transportationData?.typeOfTransport === "collectionOrder"
                    ? "Number Patients"
                    : "Surname"}
                  <sup className="text-[13px]">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    className={
                      `${form.formState.errors.surname ? "border-red-500" : ""} mt-2`
                    }
                    {...register("surname")}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormMessage />
              </div>

              <div>
                <FormLabel className="text-[15px] tracking-wide">
                  {transportationData?.typeOfTransport === "collectionOrder"
                    ? "Area/Room"
                    : "Date of Birth"}
                  <sup className="text-[13px]">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    className={
                      `${form.formState.errors.dateOfBirth ? "border-red-500" : ""} mt-2`
                    }
                    {...register("dateOfBirth")}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormMessage />
              </div>

              <div>
                <FormLabel className="text-[15px] tracking-wide">
                  {transportationData?.typeOfTransport === "collectionOrder"
                    ? "Cost center"
                    : "Area/Room"}
                  <sup className="text-[13px]">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    className={
                      `${form.formState.errors.areaRoom ? "border-red-500" : ""} mt-2`
                    }
                    {...register("areaRoom")}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormMessage />
              </div>

              <div>
                <FormLabel className="text-[15px] tracking-wide">
                  {transportationData?.typeOfTransport === "collectionOrder"
                    ? "How much"
                    : "Cost Center"}
                  {transportationData?.typeOfTransport !==
                    "collectionOrder" && <sup className="text-[13px]">*</sup>}
                </FormLabel>
                <FormControl>
                  <Input
                    className={
                      `${form.formState.errors.costCenter ? "border-red-500" : ""} mt-2`
                    }
                    {...register("costCenter")}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormMessage />
              </div>

              {transportationData?.typeOfTransport !== "collectionOrder" && (
                <div>
                  <FormLabel className="text-[15px] tracking-wide">How Much</FormLabel>
                  <FormControl>
                    <Input
                      className={
                        `${form.formState.errors.howMuch ? "border-red-500" : ""} mt-2`
                      }
                      {...register("howMuch")}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              )}

              <div>
                <p className="block mb-2 font-medium">Isolation</p>
                <div className="flex items-center">
                  <FormControl>
                    <Checkbox
                      className={
                        `${form.formState.errors.isolation ? "border-red-500" : ""}`
                      }
                      id="isolation"
                      {...register("isolation")}
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
              </div>

              <div>
                <p className="block mb-2 font-medium">Patient Above 90 kg</p>
                <div className="flex items-center">
                  <FormControl>
                    <Checkbox
                      className={
                        form.formState.errors.patientAbove90kg
                          ? "border-red-500"
                          : ""
                      }
                      id="patientAbove90kg"
                      {...register("patientAbove90kg")}
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
              </div>

              <div
                className={`${
                  transportationData?.typeOfTransport === "collectionOrder" &&
                  "col-span-2"
                }`}
              >
                <FormLabel className="text-[15px] tracking-wide">Special</FormLabel>
                <FormControl>
                  <Input
                    className={
                      `${form.formState.errors.special ? "border-red-500" : ""} mt-2`
                    }
                    {...register("special")}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormMessage />
              </div>
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
