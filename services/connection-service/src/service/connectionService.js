import { PrismaClient } from "@prisma/client";

export class ConnectionService {
  constructor() {
    this.prisma = new PrismaClient();
  }
  async addConnection(requesterId, receiverId) {
    try {
      //create a new connection
      return (newConnection = await this.prisma.connection.create({
        data: {
          requesterId,
          receiverId,
        },
      }));
    } catch (e) {
      console.error(e.message);
    }
  }

  async updateConnectionStatus(connectionId, status) {
    return await this.prisma.connection.update({
      where: {
        id: connectionId,
      },
      data: {
        status,
      },
    });
  }

  async getAcceptedConnections(userId) {
    return await this.prisma.connection.findMany({
      where: {
        OR: [
          { requesterId: userId, status: "ACCEPTED" },
          { receiverId: userId, status: "ACCEPTED" },
        ],
      },
    });
  }
  async getInvitations(userId) {
    return await this.prisma.connection.findMany({
      where: {
        receiverId: userId,
        status: "PENDING",
      },
    });
  }

  //get a list
  async getPendingConnections(userId) {
    return await this.prisma.connection.findMany({
      where: {
        requesterId: userId,
        status: "PENDING",
      },
    });
  }

  async deleteConnection(idConnection) {
    return await this.prisma.connection.delete({ where: { id: idConnection } });
  }
}
