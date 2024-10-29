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
import { Check } from "lucide-react";
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
        <div className="flex flex-col justify-center items-center gap-2 text-black px-10 text-center tracking-wide leading-6">
          {icon}
          <h5 className="flex items-center gap-2">
            {t(head)}{" "}
            {isSuccess && (
              <Check className="size-8 text-green-400 rounded-full" />
            )}
          </h5>
          <p>{t(details)}</p>
          <Button onClick={onClose}>{t(buttonText)}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppModal;
