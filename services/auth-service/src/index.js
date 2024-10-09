import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
