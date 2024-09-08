import { EllipsisVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

const OrderHistoryTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#E2E8F0] hover:bg-[#E2E8F0] rounded-t-md">
          <TableHead className="font-semibold">Date & Time</TableHead>
          <TableHead className="font-semibold">Pick Up</TableHead>
          <TableHead className="font-semibold">Destination</TableHead>
          <TableHead className="font-semibold">Vehicle</TableHead>
          <TableHead className="font-semibold">Driver</TableHead>
          <TableHead className="font-semibold">Dispatcher</TableHead>
          <TableHead className="font-semibold">Status</TableHead>
          <TableHead className="font-semibold">Rate to driver</TableHead>
          <TableHead className="font-semibold">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-white">
          <TableCell className="py-2">
            2024-09-08 <br /> 14:30
          </TableCell>
          <TableCell className="py-2">123 Main St.</TableCell>
          <TableCell className="py-2">456 Elm St.</TableCell>
          <TableCell className="py-2">Sedan</TableCell>
          <TableCell className="py-2">John Doe</TableCell>
          <TableCell className="py-2">Jane Smith</TableCell>
          <TableCell>
            <Button className="py-2 px-2 bg-lime-200 hover:bg-lime-300 rounded-md w-max text-black">Completed</Button>
          </TableCell>
          <TableCell>
            <Button className="py-2 px-4 bg-lime-500 hover:bg-lime-600 rounded-md w-max text-black">Rate the driver</Button>
          </TableCell>
          <TableCell className="py-2">
            <EllipsisVertical />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default OrderHistoryTable;
