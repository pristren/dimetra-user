import { gql } from "@apollo/client";

export const GET_ALL_RECURRING_ORDERS = gql`
  query GetAllRecurringOrders($queryData: CommonRecurringOrderQueryType!) {
    getAllRecurringOrders(queryData: $queryData) {
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
        }
        destinationDetailsData {
          pick_up_address
          drop_off_address
          drop_off_pick_up_date
        }
        createdAt
      }
      total
      totalPages
      currentPage
    }
  }
`;
