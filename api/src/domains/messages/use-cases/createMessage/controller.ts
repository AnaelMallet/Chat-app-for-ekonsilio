import { BasicController } from "@shared/basicController";
import { CreateMessageUseCase } from "./use-case";
import { graphqlProps } from "@shared/basicResolvers";
import { Result } from "@shared/Results";
import { messagePropsDto } from "./dto";

export class CreateMessageController implements BasicController {
  useCase: CreateMessageUseCase

  constructor(useCase: CreateMessageUseCase) {
    this.useCase = useCase
  }

  async executeImplementation(props: graphqlProps): Promise<Result<void>> {
    const {
      args,
      context
    } = props

    const dto: messagePropsDto = {
      ...args.input,
      senderId: context.user.userId
    }

    const createMessageResult = await this.useCase.execute(dto)

    if (createMessageResult.isFailure === true) {
      return Result.fail(createMessageResult.getErrors())
    }

    return Result.ok()
  }
}