import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation (
    $newName: String
    $newEmail: String
    $newProfile: String
    $newPassword: String
  ) {
    updateUser(
      newName: $newName
      newEmail: $newEmail
      newProfile: $newProfile
      newPassword: $newPassword
    ) {
      id
      token
      name
      email
      profile
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation ($productId: String) {
    deleteProduct(productId: $productId)
  }
`;
