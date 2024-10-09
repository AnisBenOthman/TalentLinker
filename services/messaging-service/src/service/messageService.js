import { PrismaClient } from "@prisma/client";

export class MessageService {
  constructor() {
    this.prisma = new PrismaClient();
  }
  async createMessage(messageData) {
    const message = await this.prisma.message.create({
      data: messageData,
    });
  }
  async markAsRead(messageId) {
    const message = await this.prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        readAt: new Date(),
      },
    });
  }

  async getConversationsByUser(userId) {
    const conversation = await this.prisma.conversation.findMany({
      where: {
        particpants: {
          has: userId, // Check if the userId is included in the participants array
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async getMessagesByConverseation(conversationId) {
    const messages = await this.prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }
}
