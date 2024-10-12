/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const AppModal = ({
  icon,
  head,
  details,
  buttonText,
  onClose,
  dialogTitle = "",
  openButton = "",
}) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogTrigger asChild>
        {openButton && <Button>{openButton}</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center gap-5 text-black px-10 text-center tracking-wide leading-6">
          {icon}
          <h5> {head}</h5>
          <p>{details}</p>
          <Button onClick={onClose}>{buttonText}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppModal;
