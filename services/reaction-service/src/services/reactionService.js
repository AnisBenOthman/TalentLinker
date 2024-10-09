import { PrismaClient } from "@prisma/client";
import axios from "axios";

export class ReactionService {
  constructor() {
    this.prisma = new PrismaClient();
  }
  async checkTargetExist(targetId, targetType) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3003/api/${targetType}/id/${targetId}`
      );
      if (response.status !== 200) {
        throw new Error(`${targetType} not found`);
      }
    } catch (e) {
      console.log(e.response?.message);
    }
  }
  async getReactionsByType(targetType, targetId) {
    try {
      const target = await this.checkTargetExist(targetType, targetId);

      return await this.prisma.reaction.groupBy({
        by: ["type"],
        where: {
          targetType: targetType,
          targetId: targetId,
        },
        _count: {
          type: true,
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  }
  async checkUserExist(userId) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/api/user/id/${userId}`
      );
      if (response.status !== 200) {
        throw new Error("User not found");
      }
    } catch (e) {
      if (e.response?.status == 404) {
        throw new Error("User not found");
      }
      throw new Error("Error verifying author :", e.message);
    }
  }
  async addReaction(userId, targetId, targetType, type) {
    try {
      const user = await this.checkUserExist(userId);
      const target = await this.checkTargetExist(targetType, targetId);
      return await this.prisma.reaction.upsert({
        where: {
          userId_targetId_targetType: {
            targetType: targetType,
            targetId: targetId,
            userId: userId,
          },
        },
        update: {
          type: type,
        },
        create: {
          targetType: targetType,
          targetId: targetId,
          userId: userId,
          type: type,
        },
      });
    } catch (e) {
      console.log(e.message);
      throw new Error("Error adding or updating reaction: " + e.message);
    }
  }

  async removeReaction(reactionId) {
    try {
      return this.prisma.reaction.delete({
        where: {
          id: reactionId,
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  }
}
