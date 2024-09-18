/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Camera, CircleUserRound, Plus } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthFooter from "@/components/helper-ui/AuthFooter";
import AppDialog from "./AppDialog";
import { Checkbox } from "../ui/checkbox";

const AppUserDetails = ({ onSubmit, form, isRegister }) => {
  const [hover, setHover] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };
  return (
    <CardContent className="px-10 max-h-[80vh] overflow-y-auto hide-scrollbar">
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
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    First Name <sup className="text-[13px]">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={
                        form.formState.errors.first_name ? "border-red-500" : ""
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
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Last Name <sup className="text-[13px]">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={
                        form.formState.errors.last_name ? "border-red-500" : ""
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
              name="billing_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billing Address</FormLabel>
                  <FormControl>
                    <Input
                      className={
                        form.formState.errors.billing_address
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
              name="internal_cost_center"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Internal Cost Center</FormLabel>
                  <FormControl>
                    <Input
                      className={
                        form.formState.errors.internal_cost_center
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
            {isRegister && (
              <>
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
                            form.formState.errors.password
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
              </>
            )}
          </div>
          {isRegister && (
            <Button type="submit" className="block w-2/4 mx-auto mt-10">
              Register
            </Button>
          )}
          {!isRegister && (
            <AppDialog
              className="w-[20%]"
              trigger={
                <div className="w-full flex items-center justify-center">
                  <Button className="mt-10 px-12 w-max mx-auto">Save</Button>
                </div>
              }
              title="Sure you want to Save changes?"
              content={
                <div>
                  <p className="my-2">Are you sure you want to accept this?</p>
                  <div className="flex items-center justify-start gap-2 my-5">
                    <Checkbox id="doNotShow" />
                    <Label htmlFor="doNotShow">Don’t show this again</Label>
                  </div>
                  <div className="flex items-center justify-center w-full gap-3 mt-5">
                    <Button variant="outline" className="w-full">No, Cancel</Button>
                    <Button className="w-full">Yes, Confirm</Button>
                  </div>
                </div>
              }
            />
          )}
          {isRegister && <AuthFooter page={"register"} />}
        </form>
      </Form>
    </CardContent>
  );
};

export default AppUserDetails;