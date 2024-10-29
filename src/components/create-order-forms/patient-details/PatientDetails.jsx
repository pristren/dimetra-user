/* eslint-disable react/prop-types */
import { z } from "zod";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { t } from "i18next";
import toast from "react-hot-toast";
import moment from "moment";

const PatientDetails = ({
  handleFormChange,
  createOrderData,
  setCreateOrderData,
  patientProgress,
}) => {
  const { patientData } = createOrderData;

  const formSchema = z.object({
    name: z.string().min(1, t("name_required")),
    surname: z.string().min(1, t("surname_required")),
    date_of_birth: z.string().min(1, t("date_of_birth_required")),
    area_room: z.string().min(1, t("area_room_required")),
    how_much: z.string().optional(),
    which: z.string().optional(),
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

  const handleNextForm = (e) => {
    e.preventDefault();
    if (patientData.patient_above_90kg && !patientData.how_much) {
      toast.error(t("how_much_required"));
      return;
    }
    if (patientData.isolation && !patientData.which) {
      toast.error(t("which_required"));
      return;
    }
    handleFormChange("destinationDetails");
  };

  const handleDateInput = (e, field, setCreateOrderData, form, path) => {
    let input = e.target.value.replace(/\D/g, "");
    let formattedDate = input;
    const fieldName = e.target.name;

    if (input.length > 2) {
      formattedDate = `${input.slice(0, 2)}/${input.slice(2)}`;
    }
    if (input.length > 4) {
      formattedDate = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(
        4
      )}`;
    }

    field?.onChange(formattedDate);

    if (formattedDate.length === 10) {
      const [day, month, year] = formattedDate.split("/").map(Number);

      if (
        day >= 1 &&
        day <= 31 &&
        month >= 1 &&
        month <= 12 &&
        year >= 1900 &&
        year <= 2024
      ) {
        const parsedDate = new Date(year, month - 1, day);

        setCreateOrderData((prev) => ({
          ...prev,
          [path]: {
            ...prev[path],
            [fieldName]: parsedDate,
          },
        }));

        form.setValue(fieldName, moment(parsedDate).format("DD/MM/YYYY"));
      } else {
        toast.error(
          "Invalid date. Please enter a valid date between 1900 and 2024."
        );
      }
    }
  };

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
                        placeholder={
                          createOrderData.transportationData
                            ?.type_of_transport === "collection_order"
                            ? t("enter_name_of_the_collection")
                            : t("enter_patients_name")
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
                    <FormLabel className="font-normal">
                      {createOrderData.transportationData?.type_of_transport ===
                      "collection_order"
                        ? t("number_patients")
                        : t("surname")}
                      <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.surname ? "border-red-500" : ""
                        }
                        placeholder={
                          createOrderData.transportationData
                            ?.type_of_transport === "collection_order"
                            ? t("enter_number_of_patients")
                            : t("enter_patients_surname")
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
                        <Input
                          type="text"
                          placeholder={t("dd_mm_yyyy")}
                          maxLength={10}
                          name={field.name}
                          value={
                            field?.value?.includes("T18:00:00.000Z")
                              ? moment(field.value).format("DD/MM/YYYY")
                              : field.value || ""
                          }
                          onChange={(e) =>
                            handleDateInput(
                              e,
                              field,
                              setCreateOrderData,
                              form,
                              "patientData"
                            )
                          }
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
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
                      {t("area_room")}
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

              <div className="flex items-start justify-start gap-5">
                <FormField
                  control={form.control}
                  name="patient_above_90kg"
                  render={({ field }) => (
                    <FormItem className="hidden lg:block">
                      <FormLabel className="block text-nowrap mb-5 font-normal">
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
                            onCheckedChange={(checked) => {
                              handleInputChange({
                                target: {
                                  name: "patient_above_90kg",
                                  type: "checkbox",
                                  checked,
                                },
                              });
                              if (checked === true) {
                                form.setValue("how_much", "");
                                setCreateOrderData((prev) => ({
                                  ...prev,
                                  patientData: {
                                    ...prev.patientData,
                                    how_much: "",
                                  },
                                }));
                              }
                            }}
                            checked={
                              createOrderData.patientData.patient_above_90kg
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

                {createOrderData.patientData.patient_above_90kg && (
                  <FormField
                    control={form.control}
                    name="how_much"
                    render={({ field }) => (
                      <FormItem className="w-9/12 -mt-1">
                        <FormLabel className="font-normal">
                          {t("how_much")}
                          <sup className="text-[13px]">*</sup>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className={
                              form.formState.errors.how_much
                                ? "border-red-500"
                                : ""
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
                )}
              </div>
              <div className="flex items-start justify-start gap-5">
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
                            checked={createOrderData.patientData.isolation}
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
                {createOrderData.patientData.isolation && (
                  <FormField
                    control={form.control}
                    name="which"
                    render={({ field }) => (
                      <FormItem className="w-9/12 -mt-1">
                        <FormLabel className="font-normal">
                          {t("which")}
                          <sup className="text-[13px]">*</sup>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className={
                              form.formState.errors.which
                                ? "border-red-500"
                                : ""
                            }
                            placeholder={t("which")}
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
              </div>

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
            </div>
            <BackAndNextBtn
              isFillForm={true}
              isDisabled={patientProgress < 100}
              handleGoPrev={() => handleFormChange("transportDetails")}
              handleGoNext={(e) => handleNextForm(e)}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PatientDetails;
