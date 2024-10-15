import { gql } from "@apollo/client";

export const GET_AN_ORDER = gql`
  query GET_AN_ORDER($queryData: CommonQueryType!) {
    getAnOrder(queryData: $queryData) {
      billingDetailsData {
        contact
        name
        place
        pre_name
        street
      }
      destinationDetailsData {
        drop_off_address
        drop_off_city
        drop_off_country
        drop_off_name
        drop_off_pick_up_date
        drop_off_pick_up_time
        drop_off_postal_code
        return_floor
        return_date
        return_approx_time
        pick_up_postal_code
        pick_up_name
        pick_up_employee_name
        pick_up_country
        pick_up_city
        pick_up_address
        drop_off_phone
      }
      transportationData {
        type_of_transport
        transport_with
        oxygen_quantity
        mode_of_transportation
      }
      patientData {
        surname
        special_note
        patient_above_90kg
        name
        isolation
        how_much
        date_of_birth
        cost_center
        area_room
      }
    }
  }
`;
