/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { Pencil, Send, Truck, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/common/Navbar";
import { isEqual } from "lodash";
import { Logo } from "@/assets/icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { t } from "i18next";
import { calculateFormProgress } from "@/utils";
import { useParams } from "react-router-dom";
import { GET_AN_ORDER } from "../edit-order/graphql/queries/getAnOrder.gql";
import { useLazyQuery } from "@apollo/client";
import CopyTransportationDetails from "@/components/copy-order-forms/copy-transportation-details/CopyTransportationDetails";
import CopyPatientDetails from "@/components/copy-order-forms/copy-patient-details/CopyPatientDetails";
import CopyDestinationDetails from "@/components/copy-order-forms/copy-destination-details/CopyDestinationDetails";
import CopyBillingDetails from "@/components/copy-order-forms/copy-billing-details/CopyBillingDetails";
import CopyPreviewDetails from "@/components/copy-order-forms/copy-preview-details/CopyPreviewDetails";
import { copiedOrderDefaultState } from "@/components/copy-order-forms/helpers";

const CopyOrder = () => {
  const [transportationProgress, setTransportationProgress] = useState(0);
  const [patientProgress, setPatientProgress] = useState(0);
  const [destinationProgress, setDestinationProgress] = useState(0);
  const [billingProgress, setBillingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("transportDetails");
  const [isReturnJourneyHide, setIsReturnJourneyHide] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { id } = useParams();
  const [copiedOrderData, setCopiedOrderData] = useState(
    copiedOrderDefaultState
  );
  const { patientData } = copiedOrderData;
  const prevCopiedOrderDataRef = useRef(copiedOrderData);

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
      drop_off_phone = "",
      pickup_phone = "",
      drop_off_pick_up_date,
      area_room
    } = {},
  } = copiedOrderData;

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
    area_room
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
    drop_off_phone,
    area_room
  ];

  function removeTypename(obj) {
    if (Array.isArray(obj)) {
      return obj.map(removeTypename);
    } else if (obj !== null && typeof obj === "object") {
      const newObj = {};
      for (const key in obj) {
        if (key !== "__typename") {
          newObj[key] = removeTypename(obj[key]);
        }
      }
      return newObj;
    }
    return obj;
  }

  const [getAnOrder, { loading: getAnOrderLoading }] = useLazyQuery(
    GET_AN_ORDER,
    {
      variables: { queryData: { id: id } },
      errorPolicy: "all",
      fetchPolicy: "no-cache",
      onCompleted: (response) => {
        const cleanedData = removeTypename(response.getAnOrder);
        setCopiedOrderData(cleanedData);
      },
      onError: (error) => {
        console.error({ error });
      },
    }
  );

  useEffect(() => {
    if (id) {
      getAnOrder();
    }
  }, [id]);

  useEffect(() => {
    if (!isEqual(prevCopiedOrderDataRef.current, copiedOrderData)) {
      localStorage.setItem("copiedOrderData", JSON.stringify(copiedOrderData));
      prevCopiedOrderDataRef.current = copiedOrderData;
    }
  }, [copiedOrderData]);

  useEffect(() => {
    const storedData = localStorage.getItem("copiedOrderData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setCopiedOrderData(parsedData);
      setIsReturnJourneyHide(
        !!(
          parsedData?.destinationDetailsData?.return_date ||
          parsedData?.destinationDetailsData?.return_approx_time
        )
      );
    }
  }, []);

  useEffect(() => {
    if (
      copiedOrderData.transportationData?.type_of_transport ===
      "collection_order"
    ) {
      const fieldsFilled = [
        patientData.name,
        patientData.surname,
      ];
      setPatientProgress(calculateFormProgress(fieldsFilled));
    } else {
      const fieldsFilled = [
        patientData.name,
        patientData.surname,
        patientData.date_of_birth,
      ];
      setPatientProgress(calculateFormProgress(fieldsFilled));
    }
  }, [patientData, setPatientProgress]);

  useEffect(() => {
    if (
      copiedOrderData?.transportationData?.type_of_transport !== "recurring"
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

  const transportationProps = {
    transportationProgress,
    setTransportationProgress,
  };
  const patientProps = {
    patientProgress,
    setPatientProgress,
  };
  const destinationProps = {
    destinationProgress,
    setDestinationProgress,
    isReturnJourneyHide,
    setIsReturnJourneyHide,
  };
  const billingProps = {
    billingProgress,
    setBillingProgress,
  };

  const commonProps = {
    copiedOrderData,
    handleFormChange,
    setShowPreview,
    setCurrentStep,
    setCopiedOrderData,
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
                isDisabled={patientProgress < 100}
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
                isDisabled={destinationProgress < 100}
              />
            </div>
          </div>

          <div className="lg:w-[70%] px-3 lg:px-0">
            {getAnOrderLoading ? (
              <div className="flex items-center justify-center min-h-96">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid"
                  width="20"
                  height="20"
                  style={{
                    shapeRendering: "auto",
                    display: "block",
                    background: "rgba(255, 255, 255, 0)",
                  }}
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g>
                    <circle
                      strokeDasharray="164.93361431346415 56.97787143782138"
                      r="35"
                      strokeWidth="10"
                      stroke="#145374"
                      fill="none"
                      cy="50"
                      cx="50"
                    >
                      <animateTransform
                        keyTimes="0;1"
                        values="0 50 50;360 50 50"
                        dur="1s"
                        repeatCount="indefinite"
                        type="rotate"
                        attributeName="transform"
                      ></animateTransform>
                    </circle>
                    <g></g>
                  </g>
                </svg>
                <p>Loading...</p>
              </div>
            ) : currentStep === "transportDetails" ? (
              <CopyTransportationDetails
                {...transportationProps}
                {...commonProps}
              />
            ) : currentStep === "patientDetails" ? (
              <CopyPatientDetails {...patientProps} {...commonProps} />
            ) : currentStep === "destinationDetails" ? (
              <CopyDestinationDetails {...destinationProps} {...commonProps} />
            ) : (
              currentStep === "billingDetails" && (
                <CopyBillingDetails {...billingProps} {...commonProps} />
              )
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
                  <CopyPreviewDetails {...commonProps} />
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

export default CopyOrder;
