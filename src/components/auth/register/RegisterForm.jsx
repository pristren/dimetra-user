/* eslint-disable no-unused-vars */
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerAnUser } from "../apis/register";
import { useNavigate } from "react-router-dom";
import AppUserDetails from "@/components/common/AppUserDetails";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    await registerAnUser(data)
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
