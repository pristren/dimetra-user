import { Upload } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

const AddRequest = () => {
  const defaultValues = {
    title: "",
    message: "",
    orderNumber: "",
  };

  const form = useForm({
    defaultValues,
  });

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
    console.log(file);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel className="mb-2 text-black">
                Title <sup className="text-[13px]">*</sup>
              </FormLabel>
              <FormControl>
                <Input
                  className={
                    form.formState.errors.title ? "border-red-500" : ""
                  }
                  placeholder="Enter title"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel className="mb-2 text-black">
                Message <sup className="text-[13px]">*</sup>
              </FormLabel>
              <FormControl>
                <Input
                  className={
                    form.formState.errors.message ? "border-red-500" : ""
                  }
                  placeholder="Enter your message"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="mb-8">
          <FormLabel className="flex items-center justify-between border bg-gray-100 px-2 py-3 rounded-md mt-3 mb-3">
            File Upload <Upload />
          </FormLabel>
          <FormControl>
            <Input
              type="file"
              onChange={handleFileChange}
              className={`${file ? "" : "border-red-500"} hidden`}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="orderNumber"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel className="mb-2 text-black">
                Add order number (optional)
              </FormLabel>
              <FormControl>
                <Input
                  className={
                    form.formState.errors.orderNumber ? "border-red-500" : ""
                  }
                  placeholder="Enter order number"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-center mt-12 w-full">
          <Button type="submit" className="px-14">
            Send
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddRequest;
