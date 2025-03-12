import { graphqlProps } from "@shared/basicResolvers"

import { createUserController } from "../../use-cases/createUser"
import { loginUserController } from "../../use-cases/login"
import { userVerifyTokenController } from "../../use-cases/verifyToken"
import { userMeController } from "../../use-cases/me"
import { updateUserController } from "../../use-cases/updateUser"
import { getGeniusUserController } from "../../use-cases/getGeniusUsers"

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
    },
    updateUser: async (parent: any, args: any, context: any, info: any) => {
      const props: graphqlProps = {
        parent,
        args,
        context,
        info
      }

      return await updateUserController.executeImplementation(props)
    },
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
    },
    getGeniusUsers: async () => {
      return await getGeniusUserController.executeImplementation()
    }
  }
}

export default resolvers