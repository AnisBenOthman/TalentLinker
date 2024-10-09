import express from "express";
import {
  createPost,
  getAllPosts,
  getPost,
  getPostsByAuthor,
  updatePost,
  deletePost,
  getAuthorPost,
} from "../controllers/postController.js";

const router = express.Router();

router.route("/").post(createPost).get(getAllPosts);
router.route("/id/:id").get(getPost).patch(updatePost).delete(deletePost);
router.route("/author/:authorId").get(getPostsByAuthor);
router.route("/post/:postId").get(getAuthorPost);

export default router;
