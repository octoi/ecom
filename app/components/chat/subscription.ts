import { gql } from '@apollo/client';

export const NEW_MESSAGES = gql`
  subscription newMessage($chatId: String) {
    newMessage(chatId: $chatId) {
      id
      message
      time
      senderId
    }
  }
`;
