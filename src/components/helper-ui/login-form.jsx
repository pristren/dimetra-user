import { z } from "zod";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const formSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long ",
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
        }
      ), // with case sensitive
    // confirmPassword: z.string().refine((data) => data === formSchema.password, {
    //   message: "Passwords do not match",
    // }),
  });
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Card className="w-[450px] px-5 py-5">
      <CardHeader className="mb-4">
        <CardTitle className="text-center">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                type="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
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
              <FormField
                control={form.control}
                name="password"
                type="text"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          className={
                            form.formState.errors.password !== undefined
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Type your password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="flex justify-between mt-4 mb-8">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label
                  className="text-[#6F767E] font-normal tracking-wide cursor-pointer"
                  htmlFor="remember"
                >
                  Remember me
                </Label>
              </div>
              <p className="text-destructive underline text-sm cursor-pointer">
                Forgot your password?
              </p>
            </div>
            <Button type="submit" className="block w-2/4 mx-auto">
              Login
            </Button>
            <Link to="/register" className="block text-center mt-4 text-sm ">
              Don&#39;t have an account?{" "}
              <span className="underline text-blue-600">Regiester Now</span>
            </Link>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
