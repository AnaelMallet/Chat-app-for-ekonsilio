import { gql } from "apollo-server-express"

const typeDefs = gql`
  type User {
    uuid: ID
    firstname: String!
    lastname: String!
    email: String!
    isGenius: Boolean!
    password: String!
    accessToken: String
    refreshToken: String
  }

  input UserInput {
    firstname: String!
    lastname: String!
    email: String!
    isGenius: Boolean!
    password: String!
    confirmationPassword: String!
  }

  extend type Mutation {
    createUser(input: UserInput!): MutationResponse!
  }
`

export default typeDefs