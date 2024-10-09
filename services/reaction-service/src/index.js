import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import reactionRoute from "./routes/reactionRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3004;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/reaction", reactionRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
