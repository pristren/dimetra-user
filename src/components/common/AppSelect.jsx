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
  value,
  disabled = false,
}) => {
  return (
    <Select
      disabled={disabled}
      onValueChange={(val) => {
        const selectedItem = items.find((item) => item.value === val);
        onValueChange(selectedItem);
      }}
      value={value}
      defaultValue={value}
    >
      <SelectTrigger isTime={isTime} className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items?.map((item, i) => (
          <SelectItem key={i} value={item.value}>
            {item?.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AppSelect;
