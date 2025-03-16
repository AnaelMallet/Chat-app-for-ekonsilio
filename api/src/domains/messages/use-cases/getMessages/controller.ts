import { BasicController } from "@shared/basicController"
import { GetMessagesUseCase } from "./use-case"
import { graphqlProps } from "@shared/basicResolvers"
import { Result } from "@shared/Results"
import { getMessagesPropsDto } from "./dto"

export class GetMessagesController implements BasicController {
  useCase: GetMessagesUseCase

  constructor(useCase: GetMessagesUseCase) {
    this.useCase = useCase
  }

  async executeImplementation(props: graphqlProps): Promise<Result<any>> {
      const {
        args,
        context
      } = props

      const dto: getMessagesPropsDto = {
        ...args,
        senderId: context.user.userId
      }

      const getMessagesResult = await this.useCase.execute(dto)
      const getMessages = getMessagesResult.getValue()

      return Result.ok(getMessages)
  }
}