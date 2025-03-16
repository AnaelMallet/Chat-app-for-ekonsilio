import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm"

import UserEntity from "src/domains/users/infra/databases/entities/user"

@Entity({ name: "messages" })
export default class MessageEntity extends BaseEntity {
  @PrimaryColumn()
  uuid: string

  @ManyToOne(() => UserEntity, user => user.senderMessages)
  @JoinColumn({ name: "sender_uuid" })
  sender: UserEntity

  @ManyToOne(() => UserEntity, user => user.receiverMessages)
  @JoinColumn({ name: "receiver_uuid" })
  receiver: UserEntity

  @Column("text", { nullable: false })
  text: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}