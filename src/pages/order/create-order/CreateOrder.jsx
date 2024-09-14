/* eslint-disable react/prop-types */
import { useState } from "react";
import { Pencil, Send, Truck, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import BillingDetails from "@/components/create-order-forms/billing-details/BillingDetails";
import DestinationDetails from "@/components/create-order-forms/destination-details/DestinationDetails";
import PatientDetails from "@/components/create-order-forms/patient-details/PatientDetails";
import TransportationDetails from "@/components/create-order-forms/transportation-details/TransportationDetails";
import PreviewDetails from "@/components/create-order-forms/preview-details/PreviewDetails";
import Navbar from "@/components/common/Navbar";

const CreateOrder = () => {
  const [transportationProgress, setTransportationProgress] = useState(0);
  const [patientProgress, setPatientProgress] = useState(0);
  const [destinationProgress, setDestinationProgress] = useState(0);
  const [billingProgress, setBillingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("transportDetails");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [transportationData, setTransportationData] = useState({
    typeOfTransport: "",
    modeOfTransportation: [],
    transportWith: [],
  });

  const [patientData, setPatientData] = useState({
    name: "",
    surname: "",
    dateOfBirth: "",
    areaRoom: "",
    costCenter: "",
    howMuch: "",
    special: "",
    isolation: false,
    patientAbove90kg: false,
  });

  const [destinationDetailsData, setDestinationDetailsData] = useState({
    //pick up details
    pickUpName: "",
    pickUpAddress: "",
    pickUpCity: "",
    pickUpCountry: "",
    pickUpEmployeeName: "",
    // here is drop off details
    dropOffDate: "",
    dropOffPickUpTime: "",
    dropOffName: "",
    dropOffAddress: "",
    dropOffCity: "",
    dropOffCountry: "",
    dropOffPhone: "",
    // and return details
    returnDayLetter: "",
    returnApproxTime: "",
    returnFloor: "",
  });
  console.log(destinationDetailsData);
    const [billingDetailsData, setBillingDetailsData] = useState({
      preName: "",
      name: "",
      street: "",
      place: "",
      contact: "",
    });

  const handleFormChange = (step) => {
    setCurrentStep(step);
  };

  const StepIcon = ({ step, icon, progressValue }) => (
    <div
      className={`${
        progressValue === 100
          ? "bg-[#B4DB1A] text-white"
          : currentStep === step && progressValue !== 100
          ? "bg-[#FBA63C] text-white"
          : "bg-[#DFE5ED] text-black"
      } size-40 h-max p-3 rounded-full cursor-pointer`}
      onClick={() => handleFormChange(step)}
    >
      {icon}
    </div>
  );

  const props = {
    transportationData,
    patientData,
    transportationProgress,
    destinationDetailsData,
    billingDetailsData,
    billingProgress,
    currentStep,
    endDate,
    startDate,
    selectedWeekdays,
    setSelectedWeekdays,
    setEndDate,
    setStartDate,
    setCurrentStep,
    setBillingProgress,
    setBillingDetailsData,
    setDestinationDetailsData,
    handleFormChange,
    setTransportationProgress,
    setPatientProgress,
    setDestinationProgress,
    setTransportationData,
    setPatientData,
  };
  return (
    <div>
      <Navbar />
      <div className="bg-authBackground w-full bg-cover bg-no-repeat min-h-screen flex flex-col justify-center items-center py-24">
        <div className="flex items-center gap-5 mb-5">
          <StepIcon
            step="transportDetails"
            icon={<Pencil />}
            progressValue={transportationProgress}
          />
          <Progress value={transportationProgress} />
          <StepIcon
            step="patientDetails"
            icon={<User />}
            progressValue={patientProgress}
          />
          <Progress value={patientProgress} />
          <StepIcon
            step="destinationDetails"
            icon={<Truck />}
            progressValue={destinationProgress}
          />
          <Progress value={destinationProgress} />
          <StepIcon
            step="billingDetails"
            icon={<Send />}
            progressValue={billingProgress}
          />
        </div>
        {currentStep === "transportDetails" ? (
          <TransportationDetails {...props} />
        ) : currentStep === "patientDetails" ? (
          <PatientDetails {...props} />
        ) : currentStep === "destinationDetails" ? (
          <DestinationDetails {...props} />
        ) : currentStep === "billingDetails" ? (
          <BillingDetails {...props} />
        ) : (
          <PreviewDetails />
        )}
      </div>
    </div>
  );
};

export default CreateOrder;
