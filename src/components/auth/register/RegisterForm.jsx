/* eslint-disable no-unused-vars */
import { z } from "zod";
import axios from "axios";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AppUserDetails from "@/components/common/AppUserDetails";
import { registerAnUser } from "../apis/register";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "@/utils";
import AppModal from "@/components/common/AppModal";
import { TickMarkImage } from "@/assets/icons";
import toast from "react-hot-toast";
import { t } from "i18next";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const formSchema = z
  .object({
    first_name: z.string().min(1, { message: "First name is required" }),
    last_name: z.string().min(1, { message: "Last name is required" }),
    email: z.string().refine((value) => validateEmail(value), {
      message: "Please enter a valid email address",
    }),
    phone: z.string().min(1, { message: "Phone is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    billing_address: z.string().optional(),
    code: z.string().min(1, { message: "Code is required" }),
    place: z.string().min(1, { message: "Code is required" }),
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
      place: "",
      internal_cost_center: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const { confirmPassword, ...submitData } = data;

    try {
      // Upload the file and register the user
      const profile_image = await uploadFile(selectedFile);
      await registerAnUser({
        ...submitData,
        profile_image: profile_image || "",
      }).then((res) => {
        console.log(res);
        // when email will work uncomment below code
        // navigate(`/verify-email-sent?token=${res.data.token}`);
        toast.success("Registration successful.Please login to continue!");
        navigate("/login");
      });
    } catch (err) {
      toast.error(
        err.response.data.message || "There was an error creating account"
      );
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <Card className="w-11/12 md:w-1/2 px-5 py-5">
      <CardHeader className="mb-4">
        <CardTitle className="text-center">{t("register")}</CardTitle>
      </CardHeader>
      <AppUserDetails
        form={form}
        onSubmit={onSubmit}
        isRegister={true}
        customClass={"min-h-min"}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        loading={loading}
      />
      {/* {showModal && (
        <AppModal
          icon={<TickMarkImage />}
          head="Registration Successful"
          details="You have been successfully registered! Thank you for joining us."
          buttonText="Login"
          onClose={closeModal}
        />
      )} */}
    </Card>
  );
};

export default RegisterForm;
