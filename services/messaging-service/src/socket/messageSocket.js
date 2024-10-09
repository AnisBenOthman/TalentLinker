import { Server } from "socket.io";

export const connectedUsers = new Map();

export function setupSocket(server) {
  const io = new Server(server);
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log(connectedUsers);
    connectedUsers.set(userId, socket.id);
    console.log(`User ${userId} connected`);
    // Listen for incoming messages
    socket.on("send_message", (data) => {
      const { receiverId, content } = data;
      // Emit message to the receiver if connected
      if (connectedUsers.has(receiverId)) {
        const receiverSocketId = connectedUsers.get(receiverId);
        io.to(receiverSocketId).emit("new_message", content);
      }
    });
    // Handle disconnection
    socket.on("disconnect", () => {
      connectedUsers.delete(userId);
      console.log(`User ${userId} disconnected`);
    });
  });
}
