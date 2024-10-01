/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const AppModal = ({ icon, head, details, buttonText, onClose }) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle />
          <DialogDescription className="flex flex-col justify-center items-center gap-5 text-black px-10 text-center tracking-wide leading-6">
            {icon}
            <h5>{head}</h5>
            <p>{details}</p>
            <Button onClick={onClose}>{buttonText}</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AppModal;
