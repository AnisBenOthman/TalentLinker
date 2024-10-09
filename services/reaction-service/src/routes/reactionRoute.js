import {
  addReaction,
  removeReaction,
  getReactionsbyType,
} from "../controllers/reactionController.js";
import express from "express";

const router = express.Router();

router.route("/").post(addReaction);
router.route("/id/:id").delete(removeReaction);
router.route("/:targetId/:targetType").get(getReactionsbyType);

export default router;
