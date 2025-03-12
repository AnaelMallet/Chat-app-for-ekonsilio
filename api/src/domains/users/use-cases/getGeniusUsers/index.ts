import { userDomainRepository } from "../../repositories/implementations"
import { GetGeniusUserController } from "./controller"
import { GetGeniusUserUseCase } from "./use-case"

const getGeniusUserUseCase = new GetGeniusUserUseCase(userDomainRepository)
const getGeniusUserController = new GetGeniusUserController(getGeniusUserUseCase)

export {
  getGeniusUserUseCase,
  getGeniusUserController
}