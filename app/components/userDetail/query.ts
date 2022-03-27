import { gql } from '@apollo/client';

export const GET_USER_DETAILS = gql`
  query GetUserDetails($email: String) {
    getUserDetails(email: $email) {
      name
      email
      profile
    }
  }
`;

export const GET_USER_PRODUCTS = gql`
  query ($email: String, $page: Int) {
    getAllUserProducts(page: $page, email: $email) {
      id
      title
      images
      price
      place
      createdAt
      owner {
        name
        email
        profile
      }
    }
  }
`;
