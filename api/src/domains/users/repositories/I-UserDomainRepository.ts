import { Result } from "@shared/Results"

import { User } from "../entities/user"

export interface IUserDomainRepository {
  findOneByUuid(uuid: string): Promise<Result<User>>
  findOneByEmail(email: string): Promise<Result<User>>
  findAllGenius(): Promise<Result<User[]>>
  findAllVisitors(): Promise<Result<User[]>>
  save(props: User): Promise<void>
}