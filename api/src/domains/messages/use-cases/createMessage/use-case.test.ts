import { v4 as uuid } from "uuid"

import { userTestRepository } from "src/domains/users/infra/databases/repositories"
import { userPropsDto } from "src/domains/users/use-cases/createUser/dto"
import { CreateUserUseCase } from "src/domains/users/use-cases/createUser/use-case"

import { messageTestRepository } from "../../infra/databases/repositories"

import { CreateMessageUseCase } from "./use-case"
import { messagePropsDto } from "./dto"

describe("test the createMessage use-case", () =>  {
  const createMessageUseCase = new CreateMessageUseCase(messageTestRepository)

  const senderUuid = uuid()
  const receiverUuid = uuid()
  const messageProps: messagePropsDto = {
    senderId: senderUuid,
    receiverId: receiverUuid,
    text: "test"
  }
  beforeAll(async () => {
    const createUserUseCase = new CreateUserUseCase(userTestRepository)

    const senderUserProps: userPropsDto = {
      uuid: senderUuid,
      firstname: "john",
      lastname: "smith",
      email: "john.smith@test.fr",
      isGenius: true,
      password: "rhngwAELN2C@B58j",
      confirmationPassword: "rhngwAELN2C@B58j"
    }

    const receiverUserProps: userPropsDto = {
      uuid: receiverUuid,
      firstname: "jane",
      lastname: "smith",
      email: "jane.smith@test.fr",
      isGenius: false,
      password: "rhngwAELN2C@B58j",
      confirmationPassword: "rhngwAELN2C@B58j"
    }

    await createUserUseCase.execute(senderUserProps)
    await createUserUseCase.execute(receiverUserProps)
  })

  test("Should create a message", async () => {
    const createMessageResult = await createMessageUseCase.execute(messageProps)

    expect(createMessageResult.isSuccess).toBe(true)
  })
})