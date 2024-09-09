/* eslint-disable no-unused-vars */
import { z } from "zod";
import BackAndNext from "@/components/common/BackAndNext";
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
import { DatePicker } from "@/components/ui/DatePIcker";
import AppSelect from "@/components/common/AppSelect";

const DestinationDetails = ({handleFormChange}) => {
  const formSchema = z.object({
    // Pick-Up fields
    pickUpName: z.string().min(1, "Name is required"),
    pickUpAddress: z.string().min(1, "Address is required"),
    pickUpCity: z.string().min(1, "City is required"),
    pickUpCountry: z.string().min(1, "Country is required"),
    pickUpEmployeeName: z.string().min(1, "Working Employee Name is required"),

    // Drop-Off fields
    dropOffDate: z.string().min(1, "Date is required"),
    dropOffPickUpTime: z.string().min(1, "Pick-Up Time is required"),
    dropOffName: z.string().min(1, "Name is required"),
    dropOffAddress: z.string().min(1, "Address is required"),
    dropOffCity: z.string().min(1, "City is required"),
    dropOffCountry: z.string().min(1, "Country is required"),
    dropOffPhone: z.string().min(1, "Phone is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Pick-Up fields
      pickUpName: "",
      pickUpAddress: "",
      pickUpCity: "",
      pickUpCountry: "",
      pickUpEmployeeName: "",

      // Drop-Off fields
      dropOffDate: "",
      dropOffPickUpTime: "",
      dropOffName: "",
      dropOffAddress: "",
      dropOffCity: "",
      dropOffCountry: "",
      dropOffPhone: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <Card className="w-[65%] px-5 py-5">
      <CardHeader>
        <CardTitle>Destination Details</CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-5">
              <div className="pr-5">
                <h2 className="text-xl font-semibold mb-4">Pick-Up</h2>
                <FormField
                  control={form.control}
                  name="pickUpName"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Name / Institution <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.pickUpName
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Pre filled"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pickUpAddress"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Address <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.pickUpAddress
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Pre filled"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pickUpCity"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        City <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.pickUpCity
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Enter City Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pickUpCountry"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Country <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.pickUpCountry
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Enter Country "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pickUpEmployeeName"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Working Employee Name{" "}
                        <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.pickUpEmployeeName
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Type the working employee's name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pl-5">
                <h2 className="text-xl font-semibold mb-4">Drop-Off</h2>
                <FormField
                  control={form.control}
                  name="dropOffDate"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Date <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <DatePicker />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dropOffPickUpTime"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Abholzeit <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.dropOffPickUpTime
                              ? "border-red-500"
                              : ""
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dropOffName"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Name / Institution <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.dropOffName
                              ? "border-red-500"
                              : ""
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dropOffAddress"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Address <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.dropOffAddress
                              ? "border-red-500"
                              : ""
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dropOffCity"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        City <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.dropOffCity
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Enter City Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dropOffCountry"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Country <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.dropOffCountry
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Enter Country "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dropOffPhone"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.dropOffPhone
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Type the phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <h2 className="text-xl font-semibold mt-8 mb-4">Rückfahrt</h2>
                <FormField
                  control={form.control}
                  name="dropOffDate"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>
                        Date <sup className="text-[13px]">*</sup>
                      </FormLabel>
                      <FormControl>
                        <DatePicker />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="today"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>Today</FormLabel>
                      <FormControl>
                        <AppSelect
                          items={["1 day letter", "2 day letter", "3 day letter"]}
                          placeholder="1 day letter"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.dropOffPhone
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="20:54"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel>Stock / Abteilung</FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.dropOffPhone
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Type the phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <BackAndNext isFillForm={true} back="patient" next ="billing" handleFormChange={handleFormChange}/>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DestinationDetails;
