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
  const [showForm, setShowForm] = useState({
    isTransport: true,
    isPatient: false,
    isDestination: false,
    isBilling: false,
  });

  const [orderData, setOrderData] = useState({
    typeOfTransport: "",
    modeOfTransportation: [],
    transportWith: [],
  });

  const handleFormChange = (formType) => {
    setShowForm({
      isTransport: formType === "transport",
      isPatient: formType === "patient",
      isDestination: formType === "destination",
      isBilling: formType === "billing",
    });
  };

  const props = {
    showForm,
    orderData,
    transportationProgress,
    handleFormChange,
    setTransportationProgress,
    setPatientProgress,
    setDestinationProgress,
    setOrderData,
  };

  return (
    <div>
      <Navbar />
      <div className="bg-authBackground w-full bg-cover bg-no-repeat min-h-screen flex flex-col justify-center items-center py-24">
        <div className="flex items-center gap-5 mb-5">
          <Pencil
            className="size-40 text-white bg-[#B4DB1A] h-max p-3 rounded-full cursor-pointer"
            onClick={() => handleFormChange("transport")}
          />
          <Progress value={transportationProgress} />
          <User
            className="size-40 text-white bg-[#B4DB1A] h-max p-3 rounded-full cursor-pointer"
            onClick={() => handleFormChange("patient")}
          />
          <Progress value={patientProgress} />
          <Truck
            className="size-40 text-white bg-[#B4DB1A] h-max p-3 rounded-full cursor-pointer"
            onClick={() => handleFormChange("destination")}
          />
          <Progress value={destinationProgress} />
          <Send
            className="size-40 text-white bg-[#B4DB1A] h-max p-3 rounded-full cursor-pointer"
            onClick={() => handleFormChange("billing")}
          />
        </div>
        {showForm.isTransport ? (
          <TransportationDetails {...props} />
        ) : showForm.isPatient ? (
          <PatientDetails {...props} />
        ) : showForm.isDestination ? (
          <DestinationDetails {...props} />
        ) : showForm.isBilling ? (
          <BillingDetails {...props} />
        ) : (
          <PreviewDetails />
        )}
      </div>
    </div>
  );
};

export default CreateOrder;
