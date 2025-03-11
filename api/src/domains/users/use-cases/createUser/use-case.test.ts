import { userTestRepository } from "../../infra/databases/repositories"
import { EmailAlreadyExistError, PasswordNotEqualsError } from "../../errors"

import { CreateUserUseCase } from "./use-case"
import { userPropsDto } from "./dto"

describe("test the createUser use-case", () => {
  const createUserUseCase = new CreateUserUseCase(userTestRepository)

  const userProps: userPropsDto = {
    firstname: "john",
    lastname: "smith",
    email: "gfhib@ujfd.fr",
    isGenius: true,
    password: "rhngwAELN2C@B58j",
    confirmationPassword: "rhngwAELN2C@B58j"
  }

  test("should create a genius user", async () => {
    const createUserResult = await createUserUseCase.execute(userProps)
  
    expect(createUserResult.isSuccess).toBe(true)
  })

  test("should create a visitor user", async () => {
    const props = {...userProps}
  
    props.isGenius = false
    props.email = "oijght@se.fr"

    const createUserResult = await createUserUseCase.execute(props)

    expect(createUserResult.isSuccess).toBe(true)
  })
  
  test("shouldn't create an user because an user already use this email", async () => {
    const createUserResult = await createUserUseCase.execute(userProps)
  
    expect(createUserResult.isSuccess).toBe(false)
  
    const createUserErrors = createUserResult.getErrors()
  
    expect(createUserErrors.length).toBe(1)
    expect(createUserErrors[0]).toBeInstanceOf(EmailAlreadyExistError)
  })
  
  test("shouldn't create an user because password and confirmation password are different", async () => {
    const props = {...userProps}
  
    props.email = "ozjdd@osfjd.fr"
    props.confirmationPassword = "ragbU7@Ck2HAx8VD"
  
    const createUserResult = await createUserUseCase.execute(props)
  
    expect(createUserResult.isSuccess).toBe(false)
  
    const createUserErrors = createUserResult.getErrors()
  
    expect(createUserErrors.length).toBe(1)
    expect(createUserErrors[0]).toBeInstanceOf(PasswordNotEqualsError)
  })
})