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

  input LoginInput {
    login: String!
    password: String!
    isGenius: Boolean!
  }

  type LoginResponseData {
    userId: String!
    accessToken: String!
  }

  type LoginResponse implements QueryResponse {
    code: Int!,
    isSuccess: Boolean!
    errors: [Error]!
    values: LoginResponseData
  }

  type TokenResponseData {
    accessToken: String
  }

  type TokenResponse implements QueryResponse {
    code: Int!,
    isSuccess: Boolean!
    errors: [Error]!
    values: TokenResponseData
  }

  type UserData {
    firstname: String!
    lastname: String!
    email: String!
    isGenius: Boolean!
  }

  type UserResponse implements QueryResponse {
    code: Int!,
    isSuccess: Boolean!
    errors: [Error]!
    values: UserData
  }

  input UserUpdateInput {
    uuid: ID!
    firstname: String
    lastname: String
    email: String
    password: String
  }

  type UserData {
    uuid: ID!
    firstname: String!
    lastname: String!
    isGenius: Boolean!
  }

  type OtherUserResponse implements QueryResponse {
    code: Int!,
    isSuccess: Boolean!
    errors: [Error]!
    values: [UserData]!
  }

  extend type Mutation {
    createUser(input: UserInput!): MutationResponse!
    login(input: LoginInput!): LoginResponse!
    verifyToken(userId: String!): TokenResponse!
    updateUser(input: UserUpdateInput!): MutationResponse! @requireAuth
  }

  extend type Query {
    me(userId: String): UserResponse!
    getOtherUsers: OtherUserResponse! @requireAuth
  }
`

export default typeDefs