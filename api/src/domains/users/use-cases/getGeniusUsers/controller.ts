import { BasicController } from "@shared/basicController"

import { GetGeniusUserUseCase } from "./use-case"
import { Result } from "@shared/Results"
import { graphqlProps } from "@shared/basicResolvers"

export class GetGeniusUserController implements BasicController {
  useCase: GetGeniusUserUseCase

  constructor(useCase: GetGeniusUserUseCase) {
    this.useCase = useCase
  }

 async executeImplementation(props: graphqlProps): Promise<Result<any>> {
    const {
      context
    } = props

    console.log("context", context.user)

    const geniusUsersResult = await this.useCase.execute(context.user.userId)
    const geniusUsers = geniusUsersResult.getValue()

    return Result.ok(geniusUsers)
  }
}