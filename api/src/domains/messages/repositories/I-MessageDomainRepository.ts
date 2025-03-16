import { Result } from "@shared/Results"

import { Message } from "../entities/message"

export interface IMessageDomainRerpository {
  findAllByUserUuids(senderId: string, receiverId: string): Promise<Result<Message[]>>
  save(props: Message): Promise<void>
}