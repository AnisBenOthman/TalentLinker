import { CommentService } from "../services/commentService.js";
import { getAuthorPost } from "./postController.js";
const commentService = new CommentService();

export async function createComment(req, res) {
  try {
    const authorId = parseInt(req.body.authorId);
    const postId = parseInt(req.body.postId);
    const comment = await commentService.createComment({
      content: req.body.content,
      authorId: authorId,
      postId: postId,
    });
    const postOwner = getAuthorPost();
    await axios.post("127.0.0.1:3006/notification", {
      userId: postOwner,
      actorId: authorId,
      interaction: "Comment",
      entityId: postId,
    });
    res.status(201).json({ message: "comment created successfuly", comment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "error creating comment", error: err.message });
  }
}

export async function getCommentsByPost(req, res) {
  try {
    const postId = parseInt(req.params.postId);
    const comments = await commentService.getCommentsByPost(postId);
    res.status(200).json(comments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "error fetching comments", error: err.message });
  }
}

export async function updateComment(req, res) {
  try {
    const commentId = parseInt(req.params.commentId);
    const comment = await commentService.updateComments(commentId, req.body);
    res.status(200).json({ message: "comment updated successfully", comment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "error updating comment", error: err.message });
  }
}

export async function deleteComment(req, res) {
  try {
    const commentId = parseInt(req.params.commentId);
    await commentService.deleteComment(commentId);
    res.status(200).json({ message: "comment deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "error deleting comment", error: err.message });
  }
}
