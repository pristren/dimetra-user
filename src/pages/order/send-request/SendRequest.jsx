import SendRequestTable from "@/components/order/SendRequestTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const SendRequest = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-5 mb-8">
        <h5>Send request</h5>
        <Button className="flex items-center gap-3">
          <Plus /> Add Request
        </Button>
      </div>
      <SendRequestTable />
    </div>
  );
};

export default SendRequest;
