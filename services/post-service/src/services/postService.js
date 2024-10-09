import { PrismaClient } from "@prisma/client";
import axios from "axios";

export class PostService {
  constructor() {
    this.prisma = new PrismaClient();
  }
  async createPost(postData) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/api/user/id/${postData.authorId}`
      );
      if (response.status !== 200) {
        throw new Error("User not found");
      }
    } catch (e) {
      if (e.response.status == 404) {
        throw new Error("User not found");
      }
      throw new Error("Error verifying author :", e.message);
    }
    try {
      const post = await this.prisma.post.create({
        data: postData,
      });
      return post;
    } catch (e) {
      throw new Error("Error creating post :", e.message);
    }
  }

  async getPostById(id) {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
      });
      return post;
    } catch (e) {
      throw new Error("Error fetching post :", e.message);
    }
  }

  async updatePost(id, postData) {
    try {
      const post = await this.prisma.post.update({
        where: { id },
        data: postData,
      });
      return post;
    } catch (e) {
      throw new Error("Error update post :", e.message);
    }
  }

  async deletePost(id) {
    try {
      const post = await this.prisma.post.delete({
        where: { id },
      });
      return post;
    } catch (e) {
      throw new Error("Error delete post :", e.message);
    }
  }

  async getAllPosts() {
    try {
      const posts = await this.prisma.post.findMany();
      return posts;
    } catch (e) {
      throw new Error("Error fetching posts :", e.message);
    }
  }

  async getPostsByAuthor(authorId) {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/api/user/id/${authorId}`
      );
      if (response.status !== 200) {
        throw new Error("User not found");
      }
    } catch (e) {
      if (e.response.status == 404) {
        throw new Error("User not found");
      }
      throw new Error("Error verifying author :", e.message);
    }
    try {
      const posts = await this.prisma.post.findMany({
        where: { authorId },
        orderBy: { createdAt: "desc" },
      });
      return posts;
    } catch (e) {
      throw new Error("Error fetching posts by author :", e.message);
    }
  }

  async getAuthorPost(postId) {
    try {
      const author = await this.prisma.post.findUnique({
        where: { id: postId },
        select: {
          authorId: true,
        },
      });
    } catch (e) {
      throw new Error("Error fetching author post :", e.message);
    }
  }
}
