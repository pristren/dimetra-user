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
import SubmitProgress from "@/components/create-order-forms/submit-progress/SubmitProgress"; // Import the SubmitProgress component
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ReopenPreviewDetails = ({
  reopenOrderData,
  setCurrentStep,
  setShowPreview,
}) => {
  const {
    transportationData,
    patientData,
    destinationDetailsData,
    billingDetailsData,
    recurringData,
  } = reopenOrderData;

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [createAnOrder] = useMutation(CREATE_AN_ORDER);
  const navigate = useNavigate();

  const handleCreateAnOrder = async () => {
    setLoading(true);
    setShowProgress(true);
    const updatedData = { ...reopenOrderData };

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
        localStorage.removeItem("reopenOrderData");
        setShowModal(true);
      }
    } catch (error) {
      const { message, response } = error;
      console.error(message, response);
      toast.error(message || "Something went wrong");
    } finally {
      setLoading(false);
      setShowProgress(false); // Hide progress modal
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
          <CardTitle className="title">{t("preview_details")}</CardTitle>
        </CardHeader>
        <CardContent className="lg:px-10">
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="pr-5">
                <h6 className="mb-4">
                  {t("type_of_transport")}
                  <span className="highlight">({t("simple_selection")})</span>
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
                      <RadioGroupItem
                        disabled
                        value={option.value}
                        id={option.value}
                      />
                      <Label
                        htmlFor={option.value}
                        className="font-normal text-[16px] text-gray-500 !cursor-default"
                      >
                        {t(option.label)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="pr-5">
                <h6 className="mb-4">
                  {t("mode_of_transportation")}
                  <span className="highlight">({t("multiple_selection")})</span>
                </h6>

                <RadioGroup value={transportationData?.mode_of_transportation}>
                  {transportModesOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <RadioGroupItem
                        disabled
                        value={option.value}
                        id={option.value}
                      />
                      <Label
                        htmlFor={option.value}
                        className="font-normal text-[16px] text-gray-500 !cursor-default"
                      >
                        {t(option.label)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <h6 className="mb-4">
                  {t("transport_with")}
                  <span className="highlight">({t("multiple selection")})</span>
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
                  {t("select_recurring_type")}
                </h3>
                <AppSelect
                  items={[
                    { value: "week", label: "Week" },
                    { value: "free", label: "Free" },
                  ]}
                  placeholder="Week"
                  className="cursor-pointer"
                  defaultValue={recurringData?.recurring_type}
                  disabled
                />

                {recurringData?.recurring_type === "week" ? (
                  <div>
                    <h3 className="text-lg font-medium mt-10 mb-5">
                      {t("select_start_date_and_time")}
                    </h3>
                    <div className="mb-5 flex w-max gap-4 items-center">
                      {recurringData?.start_date && (
                        <Input
                          disabled
                          value={
                            recurringData?.start_date
                              ? moment(recurringData?.start_date).format(
                                  "DD/MM/YYYY"
                                )
                              : ""
                          }
                        />
                      )}
                      {recurringData?.start_time && (
                        <Input disabled value={recurringData?.start_time} />
                      )}
                    </div>
                    {recurringData?.return_time && (
                      <>
                        <h3 className="text-lg font-medium mt-10 mb-5">
                          {t("select_return_time")}* :
                        </h3>
                        <div className="mb-5 flex w-max gap-4 items-center">
                          {/* {recurringData?.return_date && (
                        <Input
                          disabled
                          value={moment(recurringData?.return_date).format(
                            "DD/MM/YYYY"
                          )}
                        />
                      )} */}
                          <Input
                            disabled
                            placeholder="00:00"
                            value={recurringData?.return_time}
                          />
                        </div>
                      </>
                    )}

                    {recurringData?.multiple_week_days > 0 && (
                      <>
                        <h3 className="text-lg font-medium mb-3 mt-5">
                          {t("select_weekdays")}
                          <span className="highlight">
                            ({t("multiple_selection")})
                          </span>
                          :
                        </h3>
                        <div className="flex items-center gap-3 mt-2">
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
                              <Label
                                className="ml-2 capitalize"
                                htmlFor={option.value}
                              >
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {recurringData?.ends && (
                      <>
                        <h3 className="text-lg font-medium mb-3 mt-5">
                          {t("ends")}:
                        </h3>
                        <RadioGroup
                          disabled
                          value={recurringData?.ends}
                          className="flex"
                        >
                          {durationOptions.map((option) => (
                            <div
                              key={option.value}
                              className="flex items-center space-x-2 mb-2"
                            >
                              <RadioGroupItem
                                value={option.value}
                                id={option.value}
                              />
                              <Label htmlFor={option.value}>
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </>
                    )}
                  </div>
                ) : recurringData?.recurring_type === "free" ? (
                  <div className="">
                    <div className="mt-5 mb-5 ">
                      <h3 className="text-lg font-medium mt-10 mb-5">
                        {t("select_start_date_and_time_free")}
                      </h3>
                      <div className="flex w-max gap-4 items-center">
                        {recurringData?.free_dates && (
                          <DatePicker
                            mode="multiple"
                            date={recurringData?.free_dates}
                            disabled
                          />
                        )}
                        {recurringData?.free_dates_start_time && (
                          <Input
                            disabled
                            value={recurringData?.free_dates_start_time}
                          />
                        )}
                      </div>
                    </div>
                    {recurringData?.free_dates_return_time && (
                      <div className="mt-5 mb-5 ">
                        <h3 className="text-lg font-medium mt-10 mb-5">
                          {t("select_return_time")}
                        </h3>
                        <div className="flex w-max gap-4 items-center">
                          {/* <DatePicker
                          mode="multiple"
                          date={recurringData?.free_dates}
                          disabled
                        /> */}
                          <Input
                            disabled
                            placeholder="No time selected"
                            value={recurringData?.free_dates_return_time}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            )}
            <div>
              <h6 className="title mb-10">{t("patient_details")}</h6>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="mb-5">
                  <Label className="block mb-2 font-medium">
                    {t("name_billing")} <sup className="text-[13px]">*</sup>
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
                    {t("surname")} <sup className="text-[13px]">*</sup>
                  </Label>
                  <Input
                    disabled
                    value={patientData?.surname}
                    placeholder={t("type_your_surname")}
                    className="border-gray-300"
                  />
                </div>
                <div></div>
                <div className="mb-5">
                  <Label className="block mb-2 font-medium">
                    {t("date_of_birth")} <sup className="text-[13px]">*</sup>
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
                    placeholder={t("type_your_date_of_birth")}
                    className="border-gray-300"
                  />
                </div>
                <div className="mb-5">
                  <Label className="block mb-2 font-medium">
                    {t("area_room")} <sup className="text-[13px]">*</sup>
                  </Label>
                  <Input
                    disabled
                    value={patientData?.area_room}
                    placeholder={t("type_your_area_or_room")}
                    className="border-gray-300"
                  />
                </div>
                <div />
                {patientData?.patient_above_90kg && (
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      {t("patient_above_90_kg")}
                    </Label>
                    <div className="flex items-center">
                      <Checkbox
                        checked={patientData?.patient_above_90kg}
                        disabled
                      />
                      <Label className="text-gray-500 font-medium text-[15px] cursor-pointer ml-2">
                        {t("no")}
                      </Label>
                    </div>
                  </div>
                )}
                {patientData?.patient_above_90kg && (
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      {t("how_much")}
                    </Label>
                    <Input
                      disabled
                      value={patientData?.how_much}
                      placeholder={t("type_how_much")}
                      className="border-gray-300"
                    />
                  </div>
                )}
                <div />

                {patientData?.isolation && (
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      {t("isolation")}
                    </Label>
                    <div className="flex items-center">
                      <Checkbox checked={patientData?.isolation} disabled />
                      <Label className="text-gray-500 font-medium text-[15px] cursor-pointer ml-2">
                        {t("yes")}
                      </Label>
                    </div>
                  </div>
                )}
                {patientData?.isolation && (
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      {t("which")}
                    </Label>
                    <Input
                      disabled
                      value={patientData?.which}
                      placeholder={t("type_which")}
                      className="border-gray-300"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Destination Details */}
            <div>
              <h6 className="title mb-10">{t("destination_details")}</h6>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="pr-5">
                  <h6 className="mb-8">{t("pick_up")}</h6>
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      {t("name_institution")}{" "}
                      <sup className="text-[13px]">*</sup>
                    </Label>
                    <Input
                      disabled
                      value={destinationDetailsData?.pick_up_name}
                      placeholder={t("pre_filled")}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      {t("street")} <sup className="text-[13px]">*</sup>
                    </Label>
                    <Input
                      disabled
                      value={destinationDetailsData?.pick_up_address}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      {t("postal_code")} <sup className="text-[13px]">*</sup>
                    </Label>
                    <Input
                      disabled
                      value={destinationDetailsData?.pick_up_postal_code}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      {t("city")} <sup className="text-[13px]">*</sup>
                    </Label>
                    <Input
                      disabled
                      value={destinationDetailsData?.pick_up_city}
                      placeholder={t("enter_city_name")}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      {t("country")} <sup className="text-[13px]">*</sup>
                    </Label>
                    <Input
                      disabled
                      value={destinationDetailsData?.pick_up_country}
                      placeholder={t("enter_country")}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      {t("working_employee_name")}{" "}
                      <sup className="text-[13px]">*</sup>
                    </Label>
                    <Input
                      disabled
                      value={destinationDetailsData?.pick_up_employee_name}
                      placeholder={t("type_the_working_employees_name")}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      {t("phone")}
                      <sup className="text-[13px]">*</sup>
                    </Label>
                    <Input
                      disabled
                      value={destinationDetailsData?.pickup_phone}
                      placeholder={t("type_the_phone_number")}
                      className="border-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <h6 className="mb-8">{t("drop_off")}</h6>
                    {transportationData?.type_of_transport !== "recurring" && (
                      <div className="mb-5">
                        <Label className="block mb-2 font-medium">
                          {t("date")} <sup className="text-[13px]">*</sup>
                        </Label>
                        <Input
                          disabled
                          value={
                            destinationDetailsData?.drop_off_pick_up_date
                              ? moment(
                                  destinationDetailsData?.drop_off_pick_up_date
                                ).format("DD MMMM YYYY")
                              : "Not provided"
                          }
                          placeholder={t("type_your_drop_off_date")}
                          className="border-gray-300"
                        />
                      </div>
                    )}
                    {transportationData?.type_of_transport !== "recurring" && (
                      <div className="mb-5">
                        <Label className="block mb-2 font-medium">
                          {t("pickup_time")}{" "}
                          <sup className="text-[13px]">*</sup>
                        </Label>
                        <Input
                          disabled
                          value={destinationDetailsData?.drop_off_pick_up_time}
                          placeholder={t("pick_up_time")}
                          className="border-gray-300"
                        />
                      </div>
                    )}
                    {transportationData?.type_of_transport !== "recurring" && (
                      <div className="mb-5">
                        <Label className="block mb-2 font-medium">
                          {t("appointment_time")}{" "}
                          <sup className="text-[13px]">*</sup>
                        </Label>
                        <Input
                          disabled
                          value={
                            destinationDetailsData?.pickup_appointment_time
                          }
                          placeholder={t("pick_up_time")}
                          className="border-gray-300"
                        />
                      </div>
                    )}
                    <div className="mb-5">
                      <Label className="block mb-2 font-medium">
                        {t("drop_off_name")}{" "}
                        <sup className="text-[13px]">*</sup>
                      </Label>
                      <Input
                        disabled
                        value={destinationDetailsData?.drop_off_name}
                        placeholder={t("enter_name")}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="mb-5">
                      <Label className="block mb-2 font-medium">
                        {t("drop_off_street")}{" "}
                        <sup className="text-[13px]">*</sup>
                      </Label>
                      <Input
                        disabled
                        value={destinationDetailsData?.drop_off_address}
                        placeholder={t("enter_street")}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="mb-5">
                      <Label className="block mb-2 font-medium">
                        {t("drop_off_postal_code")}{" "}
                        <sup className="text-[13px]">*</sup>
                      </Label>
                      <Input
                        disabled
                        value={destinationDetailsData?.drop_off_postal_code}
                        placeholder={t("enter_postal_code")}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="mb-5">
                      <Label className="block mb-2 font-medium">
                        {t("drop_off_city")}{" "}
                        <sup className="text-[13px]">*</sup>
                      </Label>
                      <Input
                        disabled
                        value={destinationDetailsData?.drop_off_city}
                        placeholder={t("drop_off_enter_city_name")}
                        className="border-gray-300"
                      />
                    </div>
                    <div className="mb-5">
                      <Label className="block mb-2 font-medium">
                        {t("drop_off_enter_country")}{" "}
                        <sup className="text-[13px]">*</sup>
                      </Label>
                      <Input
                        disabled
                        value={destinationDetailsData?.drop_off_country}
                        placeholder="Enter Country"
                        className="border-gray-300"
                      />
                    </div>
                    {destinationDetailsData?.drop_off_phone && (
                      <div className="mb-5">
                        <Label className="block mb-2 font-medium">
                          {t("phone")}
                        </Label>
                        <Input
                          disabled
                          value={destinationDetailsData?.drop_off_phone}
                          placeholder={t("type_the_phone_number")}
                          className="border-gray-300"
                        />
                      </div>
                    )}
                  </div>
                  {reopenOrderData?.transportationData?.type_of_transport !==
                    "recurring" &&
                    destinationDetailsData?.drop_off_return_date && (
                      <div>
                        <h6 className="mb-8 mt-14">{t("return_journey")}</h6>
                        <div className="mb-5">
                          <Label className="block mb-2 font-medium">
                            {t("return_date")}
                          </Label>
                          <Input
                            disabled
                            value={
                              destinationDetailsData?.drop_off_return_date
                                ? moment(
                                    destinationDetailsData?.drop_off_return_date
                                  ).format("DD MMMM YYYY")
                                : "Not provided"
                            }
                            placeholder={t("type_your_return_date")}
                            className="border-gray-300"
                          />
                        </div>
                        <div className="mb-5">
                          <Label className="block mb-2 font-medium">
                            {t("return_time")}
                          </Label>
                          <Input
                            disabled
                            value={destinationDetailsData?.return_approx_time}
                            placeholder={t("enter_time")}
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
              {billingDetailsData?.pre_name ||
                billingDetailsData?.name ||
                billingDetailsData?.street ||
                billingDetailsData?.place ||
                billingDetailsData?.contact ||
                (billingDetailsData?.contact_phone && (
                  <h6 className="title mb-10">{t("billing_address")}</h6>
                ))}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {billingDetailsData?.pre_name && (
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      {t("first_name")}
                    </Label>
                    <Input
                      disabled
                      value={billingDetailsData?.pre_name}
                      placeholder={t("type_your_prename_or_institution")}
                      className="border-gray-300"
                    />
                  </div>
                )}
                {billingDetailsData?.name && (
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      {t("name_institution")}
                    </Label>
                    <Input
                      disabled
                      value={billingDetailsData?.name}
                      placeholder={t("type_your_name")}
                      className="border-gray-300"
                    />
                  </div>
                )}
                {billingDetailsData?.street && (
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      {t("street")}
                    </Label>
                    <Input
                      disabled
                      value={billingDetailsData?.street}
                      placeholder={t("type_your_street")}
                      className="border-gray-300"
                    />
                  </div>
                )}
                {billingDetailsData?.place && (
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      {t("place")}
                    </Label>
                    <Input
                      disabled
                      value={billingDetailsData?.place}
                      placeholder={t("type_your_place")}
                      className="border-gray-300"
                    />
                  </div>
                )}
                {billingDetailsData?.contact && (
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      {t("contact")}
                    </Label>
                    <Input
                      disabled
                      value={billingDetailsData?.contact}
                      placeholder={t("type_your_contact_number")}
                      className="border-gray-300"
                    />
                  </div>
                )}
                {billingDetailsData?.contact_phone && (
                  <div className="mb-5">
                    <Label className="block mb-2 font-medium">
                      {t("contact_phone")}
                    </Label>
                    <Input
                      disabled
                      value={billingDetailsData?.contact_phone}
                      placeholder={t("type_your_contact_number")}
                      className="border-gray-300"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-5 mt-5">
            <Button
              className="px-14"
              variant="outline"
              onClick={() => {
                setShowPreview(false);
                setCurrentStep("transportDetails");
              }}
            >
              Edit
            </Button>
            <Button onClick={handleCreateAnOrder} className="px-14">
              {loading ? (
                <Loading className="w-6 h-6 mx-auto text-white" />
              ) : (
                t("submit")
              )}
            </Button>
          </div>
          {showModal && (
            <AppModal
              icon={<SuccessfullyCreatedOrderModalImage />}
              isSuccess={true}
              head="order_sent_successfully"
              details="your_order_has_been_placed_successfully_thank_you_for_order"
              buttonText="continue"
              onClose={closeModal}
            />
          )}
        </CardContent>
      </Card>

      {/* Progress Modal */}
      {showProgress && (
        <Dialog open={showProgress}>
          <DialogContent>
            <SubmitProgress
              setShowProgress={setShowProgress}
              loading={loading}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ReopenPreviewDetails;
