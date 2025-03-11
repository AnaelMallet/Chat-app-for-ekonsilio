import BasicRepository from "@shared/basicRepository"

import User from "../../entities/user"

import { IUserRepository } from "../I-user"

export class UserRepository extends BasicRepository<User> implements IUserRepository {
  alias = "users"

  async findOneByUuid(uuid: string): Promise<User> {
    return await this.repository
      .createQueryBuilder(this.alias)
      .where(`${this.alias}.uuid = :uuid`, { uuid })
      .getOne()
  }

  async findOneByEmail(email: string): Promise<User> {
      return await this.repository
        .createQueryBuilder(this.alias)
        .where(`${this.alias}.email = :email`, { email })
        .getOne()
  }

  async findAllGenius(): Promise<User[]> {
      return await this.repository
        .createQueryBuilder(this.alias)
        .where(`${this.alias}.isGenius = true`)
        .getMany()
  }

  async findAllVisitors(): Promise<User[]> {
    return await this.repository
      .createQueryBuilder(this.alias)
      .where(`${this.alias}.isGenius = false`)
      .getMany()
  }

  async save(entity: User): Promise<void> {
      await this.repository.save(entity)
  }
}