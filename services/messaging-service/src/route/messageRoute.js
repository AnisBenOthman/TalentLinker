import express from "express";
import {
  sendMessage,
  getConversationsByUser,
  getMessagesByConverseation,
  markAsRead,
} from "../controller/messageController.js";

const router = express.Router();

router.route("/send-message").post(sendMessage);
router.route("/get-conversations/:userId").get(getConversationsByUser);
router.route("/get-messages/:conversationId").get(getMessagesByConverseation);
router.route("/mark-as-read").patch(markAsRead);

export default router;
