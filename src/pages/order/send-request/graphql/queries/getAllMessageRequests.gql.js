import { gql } from "@apollo/client";

export const GET_ALL_MESSAGE_REQUESTS = gql`
  query GET_ALL_MESSAGE_REQUESTS {
    getMessageRequests {
      id
      createdAt
      title
      status
      order_number
    }
  }
`;
