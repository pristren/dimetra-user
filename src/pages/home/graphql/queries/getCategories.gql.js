import { gql } from "@apollo/client";

export const GET_CATEGORISE = gql`
  query GET_CATEGORISE {
    getCategories {
      id
      createdAt
      description
      end_time
      location
      rsvp
      start_time
      title
      updatedAt
      user_id
    }
  }
`;
