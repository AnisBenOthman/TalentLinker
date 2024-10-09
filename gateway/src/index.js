import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { verifyJWT } from "./middleware/authMiddleware.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
//routes
const routes = {
  "/api/user": "http://127.0.0.1:3001/api/user",
  "/api/auth": "http://127.0.0.1:3002/api/auth",
  "/api/post": "http://127.0.0.1:3003/api/post/",
  "/api/comment": "http://127.0.0.1:3003/api/comment",
  "/api/reaction": "http://127.0.0.1:3004/api/reaction",
  "/api/notification": "http://127.0.0.1:3006/api/notification",
};
//proxy middleware configuration
for (const [route, target] of Object.entries(routes)) {
  if (route == "/api/auth") {
    app.use(
      route,
      createProxyMiddleware({
        target,
        changeOrigin: true,
        onError: (err, req, res) => {
          res.status(500).json(`Error on proxying ${route}:`, err);
        },
      })
    );
  } else {
    app.use(
      route,
      verifyJWT,
      createProxyMiddleware({
        target,
        changeOrigin: true,
        onError: (err, req, res) => {
          res.status(500).json(`Error on proxying ${route}:`, err);
        },
      })
    );
  }
}
app.listen(port, () => {
  console.log(`API Gateway is running on port ${port}`);
});
