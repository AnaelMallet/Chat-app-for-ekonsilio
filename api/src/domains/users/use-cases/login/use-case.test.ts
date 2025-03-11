import { userTestRepository } from "../../infra/databases/repositories"

import { CreateUserUseCase } from "../createUser/use-case"
import { userPropsDto } from "../createUser/dto"
import { LoginNotValidError, UserNotAllowedError } from "../../errors"

import { loginUserPropsDto } from "./dto"
import { LoginUserUseCase } from "./use-case"

describe("test the login use-case", () => {
  const loginUserUseCase = new LoginUserUseCase(userTestRepository)

  const loginProps: loginUserPropsDto = {
    login: "john.smith@test.fr",
    password: "rhngwAELN2C@B58j",
    isGenius: true
  }

  beforeAll(async () => {
    const createUserUseCase = new CreateUserUseCase(userTestRepository)

    const userGeniusProps: userPropsDto = {
      firstname: "john",
      lastname: "smith",
      email: "john.smith@test.fr",
      isGenius: true,
      password: "rhngwAELN2C@B58j",
      confirmationPassword: "rhngwAELN2C@B58j"
    }
    const userVisitorProps: userPropsDto = {
      firstname: "jane",
      lastname: "smith",
      email: "jane.smith@test.fr",
      isGenius: false,
      password: "rhngwAELN2C@B58j",
      confirmationPassword: "rhngwAELN2C@B58j"
    }

    await createUserUseCase.execute(userGeniusProps)
    await createUserUseCase.execute(userVisitorProps)
  })

  test("user genius should be logged in", async () => {
    const loginUserResult = await loginUserUseCase.execute(loginProps)
  
    expect(loginUserResult.isSuccess).toBe(true)
    
    const loginValues = loginUserResult.getValue()
  
    expect(loginValues.accessToken).toBeDefined()
  })

  test("user visitor should not be logged in because user is not a genius", async () => {
    const props = {...loginProps}

    props.isGenius = false

    const loginUserResult = await loginUserUseCase.execute(props)
  
    expect(loginUserResult.isSuccess).toBe(false)

    const loginUserErrors = loginUserResult.getErrors()
    
    expect(loginUserErrors.length).toBe(1)
    expect(loginUserErrors[0]).toBeInstanceOf(UserNotAllowedError)
  })

  test("user visitor should be logged in", async () => {
    const props = {...loginProps}

    props.login="jane.smith@test.fr"
    props.isGenius = false

    const loginUserResult = await loginUserUseCase.execute(props)

    expect(loginUserResult.isSuccess).toBe(true)
    
    const loginValues = loginUserResult.getValue()
  
    expect(loginValues.accessToken).toBeDefined()
  })

  test("user genius should not be logged in because user is a genius", async () => {
    const props = {...loginProps}

    props.login="jane.smith@test.fr"
    props.isGenius = true

    const loginUserResult = await loginUserUseCase.execute(props)

    expect(loginUserResult.isSuccess).toBe(false)

    const loginUserErrors = loginUserResult.getErrors()
    
    expect(loginUserErrors.length).toBe(1)
    expect(loginUserErrors[0]).toBeInstanceOf(UserNotAllowedError)
  })

  test("user should not be logged in because user is not found (email is invalid)", async () => {
    const props = {...loginProps}

    props.login = "fggfsg@sf.fr"

    const loginUserResult = await loginUserUseCase.execute(props)
  
    expect(loginUserResult.isSuccess).toBe(false)

    const loginUserErrors = loginUserResult.getErrors()
    
    expect(loginUserErrors.length).toBe(1)
    expect(loginUserErrors[0]).toBeInstanceOf(LoginNotValidError)
  })

  test("user should not be logged in because user is not found (password is invalid)", async () => {
    const props = {...loginProps}

    props.password = "ragbU7@Ck2HAx8VD"

    const loginUserResult = await loginUserUseCase.execute(props)
  
    expect(loginUserResult.isSuccess).toBe(false)

    const loginUserErrors = loginUserResult.getErrors()
    
    expect(loginUserErrors.length).toBe(1)
    expect(loginUserErrors[0]).toBeInstanceOf(LoginNotValidError)
  })
})