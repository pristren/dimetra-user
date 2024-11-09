/* eslint-disable react/prop-types */
import { z } from "zod";
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
import { useTranslation } from "react-i18next";

const ReopenBillingDetails = ({
  handleFormChange,
  reopenOrderData,
  setReopenOrderData,
  setShowPreview,
}) => {
  const { t } = useTranslation();
  const {
    pre_name = "",
    contact_phone = "",
    name = "",
    street = "",
    place = "",
    contact = "",
  } = reopenOrderData.billingDetailsData || {};

  const formSchema = z.object({
    preName: z.string().min(1, t("prename_institution_is_required")),
    name: z.string().min(1, t("name_is_required")),
    street: z.string().min(1, t("street_is_required")),
    place: z.string().min(1, t("place_is_required")),
    contact: z.string().min(1, t("contact_is_required")),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pre_name,
      contact_phone,
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
    setReopenOrderData((prev) => ({
      ...prev,
      billingDetailsData: {
        ...prev.billingDetailsData,
        [name]: value,
      },
    }));
  };

  return (
    <Card className="lg:px-5 lg:py-5">
      <CardHeader>
        <CardTitle className="title">
          {t("billing_address")} ({t("optional")})
        </CardTitle>
      </CardHeader>
      <CardContent className="lg:px-10">
        <Form {...form}>
          <form>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="pre_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      {t("first_name")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={errors.preName ? "border-red-500" : ""}
                        placeholder={t("type_your_prename_or_institution")}
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
                    <FormLabel className="font-normal">
                      {t("last_name")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={errors.name ? "border-red-500" : ""}
                        placeholder={t("type_your_name")}
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
                    <FormLabel className="font-normal">{t("street")}</FormLabel>
                    <FormControl>
                      <Input
                        className={errors.street ? "border-red-500" : ""}
                        placeholder={t("type_your_street")}
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
                    <FormLabel className="font-normal">{t("place")}</FormLabel>
                    <FormControl>
                      <Input
                        className={errors.place ? "border-red-500" : ""}
                        placeholder={t("type_your_place")}
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
                    <FormLabel className="font-normal">
                      {t("contact")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={errors.contact ? "border-red-500" : ""}
                        placeholder={t("type_your_contact_number")}
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
                name="contact_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">
                      {t("contact_phone")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={errors.contact ? "border-red-500" : ""}
                        placeholder={t("type_your_contact_number")}
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
              //   isDisabled={billingProgress < 100}
              handleGoPrev={() => handleFormChange("destinationDetails")}
              handleGoNext={(e) => {
                e.preventDefault();
                if (reopenOrderData?.recurringData?.recurring_type === "free") {
                  if (
                    reopenOrderData?.recurringData?.free_dates_return_time ===
                    "undefined:undefined"
                  ) {
                    setReopenOrderData((prev) => ({
                      ...prev,
                      recurringData: {
                        ...prev.recurringData,
                        start_date: null,
                        return_date: null,
                        start_time: "",
                        return_time: "",
                        multiple_week_days: [],
                        ends: "",
                        free_dates_return_time: "",
                      },
                    }));
                  }
                } else if (
                  reopenOrderData?.recurringData?.recurring_type === "week"
                ) {
                  if (
                    reopenOrderData?.recurringData?.return_time ===
                    "undefined:undefined"
                  ) {
                    setReopenOrderData((prev) => ({
                      ...prev,
                      recurringData: {
                        ...prev.recurringData,
                        free_dates: [new Date()],
                        free_dates_start_time: "",
                        free_dates_return_time: "",
                        return_time: "",
                      },
                    }));
                  } else {
                    setReopenOrderData((prev) => ({
                      ...prev,
                      recurringData: {
                        ...prev.recurringData,
                        free_dates: [new Date()],
                        free_dates_start_time: "",
                        free_dates_return_time: "",
                      },
                    }));
                  }
                }
                setShowPreview(true);
              }}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ReopenBillingDetails;
