import { Button } from "@/components/ui/button";
import { Rating } from "@smastrom/react-rating";
import { Controller, useForm } from "react-hook-form";
import "@smastrom/react-rating/style.css";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { DefaultAvatar, GoldenStar, Loading } from "@/assets/icons";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_A_REVIEW } from "./graphql/mutations/createAReview.gql";
import { GET_A_REVIEW_FROM_ORDER } from "./graphql/queries/getAReviewFromOrder.gql";
import { useEffect, useState } from "react";
import moment from "moment";
import { t } from "i18next";
// import { GET_A_REVIEW } from "./graphql/queries/getAReview.gql";

const RateTheDriver = () => {
  const { id } = useParams();
  const [reviewData, setReviewData] = useState({});
  const { control, handleSubmit, reset } = useForm({
    mode: "onBlur",
    defaultValues: {
      review_message: "",
      rating: 0,
    },
  });
  const [getAReviewFromOrder, { loading }] = useLazyQuery(
    GET_A_REVIEW_FROM_ORDER,
    {
      variables: {
        queryData: {
          id: id,
        },
      },
      errorPolicy: "all",
      fetchPolicy: "no-cache",
      onCompleted: (response) => {
        setReviewData(response.getAReviewFromOrder);
      },
      onError: (error) => {
        console.error({ error });
      },
    }
  );
  const [createReviewLoading, setCreateReviewLoading] = useState(false);
  useEffect(() => {
    getAReviewFromOrder();
  }, []);
  const [createAReview] = useMutation(CREATE_A_REVIEW, {
    onCompleted: (data) => {
      reset();
      toast.success(t('rating_submitted_successfully'));
      getAReviewFromOrder();
      setCreateReviewLoading(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(t('failed_to_submit_rating'));
      setCreateReviewLoading(false);
    },
  });

  const onSubmit = (data) => {
    setCreateReviewLoading(true);
    createAReview({
      variables: {
        inputData: {
          orderId: id,
          rating: data.rating,
          review_message: data.review_message,
        },
      },
    });
  };

  return (
    <div>
      <h5>{reviewData?.id ? "Your Review" : "Rate The Driver"}</h5>
      <div className="bg-white border border-gray-200 p-4 rounded-md mt-3">
        {reviewData === null && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm lg:text-[16px]">{t("write_your_review")}</p>
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
              </div>
            </div>
            <Controller
              control={control}
              name="review_message"
              rules={{
                required: t('this_field_is_required'),
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <div>
                  <Textarea
                    placeholder="Write review"
                    className={`mb-4 min-h-40 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary ${
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
              {createReviewLoading ? (
                <Loading className="w-6 h-6 mx-auto text-white" />
              ) : (
                t("submit_rating")
              )}
            </Button>
          </form>
        )}
        {/* {reviewData === null && <Separator className="my-5 h-[2px]" />} */}

        <div>
          {loading ? <p className="text-primary">{t("loading")}...</p> : null}
          {reviewData?.id && (
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  {reviewData?.user?.profile_image ? (
                    <img
                      src={reviewData?.user?.profile_image}
                      className="w-10 h-10 rounded-full "
                      alt={reviewData?.user?.first_name}
                    />
                  ) : (
                    <DefaultAvatar className="w-10 h-10 rounded-full" />
                  )}
                  <div>
                    <p className="font-medium">
                      {reviewData?.user?.first_name}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {Array.from({
                          length: reviewData?.rating,
                        }).map((nothing, i) => (
                          <GoldenStar key={i} />
                        ))}
                      </div>
                      <p className="text-sm lg:text-[16px]">
                        {moment(reviewData?.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm lg:text-[16px] lg:leading-6">
                {reviewData?.review_message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RateTheDriver;
