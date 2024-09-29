import { gql } from "@apollo/client";

export const GET_AN_ORDER = gql`
  query GET_AN_ORDER($queryData: CommonQueryType!) {
    getAnOrder(queryData: $queryData) {
      id
      user {
        id
        first_name
        last_name
        email
        phone
        address
        billing_address
        code
        internal_cost_center
        createdAt
        updatedAt
      }
      status
      transportationData {
        type_of_transport
        mode_of_transportation
        transport_with
        start_date
        return_date
        start_time
        return_time
        multiple_week_days
        ends
      }
      patientData {
        name
        surname
        date_of_birth
        area_room
        cost_center
        how_much
        special_note
        isolation
        patient_above_90kg
      }
      destinationDetailsData {
        pick_up_name
        pick_up_address
        pick_up_city
        pick_up_country
        pick_up_employee_name
        drop_off_pick_up_time
        drop_off_name
        drop_off_address
        drop_off_city
        drop_off_country
        drop_off_phone
        return_date
        return_approx_time
        return_floor
      }
      billingDetailsData {
        pre_name
        name
        street
        place
        contact
      }
      createdAt
    }
  }
`;
