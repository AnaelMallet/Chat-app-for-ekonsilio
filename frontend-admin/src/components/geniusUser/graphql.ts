import { gql } from "@apollo/client"

export const getOtherUsersQuery = gql`
  query getOtherUsers {
    getOtherUsers {
      code
      isSuccess
      errors {
        field
        message
      }
      values {
        uuid
        firstname
        lastname
        isGenius
      }
    }
  }
`