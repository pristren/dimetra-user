/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { t } from "i18next";
import { CircleCheck } from "lucide-react";
const AppModal = ({
  icon,
  head,
  details,
  buttonText,
  onClose,
  isSuccess,
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
          <h5 className="flex flex-col items-center gap-2">
            {isSuccess && (
              <CircleCheck className="p-1 size-14 bg-green-400 text-white rounded-full" />
            )}
            {t(head)}{" "}
          </h5>
          <p>{t(details)}</p>
          <Button onClick={onClose}>{t(buttonText)}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppModal;
