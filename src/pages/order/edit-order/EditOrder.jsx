/* eslint-disable no-unused-vars */
import { useLazyQuery } from "@apollo/client";
import { GET_AN_ORDER } from "../order-details/graphql/queries/getAnOrder.gql";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditTransportationDetails from "@/components/order/edit-order/EditTransportationDetails";
import EditPatientDetails from "@/components/order/edit-order/EditPatientDetails";
import EditDestinationDetails from "@/components/order/edit-order/EditDestinationDetails";
import EditBillingDetails from "@/components/order/edit-order/EditBillingDetails";
import { Card } from "@/components/ui/card";

const EditOrder = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [dropDate, setDropDate] = useState(null);
  const { id } = useParams();

  const [editOrderData, setEditOrderData] = useState({
    transportationData: {
      type_of_transport: "",
      mode_of_transportation: [],
      transport_with: [],
      start_date: startDate,
      return_date: endDate,
      start_time: "",
      return_time: "",
      multiple_week_days: [],
      ends: "",
    },
    patientData: {
      name: "",
      surname: "",
      date_of_birth: null,
      area_room: "",
      cost_center: "",
      how_much: "",
      special_note: "",
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

  const [getAnOrder] = useLazyQuery(GET_AN_ORDER, {
    variables: { queryData: { id: id } },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    onCompleted: (response) => {
      setEditOrderData(response.getAnOrder);
      setDropDate(
        response.getAnOrder?.destinationDetailsData?.drop_off_pick_up_date
      );
      setDateOfBirth(response.getAnOrder?.patientData?.date_of_birth);
      setReturnDate(response.getAnOrder?.destinationDetailsData?.return_date);
    },
    onError: (error) => {
      console.error({ error });
    },
  });

  useEffect(() => {
    getAnOrder();
  }, []);

  const handleUpdate = () => {
    const dataTobeUpdated = {
      ...editOrderData,
      patientData: {
        ...editOrderData.patientData,
        date_of_birth: dateOfBirth,
      },
      destinationDetailsData: {
        ...editOrderData.destinationDetailsData,
        drop_off_pick_up_date: dropDate,
        return_date: returnDate,
      },
    };
    console.log(dataTobeUpdated);
  };

  const props = {
    editOrderData,
    dateOfBirth,
    returnDate,
    dropDate,
    setEditOrderData,
    setDateOfBirth,
    setReturnDate,
    setDropDate,
    handleUpdate,
  };
  return (
    <div>
      <h5 className="mb-4">Edit Order</h5>
      <Card className="bg-white p-0 border-opacity-50 border">
        <EditTransportationDetails {...props} />
        <EditPatientDetails {...props} />
        <EditDestinationDetails {...props} />
        <EditBillingDetails {...props} />
      </Card>
    </div>
  );
};

export default EditOrder;
