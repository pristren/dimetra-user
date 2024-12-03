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
import { cn } from "@/lib/utils";
import { Loading } from "@/assets/icons";
import { t } from "i18next";
import { Checkbox } from "@/components/ui/checkbox";
import parse from "html-react-parser";
import GoogleLocation from "./GoogleLocation";

const AppUserDetails = ({
  onSubmit,
  form,
  isRegister = false,
  customClass = "",
  selectedFile,
  setSelectedFile,
  loading,
}) => {
  const [hover, setHover] = useState(false);
  const [changeInput, setChangeInput] = useState("");

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleLocationChangeForPickup = (locationData) => {
    form.setValue("address", locationData.formatted_address || "");
    form.setValue("code", locationData.postalCode || "");
    form.setValue("place", locationData.country || "");
    form.setValue("city", locationData.city || "");
    form.setValue("geo_location", {
      latitude: locationData.geometry?.location?.lat,
      longitude: locationData.geometry?.location?.lng,
    });
  };

  return (
    <CardContent
      className={cn(
        `lg:px-10 max-h-[90vh] overflow-y-auto hide-scrollbar ${
          !isRegister && "pb-0"
        }`,
        customClass
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div
            className="flex justify-center w-[150px] h-[150px] mx-auto relative mb-12"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Avatar
              className={`w-[150px] h-[150px] relative transition-all duration-300 ${
                hover ? "filter brightness-50 cursor-pointer" : ""
              }`}
            >
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : form.getValues()?.profile_image ? (
                <img
                  loading="lazy"
                  src={form.getValues()?.profile_image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <CircleUserRound className="w-[150px] h-[150px] mx-auto text-primary" />
              )}
            </Avatar>

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

            <Input
              type="file"
              onChange={handleFileInputChange}
              className="hidden"
              name="profileImage"
              accept="image/*"
              id="profileImage"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 text-left gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("first_name")} <sup className="text-[13px]">*</sup>
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
                    {t("last_name")} <sup className="text-[13px]">*</sup>
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
                    {t("email")} <sup className="text-[13px]">*</sup>
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
                    {t("phone")} <sup className="text-[13px]">*</sup>
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
                    {t("address")} <sup className="text-[13px]">*</sup>
                  </FormLabel>
                  <FormControl>
                    <GoogleLocation
                      onPlaceSelect={handleLocationChangeForPickup}
                      selectedPlace={form.getValues("address")}
                      setChangeInput={setChangeInput}
                      changeInput={changeInput}
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
                  <FormLabel>{t("billing_address")}</FormLabel>
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
                    {t("code")} <sup className="text-[13px]">*</sup>
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
              name="place"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("country")} <sup className="text-[13px]">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={
                        form.formState.errors.code ? "border-red-500" : ""
                      }
                      placeholder="Country"
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
                  <FormLabel>{t("internal_cost_center")}</FormLabel>
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
                        {t("password")} <sup className="text-[13px]">*</sup>
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
                        {t("confirm_password")}{" "}
                        <sup className="text-[13px]">*</sup>
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
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="col-span-2 flex items-start space-x-3 space-y-0 mt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className={
                            form.formState.errors.termsAccepted
                              ? "border-red-500"
                              : ""
                          }
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          {parse(t("regester_terms_and_condition"))}
                          <sup className="text-[13px]">*</sup>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          {isRegister && (
            <Button
              type="submit"
              className="block w-2/4 mx-auto mt-10"
              disabled={!form.getValues().termsAccepted || loading}
            >
              {loading ? (
                <Loading className="w-6 h-6 mx-auto text-white" />
              ) : (
                t("register")
              )}
            </Button>
          )}
          {!isRegister && (
            <div className="flex justify-center">
              <Button type="submit" className="mt-10 px-12 w-max mx-auto">
                {loading ? (
                  <Loading className="w-6 h-6 mx-auto text-white" />
                ) : (
                  t("save")
                )}
              </Button>
            </div>
          )}
          {isRegister && <AuthFooter page={"register"} />}
        </form>
      </Form>
    </CardContent>
  );
};

export default AppUserDetails;
