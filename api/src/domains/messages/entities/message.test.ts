import { v4 as uuid } from "uuid"
import { Message, MessageProps } from "./message"

describe("test the message entity", () => {
  const senderId = uuid()
  const receiverId = uuid()

  const messageProps: MessageProps = {
    senderId,
    receiverId,
    text: "test"
  }

  test("Should create a message", () => {
    const messageResult = Message.create(messageProps)

    expect(messageResult.isSuccess).toBe(true)

    const message = messageResult.getValue()

    expect(message.senderId).toBe(messageProps.senderId)
    expect(message.receiverId).toBe(messageProps.receiverId)
    expect(message.text).toBe(messageProps.text)
  })

  test("Should not create a message because senderId is undefined", () => {
    const props = { ...messageProps }

    props.senderId = undefined

    const messageResult = Message.create(props)

    expect(messageResult.isSuccess).toBe(false)
    expect(messageResult.values).toBe(undefined)

    const messageErrors = messageResult.getErrors()

    expect(messageErrors.length).toBe(1)
    expect(messageErrors[0].message).toBe("againstNullOrUndefined")
  })

  test("Should not create a message because receiverId is undefined", () => {
    const props = { ...messageProps }

    props.receiverId = undefined

    const messageResult = Message.create(props)

    expect(messageResult.isSuccess).toBe(false)
    expect(messageResult.values).toBe(undefined)

    const messageErrors = messageResult.getErrors()

    expect(messageErrors.length).toBe(1)
    expect(messageErrors[0].message).toBe("againstNullOrUndefined")
  })

  test("Should not create a message because text is undefined", () => {
    const props = { ...messageProps }

    props.text = undefined

    const messageResult = Message.create(props)

    expect(messageResult.isSuccess).toBe(false)
    expect(messageResult.values).toBe(undefined)

    const messageErrors = messageResult.getErrors()

    expect(messageErrors.length).toBe(1)
    expect(messageErrors[0].message).toBe("againstNullOrUndefined")
  })
})