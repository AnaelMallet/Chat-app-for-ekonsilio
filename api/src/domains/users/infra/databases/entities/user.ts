import MessageEntity from "src/domains/messages/infra/databases/entities/message"
import {
  BaseEntity,
  Column, 
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @OneToMany(() => MessageEntity, message => message.sender)
  senderMessages: MessageEntity[]

  @OneToMany(() => MessageEntity, message => message.receiver)
  receiverMessages: MessageEntity[]

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}