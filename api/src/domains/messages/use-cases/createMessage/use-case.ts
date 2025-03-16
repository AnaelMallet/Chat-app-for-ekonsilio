import { BasicUseCase } from "@shared/basicUseCase"
import { Result } from "@shared/Results"

import { getReceiverSocketId, io } from "src/socket"

import { MessageDomainRepository } from "../../repositories/implementations/messageDomainRepository"
import { Message } from "../../entities/message"

import { messagePropsDto } from "./dto"

export class CreateMessageUseCase implements BasicUseCase {
  repository: MessageDomainRepository

  constructor(repository: MessageDomainRepository) {
    this.repository = repository
  }

  async execute(args: messagePropsDto): Promise<Result<void>> {
    const {
      uuid,
      senderId,
      receiverId,
      text
    } = args

    const messageResult = Message.create({
      senderId,
      receiverId,
      text
    }, uuid)

    if (messageResult.isFailure === true) {
      return Result.fail(messageResult.getErrors())
    }

    const message = messageResult.getValue()

    await this.repository.save(message)

    const receiverSocketId = getReceiverSocketId(receiverId)
    const senderSocketId = getReceiverSocketId(senderId)

    io.to([receiverSocketId, senderSocketId]).emit("newMessage", message)

    return Result.ok()
  }
}