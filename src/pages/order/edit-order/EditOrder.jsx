/* eslint-disable no-unused-vars */
import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditTransportationDetails from "@/components/order/edit-order/EditTransportationDetails";
import EditPatientDetails from "@/components/order/edit-order/EditPatientDetails";
import EditDestinationDetails from "@/components/order/edit-order/EditDestinationDetails";
import EditBillingDetails from "@/components/order/edit-order/EditBillingDetails";
import { Card } from "@/components/ui/card";
import { UPDATE_AN_ORDER } from "./graphql/mutations/updateAnOrder.gql";
import { GET_AN_ORDER } from "./graphql/queries/getAnOrder.gql";
import toast from "react-hot-toast";
import { t } from "i18next";

const EditOrder = () => {
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [dropDate, setDropDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [editOrderData, setEditOrderData] = useState({
    transportationData: {
      type_of_transport: "",
      mode_of_transportation: [],
      transport_with: [],
      oxygen_quantity: null,
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

  const [getAnOrder, { loading: getAnOrderLoading }] = useLazyQuery(
    GET_AN_ORDER,
    {
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
    }
  );

  useEffect(() => {
    getAnOrder();
  }, []);

  function removeTypename(obj) {
    // If the object is an array, recursively apply to each item
    if (Array.isArray(obj)) {
      return obj.map(removeTypename);
    }

    // If the object is an object, iterate and remove __typename
    if (typeof obj === "object" && obj !== null) {
      const newObj = {};
      for (const key in obj) {
        if (key !== "__typename") {
          newObj[key] = removeTypename(obj[key]);
        }
      }
      return newObj;
    }

    // If it's not an object or array, return it as is
    return obj;
  }

  const [updateAnOrder] = useMutation(UPDATE_AN_ORDER);

  const handleUpdate = async () => {
    if (
      editOrderData.patientData.patient_above_90kg &&
      !editOrderData.patientData.how_much
    ) {
      toast.error("Please enter the amount");
      return;
    }
    setLoading(true);
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
    try {
      const { data } = await updateAnOrder({
        variables: {
          queryData: { id },
          inputData: removeTypename(dataTobeUpdated),
        },
      });
      if (data?.updateAnOrder?.id) {
        toast.success("Order updated successfully");
        navigate("/orders/all-orders");
        setLoading(false);
      }
    } catch (error) {
      const { message, response } = error;
      console.error(message, response);
    } finally {
      setLoading(false);
    }
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
    loading,
  };
  return (
    <div>
      <h5 className="mb-4">{t("edit_order")}</h5>

      {getAnOrderLoading ? (
        <Card className="h-[calc(100vh-11rem)] mt-6 flex justify-center items-center">
          <p className="text-primary">{t("loading")}...</p>
        </Card>
      ) : (
        <Card className="bg-white p-0 border-opacity-50 border">
          <EditTransportationDetails {...props} />
          <EditPatientDetails {...props} />
          <EditDestinationDetails {...props} />
          <EditBillingDetails {...props} />
        </Card>
      )}
    </div>
  );
};

export default EditOrder;
