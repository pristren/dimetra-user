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

const RegisterForm = () => {
  const [hover, setHover] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      billingAddress: "",
      code: "",
      internalCostCenter: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // Create a URL for the selected image
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Card className="w-1/2 px-5 py-5">
      <CardHeader className="mb-4">
        <CardTitle className="text-center">Register</CardTitle>
      </CardHeader>
      <CardContent className="px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div
              className="flex justify-center w-[150px] h-[150px] mx-auto relative mb-12"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <Avatar
                className={`w-[150px] h-[150px] relative transition-all duration-300 ${
                  hover && !profileLoading
                    ? "filter brightness-50 cursor-pointer"
                    : ""
                }`}
              >
                {profileLoading ? (
                  <div className="flex justify-center items-center mx-auto">
                    <l-line-spinner
                      size="20"
                      stroke="3"
                      speed="1"
                      color="white"
                    ></l-line-spinner>
                  </div>
                ) : (
                  <>
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <CircleUserRound className="w-[150px] h-[150px] mx-auto text-primary" />
                    )}
                  </>
                )}
              </Avatar>

              {!profileLoading && (
                <>
                  <Label
                    htmlFor="profileImage"
                    className={`cursor-pointer absolute inset-0 flex items-center justify-center ${
                      hover ? "z-30" : "hidden"
                    }`}
                  >
                    <Camera className="text-white" />
                  </Label>
                  <Label
                    htmlFor="profileImage"
                    className={`cursor-pointer absolute -right-1 p-2 bg-primary rounded-full bottom-3 ${
                      hover ? "hidden" : "z-30"
                    }`}
                  >
                    <Plus className="text-white" />
                  </Label>
                </>
              )}
              <Input
                type="file"
                onChange={handleFileInputChange}
                className="hidden"
                name="profileImage"
                accept="image/*"
                id="profileImage"
                disabled={profileLoading}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.firstName
                            ? "border-red-500"
                            : ""
                        }
                        placeholder="John"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.lastName ? "border-red-500" : ""
                        }
                        placeholder="Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.email ? "border-red-500" : ""
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.phone ? "border-red-500" : ""
                        }
                        placeholder="123-456-7890"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Address <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.address ? "border-red-500" : ""
                        }
                        placeholder="123 Main St"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="billingAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Address</FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.billingAddress
                            ? "border-red-500"
                            : ""
                        }
                        placeholder="456 Elm St"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Code <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.code ? "border-red-500" : ""
                        }
                        placeholder="Code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="internalCostCenter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Internal Cost Center</FormLabel>
                    <FormControl>
                      <Input
                        className={
                          form.formState.errors.internalCostCenter
                            ? "border-red-500"
                            : ""
                        }
                        placeholder="Cost Center"
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
                    <FormLabel>
                      Password <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className={
                          form.formState.errors.password ? "border-red-500" : ""
                        }
                        placeholder="Type your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Confirm Password <sup className="text-[13px]">*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className={
                          form.formState.errors.confirmPassword
                            ? "border-red-500"
                            : ""
                        }
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="block w-2/4 mx-auto mt-10">
              Register
            </Button>
            <AuthFooter page={"register"} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
