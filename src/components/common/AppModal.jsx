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
        {openButton && <Button>{t(openButton)}</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t(dialogTitle)}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center gap-5 text-black px-10 text-center tracking-wide leading-6">
          {icon}
          <h5> {t(head)}</h5>
          <p>{t(details)}</p>
          <Button onClick={onClose}>{t(buttonText)}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppModal;
