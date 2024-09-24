import { gql } from "@apollo/client";

export const CREATE_AN_ORDER = gql`
  mutation CREATE_AN_ORDER($inputData: OrderRequestInput!) {
    createAnOrder(inputData: $inputData) {
      id
      transportationData {
        mode_of_transportation
        transport_with
      }
    }
  }
`;
