import { gql } from "@apollo/client";

export const GET_AN_USER = gql`
  query GetAnUser {
    getAnUser {
      email
      code
      place
      id
      first_name
      last_name
      phone
      address
      billing_address
      internal_cost_center
      profile_image
    }
  }
`;
