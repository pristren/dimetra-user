import { gql } from "@apollo/client";

export const UPDATE_A_RECURRING_ORDER = gql`
  mutation UPDATE_A_RECURRING_ORDER(
    $queryData: CommonQueryType!
    $inputData: UpdateOrderRequestInput!
  ) {
    updateARecurringOrder(queryData: $queryData, inputData: $inputData) {
      id
    }
  }
`;
