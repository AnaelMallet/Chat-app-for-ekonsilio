import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { UserDomainRepository } from "../../repositories/implementations/userDomainRepository"
import { UserNotExistError } from "../../errors"

type UserInfo = {
  firstname: string
  lastname: string
  email: string
  isGenius: boolean
}

export class UserMeUseCase implements BasicUseCase {
  repository: UserDomainRepository

  constructor(repository: UserDomainRepository) {
    this.repository = repository
  }

  async execute(userId: string): Promise<Result<UserInfo>> {
    if (!userId) {
      return Result.ok(null)
    }

    const foundUserResult = await this.repository.findOneByUuid(userId)

    if (foundUserResult.isFailure === true) {
      return Result.fail(new UserNotExistError())
    }

    const user = foundUserResult.getValue()

    const userInfo: UserInfo = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email.value,
      isGenius: user.isGenius
    }

    return Result.ok(userInfo)
  }
}