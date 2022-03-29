import { gql } from '@apollo/client';

export const NEW_CHAT = gql`
  mutation ($targetUserId: Int) {
    newChat(targetUserId: $targetUserId) {
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

export const DELETE_CHAT = gql`
  mutation ($chatId: String) {
    deleteChat(chatId: $chatId)
  }
`;
