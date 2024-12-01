import { useState } from "react";
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
import { t } from "i18next";

export function DatePicker({
  className,
  date,
  setDate,
  mode = "single",
  ...props
}) {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handleDateSelect = (selectedDate) => {
    if (
      (selectedDate && date && selectedDate === date) ||
      selectedDate === undefined
    ) {
      setPopoverOpen(false);
    } else {
      setDate(selectedDate);
    }
  };
  
  return (
    <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-between gap-4 text-left font-normal",
            !date && "text-muted-foreground ",
            className
          )}
          onClick={() => setPopoverOpen(!isPopoverOpen)} // Toggle popover visibility
        >
          {mode !== "single" && date?.length > 0 ? (
            <span>
              {
                // show the lowest date
                format(date?.sort((a, b) => a - b)[0], "dd MMMM yyyy")
              }
              {date?.length - 1 !== 0
                ? ` and ${date.length - 1}
              ${
                date?.length === 2
                  ? "other"
                  : date?.length > 2
                  ? "others"
                  : null
              }`
                : null}
            </span>
          ) : date && mode === "single" ? (
            format(date, "dd MMMM yyyy")
          ) : (
            <span className="text-black">{t("pick_a_date")}</span>
          )}
          <div className="w-6 h-6 rounded-full p-1 flex justify-center items-center bg-primary text-white">
            <CalendarIcon className="w-4 h-4" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="left">
        <Calendar
          mode={mode}
          selected={date}
          onSelect={handleDateSelect} // Use our custom date handler
          initialFocus
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
}
