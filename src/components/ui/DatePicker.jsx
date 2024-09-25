import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

export function DatePicker({ className, date, setDate }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-between gap-4 text-left font-normal",
            !date && "text-muted-foreground ",
            className
          )}
        >
          {date ? (
            format(date, "dd MMMM yyyy")
          ) : (
            <span className="text-black">Pick a date</span>
          )}
          <div className="w-6 h-6 rounded-full p-1  flex justify-center items-center bg-primary text-white">
            <CalendarIcon className="w-4 h-4" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="left">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
