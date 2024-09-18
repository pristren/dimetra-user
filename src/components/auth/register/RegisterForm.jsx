
/* eslint-disable no-unused-vars */
import { z } from "zod";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AppUserDetails from "@/components/common/AppUserDetails";
import { registerAnUser } from "../apis/register";
import { useNavigate } from "react-router-dom";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const formSchema = z
  .object({
    first_name: z.string().nonempty({ message: "First name is required" }),
    last_name: z.string().nonempty({ message: "Last name is required" }),
    email: z.string().refine((value) => validateEmail(value), {
      message: "Please enter a valid email address",
    }),
    phone: z.string().nonempty({ message: "Phone is required" }),
    address: z.string().nonempty({ message: "Address is required" }),
    billing_address: z.string().optional(),
    code: z.string().nonempty({ message: "Code is required" }),
    internal_cost_center: z.string().optional(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      billing_address: "",
      code: "",
      internal_cost_center: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    const { confirmPassword, ...submitData } = data;
    await registerAnUser(submitData)
      .then((res) => {
        if (res?.data?.token) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card className="w-11/12 md:w-1/2 px-5 py-5">
      <CardHeader className="mb-4">
        <CardTitle className="text-center">Register</CardTitle>
      </CardHeader>
      <AppUserDetails form={form} onSubmit={onSubmit} isRegister={true} />
    </Card>
  );
};

export default RegisterForm;
