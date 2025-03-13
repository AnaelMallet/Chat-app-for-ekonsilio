import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { UserDomainRepository } from "../../repositories/implementations/userDomainRepository"

type geniusUserInfo = {
  uuid: string,
  firstname: string,
  lastname: string
}

export class GetGeniusUserUseCase implements BasicUseCase {
  repository: UserDomainRepository

  constructor(repository: UserDomainRepository) {
    this.repository = repository
  }

  async execute(userId: string): Promise<Result<geniusUserInfo[]>> {
    const allGeniusUserResult = await this.repository.findAllGenius(userId)
    const geniusUserLists: geniusUserInfo[] = []

    for (const geniusUser of allGeniusUserResult.getValue()) {
      geniusUserLists.push({
        uuid: geniusUser.uuid,
        firstname: geniusUser.firstname,
        lastname: geniusUser.lastname
      })
    }

    return Result.ok(geniusUserLists)
  }
}