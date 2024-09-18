/* eslint-disable react/prop-types */
import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import BackAndNextBtn from "@/components/common/BackAndNextBtn";
import { calculateFormProgress } from "@/utils";

const BillingDetails = ({
  handleFormChange,
  createOrderData,
  setCreateOrderData,
  setBillingProgress,
  billingProgress
}) => {
  const {
    pre_name = "",
    name = "",
    street = "",
    place = "",
    contact = "",
  } = createOrderData.billingDetailsData || {};

  const fieldsFilled = [pre_name, name, street, place, contact];

  useEffect(() => {
    setBillingProgress(calculateFormProgress(fieldsFilled));
  }, [...fieldsFilled]);

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
      pre_name,
      name,
      street,
      place,
      contact,
    },
  });

  const { formState } = form;
  const { errors } = formState;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateOrderData((prev) => ({
      ...prev,
      billingDetailsData: {
        ...prev.billingDetailsData,
        [name]: value,
      },
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
                name="pre_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prename/Institution</FormLabel>
                    <FormControl>
                      <Input
                        className={errors.preName ? "border-red-500" : ""}
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
                        className={errors.name ? "border-red-500" : ""}
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
                        className={errors.street ? "border-red-500" : ""}
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
                        className={errors.place ? "border-red-500" : ""}
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
                        className={errors.contact ? "border-red-500" : ""}
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
              isDisabled={billingProgress < 100}
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
