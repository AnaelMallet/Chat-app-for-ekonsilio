import BasicRepository from "@shared/basicRepository";
import Message from "../../entities/message"
import { IMessageRepository } from "../I-Message";
import { Brackets } from "typeorm";

export class MessageRepository extends BasicRepository<Message> implements IMessageRepository {
  alias = "messages"

  async findAllByUserUuids(senderId: string, receiverId: string): Promise<Message[]> {
      return await this.repository
        .createQueryBuilder(this.alias)
        .innerJoin(`${this.alias}.sender`, "sender_user")
        .innerJoin(`${this.alias}.receiver`, "receiver_user")
        .addSelect(["sender_user.uuid", "receiver_user.uuid"])
        .where(new Brackets(qb => {
          qb.where(`${this.alias}.sender_uuid = :senderId`, { senderId })
          .andWhere(`${this.alias}.receiver_uuid = :receiverId`, { receiverId })
        }))
        .orWhere(new Brackets(qb => {
          qb.where(`${this.alias}.sender_uuid = :receiverId`, { receiverId })
          .andWhere(`${this.alias}.receiver_uuid = :senderId`, { senderId })
        }))
        .orderBy(`${this.alias}.created_date`, "ASC")
        .getMany()
  }

  async save(entity: Message): Promise<void> {
      await this.repository.save(entity)
  }
}