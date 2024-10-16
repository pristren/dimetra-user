import { Loading, Upload } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CREATE_MESSAGE_REQUESTS } from "@/pages/order/send-request/graphql/mutations/createMessageRequest.gql";
import { uploadFile } from "@/utils";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import toast from "react-hot-toast";

const AddRequest = ({ setRequestModalOpen, getData = () => {} }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createMessageRequest] = useMutation(CREATE_MESSAGE_REQUESTS);
  const defaultValues = {
    title: "",
    message: "",
    order_number: "",
  };

  const form = useForm({
    defaultValues,
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const file_url = await uploadFile(file);
    await createMessageRequest({
      variables: {
        inputData: {
          ...data,
          file: file_url || "",
        },
      },
    })
      .then(({ data }) => {
        if (data?.createMessageRequest?.id) {
          toast.success("Request sent successfully");
          getData();
        }
      })
      .catch((error) => {
        toast.error(error.message || "There was an error sending request");
      })
      .finally(() => {
        setRequestModalOpen(false);
        form.reset(defaultValues);
        setFile(null);
        setLoading(false);
      });
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
          <p>
            {file ? (
              <span className="text-gray-500">{file?.name}</span>
            ) : (
              "No file chosen"
            )}
          </p>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="order_number"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel className="mb-2 text-black">
                Add order number (optional)
              </FormLabel>
              <FormControl>
                <Input
                  className={
                    form.formState.errors.order_number ? "border-red-500" : ""
                  }
                  placeholder="Enter order number"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-center mt-12 w-full">
          <Button type="submit" className="px-14">
            {loading ? (
              <Loading className="w-6 h-6 mx-auto text-white" />
            ) : (
              "Send Request"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddRequest;
