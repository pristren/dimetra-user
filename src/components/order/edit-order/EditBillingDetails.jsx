/* eslint-disable react/prop-types */
import { z } from "zod";
import { t } from "i18next";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loading } from "@/assets/icons";

const EditBillingDetails = ({
  editOrderData,
  setEditOrderData,
  handleUpdate,
  loading,
}) => {
  const {
    pre_name = "",
    name = "",
    street = "",
    place = "",
    contact = "",
  } = editOrderData.billingDetailsData || {};
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
    setEditOrderData((prev) => ({
      ...prev,
      billingDetailsData: {
        ...prev.billingDetailsData,
        [name]: value,
      },
    }));
  };
  useEffect(() => {
    form.reset(editOrderData.billingDetailsData);
  }, [editOrderData.billingDetailsData, form]);
  return (
    <Card className="p-6 border-none rounded-none">
      <h4 className="px-3">{t("billing_address")}</h4>
      <CardContent className="px-3 mt-4">
        <Form {...form}>
          <form>
            <div className="grid grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="pre_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("prename_institution")}</FormLabel>
                    <FormControl>
                      <Input
                        className={errors.preName ? "border-red-500" : ""}
                        placeholder={t("type_prename_or_institution")}
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
                    <FormLabel>{t("name")}</FormLabel>
                    <FormControl>
                      <Input
                        className={errors.name ? "border-red-500" : ""}
                        placeholder={t("type_name")}
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
              <div></div>
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("street")}</FormLabel>
                    <FormControl>
                      <Input
                        className={errors.street ? "border-red-500" : ""}
                        placeholder={t("type_street")}
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
                    <FormLabel>{t("place")}</FormLabel>
                    <FormControl>
                      <Input
                        className={errors.place ? "border-red-500" : ""}
                        placeholder={t("type_place")}
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
                    <FormLabel>{t("contact")}</FormLabel>
                    <FormControl>
                      <Input
                        className={errors.contact ? "border-red-500" : ""}
                        placeholder={t("type_contact_number")}
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
          </form>
        </Form>
        <div className="flex items-center justify-center my-10">
          <Button onClick={handleUpdate}>
            {loading ? (
              <Loading className="w-6 h-6 mx-auto text-white" />
            ) : (
              t("update")
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditBillingDetails;
