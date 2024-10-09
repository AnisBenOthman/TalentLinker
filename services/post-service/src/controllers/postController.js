import { PostService } from "../services/postService.js";

const postService = new PostService();

export async function createPost(req, res) {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json({ message: "post created successfully", post });
  } catch (e) {
    res.status(500).json({ message: "Error creating post", error: e.message });
  }
}

export async function getPost(req, res) {
  try {
    const post = await postService.getPostById(req.params.id);
    res.status(200).json({ message: "post retrieved successfully", post });
  } catch (e) {
    if (e.status == 404)
      res.status(404).json({ message: "post not found", error: e });
  }
  res.status(e.status).json({ message: e.message });
}

export async function updatePost(req, res) {
  try {
    const post = await postService.updatePost(req.params.id, req.body);
    res.status(200).json({ message: "post updated successfully", post });
  } catch (e) {
    res.status(500).json({ message: "Error updating post", error: e });
  }
}

export async function deletePost(req, res) {
  try {
    const post = await postService.deletePost(req.params.id);
    res.status(200).json({ message: "post deleted successfully", post });
  } catch (e) {
    res.status(500).json({ message: "Error deleting post", error: e });
  }
}

export async function getAllPosts(req, res) {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json({ message: "posts retrieved successfully", posts });
  } catch (e) {
    res.status(500).json({ message: "Error retrieving posts", error: e });
  }
}

export async function getPostsByAuthor(req, res) {
  try {
    const authorId = parseInt(req.params.authorId);
    const posts = await postService.getPostsByAuthor(authorId);
    res.status(200).json({ message: "posts retrieved successfully", posts });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error retrieving posts", error: e.message });
  }
}

export async function getAuthorPost(req, res) {
  try {
    const postId = parseInt(req.params.postId);
    const authorId = await postService.getAuthorPost(postId);
    res.status(200).json({ message: "author retrieved successfully", author });
    return authorId;
  } catch (e) {
    res.status(500).json({ message: "Error retrieving author", error: e });
  }
}
