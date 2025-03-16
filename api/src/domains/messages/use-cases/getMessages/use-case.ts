import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { MessageDomainRepository } from "../../repositories/implementations/messageDomainRepository"

import { getMessagesPropsDto } from "./dto"

type messageInfo = {
  uuid: string
  senderId: string
  text: string
}

export class GetMessagesUseCase implements BasicUseCase {
  repository: MessageDomainRepository

  constructor(repository: MessageDomainRepository) {
    this.repository = repository
  }

  async execute(props: getMessagesPropsDto): Promise<Result<messageInfo[]>> {
      const allMessagesResult = await this.repository.findAllByUserUuids(props.senderId, props.receiverId)
      const messagesList: messageInfo[] = []

      for (const message of allMessagesResult.getValue()) {
        messagesList.push({
          uuid: message.uuid,
          senderId: message.senderId,
          text: message.text
        })
      }

      return Result.ok(messagesList)
  }
}