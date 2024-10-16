/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/DatePicker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import AppSelect from "@/components/common/AppSelect";
import {
  durationOptions,
  timeOptions,
  transportModesOptions,
  transportOptions,
  transportWithOptions,
  weekdaysOptions,
} from "@/components/create-order-forms/helpers";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { CREATE_AN_ORDER } from "@/pages/order/create-order/graphql/mutations/createAnOrder.gql";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import AppModal from "@/components/common/AppModal";
import { useState } from "react";
import { Loading, SuccessfullyCreatedOrderModalImage } from "@/assets/icons";
import { t } from "i18next";
import toast from "react-hot-toast";

const PreviewDetails = ({
  createOrderData,
  endDate,
  startDate,
  setEndDate,
  setStartDate,
  selectedWeekdays,
  returnDate,
  dropDate,
}) => {
  const {
    transportationData,
    patientData,
    destinationDetailsData,
    billingDetailsData,
    recurringData,
  } = createOrderData;
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const calculateMonthlyOccurrences = (weekdays) => {
    return weekdays.length * 4;
  };
  const [createAnOrder] = useMutation(CREATE_AN_ORDER);
  const navigate = useNavigate();
  const handleCreateAnOrder = async () => {
    setLoading(true);
    const updatedData = { ...createOrderData };

    if (updatedData?.transportationData?.type_of_transport !== "recurring") {
      delete updatedData?.recurringData;
    }

    try {
      const { data } = await createAnOrder({
        variables: {
          inputData: updatedData,
        },
      });
      if (data?.createAnOrder?.id) {
        localStorage.removeItem("createOrderData");
        setShowModal(true);
      }
    } catch (error) {
      const { message, response } = error;
      console.error(message, response);
      toast.error(message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const closeModal = () => {
    setShowModal(false);
    navigate("/orders/all-orders");
  };

  return (
    <div className="p-2">
      {/* Single Card for all details */}
      <Card className="w-full lg:px-5 lg:py-5 text-left border-none shadow-none">
        <CardHeader>
          <CardTitle className="title">Preview Details</CardTitle>
        </CardHeader>
        <CardContent className="lg:px-10">
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="pr-5">
                <h6 className="mb-4">
                  Type of transport
                  <span className="highlight">(simple selection)</span>
                </h6>
                <RadioGroup
                  disabled
                  value={transportationData?.type_of_transport}
                >
                  {transportOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className="font-normal text-[16px]"
                      >
                        {t(option.label)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="pr-5">
                <h6 className="mb-4">
                  Mode of transportation
                  <span className="highlight">(multiple selection)</span>
                </h6>
                {transportModesOptions.map((option) => (
                  <div key={option.value} className="flex items-center mb-4">
                    <Checkbox
                      disabled
                      id={option.value}
                      checked={transportationData.mode_of_transportation?.includes(
                        option.value
                      )}
                    />
                    <Label
                      className="font-normal text-[16px] ml-2"
                      htmlFor={option.value}
                    >
                      {t(option.label)}
                    </Label>
                  </div>
                ))}
              </div>

              <div>
                <h6 className="mb-4">
                  Transport with
                  <span className="highlight">(multiple selection)</span>
                </h6>
                {transportWithOptions.map((option) => (
                  <div key={option.value} className="flex items-center mb-4">
                    <Checkbox
                      disabled
                      id={option.value}
                      checked={transportationData.transport_with?.includes(
                        option.value
                      )}
                    />
                    <Label
                      className="font-normal text-[16px] ml-2"
                      htmlFor={option.value}
                    >
                      {t(option.label)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {transportationData?.type_of_transport === "recurring" && (
              <div>
                <h3 className="text-lg font-medium mb-3 mt-5">
                  Select Recurring Type:
                </h3>
                <AppSelect
                  items={[
                    { value: "week", label: "Week" },
                    { value: "free", label: "Free" },
                  ]}
                  placeholder="Week"
                  className="cursor-pointer"
                  defaultValue={recurringData.recurring_type}
                  disabled
                />

                {recurringData.recurring_type === "week" ? (
                  <div className="">
                    <h3 className="text-lg font-medium mt-10 mb-5">
                      Select Start Date and Time*:
                    </h3>
                    <div className="mb-5 flex w-max gap-4 items-center">
                      <DatePicker disabled date={recurringData?.start_date} />
                      <AppSelect
                        items={timeOptions}
                        className="cursor-pointer"
                        placeholder="00:00"
                        disabled
                        value={recurringData?.start_time}
                        isTime={true}
                      />
                    </div>

                    <h3 className="text-lg font-medium mt-10 mb-5">
                      Select Return Time* :
                    </h3>
                    <div className="mb-5 flex w-max gap-4 items-center">
                      <DatePicker disabled date={recurringData?.return_date} />
                      <AppSelect
                        items={timeOptions}
                        placeholder="00:00"
                        isTime={true}
                        value={recurringData?.return_time}
                        disabled
                        className="cursor-pointer"
                      />
                    </div>

                    <h3 className="text-lg font-medium mb-3 mt-5">
                      Select Weekdays
                      <span className="highlight">(multiple selection)</span>:
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-2">
                      {weekdaysOptions.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center mb-2"
                        >
                          <Checkbox
                            disabled
                            id={option.value}
                            checked={recurringData?.multiple_week_days?.includes(
                              option.value
                            )}
                          />
                          <Label className="ml-2" htmlFor={option.value}>
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-lg font-medium mb-3 mt-5">Ends:</h3>
                    <RadioGroup disabled value={recurringData?.ends}>
                      {durationOptions.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-2 mb-2"
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                          />
                          <Label htmlFor={option.value}>{option.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>

                    <h6 className="text-lg font-semibold mt-5">
                      Summary: Monthly on day
                      {calculateMonthlyOccurrences(
                        recurringData?.multiple_week_days
                      )}
                    </h6>
                  </div>
                ) : recurringData.recurring_type === "free" ? (
                  <div className="">
                    <div className="mt-5 mb-5 ">
                      <h3 className="text-lg font-medium mt-10 mb-5">
                        Select Start Date and Time* (max 60):
                      </h3>
                      <div className="flex w-max gap-4 items-center">
                        <DatePicker
                          mode="multiple"
                          date={recurringData.free_dates}
                          disabled
                        />
                        {console.log(recurringData.free_dates_start_time)}
                        <AppSelect
                          items={timeOptions}
                          placeholder="Select a time"
                          isTime={true}
                          isTimeSelected={true}
                          disabled
                          className="cursor-pointer"
                          value={recurringData.free_dates_start_time}
                        />
                      </div>
                    </div>
                    <div className="mt-5 mb-5 ">
                      <h3 className="text-lg font-medium mt-10 mb-5">
                        Select Return Date and Time:
                      </h3>
                      <div className="flex w-max gap-4 items-center">
                        <DatePicker
                          mode="multiple"
                          date={recurringData.free_dates}
                          disabled
                        />

                        <AppSelect
                          items={timeOptions}
                          placeholder="No time selected"
                          isTime={true}
                          disabled
                          className="cursor-pointer"
                          defaultValue={recurringData.free_dates_return_time}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
            <div>
              <h6 className="title mb-10">Patient Details</h6>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="mb-5">
                  <Label className="block mb-2 font-medium">
                    Name <sup className="text-[13px]">*</sup>
                  </Label>
                  <Input
                    disabled
                    value={patientData?.name}
                    placeholder="Type your name"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5 cols">
                  <Label className="block mb-2 font-medium">
                    Surname <sup className="text-[13px]">*</sup>
                  </Label>
                  <Input
                    disabled
                    value={patientData?.surname}
                    placeholder="Type your surname"
                    className="border-gray-300"
                  />
                </div>
                <div></div>
                <div className="mb-5">
                  <Label className="block mb-2 font-medium">
                    Date of Birth <sup className="text-[13px]">*</sup>
                  </Label>
                  <Input
                    disabled
                    value={
                      patientData?.date_of_birth
                        ? moment(patientData?.date_of_birth).format(
                            "DD MMMM YYYY"
                          )
                        : "Not provided"
                    }
                    placeholder="Type your date of birth"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <Label className="block mb-2 font-medium">
                    Area/Room <sup className="text-[13px]">*</sup>
                  </Label>
                  <Input
                    disabled
                    value={patientData?.area_room}
                    placeholder="Type your area or room"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <Label className="block mb-2 font-medium">
                    Kostenstelle <sup className="text-[13px]">*</sup>
                  </Label>
                  <Input
                    disabled
                    value={patientData?.cost_center}
                    placeholder="Type your kostenstelle"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <Label className="block mb-2 font-medium">How Much</Label>
                  <Input
                    disabled
                    value={patientData?.how_much}
                    placeholder="Type how much"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <Label className="block mb-2 font-medium">Isolation</Label>
                  <div className="flex items-center">
                    <Checkbox checked={patientData?.isolation} disabled />
                    <Label className="text-gray-500 font-medium text-[15px] cursor-pointer ml-2">
                      Yes
                    </Label>
                  </div>
                </div>
                <div className="mb-5">
                  <Label className="block mb-2 font-medium">
                    Patient Above 90 kg
                  </Label>
                  <div className="flex items-center">
                    <Checkbox
                      checked={patientData?.patient_above_90kg}
                      disabled
                    />
                    <Label className="text-gray-500 font-medium text-[15px] cursor-pointer ml-2">
                      No
                    </Label>
                  </div>
                </div>
                <div className="mb-5">
                  <Label className="block mb-2 font-medium">Special</Label>
                  <Input
                    disabled
                    value={patientData?.special_note}
                    placeholder="Requires special_note attention"
                    className="border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Destination Details */}
            <div>
              <h6 className="title mb-10">Destination Details</h6>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="pr-5">
                  <h6 className="mb-8">Pick-Up</h6>
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      Name / Institution <sup className="text-[13px]">*</sup>
                    </Label>
                    <Input
                      disabled
                      value={destinationDetailsData?.pick_up_name}
                      placeholder="Pre filled"
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      Street <sup className="text-[13px]">*</sup>
                    </Label>
                    <Input
                      disabled
                      value={destinationDetailsData?.pick_up_address}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      Postal Code <sup className="text-[13px]">*</sup>
                    </Label>
                    <Input
                      disabled
                      value={destinationDetailsData?.pick_up_postal_code}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      City <sup className="text-[13px]">*</sup>
                    </Label>
                    <Input
                      disabled
                      value={destinationDetailsData?.pick_up_city}
                      placeholder="Enter City Name"
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      Country <sup className="text-[13px]">*</sup>
                    </Label>
                    <Input
                      disabled
                      value={destinationDetailsData?.pick_up_country}
                      placeholder="Enter Country"
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      Working Employee Name <sup className="text-[13px]">*</sup>
                    </Label>
                    <Input
                      disabled
                      value={destinationDetailsData?.pick_up_employee_name}
                      placeholder="Type the working employee's name"
                      className="border-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <h6 className="mb-8">Drop-Off</h6>
                    {transportationData?.type_of_transport !== "recurring" && (
                      <div className="mb-5">
                        <Label className="block mb-2 font-medium">
                          Date <sup className="text-[13px]">*</sup>
                        </Label>
                        <Input
                          disabled
                          value={
                            dropDate
                              ? moment(dropDate).format("DD MMMM YYYY")
                              : "Not provided"
                          }
                          placeholder="Type your drop off date"
                          className="border-gray-300"
                        />
                      </div>
                    )}
                    {transportationData?.type_of_transport !== "recurring" && (
                      <div className="mb-5">
                        <Label className="block mb-2 font-medium">
                          Pickup time <sup className="text-[13px]">*</sup>
                        </Label>
                        <Input
                          disabled
                          value={destinationDetailsData?.drop_off_pick_up_time}
                          placeholder="Pick-Up Time"
                          className="border-gray-300"
                        />
                      </div>
                    )}
                    <div className="mb-5">
                      <Label className="block mb-2 font-medium">
                        Name / Institution <sup className="text-[13px]">*</sup>
                      </Label>
                      <Input
                        disabled
                        value={destinationDetailsData?.drop_off_name}
                        placeholder="Enter Name"
                        className="border-gray-300"
                      />
                    </div>
                    <div className="mb-5">
                      <Label className="block mb-2 font-medium">
                        Street <sup className="text-[13px]">*</sup>
                      </Label>
                      <Input
                        disabled
                        value={destinationDetailsData?.drop_off_address}
                        placeholder="Enter Street"
                        className="border-gray-300"
                      />
                    </div>
                    <div className="mb-5">
                      <Label className="block mb-2 font-medium">
                        Postal Code <sup className="text-[13px]">*</sup>
                      </Label>
                      <Input
                        disabled
                        value={destinationDetailsData?.drop_off_postal_code}
                        placeholder="Enter Street"
                        className="border-gray-300"
                      />
                    </div>
                    <div className="mb-5">
                      <Label className="block mb-2 font-medium">
                        City <sup className="text-[13px]">*</sup>
                      </Label>
                      <Input
                        disabled
                        value={destinationDetailsData?.drop_off_city}
                        placeholder="Enter City Name"
                        className="border-gray-300"
                      />
                    </div>
                    <div className="mb-5">
                      <Label className="block mb-2 font-medium">
                        Country <sup className="text-[13px]">*</sup>
                      </Label>
                      <Input
                        disabled
                        value={destinationDetailsData?.drop_off_country}
                        placeholder="Enter Country"
                        className="border-gray-300"
                      />
                    </div>
                    <div className="mb-5">
                      <Label className="block mb-2 font-medium">Phone</Label>
                      <Input
                        disabled
                        value={destinationDetailsData?.drop_off_phone}
                        placeholder="Type the phone number"
                        className="border-gray-300"
                      />
                    </div>
                  </div>
                  {createOrderData?.transportationData?.type_of_transport !==
                    "recurring" && (
                    <div>
                      <h6 className="mb-8 mt-14">Return journey</h6>
                      <div className="mb-5">
                        <Label className="block mb-2 font-medium">Date</Label>
                        <Input
                          disabled
                          value={
                            returnDate
                              ? moment(returnDate).format("DD MMMM YYYY")
                              : "Not provided"
                          }
                          placeholder="Type your return date"
                          className="border-gray-300"
                        />
                      </div>
                      <div className="mb-5">
                        <Label className="block mb-2 font-medium">Time</Label>
                        <Input
                          disabled
                          value={destinationDetailsData?.return_approx_time}
                          placeholder="Enter Time"
                          className="border-gray-300"
                        />
                      </div>
                      <div className="mb-5">
                        <Label className="block mb-2 font-medium">
                          Floor/Department
                        </Label>
                        <Input
                          disabled
                          value={destinationDetailsData?.return_floor}
                          placeholder="Type the stock or department"
                          className="border-gray-300"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Billing Details */}
            <div>
              <h6 className="title mb-10">Billing Address</h6>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="mb-5">
                  <Label className="block mb-2 font-medium">
                    Prename/Institution
                  </Label>
                  <Input
                    disabled
                    value={billingDetailsData?.pre_name}
                    placeholder="Type your prename or institution"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <Label className="block mb-2 font-medium">Name</Label>
                  <Input
                    disabled
                    value={billingDetailsData?.name}
                    placeholder="Type your name"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <Label className="block mb-2 font-medium">Street</Label>
                  <Input
                    disabled
                    value={billingDetailsData?.street}
                    placeholder="Type your street"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <Label className="block mb-2 font-medium">Place</Label>
                  <Input
                    disabled
                    value={billingDetailsData?.place}
                    placeholder="Type your place"
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <Label className="block mb-2 font-medium">Contact</Label>
                  <Input
                    disabled
                    value={billingDetailsData?.contact}
                    placeholder="Type your contact number"
                    className="border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button onClick={handleCreateAnOrder} className="px-14 mt-5">
              {loading ? (
                <Loading className="w-6 h-6 mx-auto text-white" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
          {showModal && (
            <AppModal
              icon={<SuccessfullyCreatedOrderModalImage />}
              head="Order sent successfully"
              details="Your order has been placed successfully! Thank you for Order"
              buttonText="Continue"
              onClose={closeModal}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewDetails;
