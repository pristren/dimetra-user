import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import AuthFooter from "@/components/helper-ui/AuthFooter";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { setAccessToken, setUser } from "@/redux/slices/user/userSlice";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values) {
    dispatch(setUser({ email: values.email }));
    dispatch(setAccessToken("123456"));

    localStorage.setItem("user", JSON.stringify({ email: values.email }));
    localStorage.setItem("accessToken", "123456");

    navigate("/order/all-orders");
  }

  return (
    <Card className="w-[480px] px-5 py-5">
      <CardHeader className="mb-4">
        <CardTitle className="text-center">Sign In</CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                type="email"
                render={({ field }) => (
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
                )}
              />
              <FormField
                control={form.control}
                name="password"
                type="password"
                render={({ field }) => (
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
                )}
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
            <AuthFooter page={"login"} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
