import { Result } from "@shared/Results"

import { User } from "../../../entities/user"
import { IUserDomainRepository } from "../../../repositories/I-UserDomainRepository"

export class UserTestRepository implements IUserDomainRepository {
  array: User[] = []
  repository: null

  findOneByUuid(uuid: string): Promise<Result<User>> {
    const foundUser = this.array.find(user => user.uuid === uuid)

    if (foundUser === undefined) {
      return Promise.resolve(Result.fail())
    }

    const foundUserResult = Result.ok(foundUser)

    return Promise.resolve(foundUserResult)
  }

  findOneByEmail(email: string): Promise<Result<User>> {
    const foundUser = this.array.find(user => user.email.value === email)

    if (foundUser === undefined) {
      return Promise.resolve(Result.fail())
    }

    const foundUserResult = Result.ok(foundUser)

    return Promise.resolve(foundUserResult)
  }

  findAllOthers(): Promise<Result<User[]>> {
      const foundGeniusUsers = this.array.filter(user => user.isGenius)

      return Promise.resolve(Result.ok(foundGeniusUsers))
  }

  save(props: any): Promise<void> {
    this.array.push(props)

    return Promise.resolve()
  }
}