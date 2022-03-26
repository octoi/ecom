import { gql } from '@apollo/client';

export const GET_ONE_PRODUCT = gql`
  query ($productId: String) {
    getOneProduct(productId: $productId) {
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
