import { BasicController } from "@shared/basicController"
import { Result } from "@shared/Results"
import { graphqlProps } from "@shared/basicResolvers"

import { GetOtherUserUseCase } from "./use-case"

export class GetOtherUserController implements BasicController {
  useCase: GetOtherUserUseCase

  constructor(useCase: GetOtherUserUseCase) {
    this.useCase = useCase
  }

 async executeImplementation(props: graphqlProps): Promise<Result<any>> {
    const {
      context
    } = props

    const otherUsersResult = await this.useCase.execute(context.user.userId)
    const otherUsers = otherUsersResult.getValue()

    return Result.ok(otherUsers)
  }
}