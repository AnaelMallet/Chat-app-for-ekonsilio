import MessageEntity from "../entities/message"

export interface IMessageRepository {
  findAllByUserUuids(senderId: string, receiverId: string): Promise<MessageEntity[]>
  save(props: any): Promise<void>
}