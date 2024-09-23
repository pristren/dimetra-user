import { gql } from "@apollo/client";

export const GET_AN_ORDER = gql`
  query GET_AN_ORDER($queryData: CommonQueryType!) {
    getAnOrder(queryData: $queryData) {
      status
      id
      transportationData {
        type_of_transport
      }
    }
  }
`;
