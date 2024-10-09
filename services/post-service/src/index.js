import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import PostRoute from "./routes/postRoute.js";
import commentRoute from "./routes/commentRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/post", PostRoute);
app.use("/api/comment", commentRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
