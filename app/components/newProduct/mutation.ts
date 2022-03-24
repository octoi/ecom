import { gql } from '@apollo/client';

export const NEW_PRODUCT = gql`
  mutation (
    $title: String
    $description: String
    $images: [String]
    $place: String
    $price: Int
  ) {
    newProduct(
      title: $title
      description: $description
      images: $images
      place: $place
      price: $price
    ) {
      title
      description
      images
      place
      price
    }
  }
`;
