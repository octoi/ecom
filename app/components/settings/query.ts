import { gql } from '@apollo/client';

export const GET_USER_PRODUCTS = gql`
  query ($email: String, $page: Int) {
    getAllUserProducts(page: $page, email: $email) {
      id
      title
      images
    }
  }
`;
