import { Button } from "@/components/ui/button";
import { Rating } from "@smastrom/react-rating";
import { Controller, useForm } from "react-hook-form";
import "@smastrom/react-rating/style.css";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const RateTheDriver = () => {
  const { control, handleSubmit, reset } = useForm({
    mode: "onBlur",
    defaultValues: {
      review_message: "",
      rating: 0,
    },
  });

  const navigate = useNavigate();
  const onSubmit = (data) => {
    toast.success("Rating submitted successfully");
    console.log(data);
    reset();
    navigate("/orders/all-orders");
  };

  return (
    <div>
      <h5>Rate the Driver</h5>
      <div className="bg-white border border-gray-200 p-4 rounded-md mt-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm lg:text-[16px]">Write Your Review</p>
            <div className="flex items-center gap-1">
            <Controller
              control={control}
              name="rating"
              rules={{
                validate: (rating) => rating > 0,
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => {
                return (
                  <div className="">
                    <Rating
                      style={{ maxWidth: 100 }}
                      value={value}
                      isRequired
                      onChange={onChange}
                      visibleLabelId="rating_label"
                      className={`review-star mx-auto md:mx-0 `}
                      onBlur={onBlur}
                    />
                    {error?.type === "validate" && (
                      <p className="text-red-500 text-xs mt-1">
                        This field is required
                      </p>
                    )}
                  </div>
                );
              }}
            />
            <p className="bg-blue-100 text-blue-600 rounded-md px-2 py-1 text-xs font-medium">28</p>
            </div>
          </div>
          <Controller
            control={control}
            name="review_message"
            rules={{
              required: "This field is required",
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <div>
                <Textarea
                  placeholder="Write review"
                  className={`mb-4 min-h-40 rounded-2xl ${error ? "border-red-500" : ""}`}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              </div>
            )}
          />
          <Button type="submit" className="h-8">Submit Rating</Button>
        </form>
      </div>
    </div>
  );
};

export default RateTheDriver;
