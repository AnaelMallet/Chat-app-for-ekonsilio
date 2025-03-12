import { BasicController } from "@shared/basicController"

import { GetGeniusUserUseCase } from "./use-case"
import { Result } from "@shared/Results"

export class GetGeniusUserController implements BasicController {
  useCase: GetGeniusUserUseCase

  constructor(useCase: GetGeniusUserUseCase) {
    this.useCase = useCase
  }

 async executeImplementation(): Promise<Result<any>> {
    const geniusUsersResult = await this.useCase.execute()
    const geniusUsers = geniusUsersResult.getValue()

    return Result.ok(geniusUsers)
  }
}