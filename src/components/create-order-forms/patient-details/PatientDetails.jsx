/* eslint-disable react/prop-types */
import { z } from "zod";
import BackAndNext from "@/components/common/BackAndNext";
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
import { useEffect } from "react";

const PatientDetails = ({ handleFormChange, setPatientProgress }) => {
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
    defaultValues: {
      name: "",
      surname: "",
      dateOfBirth: "",
      areaRoom: "",
      kostenstelle: "",
      howMuch: "",
      special: "",
      isolation: false,
      patientAbove90kg: false,
    },
  });

  const calculateProgress = () => {
    const fieldsFilled = [
      form.watch("name"),
      form.watch("surname"),
      form.watch("dateOfBirth"),
      form.watch("areaRoom"),
      form.watch("kostenstelle"),
    ];

    const filledCount = fieldsFilled.filter(Boolean).length;
    const progressPercentage = (filledCount / fieldsFilled.length) * 100;

    setPatientProgress(progressPercentage);
  };

  useEffect(() => {
    calculateProgress();
  }, [form.watch()]);

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <Card className="w-[65%] px-5 py-5">
      <CardHeader>
        <CardTitle>Patient Details</CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.name ? "border-red-500" : ""
                        }
                        placeholder="Type your name"
                        {...field}
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
                      Surname <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.surname ? "border-red-500" : ""
                        }
                        placeholder="Type your surname"
                        {...field}
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
                      Date of Birth <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.dateOfBirth
                            ? "border-red-500"
                            : ""
                        }
                        placeholder="Type your date of birth"
                        {...field}
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
                      Area/Room <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.areaRoom ? "border-red-500" : ""
                        }
                        placeholder="Type your area or room"
                        {...field}
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
                      Kostenstelle <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.kostenstelle
                            ? "border-red-500"
                            : ""
                        }
                        placeholder="Type your kostenstelle"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="howMuch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How Much</FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.howMuch ? "border-red-500" : ""
                        }
                        placeholder="Type how much"
                        {...field}
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
                    <p className="block mb-2 font-medium">Isolation</p>
                    <div className="flex items-center">
                      <FormControl>
                        <Checkbox
                          className={
                            form.formState.errors.isolation
                              ? "border-red-500"
                              : ""
                          }
                          {...field}
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
                          className={
                            form.formState.errors.patientAbove90kg
                              ? "border-red-500"
                              : ""
                          }
                          {...field}
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
                  <FormItem>
                    <FormLabel>Special</FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.special ? "border-red-500" : ""
                        }
                        placeholder="Type any special requirements"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <BackAndNext
              isFillForm={true}
              back="transport"
              next="destination"
              handleFormChange={handleFormChange}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PatientDetails;
