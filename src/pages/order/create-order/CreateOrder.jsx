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
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);

  const [createOrderData, setCreateOrderData] = useState({
    transportationData: {
      typeOfTransport: "",
      modeOfTransportation: [],
      transportWith: [],
      weekDays: "",
      startDate,
      endDate,
      startTime: "",
      returnTime: "",
      multipleWeekDays: [],
      ends: "",
    },
    patientData: {
      name: "",
      surname: "",
      dateOfBirth: "",
      areaRoom: "",
      costCenter: "",
      howMuch: "",
      special: "",
      isolation: false,
      patientAbove90kg: false,
    },
    destinationDetailsData: {
      //pick up details
      pickUpName: "",
      pickUpAddress: "",
      pickUpCity: "",
      pickUpCountry: "",
      pickUpEmployeeName: "",

      dropOffPickUpTime: "",
      dropOffName: "",
      dropOffAddress: "",
      dropOffCity: "",
      dropOffCountry: "",
      dropOffPhone: "",

      returnDayLetter: "",
      returnApproxTime: "",
      returnFloor: "",
    },
    billingDetailsData: {
      preName: "",
      name: "",
      street: "",
      place: "",
      contact: "",
    },
  });

  console.log(createOrderData?.typeOfTransport);
  const prevCreateOrderDataRef = useRef(createOrderData);

  useEffect(() => {
    const storedData = localStorage.getItem("createOrderData");
    if (storedData) {
      setCreateOrderData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (!isEqual(prevCreateOrderDataRef.current, createOrderData)) {
      const { transportationData } = createOrderData;
      const { typeOfTransport, modeOfTransportation, transportWith } =
        transportationData;

      if (
        typeOfTransport ||
        modeOfTransportation.length ||
        transportWith.length
      ) {
        localStorage.setItem(
          "createOrderData",
          JSON.stringify(createOrderData)
        );
      }
      prevCreateOrderDataRef.current = createOrderData;
    }
  }, [createOrderData]);

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
    transportationProgress,
    createOrderData,
    billingProgress,
    currentStep,
    endDate,
    startDate,
    selectedWeekdays,
    returnDate,
    dropDate,
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
          <PreviewDetails {...props} />
        )}
      </div>
    </div>
  );
};

export default CreateOrder;
