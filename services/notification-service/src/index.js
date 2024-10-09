import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { setupSocket } from "./socket/notificationSocket.js";
import { createServer } from "http";
import notificationRoute from "./routes/notificationRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3006;
// Create an HTTP server
const server = createServer(app);
// Call setupSocket to initialize the WebSocket connection on the server
const io = setupSocket(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/notification", notificationRoute);

// Start the server and listen on a specific port
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
