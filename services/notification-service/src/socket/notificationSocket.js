import { Server } from "socket.io";

export const connectedUsers = new Map();

export function setupSocket(server) {
  const io = new Server(server);
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log(connectedUsers);
    connectedUsers.set(userId, socket.id);
    console.log(`User ${userId} connected`);
    sendNotification();
    // Handle disconnection
    socket.on("disconnect", () => {
      connectedUsers.delete(userId);
      console.log(`User ${userId} disconnected`);
    });
    return io;
  });
}
//function to send a notification to a user
export function sendNotification(userId, notification, io) {
  // Emit notification to the receiver if connected
  if (connectedUsers.has(receiverId)) {
    const receiverSocketId = connectedUsers.get(receiverId);
    io.to(receiverSocketId).emit("new_notification", notification);
    console.log(`Notification sent to user ${receiverId}:`, notification);
  } else {
    console.log(`User ${receiverId} is not connected`);
    // You can store the notification in the database here for later delivery
  }
}
