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

export function DatePicker({
  className,
  date,
  setDate,
  mode = "single",
  ...props
}) {
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
          {date?.length > 0 ? (
            <span>
              {format(date[0], "dd MMMM yyyy")}
              {date.length - 1 !== 0
                ? ` and ${date.length - 1}
              ${
                date.length === 2 ? "other" : date.length > 2 ? "others" : null
              }`
                : null}
            </span>
          ) : date ? (
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
          mode={mode}
          selected={date}
          onSelect={setDate}
          initialFocus
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}
