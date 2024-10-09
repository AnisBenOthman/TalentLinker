import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectionRoute from "./route/connectionRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3007;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/connection", connectionRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
