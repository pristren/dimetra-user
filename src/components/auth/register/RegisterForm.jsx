/* eslint-disable no-unused-vars */
import AuthFooter from "@/components/helper-ui/AuthFooter";
import { Avatar } from "@/components/ui/avatar";
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
import { Label } from "@/components/ui/label";
import {
  Camera,
  CircleUserRound,
  Plus,
  UserRound,
  UserRoundPen,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerAnUser } from "../apis/register";
import { useNavigate } from "react-router-dom";
import AppUserDetails from "@/components/common/AppUserDetails";

const RegisterForm = () => {
  const navigate = useNavigate();
  const form = useForm({
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
    await registerAnUser(data).then((res) => {
      if (res?.data?.token) {
        navigate("/login");
      }
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
