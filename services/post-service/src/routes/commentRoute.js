import express from "express";
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.route("/").post(createComment);
router
  .route("/id/:postId")
  .get(getCommentsByPost)
  .patch(updateComment)
  .delete(deleteComment);

export default router;
