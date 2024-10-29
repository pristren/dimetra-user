import { gql } from "@apollo/client";

export const GET_A_RECURRING_ORDER = gql`
  query GET_A_RECURRING_ORDER($queryData: CommonQueryType!) {
    getARecurringOrder(queryData: $queryData) {
      transportationData {
        type_of_transport
        mode_of_transportation
        transport_with
        oxygen_quantity
      }
      patientData {
        name
        surname
        date_of_birth
        area_room
        cost_center
        how_much
        which
        isolation
        patient_above_90kg
      }
      destinationDetailsData {
        pick_up_name
        pick_up_address
        pick_up_postal_code
        pick_up_city
        pick_up_country
        pick_up_employee_name
        pickup_phone
        drop_off_pick_up_time
        pickup_appointment_time
        drop_off_pick_up_date
        drop_off_name
        drop_off_address
        drop_off_postal_code
        drop_off_city
        drop_off_country
        drop_off_phone
        return_date
        return_approx_time
      }
      billingDetailsData {
        pre_name
        name
        street
        place
        contact
        contact_phone
      }
    }
  }
`;
