import { gql } from "@apollo/client";

export const UPDATE_AN_ORDER = gql`
  mutation UPDATE_AN_ORDER(
    $queryData: CommonQueryType!
    $inputData: UpdateOrderRequestInput!
  ) {
    updateAnOrder(queryData: $queryData, inputData: $inputData) {
      id
    }
  }
`;
