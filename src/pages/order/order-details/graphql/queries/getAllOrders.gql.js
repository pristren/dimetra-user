import { gql } from "@apollo/client";

export const GET_ALL_ORDERS = gql`
  query GET_ALL_ORDERS {
    getAllOrders {
      user {
        first_name
        last_name
      }
    }
  }
`;
