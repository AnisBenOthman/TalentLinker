import { MessageService } from "../service/messageService.js";
import { connectedUsers } from "../socket/messageSocket.js";
const messageService = new MessageService();

export async function sendMessage(req, res) {
  try {
    const message = await messageService.createMessage(req.body);
    if (connectedUsers.has(messageData.receiverId)) {
      //get socketId of the receiver
      const receiverSocketId = connectedUsers.get(messageData.receiverId);
      // Emit real-time message to the receiver
      io.to(receiverSocketId).emit("receive_message", message);
      res.status(200).json({ message, status: "delivered and vued" });
    } else {
      // If the user is offline, return a pending status
      res.status(200).json({ message, status: "delivred" });
    }
  } catch (e) {
    res.status(500).json({ error: "faild to send message" + e.message });
  }
}

export async function markAsRead(req, res) {
  try {
    const message = await messageService.markAsRead(req.params.messageId);
    res
      .status(200)
      .json({ message: "message marked as read successfully", message });
  } catch (e) {
    res
      .status(500)
      .json({ error: "failed to mark message as read" + e.message });
  }
}

export async function getConversationsByUser(req, res) {
  try {
    const conversation = await messageService.getConversationsByUser(
      req.params.userId
    );
    res
      .status(200)
      .json({ message: "conversation retrieved successfully", conversation });
  } catch (e) {
    res
      .status(500)
      .json({ error: "failed to retrieve conversation" + e.message });
  }
}

export async function getMessagesByConverseation(req, res) {
  try {
    const messages = await messageService.getMessagesByConverseation(
      req.params.conversationId
    );
    res
      .status(200)
      .json({ message: "messages retrieved successfully", messsages });
  } catch (e) {
    res.status(500).json({ error: "failed to retrieve messages" + e.message });
  }
}
