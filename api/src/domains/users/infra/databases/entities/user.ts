import {
  BaseEntity,
  Column, 
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm"


@Entity({ name: "users" })
export default class UserEntity extends BaseEntity {
  @PrimaryColumn()
  uuid: string

  @Column('varchar', { length: 64 })
  firstname: string

  @Column('varchar', { length: 64 })
  lastname: string

  @Column("varchar", { length: 64 })
  email: string

  @Column("bool", { nullable: false })
  isGenius: boolean

  @Column("varchar", { length: 64 })
  password: string

  @Column("text", { nullable: true })
  accessToken: string

  @Column("text", { nullable: true })
  refreshToken: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}