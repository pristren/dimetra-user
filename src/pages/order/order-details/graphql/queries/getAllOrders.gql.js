import { gql } from "@apollo/client";

export const GET_ALL_ORDERS = gql`
  query GET_ALL_ORDERS($queryData: CommonOrderQueryType) {
    getAllOrders(queryData: $queryData) {
      data {
        user {
          first_name
          last_name
        }
        id
        status
        transportationData {
          type_of_transport
        }
        patientData {
          name
          surname
        }
        destinationDetailsData {
          pick_up_name
          drop_off_name
          drop_off_pick_up_date
          drop_off_pick_up_time
        }
        createdAt
        updatedAt
      }
      total
      totalPages
      currentPage
    }
  }
`;
