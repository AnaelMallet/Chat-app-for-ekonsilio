import { gql } from "@apollo/client"

export const getGeniusUsersQuery = gql`
  query getGeniusUsers {
    getGeniusUsers {
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
      }
    }
  }
`