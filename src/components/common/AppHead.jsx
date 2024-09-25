/* eslint-disable react/prop-types */
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddRequest from "@/components/order/AddRequest";
import { DatePicker } from "@/components/ui/DatePicker";
import AppSelect from "@/components/common/AppSelect";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AppHead({
  pageTitle,
  showModal = {
    name: "",
    icon: null,
  },
  addButton = {
    visibility: false,
  },
  date,
  setDate,
  filters,
  isDateVisible,
  isFilterVisible,
  table = {
    setGlobalFilter: () => {},
  },
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
                table?.setGlobalFilter("");
              } else {
                table?.setGlobalFilter(event);
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
        {addButton.visibility && (
          <Link to={`${addButton.url}`}>
            <Button>{addButton.name}</Button>
          </Link>
        )}
        {showModal?.name && (
          <Dialog>
            <DialogTrigger className="bg-primary flex gap-2 text-white py-2 px-5 rounded-md">
              {showModal?.icon && showModal?.icon} {showModal.name}
            </DialogTrigger>
            <DialogContent className="w-[90%] max-w-2xl">
              <DialogHeader>
                <DialogTitle className="mb-10">Request</DialogTitle>
                <AddRequest />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
