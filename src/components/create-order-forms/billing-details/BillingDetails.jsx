/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import BackAndNextBtn from "@/components/common/BackAndNextBtn";
import { useEffect } from "react";
import { calculateFormProgress } from "@/utils";

const BillingDetails = ({
  handleFormChange,
  billingDetailsData,
  setBillingDetailsData,
  setBillingProgress,
}) => {
  const { preName, name, street, place, contact } = billingDetailsData;
  const fieldsFilled = [preName, name, street, place, contact];

  useEffect(() => {
    setBillingProgress(calculateFormProgress(fieldsFilled));
  }, [preName, name, street, place, contact]);

  const formSchema = z.object({
    preName: z.string().min(1, "Prename/Institution is required"),
    name: z.string().min(1, "Name is required"),
    street: z.string().min(1, "Street is required"),
    place: z.string().min(1, "Place is required"),
    contact: z.string().min(1, "Contact is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preName: billingDetailsData.preName,
      name: billingDetailsData.name,
      street: billingDetailsData.street,
      place: billingDetailsData.place,
      contact: billingDetailsData.contact,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetailsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card className="w-[65%] px-5 py-5">
      <CardHeader>
        <CardTitle>Billing Address</CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form>
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="preName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prename/Institution</FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.preName ? "border-red-500" : ""
                        }
                        placeholder="Type your prename or institution"
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.name ? "border-red-500" : ""
                        }
                        placeholder="Type your name"
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
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.street ? "border-red-500" : ""
                        }
                        placeholder="Type your street"
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
                name="place"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Place</FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.place ? "border-red-500" : ""
                        }
                        placeholder="Type your place"
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
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.contact ? "border-red-500" : ""
                        }
                        placeholder="Type your contact number"
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
              isLastPage={true}
              handleGoPrev={() => handleFormChange("destinationDetails")}
              handleGoNext={() => handleFormChange("previewDetails")}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BillingDetails;
