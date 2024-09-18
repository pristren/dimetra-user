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

const PasswordChangeForm = ({ onSubmit }) => {
  const formSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(1, "New password is required"),
    confirmPassword: z
      .string()
      .min(1, "Confirm password is required")
      .refine((val, ctx) => val === ctx.parent.newPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <Card className="border-none px-0 mt-10">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-5">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Current Password<sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your current password"
                        className={
                          form.formState.errors.currentPassword
                            ? "border-red-500"
                            : ""
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.currentPassword?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      New Password<sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your new password"
                        className={
                          form.formState.errors.newPassword
                            ? "border-red-500"
                            : ""
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.newPassword?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Confirm Password<sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your new password"
                        className={
                          form.formState.errors.confirmPassword
                            ? "border-red-500"
                            : ""
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.confirmPassword?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-center w-full gap-3 mt-5">
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
                <Button className="w-full" type="submit">
                  Save
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
