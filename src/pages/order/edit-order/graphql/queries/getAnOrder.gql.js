import { gql } from "@apollo/client";

export const GET_AN_ORDER = gql`
  query GET_AN_ORDER($queryData: CommonQueryType!) {
    getAnOrder(queryData: $queryData) {
      billingDetailsData {
        contact
        name
        place
        pre_name
        contact_phone
        street
      }
      destinationDetailsData {
        drop_off_address
        drop_off_city
        drop_off_country
        drop_off_name
        drop_off_pick_up_date
        drop_off_pick_up_time
        pickup_appointment_time
        drop_off_postal_code
        return_date
        return_approx_time
        pick_up_postal_code
        pick_up_name
        pick_up_employee_name
        area_room
        pick_up_country
        pick_up_city
        pick_up_address
        pickup_phone
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
        patient_above_90kg
        name
        isolation
        how_much
        which
        date_of_birth
        cost_center
      }
      recurringData {
        start_date
        return_date
        start_time
        return_time
        recurring_type
        multiple_week_days
        free_dates_start_time
        free_dates_return_time
        free_dates
        ends
      }
    }
  }
`;
