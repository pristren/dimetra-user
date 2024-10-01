import { Button } from "@/components/ui/button";
import { Rating } from "@smastrom/react-rating";
import { Controller, useForm } from "react-hook-form";
import "@smastrom/react-rating/style.css";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { GoldenStar } from "@/assets/icons";
import { EllipsisVertical } from "lucide-react";

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

  const review = [
    {
      user: {
        name: "Mohammad Rafi",
        profileImage:
          "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
        rating: 3,
        timeAgo: "2 mins ago",
      },
      content: {
        text: "Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco exercitation. Ullamco tempor adipisicing et voluptate duis sit esse aliqua",
      },
    },
    {
      user: {
        name: "Mohammad Rafi",
        profileImage:
          "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
        rating: 4,
        timeAgo: "5 mins ago",
      },
      content: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
    },
    {
      user: {
        name: "Mohammad Rafi",
        profileImage:
          "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
        rating: 5,
        timeAgo: "10 mins ago",
      },
      content: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, aspernatur.",
      },
    },
  ];

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
              <p className="bg-blue-100 text-blue-600 rounded-md px-2 py-1 text-xs font-medium">
                28
              </p>
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
                  className={`mb-4 min-h-40 rounded-2xl ${
                    error ? "border-red-500" : ""
                  }`}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              </div>
            )}
          />
          <Button type="submit" className="h-8">
            Submit Rating
          </Button>
        </form>
        <Separator className="my-5 h-[2px]" />

        <div>
          {review.map((item, index) => (
            <div key={index}>
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.user.profileImage}
                      className="w-10 h-10 rounded-full "
                      alt={item.user.name}
                    />
                    <div>
                      <p className="font-medium">{item.user.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: item.user.rating }).map(
                            (nothing, i) => (
                              <GoldenStar key={i} />
                            )
                          )}
                        </div>
                        <p className="text-sm lg:text-[16px]">
                          {item.user.timeAgo}
                        </p>
                      </div>
                    </div>
                  </div>
                  <EllipsisVertical />
                </div>
                <p className="mt-5 text-sm lg:text-[16px] lg:leading-6">
                  {item.content.text}
                </p>
              </div>
              <Separator className="my-5 h-[2px]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RateTheDriver;
