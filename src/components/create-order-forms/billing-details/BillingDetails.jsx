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

const BillingDetails = ({ handleFormChange }) => {
  const formSchema = z.object({
    prenameInstitution: z.string().min(1, "Prename/Institution is required"),
    name: z.string().min(1, "Name is required"),
    street: z.string().min(1, "Street is required"),
    place: z.string().min(1, "Place is required"),
    contact: z.string().min(1, "Contact is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prenameInstitution: "",
      name: "",
      street: "",
      place: "",
      contact: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
  };
  return (
    <Card className="w-[65%] px-5 py-5">
      <CardHeader>
        <CardTitle>Billing Address</CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="prenameInstitution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prename/Institution</FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.prenameInstitution
                            ? "border-red-500"
                            : ""
                        }
                        placeholder="Type your prename or institution"
                        {...field}
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <BackAndNextBtn
              isFillForm={true}
              back="destination"
              next="preview"
              handleFormChange={handleFormChange}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BillingDetails;
