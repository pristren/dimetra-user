import { Button } from "@/components/ui/button";
import { Rating } from "@smastrom/react-rating";
import { Controller, useForm } from "react-hook-form";
import "@smastrom/react-rating/style.css";
import { Textarea } from "@/components/ui/textarea";

const RateTheDriver = () => {
  const { control, handleSubmit, reset } = useForm({
    mode: "onBlur",
    defaultValues: {
      review_message: "",
      rating: 0,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div>
      <h5>Rate the Driver</h5>
      <div className="bg-white border border-gray-200 p-4 rounded-md mt-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <p className="mb-2">Write Your Review</p>
            <Controller
              control={control}
              name="rating"
              rules={{
                validate: (rating) => rating > 0,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Rating
                  style={{ maxWidth: 100 }}
                  value={value}
                  isRequired
                  onChange={onChange}
                  visibleLabelId="rating_label"
                  className="review-star mx-auto md:mx-0"
                  onBlur={onBlur}
                />
              )}
            />
          </div>
          <Controller
            control={control}
            name="review_message"
            render={({ field: { onChange, onBlur, value } }) => (
              <Textarea
                placeholder="Write review"
                className="mb-4"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <Button type="submit">Submit Rating</Button>
        </form>
      </div>
    </div>
  );
};

export default RateTheDriver;
