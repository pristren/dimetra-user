/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";

const AppModal = ({ image, head, detais, button }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <img src={image} alt="" />
      <h2>{head}</h2>
      <p>{detais}</p>
      <Button>{button}</Button>
    </div>
  );
};

export default AppModal;
