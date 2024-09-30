import { gql } from "@apollo/client";

export const GET_ALL_RECURRING_ORDERS = gql`
  query GetAllRecurringOrders($queryData: CommonQueryType!) {
    getAllRecurringOrders(queryData: $queryData) {
      user {
        first_name
        last_name
      }
      id
      status
      transportationData {
        type_of_transport
        free_dates
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
  }
`;
