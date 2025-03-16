import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { UserDomainRepository } from "../../repositories/implementations/userDomainRepository"

type geniusUserInfo = {
  uuid: string,
  firstname: string,
  lastname: string,
  isGenius: boolean
}

export class GetOtherUserUseCase implements BasicUseCase {
  repository: UserDomainRepository

  constructor(repository: UserDomainRepository) {
    this.repository = repository
  }

  async execute(userId: string): Promise<Result<geniusUserInfo[]>> {
    const allOtherUserResult = await this.repository.findAllOthers(userId)
    const otherUsersList: geniusUserInfo[] = []

    for (const geniusUser of allOtherUserResult.getValue()) {
      otherUsersList.push({
        uuid: geniusUser.uuid,
        firstname: geniusUser.firstname,
        lastname: geniusUser.lastname,
        isGenius: geniusUser.isGenius
      })
    }

    return Result.ok(otherUsersList)
  }
}