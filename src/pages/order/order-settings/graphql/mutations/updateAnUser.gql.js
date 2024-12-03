import { gql } from "@apollo/client";

export const UPDATE_AN_USER = gql`
  mutation UPDATE_AN_USER($inputData: UpdateInput!) {
    updateAnUser(inputData: $inputData) {
      first_name
      last_name
      email
      address
      billing_address
      code
      place
      phone
      internal_cost_center
      profile_image
      geo_location {
      latitude
      longitude
    }
    }
  }
`;
