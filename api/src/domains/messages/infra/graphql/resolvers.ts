import { graphqlProps } from "@shared/basicResolvers"

import { createMessageController } from "../../use-cases/createMessage"
import { getMessageController } from "../../use-cases/getMessages"

const resolvers = {
  Mutation: {
    sendMessage: async (parent: any, args: any, context: any, info: any) => {
      const props: graphqlProps = {
        parent,
        args,
        context,
        info
      }

      return await createMessageController.executeImplementation(props)
    }
  },
  Query: {
    getMessages: async (parent: any, args: any, context: any, info: any) => {
      const props: graphqlProps = {
        parent,
        args,
        context,
        info
      }

      return await getMessageController.executeImplementation(props)
    }
  }
}

export default resolvers