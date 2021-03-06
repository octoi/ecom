import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation ($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      name
      email
      profile
      token
    }
  }
`;
