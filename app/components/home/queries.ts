import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query ($page: Int) {
    getAllProducts(page: $page) {
      id
      title
      description
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
