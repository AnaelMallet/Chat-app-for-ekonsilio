import { Entity } from "@shared/basicObjectClass"
import { Guard } from "@shared/guard"
import { Result } from "@shared/Results"

export type MessageProps = {
  senderId: string
  receiverId: string
  text: string
}

export class Message extends Entity<Message, MessageProps> {
  get senderId(): string {
    return this.props.senderId
  }

  get receiverId(): string {
    return this.props.receiverId
  }

  get text(): string {
    return this.props.text
  }

  static create(props: MessageProps, uuid?: string): Result<Message> {
      const guardResults = Result.combine([
        Guard.againstNullOrUndefined(props.senderId, "senderId"),
        Guard.againstNullOrUndefined(props.receiverId, "receiverId"),
        Guard.againstNullOrUndefined(props.text, "text")
      ])

      if (guardResults.isSuccess === false) {
        return Result.fail(guardResults.getErrors())
      }

      const message = new Message({ ...props }, uuid)

      return Result.ok(message)
  }
}