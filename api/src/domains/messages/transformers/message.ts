import { BasicTransformer } from "@shared/basicTransformer"
import { Message, MessageProps } from "../entities/message"
import MessageEntity from "../infra/databases/entities/message"
import { Result } from "@shared/Results"
import UserEntity from "src/domains/users/infra/databases/entities/user"

export class MessageTransformer extends BasicTransformer<Message, MessageEntity> {
  arrayToDomain(databaseEntities: MessageEntity[]): Result<Message[]> {
    const domainsMessages: Message[] = []

    for (const databaseEntity of databaseEntities) {
      const domainMessage = this.toDomain(databaseEntity)

      domainsMessages.push(domainMessage.getValue())
    }

    return Result.ok(domainsMessages)
  }

  toDomain(databaseEntity: MessageEntity): Result<Message> {
      const props: MessageProps = {
        senderId: databaseEntity.sender.uuid,
        receiverId: databaseEntity.receiver.uuid,
        text: databaseEntity.text  
      }

      const domainMessage = Message.create(props, databaseEntity.uuid)

      return domainMessage
   }

   toDatabase(domainEntity: Message): MessageEntity {
      const entityMessage = new MessageEntity()
      const entitySenderUser = new UserEntity()
      const entityReceiverUser = new UserEntity()

      entitySenderUser.uuid = domainEntity.senderId
      entityReceiverUser.uuid = domainEntity.receiverId

      entityMessage.uuid = domainEntity.uuid
      entityMessage.sender = entitySenderUser
      entityMessage.receiver = entityReceiverUser
      entityMessage.text = domainEntity.text

      return entityMessage
   }
}