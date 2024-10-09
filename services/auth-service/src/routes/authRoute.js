import { getGooglAuthUrl, googleAuth } from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.route("/google/url").get(getGooglAuthUrl);
router.route("/google/callback").get(googleAuth);

export default router;
