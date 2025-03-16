import { messageRepository } from "../../infra/databases/repositories/implementations"

import { MessageDomainRepository } from "./messageDomainRepository"

const messageDomainRepository = new MessageDomainRepository(messageRepository)

export {
  messageDomainRepository
}