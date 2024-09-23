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

import { Link, useNavigate } from "react-router-dom";
import { setAccessToken, setUserInfo } from "@/redux/slices/user/userSlice";
import { loginAnUser } from "../apis/login";
import { Loading } from "@/assets/icons";
import { useState } from "react";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const formSchema = z.object({
    email: z.string().refine((value) => validateEmail(value), {
      message: "Please enter a valid email address",
    }),
    password: z.string().min(1, { message: "Password cannot be empty" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "a@b.com",
      password: "123456",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    await loginAnUser(values)
      .then((res) => {
        if (res?.data?.token) {
          dispatch(
            setUserInfo({
              ...res?.data?.user,
              id: res?.data?.user?._id,
            })
          );
          dispatch(setAccessToken(res?.data?.token));
          localStorage.setItem("access_token", res?.data?.token);
          navigate("/orders/all-orders");
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

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
                        type="email"
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
                        type="password"
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
              <Link
                to="/forgot-password"
                className="text-[#6F767E] font-normal tracking-wide text-destructive underline text-sm cursor-pointer"
              >
                Forgot your password?
              </Link>
            </div>
            <Button type="submit" className="block w-2/4 mx-auto">
              {loading ? (
                <Loading className="w-6 h-6 mx-auto text-white" />
              ) : (
                "Login"
              )}
            </Button>
            <AuthFooter page={"login"} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
