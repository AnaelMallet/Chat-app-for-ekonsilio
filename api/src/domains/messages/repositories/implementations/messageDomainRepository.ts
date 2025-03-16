import { Result } from "@shared/Results";
import { Message } from "../../entities/message";
import { MessageRepository } from "../../infra/databases/repositories/implementations/message";
import { IMessageDomainRerpository } from "../I-MessageDomainRepository";
import { messageTransformer } from "../../transformers";

export class MessageDomainRepository implements IMessageDomainRerpository {
  repository: MessageRepository

  constructor(repository: MessageRepository) {
    this.repository = repository
  }

  async findAllByUserUuids(senderId: string, receiverId: string): Promise<Result<Message[]>> {
      const entityMessages = await this.repository.findAllByUserUuids(senderId, receiverId)
      const domainMessages = messageTransformer.arrayToDomain(entityMessages)

      return domainMessages
  }

  async save(props: Message): Promise<void> {
    const message = messageTransformer.toDatabase(props)

    await this.repository.save(message)
  }
}