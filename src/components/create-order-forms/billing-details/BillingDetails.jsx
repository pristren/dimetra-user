/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
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
      preName: "",
      name: "",
      street: "",
      place: "",
      contact: "",
    },
  });

  const { register, formState } = form;
  const { errors } = formState;

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
              <div>
                <FormLabel className="text-[15px] tracking-wide">
                  Prename/Institution <sup className="text-[13px]">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    className={`${errors.preName ? "border-red-500" : ""} mt-2`}
                    {...register("preName")}
                    onChange={handleInputChange}
                    value={preName}
                    placeholder="Type your prename or institution"
                  />
                </FormControl>
                <FormMessage />
              </div>

              <div>
                <FormLabel className="text-[15px] tracking-wide">
                  Name <sup className="text-[13px]">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    className={`${errors.name ? "border-red-500" : ""} mt-2`}
                    {...register("name")}
                    onChange={handleInputChange}
                    value={name}
                    placeholder="Type your name"
                  />
                </FormControl>
                <FormMessage />
              </div>

              <div>
                <FormLabel className="text-[15px] tracking-wide">
                  Street <sup className="text-[13px]">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    className={`${errors.street ? "border-red-500" : ""} mt-2`}
                    {...register("street")}
                    onChange={handleInputChange}
                    value={street}
                    placeholder="Type your street"
                  />
                </FormControl>
                <FormMessage />
              </div>

              <div>
                <FormLabel className="text-[15px] tracking-wide">
                  Place <sup className="text-[13px]">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    className={`${errors.place ? "border-red-500" : ""} mt-2`}
                    {...register("place")}
                    onChange={handleInputChange}
                    value={place}
                    placeholder="Type your place"
                  />
                </FormControl>
                <FormMessage />
              </div>

              <div>
                <FormLabel className="text-[15px] tracking-wide">
                  Contact <sup className="text-[13px]">*</sup>
                </FormLabel>
                <FormControl>
                  <Input
                    className={`${errors.contact ? "border-red-500" : ""} mt-2`}
                    {...register("contact")}
                    onChange={handleInputChange}
                    value={contact}
                    placeholder="Type your contact number"
                  />
                </FormControl>
                <FormMessage />
              </div>
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
