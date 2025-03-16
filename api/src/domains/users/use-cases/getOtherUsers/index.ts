import { userDomainRepository } from "../../repositories/implementations"

import { GetOtherUserController } from "./controller"
import { GetOtherUserUseCase } from "./use-case"

const getOtherUserUseCase = new GetOtherUserUseCase(userDomainRepository)
const getOtherUserController = new GetOtherUserController(getOtherUserUseCase)

export {
  getOtherUserUseCase,
  getOtherUserController
}