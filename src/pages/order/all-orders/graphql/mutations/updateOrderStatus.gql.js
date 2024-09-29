import { gql } from "@apollo/client";

export const UPDATE_ORDER_STATUS = gql`
  mutation Mutation(
    $queryData: CommonQueryType!
    $inputData: UpdateOrderStatus!
  ) {
    updateOrderStatus(queryData: $queryData, inputData: $inputData) {
      id
    }
  }
`;
