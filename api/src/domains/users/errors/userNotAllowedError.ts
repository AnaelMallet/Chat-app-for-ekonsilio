import { DomainError } from "@shared/domainError"

export class UserNotAllowedError extends DomainError {
  constructor() {
    super("user", "not allowed")
  }
}