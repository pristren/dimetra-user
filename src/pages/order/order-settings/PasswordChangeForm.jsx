/* eslint-disable react/prop-types */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loading } from "@/assets/icons";
import { t } from "i18next";
const PasswordChangeForm = ({ onSubmit, loading }) => {
  const formSchema = z
    .object({
      current_password: z.string().min(1, "Current password is required"),
      new_password: z.string().min(1, "New password is required"),
      confirm_password: z.string().min(1, "Confirm password is required"),
    })
    .refine((data) => data.new_password === data.confirm_password, {
      message: "Passwords do not match",
      path: ["confirm_password"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  return (
    <Card className="border-none shadow-none mt-2 ">
      <CardContent className="px-2 pb-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-5">
              <FormField
                control={form.control}
                name="current_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("current_password")}
                      <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t("enter_your_current_password")}
                        className={
                          form.formState.errors.current_password
                            ? "border-red-500"
                            : ""
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.current_password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("new_password")}
                      <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t("enter_your_new_password")}
                        className={
                          form.formState.errors.new_password
                            ? "border-red-500"
                            : ""
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.new_password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("confirm_password")}
                      <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t("confirm_your_new_password")}
                        className={
                          form.formState.errors.confirm_password
                            ? "border-red-500"
                            : ""
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.confirm_password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-center w-full gap-3 mt-5">
                <Button variant="outline" className="w-full">
                  {t("cancel")}
                </Button>
                <Button className="w-full" type="submit">
                  {loading ? (
                    <Loading className="w-6 h-6 mx-auto text-white" />
                  ) : (
                    `${t("update_password")}`
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PasswordChangeForm;
