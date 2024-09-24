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

const CreateOrder = () => {
  const [transportationProgress, setTransportationProgress] = useState(0);
  const [patientProgress, setPatientProgress] = useState(0);
  const [destinationProgress, setDestinationProgress] = useState(0);
  const [billingProgress, setBillingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("transportDetails");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [dropDate, setDropDate] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [createOrderData, setCreateOrderData] = useState({
    transportationData: {
      type_of_transport: "",
      mode_of_transportation: [],
      transport_with: [],
      week_days: "",
      start_date: startDate,
      end_date: endDate,
      start_time: "",
      return_time: "",
      multiple_weekdays: [],
      ends: "",
    },
    patientData: {
      name: "",
      surname: "",
      date_of_birth: null,
      area_room: "",
      cost_center: "",
      how_much: "",
      special: "",
      isolation: false,
      patient_above_90kg: false,
    },
    destinationDetailsData: {
      pick_up_name: "",
      pick_up_address: "",
      pick_up_city: "",
      pick_up_country: "",
      pick_up_employee_name: "",

      drop_off_pick_up_date: null,
      drop_off_pick_up_time: "",
      drop_off_name: "",
      drop_off_address: "",
      drop_off_city: "",
      drop_off_country: "",
      drop_off_phone: "",

      return_date: null,
      return_approx_time: "",
      return_floor: "",
    },
    billingDetailsData: {
      pre_name: "",
      name: "",
      street: "",
      place: "",
      contact: "",
    },
  });

  const prevCreateOrderDataRef = useRef(createOrderData);

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

      if (parsedData.patientData?.date_of_birth) {
        setDateOfBirth(parsedData.patientData.date_of_birth);
      }
      if (parsedData.destinationDetailsData?.drop_off_pick_up_date) {
        setDropDate(parsedData.destinationDetailsData.drop_off_pick_up_date);
      }
      if (parsedData.destinationDetailsData?.return_date) {
        setReturnDate(parsedData.destinationDetailsData.return_date);
      }
    }
  }, []);

  useEffect(() => {
    setCreateOrderData((prev) => ({
      ...prev,
      patientData: {
        ...prev.patientData,
        date_of_birth: dateOfBirth,
      },
      destinationDetailsData: {
        ...prev.destinationDetailsData,
        drop_off_pick_up_date: dropDate,
        return_date: returnDate,
      },
    }));
  }, [dateOfBirth, dropDate, returnDate]);

  const handleFormChange = (step) => {
    setCurrentStep(step);
  };

  const StepIcon = ({ step, icon, progressValue, isDisabled, text }) => (
    <div
      className={`flex items-center justify-center flex-col size-40 h-max ${
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
        } p-3 rounded-full w-max border border-gray-400`}
        onClick={() => {
          if (!isDisabled) {
            handleFormChange(step);
          }
        }}
      >
        {icon}
      </div>
      {text}
    </div>
  );

  const props = {
    transportationProgress,
    createOrderData,
    billingProgress,
    currentStep,
    endDate,
    startDate,
    selectedWeekdays,
    returnDate,
    dropDate,
    dateOfBirth,
    patientProgress,
    destinationProgress,
    showPreview,
    setShowPreview,
    setDateOfBirth,
    setDropDate,
    setReturnDate,
    setSelectedWeekdays,
    setCreateOrderData,
    setEndDate,
    setStartDate,
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
      <div className="bg-authBackground w-full bg-cover bg-no-repeat min-h-screen flex flex-col justify-center items-center py-24">
        <div className="flex  gap-5 mb-5">
          <StepIcon
            step="transportDetails"
            text="Transport"
            icon={<Pencil />}
            progressValue={transportationProgress}
            isDisabled={false}
          />
          <Progress value={transportationProgress} className="mt-5" />

          <StepIcon
            step="patientDetails"
            text="Patient"
            icon={<User />}
            disabled={transportationProgress !== 100}
            progressValue={patientProgress}
            isDisabled={transportationProgress < 100}
          />
          <Progress value={patientProgress} className="mt-5" />

          <StepIcon
            step="destinationDetails"
            text="Destination"
            icon={<Truck />}
            disabled={patientProgress !== 100}
            progressValue={destinationProgress}
            isDisabled={patientProgress < 100}
          />
          <Progress value={destinationProgress} className="mt-5" />

          <StepIcon
            step="billingDetails"
            text="Billing"
            icon={<Send />}
            disabled={destinationProgress !== 100}
            progressValue={billingProgress}
            isDisabled={destinationProgress < 100}
          />
        </div>

        {currentStep === "transportDetails" ? (
          <TransportationDetails {...props} />
        ) : currentStep === "patientDetails" ? (
          <PatientDetails {...props} />
        ) : currentStep === "destinationDetails" ? (
          <DestinationDetails {...props} />
        ) : (
          currentStep === "billingDetails" && <BillingDetails {...props} />
        )}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="w-[90%] max-w-[60rem] px-0 border-none max-h-[98vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle /> 
              <div>
                <PreviewDetails {...props} />
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
          <p className="text-lg mb-5 text-center">Powered by</p>
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
