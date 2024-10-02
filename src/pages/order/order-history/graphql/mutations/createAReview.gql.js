import { gql } from "@apollo/client";

export const CREATE_A_REVIEW = gql`
  mutation CREATE_A_REVIEW($inputData: ReviewInput) {
    createReview(inputData: $inputData) {
      rating
      review_message
    }
  }
`;
