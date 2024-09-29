import { gql } from "@apollo/client";

export const GET_ALL_ORDERS = gql`
  query GET_ALL_ORDERS {
    getAllOrders {
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
