/* eslint-disable react/prop-types */
import { DatePicker } from "../ui/DatePicker";
import AppSelect from "./AppSelect";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function AppHead({
  pageTitle,
  addButton = {
    visibility: false,
  },
  date,
  setDate,
  filters,
  isDateVisible,
  isFilterVisible,
  table,
  globalFilter,
  setGlobalFilter,
  isSearchVisible = true,
  isRecurring = false,
}) {
  return (
    <div className="flex items-center justify-between gap-5 w-full mb-10">
      <div className="flex items-center gap-3">
        <h2
          className={`text-2xl border-black  font-bold text-nowrap ${
            isRecurring ? "border-r-2 pr-4" : ""
          }`}
        >
          {pageTitle}
        </h2>
        {isRecurring && (
          <div className=" flex gap-3 items-center">
            <h4 className="text-xl">Order ID :</h4>
            <span className=" text-gray-500">#453422</span>
          </div>
        )}

        {isDateVisible && <DatePicker date={date} setDate={setDate} />}
      </div>
      <div className="flex items-center gap-4">
        {isFilterVisible && (
          <AppSelect
            items={filters}
            placeholder="Filters"
            className="max-w-sm"
            onValueChange={(event) => {
              if (event === "All Order") {
                table.setGlobalFilter("");
              } else {
                table.setGlobalFilter(event);
              }
            }}
          />
        )}

        {isSearchVisible && (
          <div className="relative">
            <Input
              placeholder="Search By Any Field"
              value={globalFilter || ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="w-72 h-10"
            />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2" />
          </div>
        )}
        {console.log(addButton.url)}
        {addButton.visibility && (
          <Link to={`${addButton.url}`}>
            <Button>{addButton.name}</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
