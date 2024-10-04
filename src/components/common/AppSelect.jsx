/* eslint-disable react/prop-types */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { t } from "i18next";

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
      onValueChange={onValueChange}
      defaultValue={items?.find((f) => f?.value === value)}
      value={items?.find((f) => f?.value === value)}
    >
      <SelectTrigger isTime={isTime} className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items?.map((item, i) => (
          <SelectItem key={i} value={item}>
            {t(item?.label)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AppSelect;
