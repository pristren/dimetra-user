import { gql } from "@apollo/client";

export const CREATE_MESSAGE_REQUESTS = gql`
  mutation CREATE_MESSAGE_REQUESTS($inputData: MessageRequestInput) {
    createMessageRequest(inputData: $inputData) {
      id
    }
  }
`;
