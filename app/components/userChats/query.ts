import { gql } from '@apollo/client';

export const GET_USER_CHATS = gql`
  query {
    getUserChats {
      id
      sender {
        name
        email
        profile
      }
      receiver {
        name
        email
        profile
      }
    }
  }
`;
