import { gql } from "@apollo/client";

export const UPDATE_RECCURING_ORDER_STATUS = gql`
  mutation UpdateRecurringOrderStatus(
    $queryData: CommonQueryType!
    $inputData: UpdateOrderStatus!
  ) {
    updateRecurringOrderStatus(queryData: $queryData, inputData: $inputData) {
      id
    }
  }
`;
