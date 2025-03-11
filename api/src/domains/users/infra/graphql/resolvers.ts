import { graphqlProps } from "@shared/basicResolvers"

import { createUserController } from "../../use-cases/createUser"

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
    }
  }
}

export default resolvers