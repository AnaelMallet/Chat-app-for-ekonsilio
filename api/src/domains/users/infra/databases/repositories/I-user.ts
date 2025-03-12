import UserEntity from "../entities/user"

export interface IUserRepository {
  findOneByUuid(uuid: string): Promise<UserEntity>
  findOneByEmail(email: string): Promise<UserEntity>
  findAllGenius(): Promise<UserEntity[]>
  save(props: any): Promise<void>
}