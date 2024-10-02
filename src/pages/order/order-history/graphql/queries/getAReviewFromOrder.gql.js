import { gql } from "@apollo/client";

export const GET_A_REVIEW_FROM_ORDER = gql`
  query GET_A_REVIEW_FROM_ORDER($queryData: CommonQueryType) {
    getAReviewFromOrder(queryData: $queryData) {
      id
      createdAt
      rating
      review_message
      user {
        first_name
        last_name
        profile_image
      }
    }
  }
`;
