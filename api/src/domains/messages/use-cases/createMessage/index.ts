import { messageDomainRepository } from "../../repositories/implementations"
import { CreateMessageController } from "./controller"
import { CreateMessageUseCase } from "./use-case"

const createMessageUseCase = new CreateMessageUseCase(messageDomainRepository)
const createMessageController = new CreateMessageController(createMessageUseCase)

export {
  createMessageUseCase,
  createMessageController
}