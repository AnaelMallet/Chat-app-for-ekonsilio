import { messageDomainRepository } from "../../repositories/implementations"

import { GetMessagesController } from "./controller"
import { GetMessagesUseCase } from "./use-case"

const getMessageUseCase = new GetMessagesUseCase(messageDomainRepository)
const getMessageController = new GetMessagesController(getMessageUseCase)

export {
  getMessageUseCase,
  getMessageController
}