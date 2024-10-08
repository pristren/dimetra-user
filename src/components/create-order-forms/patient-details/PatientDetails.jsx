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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { t } from "i18next";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const PatientDetails = ({
  handleFormChange,
  setPatientProgress,
  createOrderData,
  setCreateOrderData,
  patientProgress,
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
    <Card className="lg:px-5 lg:py-5">
      <CardHeader>
        <CardTitle className="title">{t("patient_details")}</CardTitle>
      </CardHeader>
      <CardContent className="lg:px-10">
        <Form {...form}>
          <form>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      {createOrderData.transportationData?.type_of_transport ===
                      "collection_order"
                        ? t("name_collection")
                        : t("name")}
                      <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.name ? "border-red-500" : ""
                        }
                        placeholder={t("enter_patient_name")}
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
                        ? t("number_patients")
                        : t("surname")}
                      <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.surname ? "border-red-500" : ""
                        }
                        placeholder={t("enter_patient_surname")}
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
                        {t("date_of_birth")}
                        <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-between gap-4 text-left font-normal",
                                  !field.value && "text-muted-foreground "
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>{t("Pick a date")}</span>
                                )}
                                <div className="w-6 h-6 rounded-full p-1  flex justify-center items-center bg-primary text-white">
                                  <CalendarIcon className="w-4 h-4" />
                                </div>
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <div className="p-3">
                              <Select
                                onValueChange={(value) => {
                                  const newDate = new Date(
                                    field.value || new Date()
                                  );
                                  newDate.setFullYear(parseInt(value));
                                  form.setValue("date_of_birth", newDate);
                                }}
                                value={
                                  field.value
                                    ? new Date(field.value)
                                        .getFullYear()
                                        .toString()
                                    : ""
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select year" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from(
                                    {
                                      length:
                                        new Date().getFullYear() - 1900 + 1,
                                    },
                                    (_, i) => (
                                      <SelectItem
                                        key={i}
                                        value={(
                                          new Date().getFullYear() - i
                                        ).toString()}
                                      >
                                        {new Date().getFullYear() - i}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="p-3 pt-0">
                              <Calendar
                                key={field.value}
                                mode="single"
                                selected={
                                  field.value ? new Date(field.value) : null
                                }
                                onSelect={(date) => {
                                  field.onChange(date);
                                  setCreateOrderData((prev) => ({
                                    ...prev,
                                    patientData: {
                                      ...prev.patientData,
                                      date_of_birth: date,
                                    },
                                  }));
                                }}
                                defaultMonth={field.value}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
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
                        ? t("cost_center")
                        : t("area_room")}
                      <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.area_room
                            ? "border-red-500"
                            : ""
                        }
                        placeholder={t("enter_patient_area_room")}
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
                        ? t("how_much")
                        : t("cost_center")}
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
                        placeholder={t("enter_cost_center")}
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
                    <FormLabel className="font-normal">
                      {t("how_much")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.how_much ? "border-red-500" : ""
                        }
                        placeholder={t("enter_amount")}
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
                  <FormItem className="hidden lg:block">
                    <FormLabel className="block mb-5 font-normal">
                      {t("isolation")}
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
                        {t("yes")}
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
                  <FormItem className="hidden lg:block">
                    <FormLabel className="block mb-5 font-normal">
                      {t("patient_above_90kg")}
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
                        {t("yes")}
                      </Label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isolation"
                render={({ field }) => (
                  <FormItem className="lg:hidden">
                    <FormLabel className="block mb-5 font-normal">
                      {t("isolation")}
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const booleanValue = value === "yes";
                        handleInputChange({
                          target: {
                            name: "isolation",
                            value: booleanValue,
                          },
                        });
                        field.onChange(booleanValue);
                      }}
                      value={field.value ? "yes" : "no"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("select_isolation")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">{t("yes")}</SelectItem>
                        <SelectItem value="no">{t("no")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="patient_above_90kg"
                render={({ field }) => (
                  <FormItem className="lg:hidden">
                    <FormLabel className="block mb-5 font-normal">
                      {t("patient_above_90kg")}
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const booleanValue = value === "yes";
                        handleInputChange({
                          target: {
                            name: "patient_above_90kg",
                            value: booleanValue,
                          },
                        });
                        field.onChange(booleanValue);
                      }}
                      value={field.value ? "yes" : "no"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("select_option")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">{t("yes")}</SelectItem>
                        <SelectItem value="no">{t("no")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="special_note"
                render={({ field }) => (
                  <FormItem className="lg:col-span-2">
                    <FormLabel className="font-normal">
                      {t("special_note")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={`${
                          form.formState.errors.special_note
                            ? "border-red-500"
                            : ""
                        }`}
                        placeholder={t("enter_note")}
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
