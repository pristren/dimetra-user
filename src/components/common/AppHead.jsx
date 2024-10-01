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
import { useState } from "react";

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
  getData = () => {},
}) {
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  return (
    <div className="flex lg:items-center justify-between flex-col lg:flex-row gap-5 w-full mb-10">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-between w-full">
          <h2
            className={`text-2xl border-black  font-bold text-nowrap ${
              isRecurring ? "border-r-2 pr-4" : ""
            }`}
          >
            {pageTitle}
          </h2>
          {addButton.visibility && (
            <Link to={`${addButton.url}`} className="lg:hidden">
              <Button>{addButton.name}</Button>
            </Link>
          )}
        </div>

        {isRecurring && (
          <div className=" flex gap-3 items-center">
            <h4 className="text-xl">Order ID :</h4>
            <span className=" text-gray-500">#453422</span>
          </div>
        )}

        {isDateVisible && (
          <DatePicker
            date={date}
            setDate={setDate}
            className="hidden lg:flex"
          />
        )}
      </div>
      {pageTitle === "All Orders" && pageTitle === "History" && (
        <div className="flex items-center gap-2 lg:hidden">
          <Button>All</Button>
          <Button variant="outline">Assigned</Button>
          <Button variant="outline">Un-assigned</Button>
        </div>
      )}
      <div className="flex lg:items-center flex-col lg:flex-row gap-4">
        {isFilterVisible && (
          <AppSelect
            items={filters}
            placeholder="Filters"
            className="max-w-sm w-max"
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
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="lg:w-72 h-10"
            />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2" />
          </div>
        )}
        {addButton.visibility && (
          <Link to={`${addButton.url}`} className="hidden lg:block">
            <Button>{addButton.name}</Button>
          </Link>
        )}
        {showModal?.name && (
          <Dialog open={requestModalOpen} onOpenChange={setRequestModalOpen}>
            <DialogTrigger className="bg-primary flex gap-2 text-white py-2 px-5 rounded-md">
              {showModal?.icon && showModal?.icon} {showModal.name}
            </DialogTrigger>
            <DialogContent className="w-[90%] max-w-2xl">
              <DialogHeader>
                <DialogTitle className="mb-10">Request</DialogTitle>
                <AddRequest
                  setRequestModalOpen={setRequestModalOpen}
                  getData={getData}
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
