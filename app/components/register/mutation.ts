import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation (
    $name: String
    $email: String
    $profile: String
    $password: String
  ) {
    register(
      name: $name
      email: $email
      profile: $profile
      password: $password
    ) {
      id
      name
      email
      profile
      token
    }
  }
`;
