import { PrismaClient } from "@prisma/client";
import axios from "axios";

export class CommentService {
  constructor() {
    this.prisma = new PrismaClient();
  }
  async createComment(commentData) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/api/user/id/${commentData.authorId}`
      );
      if (response.status !== 200) {
        throw new Error("User not found");
      }
    } catch (e) {
      if (e.response?.status == 404) {
        throw new Error("User not found");
      }
      throw new Error("Error verifying author :" + e.message);
    }
    try {
      const comment = await this.prisma.comment.create({
        data: commentData,
      });
      return comment;
    } catch (e) {
      throw new Error("Error creating comment :" + e.message);
    }
  }

  async getCommentsByPost(postId) {
    try {
      const comments = await this.prisma.comment.findMany({
        where: {
          postId: postId,
        },
      });
      return comments;
    } catch (e) {
      throw new Error("Error fetching comments :", e.message);
    }
  }

  async updateComments(commentId, commentData) {
    try {
      const comment = await this.prisma.comment.update({
        where: { id: commentId },
        data: commentData,
      });
    } catch (e) {
      throw new Error("Error updating comment :", e.message);
    }
  }

  async deleteComment(commentId) {
    try {
      const comment = await this.prisma.comment.delete({
        where: { id: commentId },
      });
    } catch (e) {
      throw new Error("Error deleting comment :", e.message);
    }
  }
}
