import { gql } from "@apollo/client";

export const UPDATE_AN_USER_PASSWORD = gql`
  mutation UpdateUserPassword($inputData: UpdatePasswordInput) {
    updateUserPassword(inputData: $inputData) {
      id
    }
  }
`;
