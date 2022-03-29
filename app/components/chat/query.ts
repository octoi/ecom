import { gql } from '@apollo/client';

export const GET_TARGET_USER_DATA = gql`
  query ($email: String) {
    getUserDetails(email: $email) {
      id
    }
  }
`;

export const GET_CHAT = gql`
  query ($chatId: String) {
    getChat(chatId: $chatId) {
      id
      senderId
      receiverId
      sender {
        id
        name
        email
        profile
      }
      receiver {
        id
        name
        email
        profile
      }
      messages {
        id
        message
        time
        senderId
      }
    }
  }
`;
