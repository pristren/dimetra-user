/* eslint-disable no-unused-vars */
import { useLazyQuery } from "@apollo/client";
import { GET_AN_ORDER } from "../order-details/graphql/queries/getAnOrder.gql";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditTransportationDetails from "@/components/order/edit-order/EditTransportationDetails";
import EditPatientDetails from "@/components/order/edit-order/EditPatientDetails";
import EditDestinationDetails from "@/components/order/edit-order/EditDestinationDetails";
import EditBillingDetails from "@/components/order/edit-order/EditBillingDetails";

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
    },
    onError: (error) => {
      console.error({ error });
    },
  });

  useEffect(() => {
    getAnOrder();
  }, [getAnOrder]);

  const handleUpdate = () => {
    console.log(editOrderData);
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
      <EditTransportationDetails {...props} />
      <EditPatientDetails {...props} />
      <EditDestinationDetails {...props} />
      <EditBillingDetails {...props} />
    </div>
  );
};

export default EditOrder;
