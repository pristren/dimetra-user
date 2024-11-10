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
          drop_off_name
          drop_off_pick_up_date
          drop_off_pick_up_time
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
