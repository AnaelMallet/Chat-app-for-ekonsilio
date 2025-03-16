import { gql } from "@apollo/client"

const SendMessageMutation = gql`
mutation SendMessage($input: MessageInput!) {
  sendMessage(input: $input) {
    code
    isSuccess
    errors {
      field
      message
    }
  }
}
`

const getMessagesQuery = gql`
  query GetMessages($receiverId: String!) {
  getMessages(receiverId: $receiverId) {
    code
    isSuccess
    errors {
      field
      message
    }
    values {
      uuid
      senderId
      text
    }
  }
}
`

export {
  SendMessageMutation,
  getMessagesQuery
}