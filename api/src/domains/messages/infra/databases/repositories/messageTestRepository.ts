import { Result } from "@shared/Results"

import { Message } from "../../../entities/message"
import { IMessageDomainRerpository } from "../../../repositories/I-MessageDomainRepository"

export class MessageTestRepository implements IMessageDomainRerpository {
  array: Message[] = []
  repository: null

  findAllByUserUuids(senderId: string, receiverId: string): Promise<Result<Message[]>> {
      const foundMessages = this.array.filter(message => (
        message.senderId === senderId && message.receiverId === receiverId
      ) || (
        message.senderId === receiverId && message.receiverId === senderId
      ))

      return Promise.resolve(Result.ok(foundMessages))
  }

  save(props: any): Promise<void> {
    this.array.push(props)

    return Promise.resolve()
  }
}