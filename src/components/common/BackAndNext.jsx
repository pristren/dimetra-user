/* eslint-disable react/prop-types */
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

const BackAndNext = ({
  back,
  next,
  isFillForm,
  isDisabled,
  handleFormChange,
}) => {
  return (
    <div className="flex items-center justify-between mt-5">
      <Button
        className="flex gap-1 items-center"
        variant="outline"
        onClick={() => handleFormChange(back)}
      >
        <ArrowLeft /> Back
      </Button>
      <Button
        disabled={isDisabled}
        onClick={() => handleFormChange(next)}
        type="submit"
        className={`${
          isFillForm
            ? "bg-primary text-white"
            : "bg-secondary text-gray-500 hover:bg-secondary"
        } px-12`}
      >
        Check Preview
      </Button>
    </div>
  );
};

export default BackAndNext;
