import { gql } from "apollo-server-express"

const typeDefs = gql`
  type Message {
    uuid: ID!
    senderId: ID!
    text: String!
  }

  input MessageInput {
    receiverId: ID!
    text: String!
  }

  type MessageResponse implements QueryResponse {
    code: Int!
    isSuccess: Boolean!
    errors: [Error]!
    values: [Message]!
  }

  extend type Mutation {
    sendMessage(input: MessageInput!): MutationResponse! @requireAuth
  }

  extend type Query {
    getMessages(receiverId: String!): MessageResponse! @requireAuth
  }
`

export default typeDefs