/* eslint-disable react/prop-types */
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackAndNextBtn = ({
  isFillForm,
  isLastPage,
  isDisabled,
  handleGoNext,
  handleGoPrev
}) => {
  return (
    <div className="flex items-center justify-between gap-5 mt-5">
      <Button
        className="flex gap-1 items-center"
        variant="outline"
        onClick={handleGoPrev}
      >
        <ArrowLeft /> Back
      </Button>
      <Button
        disabled={isDisabled}
        onClick={handleGoNext}
        className={`${
          isFillForm
            ? "bg-primary text-white"
            : "bg-secondary text-gray-500 hover:bg-secondary"
        } px-12`}
      >
        {isLastPage ? "Check Preview" : "Next"}
      </Button>
    </div>
  );
};

export default BackAndNextBtn;
