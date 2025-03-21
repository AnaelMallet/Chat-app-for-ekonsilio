import { Result } from "@shared/Results"

import { User } from "../../entities/user"
import { UserRepository } from "../../infra/databases/repositories/implementations/user"
import { userTransformer } from "../../transformers"

import { IUserDomainRepository } from "../I-UserDomainRepository"

export class UserDomainRepository implements IUserDomainRepository {
  repository: UserRepository

  constructor(repository: UserRepository) {
    this.repository = repository
  }

  async findOneByUuid(uuid: string): Promise<Result<User>> {
      const user = await this.repository.findOneByUuid(uuid)

      if (user === null) {
        return Result.fail()
      }

      return userTransformer.toDomain(user)
  }

  async findOneByEmail(email: string): Promise<Result<User>> {
      const user = await this.repository.findOneByEmail(email)

      if (user === null) {
        return Result.fail()
      }

      return userTransformer.toDomain(user)
  }

  async findAllOthers(userId: string): Promise<Result<User[]>> {
      const entityUsers = await this.repository.findAllOthers(userId)
      const domainUsers = userTransformer.arrayToDomain(entityUsers)
      
      return domainUsers
  }

  async save(props: User): Promise<void> {
    const user = userTransformer.toDatabase(props)

    await this.repository.save(user)
  }
}