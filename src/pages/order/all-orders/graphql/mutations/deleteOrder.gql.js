import { gql } from "@apollo/client";

export const DELETE_AN_ORDER = gql`
  mutation DELETE_AN_ORDER($queryData: CommonQueryType!) {
    deleteAnOrder(queryData: $queryData) {
      id
    }
  }
`;
