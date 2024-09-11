/* eslint-disable react/prop-types */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AppSelect = ({
  items,
  placeholder,
  isTime = false,
  className,
  onValueChange,
}) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger isTime={isTime} className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items?.map((item, i) => (
          <SelectItem key={i} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AppSelect;
