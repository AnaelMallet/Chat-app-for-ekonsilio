import { graphqlProps } from "@shared/basicResolvers"

import { createUserController } from "../../use-cases/createUser"
import { loginUserController } from "../../use-cases/login"
import { userVerifyTokenController } from "../../use-cases/verifyToken"
import { userMeController } from "../../use-cases/me"

const resolvers = {
  Mutation: {
    createUser: async (parent: any, args: any, context: any, info: any) => {
      const props: graphqlProps = {
        parent,
        args,
        context,
        info
      }

      return await createUserController.executeImplementation(props)
    },
    login: async (parent: any, args: any, context: any, info: any) => {
      const props: graphqlProps = {
        parent,
        args,
        context,
        info
      }

      return await loginUserController.executeImplementation(props)
    },
    verifyToken: async (parent: any, args: any, context: any, info: any) => {
      const props: graphqlProps = {
        parent,
        args,
        context,
        info
      }
  
      return await userVerifyTokenController.executeImplementation(props)
    }
  },
  Query: {
    me: async (parent: any, args: any, context: any, info: any) => {
      const props: graphqlProps = {
        parent,
        args,
        context,
        info
      }
  
      return await userMeController.executeImplementation(props)
    }
  }
}

export default resolvers