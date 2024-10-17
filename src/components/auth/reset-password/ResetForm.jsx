import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { t } from "i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ResetForm() {
  const formSchema = z.object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Card className="w-[500px] px-5 py-5">
      <CardHeader className="">
        <CardTitle className="text-center">{t("reset_password")}</CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                type="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{t("password")}</FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.password !== undefined
                              ? "border-red-500"
                              : ""
                          }
                          placeholder={t("placeholder_password")}
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                type="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{t("confirm_password")}</FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.confirmPassword !== undefined
                              ? "border-red-500"
                              : ""
                          }
                          placeholder={t("placeholder_confirm_password")}
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <Button type="submit" className="mt-6 block w-2/4 mx-auto">
              {t("reset_password_button")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
