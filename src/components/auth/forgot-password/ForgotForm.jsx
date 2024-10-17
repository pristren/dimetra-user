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

export default function ForgotForm() {
  const formSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
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
        <CardTitle className="text-center">{t("forgot_password")}</CardTitle>
        <h2 className="text-center pt-4 text-base">
          {t('enter_email_address')}
        </h2>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="mb-6">
              <FormField
                control={form.control}
                name="email"
                type="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.email !== undefined
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="your@email.com"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <Button type="submit" className="block w-2/4 mx-auto">
              {t('continue')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
