/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { Pencil, Send, Truck, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import BillingDetails from "@/components/create-order-forms/billing-details/BillingDetails";
import DestinationDetails from "@/components/create-order-forms/destination-details/DestinationDetails";
import PatientDetails from "@/components/create-order-forms/patient-details/PatientDetails";
import TransportationDetails from "@/components/create-order-forms/transportation-details/TransportationDetails";
import PreviewDetails from "@/components/create-order-forms/preview-details/PreviewDetails";
import Navbar from "@/components/common/Navbar";
import { isEqual } from "lodash";
import { Logo } from "@/assets/icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createOrderDefaultState } from "@/components/create-order-forms/helpers";
import { t } from "i18next";
import { calculateFormProgress } from "@/utils";

const CreateOrder = () => {
  const [transportationProgress, setTransportationProgress] = useState(0);
  const [patientProgress, setPatientProgress] = useState(0);
  const [destinationProgress, setDestinationProgress] = useState(0);
  const [billingProgress, setBillingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("transportDetails");
  const [showPreview, setShowPreview] = useState(false);
  const [createOrderData, setCreateOrderData] = useState(
    createOrderDefaultState
  );
  const [isReturnJourneyHide, setIsReturnJourneyHide] =
  useState(false);
  const { patientData } = createOrderData;
  const prevCreateOrderDataRef = useRef(createOrderData);

  const {
    destinationDetailsData: {
      pick_up_name,
      pick_up_address,
      pick_up_postal_code,
      pick_up_city,
      pick_up_country,
      pick_up_employee_name = "",
      drop_off_pick_up_time = "",
      drop_off_name = "",
      drop_off_address,
      drop_off_postal_code,
      drop_off_city = "",
      drop_off_country = "",
      pickup_phone = "",
      drop_off_pick_up_date,
    } = {},
  } = createOrderData;

  const fieldsFilled = [
    pick_up_name,
    pick_up_address,
    pick_up_postal_code,
    pick_up_city,
    pick_up_employee_name,
    drop_off_pick_up_time,
    drop_off_name,
    drop_off_address,
    drop_off_postal_code,
    drop_off_city,
    pickup_phone,
    drop_off_pick_up_date,
  ];

  const fieldsFilledRecurring = [
    pick_up_name,
    pick_up_address,
    pick_up_postal_code,
    pick_up_city,
    pick_up_country,
    pick_up_employee_name,
    drop_off_name,
    drop_off_address,
    drop_off_postal_code,
    drop_off_city,
    drop_off_country,
  ];

  useEffect(() => {
    if (!isEqual(prevCreateOrderDataRef.current, createOrderData)) {
      localStorage.setItem("createOrderData", JSON.stringify(createOrderData));
      prevCreateOrderDataRef.current = createOrderData;
    }
  }, [createOrderData]);

  useEffect(() => {
    const storedData = localStorage.getItem("createOrderData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setCreateOrderData(parsedData);
      setIsReturnJourneyHide(!!(parsedData?.destinationDetailsData?.return_date || parsedData?.destinationDetailsData?.return_approx_time))
    }
  }, []);

  useEffect(() => {
    if (
      createOrderData.transportationData?.type_of_transport ===
      "collection_order"
    ) {
      const fieldsFilled = [
        patientData.name,
        patientData.surname,
        patientData.area_room,
      ];
      setPatientProgress(calculateFormProgress(fieldsFilled));
    } else {
      const fieldsFilled = [
        patientData.name,
        patientData.surname,
        patientData.date_of_birth,
        patientData.area_room,
      ];
      setPatientProgress(calculateFormProgress(fieldsFilled));
    }
  }, [patientData, setPatientProgress]);

  useEffect(() => {
    if (
      createOrderData?.transportationData?.type_of_transport !== "recurring"
    ) {
      setDestinationProgress(calculateFormProgress(fieldsFilled));
    } else {
      setDestinationProgress(calculateFormProgress(fieldsFilledRecurring));
    }
  }, [...fieldsFilled]);
  const handleFormChange = (step) => {
    setCurrentStep(step);
  };

  const StepIcon = ({ step, icon, progressValue, isDisabled, text }) => (
    <div
      className={`flex items-center justify-center flex-col w-20 h-max text-xs lg:text-[16px] lg:leading-7 ${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <div
        className={`${
          progressValue === 100
            ? "bg-[#B4DB1A] text-white"
            : currentStep === step && progressValue !== 100
            ? "bg-[#FBA63C] text-white"
            : "bg-[#DFE5ED] text-black"
        } p-2 lg:p-3 rounded-full w-max border border-gray-400`}
        onClick={() => {
          if (!isDisabled) {
            handleFormChange(step);
          }
        }}
      >
        {icon}
      </div>
      <p className="md:text-sm lg:text-[16px] xl:text-lg">{t(text)}</p>
    </div>
  );

  const props = {
    transportationProgress,
    createOrderData,
    billingProgress,
    currentStep,
    patientProgress,
    destinationProgress,
    showPreview,
    isReturnJourneyHide,
    setIsReturnJourneyHide,
    setShowPreview,
    setCreateOrderData,
    setCurrentStep,
    setBillingProgress,
    handleFormChange,
    setTransportationProgress,
    setPatientProgress,
    setDestinationProgress,
  };
  return (
    <div className="relative overflow-y-auto">
      <Navbar />
      {
        <div className="bg-authBackground w-full bg-cover bg-no-repeat min-h-screen flex flex-col justify-center items-center py-24">
          <div className="flex gap-1 lg:gap-5 mb-5">
            <div className="w-32 xl:w-44">
              <StepIcon
                step="transportDetails"
                text="transport"
                icon={<Pencil className="size-4 lg:size-6" />}
                progressValue={transportationProgress}
                isDisabled={false}
              />
            </div>
            <Progress
              value={transportationProgress}
              className="mt-3 lg:mt-5 h-2 lg:h-4"
            />

            <div className="w-32 xl:w-44">
              <StepIcon
                step="patientDetails"
                text="patient"
                icon={<User className="size-4 lg:size-6" />}
                disabled={transportationProgress !== 100}
                progressValue={patientProgress}
                isDisabled={transportationProgress < 100}
              />
            </div>
            <Progress
              value={patientProgress}
              className="mt-3 lg:mt-5 h-2 lg:h-4"
            />

            <div className="w-32 xl:w-44">
              <StepIcon
                step="destinationDetails"
                text="destination"
                icon={<Truck className="size-4 lg:size-6" />}
                disabled={patientProgress !== 100}
                progressValue={destinationProgress}
                isDisabled={
                  transportationProgress < 100 || patientProgress < 100
                }
              />
            </div>
            <Progress
              value={destinationProgress}
              className="mt-3 lg:mt-5 h-2 lg:h-4"
            />

            <div className="w-32 xl:w-44">
              <StepIcon
                step="billingDetails"
                text="billing"
                icon={<Send className="size-4 lg:size-6" />}
                disabled={destinationProgress !== 100}
                progressValue={billingProgress}
                isDisabled={
                  transportationProgress < 100 ||
                  patientProgress < 100 ||
                  destinationProgress < 100
                }
              />
            </div>
          </div>

          <div className="lg:w-[70%] px-3 lg:px-0">
            {currentStep === "transportDetails" ? (
              <TransportationDetails {...props} />
            ) : currentStep === "patientDetails" ? (
              <PatientDetails {...props} />
            ) : currentStep === "destinationDetails" ? (
              <DestinationDetails {...props} />
            ) : (
              currentStep === "billingDetails" && <BillingDetails {...props} />
            )}
          </div>
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent
              className="w-[90%] max-w-[80rem] px-0 border-none max-h-[98vh] overflow-y-auto"
              isCrossHidden={true}
            >
              <DialogHeader>
                <DialogTitle />
                <div>
                  <PreviewDetails {...props} />
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <div className="mt-20">
            <p className="text-lg mb-5 text-center">{t("powered_by")}</p>
            <Logo />
          </div>
        </div>
      }
    </div>
  );
};

export default CreateOrder;
