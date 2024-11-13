import { gql } from "@apollo/client";

export const GET_ALL_ORDERS_FOR_HISTORY = gql`
  query GET_ALL_ORDERS_FOR_HISTORY($queryData: CommonOrderQueryType) {
    getOrdersForHistory(queryData: $queryData) {
      data {
        user {
          first_name
          last_name
        }
        id
        status
        transportationData {
          type_of_transport
          mode_of_transportation
          transport_with
          oxygen_quantity
        }
        recurringData {
          recurring_type
          start_date
          return_date
          start_time
          return_time
          multiple_week_days
          ends
          free_dates
          free_dates_start_time
          free_dates_return_time
        }
        patientData {
          name
          patient_above_90kg
          date_of_birth
          surname
          area_room
          cost_center
          how_much
          which
          isolation
        }
        destinationDetailsData {
          pick_up_name
          pick_up_address
          pick_up_postal_code
          pick_up_city
          pick_up_country
          pickup_phone
          drop_off_pick_up_date
          drop_off_pick_up_time
          pickup_appointment_time
          drop_off_name
          drop_off_address
          drop_off_postal_code
          drop_off_city
          drop_off_country
          drop_off_phone
          return_date
          return_approx_time
          pick_up_employee_name
        }
        billingDetailsData {
          pre_name
          name
          street
          place
          contact
          contact_phone
        }
        createdAt
        isReviewGiven
      }
      total
      totalPages
      currentPage
    }
  }
`;
