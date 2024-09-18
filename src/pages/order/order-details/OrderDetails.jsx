import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const OrderDetails = () => {
  return (
    <div>
      <h5>Order Details</h5>
      <div>
        <h4>Transportation details</h4>
        <div className="grid grid-cols-3">
          <div>
            <h6>Type of transport</h6>
            <p>Private trips</p>
          </div>
          <div>
            <h6>Mode of transportation</h6>
            <p>Lying down</p>
            <p>Second transport helper</p>
          </div>
          <div>
            <h6>Transport with</h6>
            <p>Infusion</p>
            <p>Oxygen (liters/min)</p>
          </div>
        </div>
        <Separator />
        <div>
          <h6>Selected Weekdays and Months</h6>
          <div className="w-[60%] grid grid-cols-3">
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <Label>Tuesday</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <Label>Tuesday</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <Label>Tuesday</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <Label>Tuesday</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked />
              <Label>Tuesday</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
