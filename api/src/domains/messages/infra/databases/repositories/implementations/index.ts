import MessageEntity from "../../entities/message"

import { MessageRepository } from "./message"

const messageRepository = new MessageRepository(MessageEntity)

export {
  messageRepository
}