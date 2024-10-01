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
import useDebounce from "@/hooks/useDebounce";

export default function AppHead({
  pageTitle,
  showModal = {
    name: "",
    icon: null,
  },
  addButton = {
    visibility: false,
  },
  queryData,
  setQueryData,
  filters,
  isDateVisible,
  isFilterVisible,
  isSearchVisible = true,
  isRecurring = false,
  getData = () => {},
}) {
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const handleSearchInputChange = useDebounce((value) => {
    setQueryData((prev) => ({ ...prev, search_keyword: value || undefined }));
  }, 500);
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
            className="hidden lg:flex"
            date={queryData?.date}
            setDate={(value) =>
              setQueryData((prev) => ({ ...prev, date: value }))
            }
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
            value={queryData?.filter_by}
            onValueChange={(event) => {
              setQueryData((prev) => ({ ...prev, filter_by: event?.value }));
            }}
          />
        )}

        {isSearchVisible && (
          <div className="relative">
            <Input
              placeholder="Search By Any Field"
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
                handleSearchInputChange(event.target.value);
              }}
              className="w-72 h-10"
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
