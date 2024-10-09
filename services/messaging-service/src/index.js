import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { setupSocket } from "./socket/messageSocket.js";
import { createServer } from "http";
import messageRoute from "./route/messageRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/messages", messageRoute);
// Create an HTTP server
const server = createServer(app);
// Call setupSocket to initialize the WebSocket connection on the server
setupSocket(server);
// Start the server and listen on a specific port
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
